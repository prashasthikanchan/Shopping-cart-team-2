package com.example.Shoppingsql.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Shoppingsql.Model.IndexPageItem;

public interface IndexPageRepository extends JpaRepository<IndexPageItem, Long> {
}
