package com.example.Shoppingsql.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoppingsql.Model.Gender;

public interface GenderRepository extends JpaRepository<Gender, Long> {
}