package com.example.shoppingcart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;



@SpringBootApplication
@ComponentScan(basePackages = {"${app.base-package}"})
@EnableElasticsearchRepositories(basePackages = {"${app.base-package}"+".Repository"})
public class ShoppingCartApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ShoppingCartApplication.class, args);
		
	}
}
