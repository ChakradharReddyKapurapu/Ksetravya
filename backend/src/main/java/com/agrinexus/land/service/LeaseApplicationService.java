package com.agrinexus.land.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.DuplicateResourceException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.land.dto.LeaseApplicationRequest;
import com.agrinexus.land.dto.LeaseApplicationResponse;
import com.agrinexus.land.entity.LandParcel;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.entity.LeaseApplication;
import com.agrinexus.land.entity.LeaseApplicationStatus;
import com.agrinexus.land.repository.LandParcelRepository;
import com.agrinexus.land.repository.LeaseApplicationRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.event.LandNotificationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LeaseApplicationService {

    private final LeaseApplicationRepository leaseApplicationRepository;
    private final LandParcelRepository landParcelRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    public LeaseApplicationService(LeaseApplicationRepository leaseApplicationRepository, LandParcelRepository landParcelRepository, UserRepository userRepository, ApplicationEventPublisher eventPublisher) {
        this.leaseApplicationRepository = leaseApplicationRepository;
        this.landParcelRepository = landParcelRepository;
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public LeaseApplicationResponse applyForLease(String farmerEmail, Long parcelId, LeaseApplicationRequest request) {
        User farmer = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated farmer not found"));

        LandParcel parcel = landParcelRepository.findByIdAndActiveTrue(parcelId)
                .orElseThrow(() -> new ResourceNotFoundException("Farmland parcel not found with ID: " + parcelId));

        if (parcel.getOwner().getId().equals(farmer.getId())) {
            throw new BadRequestException("You cannot apply to lease your own land parcel.");
        }

        if (parcel.getStatus() != LandStatus.AVAILABLE) {
            throw new BadRequestException("This farmland parcel is not available for lease (Status: " + parcel.getStatus() + ").");
        }

        Optional<LeaseApplication> existingOpt = leaseApplicationRepository.findByParcelIdAndFarmerId(parcel.getId(), farmer.getId());
        if (existingOpt.isPresent()) {
            LeaseApplication existing = existingOpt.get();
            if (existing.getStatus() != LeaseApplicationStatus.WITHDRAWN && existing.getStatus() != LeaseApplicationStatus.CANCELLED) {
                throw new DuplicateResourceException("You have already submitted a lease application for this farmland parcel.");
            } else {
                existing.setStatus(LeaseApplicationStatus.PENDING);
                existing.setProposedCrop(request != null && request.getProposedCrop() != null ? request.getProposedCrop().trim() : null);
                existing.setPreferredTenure(request != null && request.getPreferredTenure() != null ? request.getPreferredTenure().trim() : null);
                existing.setMessage(request != null && request.getMessage() != null ? request.getMessage().trim() : null);
                existing.setOfferedRentPerAcre(request != null ? request.getOfferedRentPerAcre() : null);
                LeaseApplication saved = leaseApplicationRepository.save(existing);
                return LeaseApplicationResponse.fromEntity(saved);
            }
        }

        LeaseApplication application = new LeaseApplication(
                parcel,
                farmer,
                request != null && request.getProposedCrop() != null ? request.getProposedCrop().trim() : null,
                request != null && request.getPreferredTenure() != null ? request.getPreferredTenure().trim() : null,
                request != null && request.getMessage() != null ? request.getMessage().trim() : null,
                request != null ? request.getOfferedRentPerAcre() : null,
                LeaseApplicationStatus.PENDING
        );

        LeaseApplication saved = leaseApplicationRepository.save(application);

        // Notify land owner
        try {
            eventPublisher.publishEvent(new LandNotificationEvent(
                    parcel.getOwner().getId(),
                    "New Land Lease Application",
                    String.format("%s submitted a lease application for '%s'.", farmer.getFullName() != null ? farmer.getFullName() : farmer.getEmail(), parcel.getTitle()),
                    NotificationType.LAND_APPLICATION,
                    NotificationPriority.NORMAL,
                    parcel.getId(),
                    String.format("LAND_APP:%d:%d", parcel.getId(), farmer.getId())
            ));
        } catch (Exception ignored) {}

        return LeaseApplicationResponse.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<LeaseApplicationResponse> getMyApplications(String farmerEmail) {
        User farmer = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated farmer not found"));

        return leaseApplicationRepository.findByFarmerIdOrderByAppliedAtDesc(farmer.getId())
                .stream()
                .map(LeaseApplicationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<LeaseApplicationResponse> getParcelApplications(String ownerEmail, Long parcelId, boolean isAdmin) {
        LandParcel parcel = landParcelRepository.findByIdAndActiveTrue(parcelId)
                .orElseThrow(() -> new ResourceNotFoundException("Farmland parcel not found with ID: " + parcelId));

        if (!isAdmin && !parcel.getOwner().getEmail().equalsIgnoreCase(ownerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to view lease applications for this farmland parcel.");
        }

        return leaseApplicationRepository.findByParcelIdOrderByAppliedAtDesc(parcel.getId())
                .stream()
                .map(LeaseApplicationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public LeaseApplicationResponse acceptApplication(String ownerEmail, Long applicationId, boolean isAdmin) {
        LeaseApplication application = leaseApplicationRepository.findByIdWithDetails(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Lease application not found with ID: " + applicationId));

        LandParcel parcel = application.getParcel();

        if (!isAdmin && !parcel.getOwner().getEmail().equalsIgnoreCase(ownerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to accept lease applications for this farmland parcel.");
        }

        if (application.getStatus() != LeaseApplicationStatus.PENDING) {
            throw new BadRequestException("Only PENDING applications can be accepted. Current status: " + application.getStatus());
        }

        if (parcel.getStatus() == LandStatus.LEASED) {
            throw new DuplicateResourceException("This farmland parcel has already been leased.");
        }

        application.setStatus(LeaseApplicationStatus.ACCEPTED);
        leaseApplicationRepository.save(application);

        parcel.setStatus(LandStatus.LEASED);
        landParcelRepository.save(parcel);

        // Notify applicant (Farmer)
        try {
            eventPublisher.publishEvent(new LandNotificationEvent(
                    application.getFarmer().getId(),
                    "Lease Application Accepted!",
                    String.format("Congratulations! Your lease application for '%s' has been accepted.", parcel.getTitle()),
                    NotificationType.LAND_APPLICATION_ACCEPTED,
                    NotificationPriority.HIGH,
                    parcel.getId(),
                    String.format("LAND_ACCEPT:%d", application.getId())
            ));
        } catch (Exception ignored) {}

        return LeaseApplicationResponse.fromEntity(application);
    }

    @Transactional
    public LeaseApplicationResponse rejectApplication(String ownerEmail, Long applicationId, boolean isAdmin) {
        LeaseApplication application = leaseApplicationRepository.findByIdWithDetails(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Lease application not found with ID: " + applicationId));

        LandParcel parcel = application.getParcel();

        if (!isAdmin && !parcel.getOwner().getEmail().equalsIgnoreCase(ownerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to reject lease applications for this farmland parcel.");
        }

        if (application.getStatus() != LeaseApplicationStatus.PENDING) {
            throw new BadRequestException("Only PENDING applications can be rejected. Current status: " + application.getStatus());
        }

        application.setStatus(LeaseApplicationStatus.REJECTED);
        LeaseApplication saved = leaseApplicationRepository.save(application);

        // Notify applicant (Farmer)
        try {
            eventPublisher.publishEvent(new LandNotificationEvent(
                    application.getFarmer().getId(),
                    "Lease Application Update",
                    String.format("Your lease application for '%s' was not accepted.", parcel.getTitle()),
                    NotificationType.LAND_APPLICATION_REJECTED,
                    NotificationPriority.NORMAL,
                    parcel.getId(),
                    String.format("LAND_REJECT:%d", application.getId())
            ));
        } catch (Exception ignored) {}

        return LeaseApplicationResponse.fromEntity(saved);
    }

    @Transactional
    public LeaseApplicationResponse withdrawApplication(String farmerEmail, Long applicationId) {
        User farmer = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated farmer not found"));

        LeaseApplication application = leaseApplicationRepository.findByIdWithDetails(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Lease application not found with ID: " + applicationId));

        if (!application.getFarmer().getId().equals(farmer.getId())) {
            throw new AccessDeniedException("You do not have permission to withdraw this lease application.");
        }

        if (application.getStatus() != LeaseApplicationStatus.PENDING) {
            throw new BadRequestException("Cannot withdraw lease application in status: " + application.getStatus());
        }

        application.setStatus(LeaseApplicationStatus.WITHDRAWN);
        LeaseApplication saved = leaseApplicationRepository.save(application);
        return LeaseApplicationResponse.fromEntity(saved);
    }
}
