package com.agrinexus.tools.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.DuplicateResourceException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.tools.dto.ToolRentalRequestCreate;
import com.agrinexus.tools.dto.ToolRentalResponse;
import com.agrinexus.tools.entity.RentalRequestStatus;
import com.agrinexus.tools.entity.Tool;
import com.agrinexus.tools.entity.ToolAvailabilityStatus;
import com.agrinexus.tools.entity.ToolRentalRequest;
import com.agrinexus.tools.repository.ToolRentalRequestRepository;
import com.agrinexus.tools.repository.ToolRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ToolRentalService {

    private final ToolRentalRequestRepository rentalRepository;
    private final ToolRepository toolRepository;
    private final UserRepository userRepository;

    public ToolRentalService(ToolRentalRequestRepository rentalRepository,
                             ToolRepository toolRepository,
                             UserRepository userRepository) {
        this.rentalRepository = rentalRepository;
        this.toolRepository = toolRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ToolRentalResponse requestRental(String renterEmail, Long toolId, ToolRentalRequestCreate request) {
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new BadRequestException("Rental end date cannot be earlier than start date.");
        }

        if (request.getStartDate().isBefore(LocalDate.now())) {
            throw new BadRequestException("Rental start date cannot be in the past.");
        }

        Tool tool = toolRepository.findByIdAndActiveTrue(toolId)
                .orElseThrow(() -> new ResourceNotFoundException("Tool not found with ID: " + toolId));

        if (tool.getAvailabilityStatus() == ToolAvailabilityStatus.UNAVAILABLE ||
            tool.getAvailabilityStatus() == ToolAvailabilityStatus.MAINTENANCE) {
            throw new BadRequestException("Tool is currently not available for rental (Status: " + tool.getAvailabilityStatus() + ").");
        }

        User renter = userRepository.findByEmail(renterEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        if (tool.getOwner().getId().equals(renter.getId())) {
            throw new BadRequestException("You cannot rent your own tool listing.");
        }

        boolean hasConflict = rentalRepository.hasConflictingApprovedRental(
                toolId, 0L, request.getStartDate(), request.getEndDate()
        );

        if (hasConflict) {
            throw new DuplicateResourceException("This tool is not available for the requested rental period.");
        }

        int requestedDays = (int) ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;
        BigDecimal totalAmount = tool.getPricePerDay().multiply(BigDecimal.valueOf(requestedDays));

        ToolRentalRequest rentalRequest = ToolRentalRequest.builder()
                .tool(tool)
                .renter(renter)
                .owner(tool.getOwner())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .requestedDays(requestedDays)
                .message(request.getMessage() != null ? request.getMessage().trim() : null)
                .totalAmount(totalAmount)
                .securityDeposit(tool.getSecurityDeposit() != null ? tool.getSecurityDeposit() : BigDecimal.ZERO)
                .status(RentalRequestStatus.PENDING)
                .build();

        ToolRentalRequest saved = rentalRepository.save(rentalRequest);
        return ToolRentalResponse.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<ToolRentalResponse> getMyRentalRequests(String renterEmail) {
        User renter = userRepository.findByEmail(renterEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        return rentalRepository.findByRenterIdWithDetails(renter.getId())
                .stream()
                .map(ToolRentalResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ToolRentalResponse> getReceivedRentalRequests(String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        return rentalRepository.findByOwnerIdWithDetails(owner.getId())
                .stream()
                .map(ToolRentalResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public ToolRentalResponse approveRequest(String ownerEmail, Long requestId) {
        ToolRentalRequest rental = rentalRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Rental request not found with ID: " + requestId));

        if (!rental.getOwner().getEmail().equalsIgnoreCase(ownerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to approve this rental request.");
        }

        if (!rental.getStatus().canTransitionTo(RentalRequestStatus.APPROVED)) {
            throw new BadRequestException("Cannot approve rental request in current status: " + rental.getStatus());
        }

        boolean hasConflict = rentalRepository.hasConflictingApprovedRental(
                rental.getTool().getId(), rental.getId(), rental.getStartDate(), rental.getEndDate()
        );

        if (hasConflict) {
            throw new DuplicateResourceException("Cannot approve: A conflicting approved rental exists for this date window.");
        }

        rental.setStatus(RentalRequestStatus.APPROVED);
        ToolRentalRequest updated = rentalRepository.save(rental);
        return ToolRentalResponse.fromEntity(updated);
    }

    @Transactional
    public ToolRentalResponse rejectRequest(String ownerEmail, Long requestId) {
        ToolRentalRequest rental = rentalRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Rental request not found with ID: " + requestId));

        if (!rental.getOwner().getEmail().equalsIgnoreCase(ownerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to reject this rental request.");
        }

        if (!rental.getStatus().canTransitionTo(RentalRequestStatus.REJECTED)) {
            throw new BadRequestException("Cannot reject rental request in current status: " + rental.getStatus());
        }

        rental.setStatus(RentalRequestStatus.REJECTED);
        ToolRentalRequest updated = rentalRepository.save(rental);
        return ToolRentalResponse.fromEntity(updated);
    }

    @Transactional
    public ToolRentalResponse cancelRequest(String requesterEmail, Long requestId) {
        ToolRentalRequest rental = rentalRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Rental request not found with ID: " + requestId));

        boolean isRenter = rental.getRenter().getEmail().equalsIgnoreCase(requesterEmail.trim());
        boolean isOwner = rental.getOwner().getEmail().equalsIgnoreCase(requesterEmail.trim());

        if (!isRenter && !isOwner) {
            throw new AccessDeniedException("You do not have permission to cancel this rental request.");
        }

        if (!rental.getStatus().canTransitionTo(RentalRequestStatus.CANCELLED)) {
            throw new BadRequestException("Cannot cancel rental request in terminal status: " + rental.getStatus());
        }

        rental.setStatus(RentalRequestStatus.CANCELLED);
        ToolRentalRequest updated = rentalRepository.save(rental);
        return ToolRentalResponse.fromEntity(updated);
    }
}
