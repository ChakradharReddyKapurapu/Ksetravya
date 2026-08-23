package com.agrinexus.marketplace.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.DuplicateResourceException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.marketplace.dto.CartItemRequest;
import com.agrinexus.marketplace.dto.CartItemUpdateRequest;
import com.agrinexus.marketplace.dto.CartResponse;
import com.agrinexus.marketplace.entity.Cart;
import com.agrinexus.marketplace.entity.CartItem;
import com.agrinexus.marketplace.entity.Product;
import com.agrinexus.marketplace.entity.ProductStatus;
import com.agrinexus.marketplace.repository.CartItemRepository;
import com.agrinexus.marketplace.repository.CartRepository;
import com.agrinexus.marketplace.repository.ProductRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Cart getOrCreateCart(String userEmail) {
        User user = userRepository.findByEmail(userEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(new Cart(user)));
    }

    @Transactional(readOnly = true)
    public CartResponse getCart(String userEmail) {
        User user = userRepository.findByEmail(userEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElse(null);

        return CartResponse.fromEntity(cart);
    }

    @Transactional
    public CartResponse addItem(String userEmail, CartItemRequest request) {
        Cart cart = getOrCreateCart(userEmail);

        Product product = productRepository.findByIdAndActiveTrue(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + request.getProductId()));

        if (product.getAvailabilityStatus() != ProductStatus.ACTIVE || product.getStockQuantity() <= 0) {
            throw new BadRequestException("Product " + product.getName() + " is currently out of stock.");
        }

        Optional<CartItem> existingItemOpt = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId());
        if (existingItemOpt.isPresent()) {
            CartItem existing = existingItemOpt.get();
            int newQuantity = existing.getQuantity() + request.getQuantity();
            if (newQuantity > product.getStockQuantity()) {
                throw new DuplicateResourceException("Requested quantity (" + newQuantity + ") exceeds available stock (" + product.getStockQuantity() + ") for " + product.getName());
            }
            existing.setQuantity(newQuantity);
            cartItemRepository.save(existing);
        } else {
            if (request.getQuantity() > product.getStockQuantity()) {
                throw new DuplicateResourceException("Requested quantity (" + request.getQuantity() + ") exceeds available stock (" + product.getStockQuantity() + ") for " + product.getName());
            }
            CartItem newItem = new CartItem(cart, product, request.getQuantity());
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }

        return CartResponse.fromEntity(cart);
    }

    @Transactional
    public CartResponse updateItemQuantity(String userEmail, Long itemId, CartItemUpdateRequest request) {
        Cart cart = getOrCreateCart(userEmail);

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with ID: " + itemId));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new AccessDeniedException("You do not have access to this cart item.");
        }

        Product product = item.getProduct();
        if (request.getQuantity() > product.getStockQuantity()) {
            throw new DuplicateResourceException("Requested quantity (" + request.getQuantity() + ") exceeds available stock (" + product.getStockQuantity() + ") for " + product.getName());
        }

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);

        return CartResponse.fromEntity(cart);
    }

    @Transactional
    public CartResponse removeItem(String userEmail, Long itemId) {
        Cart cart = getOrCreateCart(userEmail);

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with ID: " + itemId));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new AccessDeniedException("You do not have access to this cart item.");
        }

        cart.getItems().remove(item);
        cartItemRepository.delete(item);

        return CartResponse.fromEntity(cart);
    }

    @Transactional
    public void clearCart(String userEmail) {
        Cart cart = getOrCreateCart(userEmail);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
