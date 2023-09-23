package com.example.Shoppingsql.Repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.example.Shoppingsql.Model.ClothSearch;

public interface ClothSearchRepository extends ElasticsearchRepository<ClothSearch, Integer> {


}
