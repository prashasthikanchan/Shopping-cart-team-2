package com.example.shoppingcart.Model;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Component
@Document(collection = "index")
public class IndexPageItem {

  @Id
  private String id;

  private List<Brand> brands;
  private List<Category> categories;
  private List<Gender> gender;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public List<Brand> getBrands() {
    return brands;
  }

  public void setBrands(List<Brand> brands) {
    this.brands = brands;
  }

  public List<Category> getCategories() {
    return categories;
  }

  public void setCategories(List<Category> categories) {
    this.categories = categories;
  }

  public List<Gender> getGender() {
    return gender;
  }

  public void setGender(List<Gender> gender) {
    this.gender = gender;
  }
}

class Brand {

  private String name;
  private String image;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}

class Category {

  private String name;
  private String image;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}

class Gender {

  private String name;
  private String image;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}
