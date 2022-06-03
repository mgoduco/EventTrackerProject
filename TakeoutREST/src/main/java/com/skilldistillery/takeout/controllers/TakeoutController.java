package com.skilldistillery.takeout.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.takeout.entities.Food;
import com.skilldistillery.takeout.services.TakeoutService;

@RestController
@RequestMapping("api")
public class TakeoutController {
	
	@Autowired
	private TakeoutService service;
	
	@GetMapping("food")
	public List<Food> index( HttpServletResponse res) {
		List<Food> foods = service.index();
		res.setStatus(200);
		return foods;
	}
}
