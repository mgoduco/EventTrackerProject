package com.skilldistillery.takeout.controllers;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public List<Food> index(HttpServletResponse res) {
		List<Food> foods = service.index();
		res.setStatus(200);
		return foods;
	}

	@GetMapping("food/{id}")
	public Optional<Food> getById(@PathVariable Integer id, HttpServletResponse res) {
		Optional<Food> food = service.getById(id);
		if (!food.isPresent()) {
			res.setStatus(404);
			return null;
		}
		res.setStatus(200);
		return food;
	}

	@PostMapping("food")
	public Food create(@RequestBody Food food, HttpServletResponse res, HttpServletRequest req) {
		try {
			service.create(food);
			res.setStatus(201);
//			StringBuffer url = req.getRequestURL();
//			url.append("/").append(food.getId());

		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			food = null;
		}
		res.setStatus(201);
		return food;
	}

	@PutMapping("food/{id}")
	public Food update(@PathVariable Integer id, @RequestBody Food food, HttpServletResponse res) {
		try {
			service.update(food, id);
			res.setStatus(200);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(404);
		}
		return food;
	}

	@DeleteMapping("food/{id}")
	public void delete(@PathVariable Integer id, HttpServletResponse res) {
		if (service.delete(id)) {
			res.setStatus(200);
		} else {
			res.setStatus(404);
		}

	}

	@GetMapping("food/search/{keyword}")
	public List<Food> getByName(@PathVariable String keyword, HttpServletResponse res) {
		List<Food> foods = service.getFoodByName(keyword);
		System.out.println("====================" + foods + "====================");
		if (foods != null) {
			res.setStatus(200);
		} else {
			res.setStatus(404);
		}
		return foods;
	}

	@GetMapping("food/search/{low}/{high}")
	public List<Food> getFoodByPrice(@PathVariable double low, @PathVariable double high, HttpServletResponse res) {
		List<Food> foods = service.getFoodWithinPriceRange(low, high);
		if (foods != null) {
			res.setStatus(200);
		} else {
			res.setStatus(404);
		}
		return foods;
	}

//	@GetMapping("food/date/{past}/{present}")
//	public List<Food> getFoodByDate(@PathVariable LocalDate past, @PathVariable LocalDate present,
//			HttpServletResponse res) {
//		List<Food> foods = service.getFoodWithinPurchaseDate(past, present);
//		if (foods != null) {
//			res.setStatus(200);
//		} else {
//			res.setStatus(404);
//		}
//		return foods;
//
//	}

	@GetMapping("food/search/{rating}")
	public List<Food> getFoodByRating(@PathVariable Integer rating, HttpServletResponse res) {
		List<Food> foods = service.getFoodByRating(rating);
		System.out.println(foods);
		if (foods != null) {
			res.setStatus(200);
		} else {
			res.setStatus(404);
		}
		return foods;
	}

}
