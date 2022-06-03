package com.skilldistillery.takeout.services;

import java.util.List;

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
	
	
}
