package com.example.Project.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Project.Model.IndexPageItem;

public interface IndexPageRepository extends MongoRepository<IndexPageItem, String>{

}
