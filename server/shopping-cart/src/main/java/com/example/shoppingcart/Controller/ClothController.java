package com.example.shoppingcart.Controller;

import com.example.shoppingcart.Model.Cloth;
import com.example.shoppingcart.Model.IndexPageItem;
import com.example.shoppingcart.Repository.ClothRepository;
import com.example.shoppingcart.Repository.IndexPageRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class ClothController {

  @Autowired
  private ClothRepository clothRepository;

  @Autowired
  private IndexPageRepository indexPageRepository;

  @GetMapping("/clothingUrl")
  public List<Cloth> getAllCloths() {
    return clothRepository.findAll();
  }

  @GetMapping("/indexPageItems")
  public List<IndexPageItem> getAllIndexPageItems() {
    return indexPageRepository.findAll();
  }
}
