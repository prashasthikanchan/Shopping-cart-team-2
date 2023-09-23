package com.example.Shoppingsql.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoppingsql.Model.User;

public interface UserRepository extends JpaRepository<User, String> {

	public Optional<User> findByEmail(String email);
}