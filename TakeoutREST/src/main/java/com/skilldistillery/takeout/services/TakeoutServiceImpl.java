package com.skilldistillery.takeout.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.takeout.entities.Food;
import com.skilldistillery.takeout.repositories.TakeoutRepository;

@Service
public class TakeoutServiceImpl implements TakeoutService {

	@Autowired
	private TakeoutRepository repo;

	@Override
	public List<Food> index() {
		return repo.findAll();
	}

	@Override
	public Optional<Food> getById(Integer foodId) {
		return repo.findById(foodId);
	}

	@Override
	public Food create(Food food) {
		return repo.saveAndFlush(food);
	}

	@Override
	public Food update(Food food, Integer foodId) {
		Optional<Food> updateFood = repo.findById(foodId);
		updateFood.get().setName(food.getName());
		updateFood.get().setDescription(food.getDescription());
		updateFood.get().setPurchaseDate(food.getPurchaseDate());
		updateFood.get().setPrice(food.getPrice());
		updateFood.get().setRating(food.getRating());
		food = repo.saveAndFlush(updateFood.get());
		return food;
	}

	@Override
	public boolean delete(Integer foodId) {
		boolean deleted = false;
		Optional<Food> existing = repo.findById(foodId);
		if (existing.isPresent()) {
			repo.delete(existing.get());
			deleted = true;
		}
		return deleted;
	}

	@Override
	public List<Food> getFoodByName(String keyword) {
		keyword = "%";
		return repo.findByName(keyword);
	}

	@Override
	public List<Food> getFoodWithinPriceRange(double low, double high) {
		return repo.findByPriceBetween(low, high);
	}

	@Override
	public List<Food> getFoodWithinPurchaseDate(LocalDate past, LocalDate present) {
		return repo.findByPurchaseDateBetween(past, present);
	}

}
