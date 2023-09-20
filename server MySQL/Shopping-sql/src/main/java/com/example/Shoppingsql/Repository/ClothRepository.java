package com.example.Shoppingsql.Repository;
	
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoppingsql.Model.Cloth;

public interface ClothRepository extends JpaRepository<Cloth, Integer>{
	

}
