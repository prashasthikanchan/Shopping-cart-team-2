package com.example.shoppingcart.Mysql.Repository;

import org.springframework.context.annotation.Profile;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.example.shoppingcart.Mysql.Model.ClothSearch;

@Profile("mysql")
public interface ClothSearchRepository extends ElasticsearchRepository<ClothSearch, Integer> {


}
