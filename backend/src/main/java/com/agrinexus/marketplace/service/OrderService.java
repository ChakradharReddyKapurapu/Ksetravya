package com.agrinexus.marketplace.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.DuplicateResourceException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.marketplace.dto.OrderCreateRequest;
import com.agrinexus.marketplace.dto.OrderResponse;
import com.agrinexus.marketplace.dto.OrderStatusUpdateRequest;
import com.agrinexus.marketplace.entity.*;
import com.agrinexus.marketplace.repository.*;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.event.OrderNotificationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    public OrderService(OrderRepository orderRepository, CartRepository cartRepository, ProductRepository productRepository, UserRepository userRepository, ApplicationEventPublisher eventPublisher) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public OrderResponse createOrder(String buyerEmail, OrderCreateRequest request) {
        User buyer = userRepository.findByEmail(buyerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        Cart cart = cartRepository.findByUserId(buyer.getId())
                .orElseThrow(() -> new BadRequestException("Your shopping cart is empty."));

        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Your shopping cart is empty. Add products before placing an order.");
        }

        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        Order order = Order.builder()
                .buyer(buyer)
                .status(OrderStatus.PENDING)
                .shippingAddress(request.getShippingAddress().trim())
                .phone(request.getPhone().trim())
                .orderNotes(request.getOrderNotes() != null ? request.getOrderNotes().trim() : null)
                .subtotal(BigDecimal.ZERO)
                .totalAmount(BigDecimal.ZERO)
                .build();

        for (CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findByIdAndActiveTrue(cartItem.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product " + cartItem.getProduct().getName() + " is no longer available."));

            if (product.getAvailabilityStatus() != ProductStatus.ACTIVE || product.getStockQuantity() < cartItem.getQuantity()) {
                throw new DuplicateResourceException("Insufficient stock for " + product.getName() + ". Available: " + product.getStockQuantity() + ", in cart: " + cartItem.getQuantity());
            }

            // Concurrently safe stock reduction
            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            if (product.getStockQuantity() == 0) {
                product.setAvailabilityStatus(ProductStatus.OUT_OF_STOCK);
            }
            productRepository.save(product);

            BigDecimal itemSubtotal = product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            subtotal = subtotal.add(itemSubtotal);

            OrderItem orderItem = new OrderItem(
                    order,
                    product,
                    product.getName(),
                    product.getPrice(),
                    product.getUnit(),
                    cartItem.getQuantity(),
                    itemSubtotal,
                    product.getSeller() != null ? product.getSeller().getId() : null
            );
            orderItems.add(orderItem);
        }

        order.setSubtotal(subtotal);
        order.setTotalAmount(subtotal);
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        // Clear cart items
        cart.getItems().clear();
        cartRepository.save(cart);

        // Notify buyer
        try {
            eventPublisher.publishEvent(new OrderNotificationEvent(
                    buyer.getId(),
                    "Order Placed Successfully",
                    String.format("Your order #%d for ₹%.2f has been received and is being processed.", savedOrder.getId(), savedOrder.getTotalAmount()),
                    NotificationType.MARKETPLACE_ORDER,
                    NotificationPriority.NORMAL,
                    savedOrder.getId(),
                    String.format("ORDER_PLACED:%d", savedOrder.getId())
            ));
        } catch (Exception ignored) {}

        return OrderResponse.fromEntity(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(String buyerEmail) {
        User buyer = userRepository.findByEmail(buyerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        return orderRepository.findByBuyerIdOrderByCreatedAtDesc(buyer.getId())
                .stream()
                .map(OrderResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(String userEmail, Long orderId, boolean isAdmin) {
        User user = userRepository.findByEmail(userEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        boolean isBuyer = order.getBuyer().getId().equals(user.getId());
        boolean isSeller = order.getItems().stream()
                .anyMatch(i -> user.getId().equals(i.getSellerIdSnapshot()));

        if (!isAdmin && !isBuyer && !isSeller) {
            throw new AccessDeniedException("You do not have permission to view this order.");
        }

        return OrderResponse.fromEntity(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getSellerOrders(String sellerEmail) {
        User seller = userRepository.findByEmail(sellerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        return orderRepository.findOrdersBySellerId(seller.getId())
                .stream()
                .map(OrderResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponse updateOrderStatus(String userEmail, Long orderId, OrderStatusUpdateRequest request, boolean isAdmin) {
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        if (!isAdmin) {
            User user = userRepository.findByEmail(userEmail.toLowerCase().trim())
                    .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));
            boolean isSeller = order.getItems().stream().anyMatch(i -> user.getId().equals(i.getSellerIdSnapshot()));
            if (!isSeller) {
                throw new AccessDeniedException("You do not have permission to update this order's status.");
            }
        }

        if (!order.getStatus().canTransitionTo(request.getStatus())) {
            throw new BadRequestException("Invalid status transition from " + order.getStatus() + " to " + request.getStatus());
        }

        order.setStatus(request.getStatus());
        Order updated = orderRepository.save(order);

        // Notify buyer
        try {
            eventPublisher.publishEvent(new OrderNotificationEvent(
                    order.getBuyer().getId(),
                    "Order Status Update",
                    String.format("Your order #%d is now %s.", updated.getId(), updated.getStatus()),
                    NotificationType.ORDER_STATUS,
                    NotificationPriority.NORMAL,
                    updated.getId(),
                    String.format("ORDER_STATUS:%d:%s", updated.getId(), updated.getStatus())
            ));
        } catch (Exception ignored) {}

        return OrderResponse.fromEntity(updated);
    }

    @Transactional
    public OrderResponse cancelOrder(String buyerEmail, Long orderId, boolean isAdmin) {
        User buyer = userRepository.findByEmail(buyerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        if (!isAdmin && !order.getBuyer().getId().equals(buyer.getId())) {
            throw new AccessDeniedException("You do not have permission to cancel this order.");
        }

        if (order.getStatus() == OrderStatus.DELIVERED || order.getStatus() == OrderStatus.SHIPPED || order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order cannot be cancelled in current status: " + order.getStatus());
        }

        order.setStatus(OrderStatus.CANCELLED);

        // Restore inventory stock
        for (OrderItem item : order.getItems()) {
            if (item.getProduct() != null) {
                Product product = productRepository.findById(item.getProduct().getId()).orElse(null);
                if (product != null) {
                    product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
                    if (product.getAvailabilityStatus() == ProductStatus.OUT_OF_STOCK && product.getStockQuantity() > 0) {
                        product.setAvailabilityStatus(ProductStatus.ACTIVE);
                    }
                    productRepository.save(product);
                }
            }
        }

        Order cancelled = orderRepository.save(order);

        // Notify buyer
        try {
            eventPublisher.publishEvent(new OrderNotificationEvent(
                    buyer.getId(),
                    "Order Cancelled",
                    String.format("Your order #%d has been cancelled.", cancelled.getId()),
                    NotificationType.ORDER_STATUS,
                    NotificationPriority.NORMAL,
                    cancelled.getId(),
                    String.format("ORDER_CANCELLED:%d", cancelled.getId())
            ));
        } catch (Exception ignored) {}

        return OrderResponse.fromEntity(cancelled);
    }
}
