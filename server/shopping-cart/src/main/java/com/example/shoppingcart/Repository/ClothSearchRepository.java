package com.example.shoppingcart.Repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.example.shoppingcart.Model.ClothSearch;

public interface ClothSearchRepository extends ElasticsearchRepository<ClothSearch, Integer> {


}
