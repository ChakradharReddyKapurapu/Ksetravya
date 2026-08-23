package com.agrinexus.marketplace.dto;

import com.agrinexus.user.Role;
import com.agrinexus.user.User;

public class ProductSellerSummary {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private Role role;

    public ProductSellerSummary() {
    }

    public ProductSellerSummary(Long id, String fullName, String email, String phone, Role role) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }

    public static ProductSellerSummary fromEntity(User user) {
        if (user == null) return null;
        return new ProductSellerSummary(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
