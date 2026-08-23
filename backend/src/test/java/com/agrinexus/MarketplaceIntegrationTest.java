package com.agrinexus;

import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.marketplace.dto.*;
import com.agrinexus.marketplace.entity.OrderStatus;
import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;
import com.agrinexus.marketplace.repository.*;
import com.agrinexus.user.Role;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class MarketplaceIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private String sellerToken;
    private String buyerToken;
    private String otherSellerToken;
    private String adminToken;

    private static final String SELLER_EMAIL = "seller.rajesh@example.com";
    private static final String BUYER_EMAIL = "buyer.farmer@example.com";
    private static final String OTHER_SELLER_EMAIL = "seller.other@example.com";
    private static final String ADMIN_EMAIL = "market.admin@agrinexus.com";
    private static final String PASSWORD = "Password123!";

    @BeforeEach
    void setUp() throws Exception {
        orderItemRepository.deleteAll();
        orderRepository.deleteAll();
        cartItemRepository.deleteAll();
        cartRepository.deleteAll();
        productRepository.deleteAll();

        userRepository.findByEmail(SELLER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(BUYER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(OTHER_SELLER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(ADMIN_EMAIL).ifPresent(userRepository::delete);

        // 1. Register Seller
        RegisterRequest sellerReg = new RegisterRequest("Rajesh", "Guntur", SELLER_EMAIL, PASSWORD, "9848011222");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sellerReg)))
                .andExpect(status().isCreated());
        sellerToken = loginAndGetToken(SELLER_EMAIL);

        // 2. Register Buyer
        RegisterRequest buyerReg = new RegisterRequest("Ramesh", "Farmer", BUYER_EMAIL, PASSWORD, "9848033444");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buyerReg)))
                .andExpect(status().isCreated());
        buyerToken = loginAndGetToken(BUYER_EMAIL);

        // 3. Register Other Seller
        RegisterRequest otherSellerReg = new RegisterRequest("Balaji", "Nellore", OTHER_SELLER_EMAIL, PASSWORD, "9848055666");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(otherSellerReg)))
                .andExpect(status().isCreated());
        otherSellerToken = loginAndGetToken(OTHER_SELLER_EMAIL);

        // 4. Create Admin User
        User admin = User.builder()
                .firstName("Market")
                .lastName("Admin")
                .email(ADMIN_EMAIL)
                .password(passwordEncoder.encode(PASSWORD))
                .role(Role.ADMIN)
                .phone("9999900000")
                .enabled(true)
                .build();
        userRepository.save(admin);
        adminToken = loginAndGetToken(ADMIN_EMAIL);
    }

    private String loginAndGetToken(String email) throws Exception {
        LoginRequest login = new LoginRequest(email, PASSWORD);
        MvcResult res = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andReturn();
        return objectMapper.readTree(res.getResponse().getContentAsString()).get("data").get("token").asText();
    }

    private Long createSampleProduct(String token, String name, ProductCategory category, BigDecimal price, int stock, String district) throws Exception {
        ProductCreateRequest req = new ProductCreateRequest(
                name,
                "Quality tested agricultural commodity direct from verified grower.",
                category,
                "Special Grade",
                "Andhra Gold",
                price,
                "KG",
                stock,
                ProductStatus.ACTIVE,
                "APMC Market Yard",
                district,
                "Andhra Pradesh",
                "https://images.unsplash.com/photo-market"
        );

        MvcResult res = mockMvc.perform(post("/api/marketplace/products")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andReturn();

        return objectMapper.readTree(res.getResponse().getContentAsString()).get("data").get("id").asLong();
    }

    @Test
    @DisplayName("1. Product Creation, Public Browsing, Filtering and Search")
    void testProductCreationAndCatalog() throws Exception {
        Long p1 = createSampleProduct(sellerToken, "Organic Groundnut Pods", ProductCategory.SEEDS, new BigDecimal("120.00"), 50, "Tirupati");
        Long p2 = createSampleProduct(sellerToken, "Sona Masoori Paddy Bag", ProductCategory.GRAINS, new BigDecimal("2200.00"), 20, "Nellore");
        Long p3 = createSampleProduct(otherSellerToken, "Drip Irrigation Pipe Roll", ProductCategory.IRRIGATION, new BigDecimal("850.00"), 15, "Guntur");

        // Public Catalog
        mockMvc.perform(get("/api/marketplace/products")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(3));

        // Category Filter
        mockMvc.perform(get("/api/marketplace/products")
                        .param("category", "SEEDS"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.content[0].name").value("Organic Groundnut Pods"));

        // Price Filter (min 500, max 1000)
        mockMvc.perform(get("/api/marketplace/products")
                        .param("minPrice", "500")
                        .param("maxPrice", "1000"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.content[0].name").value("Drip Irrigation Pipe Roll"));

        // Search
        mockMvc.perform(get("/api/marketplace/products/search")
                        .param("query", "Groundnut"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].name").value("Organic Groundnut Pods"));

        // Sorting priceAsc
        mockMvc.perform(get("/api/marketplace/products")
                        .param("sort", "priceAsc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].price").value(120.00));
    }

    @Test
    @DisplayName("2. Seller Ownership, Update and Authorization Protections")
    void testProductOwnershipAndUpdates() throws Exception {
        Long productId = createSampleProduct(sellerToken, "Red Chilli Stemless", ProductCategory.VEGETABLES, new BigDecimal("190.00"), 40, "Guntur");

        // Seller views own products
        mockMvc.perform(get("/api/marketplace/products/my")
                        .header("Authorization", "Bearer " + sellerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id").value(productId));

        // Other seller attempts to update -> 403 Forbidden
        ProductUpdateRequest updateReq = new ProductUpdateRequest();
        updateReq.setPrice(new BigDecimal("150.00"));
        mockMvc.perform(patch("/api/marketplace/products/" + productId)
                        .header("Authorization", "Bearer " + otherSellerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isForbidden());

        // Actual owner updates product price
        mockMvc.perform(patch("/api/marketplace/products/" + productId)
                        .header("Authorization", "Bearer " + sellerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.price").value(150.00));
    }

    @Test
    @DisplayName("3. Cart Management, Server Price Integrity and Stock Revalidation")
    void testCartOperationsAndStockValidation() throws Exception {
        Long productId = createSampleProduct(sellerToken, "Neem Cake Bio Fertilizer", ProductCategory.FERTILIZERS, new BigDecimal("350.00"), 10, "Kurnool");

        // Add 3 items to cart
        CartItemRequest itemReq = new CartItemRequest(productId, 3);
        mockMvc.perform(post("/api/marketplace/cart/items")
                        .header("Authorization", "Bearer " + buyerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(itemReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.itemCount").value(3))
                .andExpect(jsonPath("$.data.subtotal").value(1050.00));

        // Add excessive quantity exceeding stock (available 10, adding 9 more = 12 total) -> 409 Conflict
        CartItemRequest excessiveReq = new CartItemRequest(productId, 9);
        mockMvc.perform(post("/api/marketplace/cart/items")
                        .header("Authorization", "Bearer " + buyerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(excessiveReq)))
                .andExpect(status().isConflict());

        // View Cart
        mockMvc.perform(get("/api/marketplace/cart")
                        .header("Authorization", "Bearer " + buyerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.itemCount").value(3))
                .andExpect(jsonPath("$.data.subtotal").value(1050.00));
    }

    @Test
    @DisplayName("4. Order Checkout, Stock Reduction, Cart Clearing and Snapshots")
    void testOrderCheckoutAndHistoricalIntegrity() throws Exception {
        Long p1 = createSampleProduct(sellerToken, "Certified Paddy Seed 50kg", ProductCategory.SEEDS, new BigDecimal("1500.00"), 10, "Tenali");

        // Buyer adds 2 units to cart
        mockMvc.perform(post("/api/marketplace/cart/items")
                        .header("Authorization", "Bearer " + buyerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CartItemRequest(p1, 2))))
                .andExpect(status().isCreated());

        // Checkout
        OrderCreateRequest orderReq = new OrderCreateRequest(
                "Tenali Rural, Guntur District, Andhra Pradesh - 522201",
                "9848033444",
                "Deliver after morning harvest"
        );

        MvcResult orderRes = mockMvc.perform(post("/api/marketplace/orders")
                        .header("Authorization", "Bearer " + buyerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andExpect(jsonPath("$.data.totalAmount").value(3000.00))
                .andExpect(jsonPath("$.data.items[0].productName").value("Certified Paddy Seed 50kg"))
                .andExpect(jsonPath("$.data.items[0].price").value(1500.00))
                .andExpect(jsonPath("$.data.items[0].quantity").value(2))
                .andExpect(jsonPath("$.data.items[0].subtotal").value(3000.00))
                .andReturn();

        Long orderId = objectMapper.readTree(orderRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // 1. Verify Cart is cleared
        mockMvc.perform(get("/api/marketplace/cart")
                        .header("Authorization", "Bearer " + buyerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.itemCount").value(0))
                .andExpect(jsonPath("$.data.subtotal").value(0));

        // 2. Verify Product Stock is reduced from 10 to 8
        mockMvc.perform(get("/api/marketplace/products/" + p1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.stockQuantity").value(8));

        // 3. Seller modifies product price to 2000.00
        ProductUpdateRequest priceChange = new ProductUpdateRequest();
        priceChange.setPrice(new BigDecimal("2000.00"));
        priceChange.setName("Modified Price Seed");
        mockMvc.perform(patch("/api/marketplace/products/" + p1)
                        .header("Authorization", "Bearer " + sellerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(priceChange)))
                .andExpect(status().isOk());

        // 4. Verify Historical Order preserves original snapshot values (1500.00, subtotal 3000.00)
        mockMvc.perform(get("/api/marketplace/orders/" + orderId)
                        .header("Authorization", "Bearer " + buyerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalAmount").value(3000.00))
                .andExpect(jsonPath("$.data.items[0].productName").value("Certified Paddy Seed 50kg"))
                .andExpect(jsonPath("$.data.items[0].price").value(1500.00));

        // 5. Seller views incoming order
        mockMvc.perform(get("/api/marketplace/orders/seller")
                        .header("Authorization", "Bearer " + sellerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id").value(orderId));
    }

    @Test
    @DisplayName("5. Order Cancellation and Inventory Stock Restoration")
    void testOrderCancellationAndStockRestoration() throws Exception {
        Long p1 = createSampleProduct(sellerToken, "Groundnut Harvester Attachment", ProductCategory.TOOLS, new BigDecimal("4500.00"), 5, "Anantapur");

        // Buyer orders 2 units
        mockMvc.perform(post("/api/marketplace/cart/items")
                        .header("Authorization", "Bearer " + buyerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CartItemRequest(p1, 2))))
                .andExpect(status().isCreated());

        OrderCreateRequest orderReq = new OrderCreateRequest("Anantapur Main Road", "9848033444", "Urgent tool needed");
        MvcResult orderRes = mockMvc.perform(post("/api/marketplace/orders")
                        .header("Authorization", "Bearer " + buyerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long orderId = objectMapper.readTree(orderRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Product stock reduced to 3
        mockMvc.perform(get("/api/marketplace/products/" + p1))
                .andExpect(jsonPath("$.data.stockQuantity").value(3));

        // Buyer cancels order
        mockMvc.perform(patch("/api/marketplace/orders/" + orderId + "/cancel")
                        .header("Authorization", "Bearer " + buyerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("CANCELLED"));

        // Product stock restored to 5
        mockMvc.perform(get("/api/marketplace/products/" + p1))
                .andExpect(jsonPath("$.data.stockQuantity").value(5));
    }
}
