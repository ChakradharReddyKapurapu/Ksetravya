package com.agrinexus.marketplace.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.marketplace.dto.CartItemRequest;
import com.agrinexus.marketplace.dto.CartItemUpdateRequest;
import com.agrinexus.marketplace.dto.CartResponse;
import com.agrinexus.marketplace.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/marketplace/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        CartResponse response = cartService.getCart(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Shopping cart retrieved", response));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CartItemRequest request) {
        CartResponse response = cartService.addItem(userPrincipal.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Item added to shopping cart", response));
    }

    @PatchMapping("/items/{itemId:[0-9]+}")
    public ResponseEntity<ApiResponse<CartResponse>> updateItemQuantity(
            @PathVariable Long itemId,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CartItemUpdateRequest request) {
        CartResponse response = cartService.updateItemQuantity(userPrincipal.getUsername(), itemId, request);
        return ResponseEntity.ok(ApiResponse.success("Cart item quantity updated", response));
    }

    @DeleteMapping("/items/{itemId:[0-9]+}")
    public ResponseEntity<ApiResponse<CartResponse>> removeItem(
            @PathVariable Long itemId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        CartResponse response = cartService.removeItem(userPrincipal.getUsername(), itemId);
        return ResponseEntity.ok(ApiResponse.success("Item removed from cart", response));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        cartService.clearCart(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Shopping cart cleared", null));
    }
}
