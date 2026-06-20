package org.yearup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ECommerceApplication {
    public static void main(String[] args) {
        String bannerResource = "classpath:banner-clothingstore.txt";
        System.setProperty("spring.banner.location", bannerResource);

        SpringApplication.run(ECommerceApplication.class, args);
    }

}
