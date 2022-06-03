package com.skilldistillery.takeout.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.takeout.entities.Food;

public interface TakeoutRepository extends JpaRepository<Food, Integer>{

}
