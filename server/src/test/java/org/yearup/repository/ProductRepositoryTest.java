package org.yearup.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.yearup.model.Product;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ProductRepositoryTest {
    @Autowired
    private ProductRepository productRepository;

    @Test
    public void getById_shouldReturn_theCorrectProduct() {
        // arrange
        int productId = 1;

        // act
        Product actual = productRepository.findById(productId).orElse(null);
        System.out.println(actual.getProductId());
        System.out.println(actual.getName());
        System.out.println(actual.getPrice());

        // assert
        assertNotNull(actual, "Because product 1 should exist in the test database.");
        assertEquals(
                0,
                actual.getPrice().compareTo(new BigDecimal("89.99")),
                "Because I tried to get product 1 from the database."
        );
    }
}
