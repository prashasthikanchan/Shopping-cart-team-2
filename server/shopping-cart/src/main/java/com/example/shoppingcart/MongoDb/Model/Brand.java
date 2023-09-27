package com.example.shoppingcart.MongoDb.Model;

import org.bson.types.ObjectId;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "brands")
@Profile("mongodb")
public class Brand {

	private ObjectId _id;

	public ObjectId getId() {
		return _id;
	}

	public void setId(ObjectId _id) {
		this._id = _id;
	}

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