package com.example.Shoppingsql.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoppingsql.Model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
