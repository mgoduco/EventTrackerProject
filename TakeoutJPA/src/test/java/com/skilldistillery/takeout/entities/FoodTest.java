package com.skilldistillery.takeout.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class FoodTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Food food;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("TakeoutJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		food = em.find(Food.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		food = null;
	}

	@Test
	@DisplayName("Testing basic mappings")
	void test1() {
		assertNotNull(food);
		assertEquals("Japanese", food.getName());
		assertEquals(04, food.getPurchaseDate().getDayOfMonth());
		assertEquals("Dragon Roll, Salmon Nigiri", food.getDescription());
		assertEquals(22.87, food.getPrice());
		assertEquals(5, food.getRating());
		
	}
}
