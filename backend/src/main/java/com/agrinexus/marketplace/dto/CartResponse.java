package com.agrinexus.marketplace.dto;

import com.agrinexus.marketplace.entity.Cart;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CartResponse {

    private Long id;
    private List<CartItemResponse> items = new ArrayList<>();
    private BigDecimal subtotal = BigDecimal.ZERO;
    private Integer itemCount = 0;

    public CartResponse() {
    }

    public CartResponse(Long id, List<CartItemResponse> items, BigDecimal subtotal, Integer itemCount) {
        this.id = id;
        this.items = items != null ? items : new ArrayList<>();
        this.subtotal = subtotal != null ? subtotal : BigDecimal.ZERO;
        this.itemCount = itemCount != null ? itemCount : 0;
    }

    public static CartResponse fromEntity(Cart cart) {
        if (cart == null) return new CartResponse(null, List.of(), BigDecimal.ZERO, 0);

        List<CartItemResponse> itemResponses = cart.getItems().stream()
                .map(CartItemResponse::fromEntity)
                .collect(Collectors.toList());

        BigDecimal subtotal = itemResponses.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalCount = itemResponses.stream()
                .mapToInt(CartItemResponse::getQuantity)
                .sum();

        return new CartResponse(cart.getId(), itemResponses, subtotal, totalCount);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public List<CartItemResponse> getItems() { return items; }
    public void setItems(List<CartItemResponse> items) { this.items = items; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public Integer getItemCount() { return itemCount; }
    public void setItemCount(Integer itemCount) { this.itemCount = itemCount; }
}
