package com.example.Shoppingsql.Controller;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.Shoppingsql.Model.Cloth;
import com.example.Shoppingsql.Model.IndexPageItem;
import com.example.Shoppingsql.Repository.ClothRepository;
import com.example.Shoppingsql.Repository.IndexPageRepository;
//import com.example.Shoppingsql.Repository.IndexPageRepository;
import com.example.Shoppingsql.Service.ClothingSearchService;
import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5000")
public class ClothController {
	
	@Autowired
	private ClothRepository clothRepository;
	@Autowired
	private IndexPageRepository indexPageRepository;

	@Autowired
    private ClothingSearchService clothingSearchService;
	
	
	@Autowired
	private RestHighLevelClient elasticsearchClient;
	

//	@PostConstruct
//    public void initializeData() {
//        clothingSearchService.Indexdata();
//    }
	
	private String SearchQueryFinal;
	List<String> colors = new ArrayList<>();
	List<String> brands = new ArrayList<>();
	List<String> categories = new ArrayList<>();
    List<String> genders = new ArrayList<>();
	List<String> tags = new ArrayList<>();
	
	List<String> colorsFilter = new ArrayList<>();
	List<String> brandsFilter = new ArrayList<>();
	List<String> categoriesFilter = new ArrayList<>();
    List<String> gendersFilter = new ArrayList<>();
	List<String> priceFilter = new ArrayList<>();
	List<String> ratingFilter = new ArrayList<>();
	
	@GetMapping("/clothingUrl")
	 public List<Cloth> getAllContacts() {
		
        return clothRepository.findAll();	
    }
	
	@GetMapping("/indexPageItems")
	public List<IndexPageItem> getAllIndexPageItems() {
		return indexPageRepository.findAll();
	}

    @GetMapping("/search")
    public List<Object> searchq(@RequestParam("q") String query){
    	colors = new ArrayList<>();
    	brands = new ArrayList<>();
    	categories = new ArrayList<>();
        genders = new ArrayList<>();
    	tags = new ArrayList<>();
    	
    	String[] values = query.split(" ");
    	
    	for (String value : values) {
    		if (clothingSearchService.getUniqueColors().contains(value)) {
    			colors.add(value);
    	    } else if (clothingSearchService.getUniqueBrands().contains(value)) {
    	    	brands.add(value);
    	    } else if (clothingSearchService.getUniqueGender().contains(value)) {
    	    	genders.add(value);
    	    } else if (clothingSearchService.getUniqueCategories().contains(value)) {
    	        categories.add(value);
    	    } else {
    	    	tags.add(value);
    	    }
    	}
	    String searchQueryAndAggregation = clothingSearchService.buildSearchQueryAndAggregationNoti(colors,brands,genders,categories,tags);
	    SearchQueryFinal = searchQueryAndAggregation;
	    List<Object> finalSearch = clothingSearchService.performAggregation(searchQueryAndAggregation,elasticsearchClient);
        return finalSearch;
    }
    
    @GetMapping("/updateSearch")
    public List<Object> updateS(@RequestParam("q") String query, @RequestParam("f") String filter){
    	colorsFilter = new ArrayList<>();
    	brandsFilter = new ArrayList<>();
    	categoriesFilter = new ArrayList<>();
        gendersFilter = new ArrayList<>();
    	priceFilter = new ArrayList<>();
    	ratingFilter = new ArrayList<>();
    	
    	String[] values = query.split(" ");
    	String[] filters = filter.split("&");
    	
    	for (String value : values) {
    		if (clothingSearchService.getUniqueColors().contains(value)) {
    			colors.add(value);
    	    } else if (clothingSearchService.getUniqueBrands().contains(value)) {
    	    	brands.add(value);
    	    } else if (clothingSearchService.getUniqueGender().contains(value)) {
    	    	genders.add(value);
    	    } else if (clothingSearchService.getUniqueCategories().contains(value)) {
    	        categories.add(value);
    	    } else {
    	    	tags.add(value);
    	    }
    	}
    	
    	for (String f :filters) {
    		String[] keyValue = f.split("=");
            String key = keyValue[0];
            String value = keyValue[1];
            if ("Color".equals(key)) {
                colorsFilter.add(value);
            } else if ("Brand".equals(key)) {
                brandsFilter.add(value);
            }else if("Gender".equals(key)) {
            	gendersFilter.add(value);
            }else if("Category".equals(key)) {
            	categoriesFilter.add(value);
            }else if ("Price".equals(key)) {
                String[] priceBounds = value.split("-");
                if (priceBounds.length == 2) {
                    String minPrice = priceBounds[0];
                    String maxPrice = priceBounds[1];
                    priceFilter.add(minPrice + "-" + maxPrice);
                }
            } else if ("Rating".equals(key)) {
                String[] ratingBounds = value.split("-");
                if (ratingBounds.length == 2) {
                    String minRating = ratingBounds[0];
                    String maxRating = ratingBounds[1];
                    ratingFilter.add(minRating + "-" + maxRating);
                }   
    	}
    	}
    	String addPostFilterQuery = clothingSearchService.addPostFilter(SearchQueryFinal, colorsFilter, brandsFilter, priceFilter, gendersFilter, categoriesFilter, ratingFilter, elasticsearchClient);
	    List<Object> finalSearch = clothingSearchService.performAggregation(addPostFilterQuery,elasticsearchClient);
    	
        return finalSearch;
    
    }
    
    	
}
