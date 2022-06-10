package com.skilldistillery.takeout.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.skilldistillery.takeout.entities.Food;


public interface TakeoutService {

	List<Food> index();
	
	Optional<Food> getById(Integer foodId);
	
	Food create(Food food);
	
	Food update(Food food, Integer foodId);
	
	boolean delete(Integer foodId);
	
	List<Food> getFoodByName(String keyword);
	
	List<Food> getFoodWithinPriceRange(double low, double high);
	
	List<Food> getFoodWithinPurchaseDate(LocalDate past, LocalDate present);

	List<Food> getFoodByRating(Integer rating);
}
