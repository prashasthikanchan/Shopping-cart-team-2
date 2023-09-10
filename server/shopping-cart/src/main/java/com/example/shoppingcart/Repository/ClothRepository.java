package com.example.Project.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Project.Model.Cloth;

public interface ClothRepository extends MongoRepository<Cloth, String>{

}
