package com.example.shoppingcart.Service;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.elasticsearch.search.aggregations.bucket.range.RangeAggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import com.example.shoppingcart.Model.Cloth;
import com.example.shoppingcart.Model.ClothSearch;
import com.example.shoppingcart.Model.clothResult;
import com.example.shoppingcart.Repository.ClothRepository;
import com.example.shoppingcart.Repository.ClothSearchRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.aggregations.*;
import org.elasticsearch.search.builder.*;
import java.util.*;
import org.apache.http.HttpEntity;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import jakarta.json.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;


@Service
public class ClothingSearchService {

	@Autowired
	private ClothRepository clothRepository;

	@Autowired
	private ClothSearchRepository clothSearchRepository;

	private final RestHighLevelClient elasticsearchClient;
	
	private BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
	TermsAggregationBuilder colorsAgg,brandsAgg,categoriesAgg,gendersAgg;
	RangeAggregationBuilder pricesAgg, ratingsAgg ;

	Set<String> uniqueColors = new HashSet<>();
	Set<String> uniqueBrands = new HashSet<>();
	Set<String> uniqueCategories = new HashSet<>();
	Set<String> uniqueGender = new HashSet<>(Arrays.asList("men", "women"));

	public Set<String> getUniqueBrands() {
		return uniqueBrands;
	}

	public void setUniqueBrands(Set<String> uniqueBrands) {
		this.uniqueBrands = uniqueBrands;
	}

	public Set<String> getUniqueCategories() {
		return uniqueCategories;
	}

	public void setUniqueCategories(Set<String> uniqueCategories) {
		this.uniqueCategories = uniqueCategories;
	}

	public Set<String> getUniqueGender() {
		return uniqueGender;
	}

	public void setUniqueGender(Set<String> uniqueGender) {
		this.uniqueGender = uniqueGender;
	}

	public void setUniqueColors(Set<String> uniqueColors) {
		this.uniqueColors = uniqueColors;
	}

	public Set<String> getUniqueColors() {
		return uniqueColors;
	}

	public void Indexdata() {

		List<Cloth> cloths = clothRepository.findAll();
		uniqueColors = new HashSet<>();
		uniqueBrands = new HashSet<>();
		uniqueCategories = new HashSet<>();

		for (Cloth cloth : cloths) {
			ClothSearch clothSearch = new ClothSearch();
			clothSearch.setId(cloth.getId());
			clothSearch.setColor(cloth.getColor().toLowerCase());
			clothSearch.setBrand(cloth.getBrand().getName().toLowerCase());
			clothSearch.setCategory(cloth.getCategory().getName().toLowerCase());
			clothSearch.setGender(cloth.getGender().getName().toLowerCase());
			clothSearch.setRating(cloth.getRating());
			clothSearch.setPrice(cloth.getPrice());
			clothSearch.setTag(cloth.getTag().toLowerCase());
			clothSearch.setPincode(cloth.getPincode());
			clothSearchRepository.save(clothSearch);

			uniqueColors.add(cloth.getColor().toLowerCase());
			uniqueBrands.add(cloth.getBrand().getName().toLowerCase());
			uniqueCategories.add(cloth.getCategory().getName().toLowerCase());
			

		}
	}

	public ClothingSearchService(RestHighLevelClient elasticsearchClient) {
		this.elasticsearchClient = elasticsearchClient;
	}

	public String buildSearchQueryAndAggregationNoti(List<String> colors, List<String> brands, List<String> genders,
			List<String> categories, List<String> tags) {

		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
		boolQuery = QueryBuilders.boolQuery();
		if (colors != null && colors.size() > 0) {
			boolQuery.must(QueryBuilders.termsQuery("color", colors));
		}
		if (brands != null && brands.size() > 0) {
			boolQuery.must(QueryBuilders.termsQuery("brand", brands));
		}
		if (genders != null && genders.size() > 0) {
			boolQuery.must(QueryBuilders.termsQuery("gender", genders));
		}
		if (tags != null && tags.size() > 0) {
			boolQuery.must(QueryBuilders.termsQuery("tag", tags));
		}
		if (categories != null && categories.size() > 0) {
			boolQuery.must(QueryBuilders.termsQuery("category", categories));
		}

		sourceBuilder.query(boolQuery);
		colorsAgg = AggregationBuilders.terms("colors").field("color");
		brandsAgg = AggregationBuilders.terms("brands").field("brand");
		categoriesAgg = AggregationBuilders.terms("categories").field("category");
		gendersAgg = AggregationBuilders.terms("genders").field("gender");
		pricesAgg = AggregationBuilders.range("prices").field("price").addRange(0.0,1000.0)
				.addRange(1000.0, 2000.0).addRange(2000.0, 3000.0).addRange(3000.0, 4000.0).addRange(5000.0,10000.0);
		ratingsAgg = AggregationBuilders.range("ratings").field("rating").addRange(0, 1)
				.addRange(1, 2).addRange(2, 3).addRange(3, 4).addRange(4,5);

		sourceBuilder.aggregation(colorsAgg);
		sourceBuilder.aggregation(brandsAgg);
		sourceBuilder.aggregation(categoriesAgg);
		sourceBuilder.aggregation(gendersAgg);
		sourceBuilder.aggregation(pricesAgg);
		sourceBuilder.aggregation(ratingsAgg);
		return sourceBuilder.toString();
	}

