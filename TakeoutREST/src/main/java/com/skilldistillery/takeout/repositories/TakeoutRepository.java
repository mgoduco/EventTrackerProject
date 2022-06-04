package com.skilldistillery.takeout.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.takeout.entities.Food;

public interface TakeoutRepository extends JpaRepository<Food, Integer> {

	List<Food> findByName(@Param("keyword") String keyword);

	List<Food> findByPriceBetween(double low, double high);

	
	
	List<Food> findByPurchaseDateBetween(LocalDate past, LocalDate present);
}
