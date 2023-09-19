package com.example.shoppingcart.Model;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Document;

@Component
@Document(indexName = "cloths")
public class ClothSearch {
	@Id
	private int id;
	
	@Field(type = FieldType.Text)
	private String tag;
	
	@Field(type = FieldType.Text)
	private String combinedValues;
	
	
	public String getCombinedValues() {
		return combinedValues;
	}

	public void setCombinedValues(String combinedValues) {
		this.combinedValues = combinedValues;
	}

	@Field(type = FieldType.Keyword, fielddata=true)
    private String color;
    
    @Field(type = FieldType.Keyword, fielddata=true )
    private String brand;
    
    @Field(type = FieldType.Integer)
    private int price;
	
    @Field(type = FieldType.Keyword, fielddata=true )
	private String gender;
    
    @Field(type = FieldType.Keyword,fielddata=true )
	private String category;
    
    @Field(type = FieldType.Integer)
    private int rating;
    
    public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	@Field(type = FieldType.Integer)
    private int pincode;
    

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

}