	public String addPostFilter(String searchQueryAndAggregation, List<String> colors, List<String> brands,
			List<String> prices, List<String> genders, List<String> categories, List<String> ratings,
			RestHighLevelClient elasticsearchClient) {

		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
		sourceBuilder.query(boolQuery);

		BoolQueryBuilder postFilter = QueryBuilders.boolQuery();

		if (colors != null && !colors.isEmpty()) {
			postFilter.filter(QueryBuilders.termsQuery("color", colors));
		}
		if (brands != null && !brands.isEmpty()) {
			postFilter.filter(QueryBuilders.termsQuery("brand", brands));
		}
		if (genders != null && !genders.isEmpty()) {
			postFilter.filter(QueryBuilders.termsQuery("gender", genders));
		}
		if (categories != null && !categories.isEmpty()) {
			postFilter.filter(QueryBuilders.termsQuery("category", categories));
		}
		BoolQueryBuilder orFilter = QueryBuilders.boolQuery();
	    for (String priceBounds : prices) {
	        String[] priceRange = priceBounds.split("-");
	        if (priceRange.length == 2) {
	            String minPrice = priceRange[0];
	            String maxPrice = priceRange[1];
	            orFilter.should(QueryBuilders.rangeQuery("price").gte(minPrice).lte(maxPrice));
	        }
	    }
	    for (String ratingBounds : ratings) {
	        String[] ratingRange = ratingBounds.split("-");
	        if (ratingRange.length == 2) {
	            String minRating = ratingRange[0];
	            String maxRating = ratingRange[1];
	            orFilter.should(QueryBuilders.rangeQuery("rating").gte(minRating).lte(maxRating));
	        }
	    }
	    
	    postFilter.must(orFilter);
		
		sourceBuilder.aggregation(colorsAgg);
		sourceBuilder.aggregation(brandsAgg);
		sourceBuilder.aggregation(categoriesAgg);
		sourceBuilder.aggregation(gendersAgg);
		sourceBuilder.aggregation(pricesAgg);
		sourceBuilder.aggregation(ratingsAgg);

		sourceBuilder.postFilter(postFilter);
		return sourceBuilder.toString();
	}

   	public List<Object> performAggregation(String searchQueryAndAggregation, RestHighLevelClient elasticsearchClient) {
		Map<String, List<String>> aggregations = new HashMap<>();
		List<Object> finalSearch = new ArrayList<>();
		try {
			Request searchRequest = new Request("POST", "/cloths/_search");
			searchRequest.setJsonEntity(searchQueryAndAggregation);
			Response searchResponse = elasticsearchClient.getLowLevelClient().performRequest(searchRequest);

			HttpEntity searchEntity = searchResponse.getEntity();
			JsonObject searchAggResult = Json.createReader(searchEntity.getContent()).readObject();
			JsonObject hitsObject = searchAggResult.getJsonObject("hits");
			JsonArray hitsArray = hitsObject.getJsonArray("hits");
			List<clothResult> clothResults = new ArrayList<>();


			for (JsonObject hit : hitsArray.getValuesAs(JsonObject.class)) {
				  int clothId = Integer.parseInt(hit.getString("_id"));
				  Cloth cloth = clothRepository.findById(clothId).orElse(null);
				  if (cloth != null) {
					  clothResult result = new clothResult();
					  result.setId(cloth.getId());
					  result.setImage(cloth.getImage());
					  result.setColor(cloth.getColor().toLowerCase());
					  result.setBrand(cloth.getBrand().getName().toLowerCase());
					  result.setCategory(cloth.getCategory().getName().toLowerCase());
					  result.setGender(cloth.getGender().getName().toLowerCase());
					  result.setRating(cloth.getRating());
					  result.setPrice(cloth.getPrice());
					  result.setTag(cloth.getTag().toLowerCase());
					  result.setPincode(cloth.getPincode());
				    clothResults.add(result);
				  }
				}
			finalSearch.add(clothResults);
			List<String> colors = parseAggregationBucketsAll(searchAggResult, "colors");
			List<String> brands = parseAggregationBucketsAll(searchAggResult, "brands");
			List<String> categories = parseAggregationBucketsAll(searchAggResult, "categories");
			List<String> genders = parseAggregationBucketsAll(searchAggResult, "genders");
			List<String> ratings = parseAggregationBucketsAll(searchAggResult, "ratings");
			List<String> prices = parseAggregationBucketsAll(searchAggResult, "prices");

			aggregations.put("colors", colors);
			aggregations.put("brands", brands);
			aggregations.put("categories", categories);
			aggregations.put("genders", genders);
			aggregations.put("ratings", ratings);
			aggregations.put("prices", prices);
			finalSearch.add(aggregations);

		} catch (Exception e) {
			System.out.println("error" + e);
		}
		return finalSearch;

	}

	private List<String> parseAggregationBucketsAll(JsonObject aggregationResult, String aggregationName) {
		List<String> values = new ArrayList<>();
		JsonObject aggregations = aggregationResult.getJsonObject("aggregations");
		if (aggregations.containsKey(aggregationName)) {
			JsonObject aggregation = aggregations.getJsonObject(aggregationName);

			if (aggregation.containsKey("buckets")) {
				JsonArray termBuckets = aggregation.getJsonArray("buckets");
				for (int i = 0; i < termBuckets.size(); i++) {
					JsonObject bucket = termBuckets.getJsonObject(i);
					String key = bucket.getString("key");
					int docCount = bucket.getInt("doc_count");
					values.add("Key: " + key + ", Doc Count: " + docCount);
				}
			} else if (aggregation.containsKey("buckets_count")) {
				int bucketsCount = aggregation.getInt("buckets_count");
				values.add("Buckets Count: " + bucketsCount);
				JsonArray rangeBuckets = aggregation.getJsonArray("buckets");
				for (int i = 0; i < rangeBuckets.size(); i++) {
					JsonObject rangeBucket = rangeBuckets.getJsonObject(i);
					String key = rangeBucket.getString("key");
					int docCount = rangeBucket.getInt("doc_count");
					values.add("Range: " + key + ", Doc Count: " + docCount);
				}
			}
		}
		return values;
	}

}

