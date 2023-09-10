package com.example.Project.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Project.Model.Cloth;
import com.example.Project.Model.IndexPageItem;
import com.example.Project.Repository.ClothRepository;
import com.example.Project.Repository.IndexPageRepository;

@RestController
@RequestMapping("/")
public class ClothController {
	
	@Autowired
	private ClothRepository clothRepository;
	@Autowired
	private IndexPageRepository indexPageRepository;
	
	@GetMapping("/clothingUrl")
	 public List<Cloth> getAllContacts() {
        return clothRepository.findAll();
    }
	
	@GetMapping("/indexPageItems")
	public List<IndexPageItem> getAllIndexPageItems() {
		return indexPageRepository.findAll();
	}
	
}
