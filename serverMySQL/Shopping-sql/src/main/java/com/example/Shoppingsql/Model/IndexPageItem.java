//package com.example.Shoppingsql.Model;
//
//import java.util.List;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "index_page_item")
//public class IndexPageItem {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//
//	@OneToMany(cascade = CascadeType.ALL)
//	@JsonIgnore
//	@JoinColumn(name = "index_page_item_id")
//	private List<Brand> brands;
//
//	@OneToMany(cascade = CascadeType.ALL)
//	@JsonIgnore
//	@JoinColumn(name = "index_page_item_id")
//	private List<Category> categories;
//
//	@OneToMany(cascade = CascadeType.ALL)
//	@JsonIgnore
//	@JoinColumn(name = "index_page_item_id")
//	private List<Gender> gender;
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public List<Brand> getBrands() {
//		return brands;
//	}
//
//	public void setBrands(List<Brand> brands) {
//		this.brands = brands;
//	}
//
//	public List<Category> getCategories() {
//		return categories;
//	}
//
//	public void setCategories(List<Category> categories) {
//		this.categories = categories;
//	}
//
//	public List<Gender> getGender() {
//		return gender;
//	}
//
//	public void setGender(List<Gender> gender) {
//		this.gender = gender;
//	}
//
//	public IndexPageItem(Long id, List<Brand> brands, List<Category> categories, List<Gender> gender) {
//		super();
//		this.id = id;
//		this.brands = brands;
//		this.categories = categories;
//		this.gender = gender;
//	}
//
//	public IndexPageItem() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//
//}
