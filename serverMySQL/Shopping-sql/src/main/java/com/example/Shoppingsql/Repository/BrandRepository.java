package com.example.Shoppingsql.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoppingsql.Model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
}
