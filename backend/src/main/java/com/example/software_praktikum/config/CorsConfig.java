package com.example.software_praktikum.config;

import io.micrometer.common.lang.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                //erlaubt alle requests  wie /user /login etc
                registry.addMapping("/**")
                        // Frontend URL
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*")  // Erlaubt alle Methoden
                        .allowedHeaders("*"); // Erlaubt alle Header
            }
        };
    }
}