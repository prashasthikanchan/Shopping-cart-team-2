package com.example.shoppingcart.MongoDb.Repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.example.shoppingcart.MongoDb.Model.ClothSearch;

public interface ClothSearchRepository extends ElasticsearchRepository<ClothSearch, Integer> {

}
