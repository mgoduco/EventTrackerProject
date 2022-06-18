import { FoodService } from './../../services/food.service';
import { Food } from './../../models/food';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foodList: Food[] = [];
  newFood: Food = new Food();
  selected: Food | null = null;

  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.foodService.index().subscribe({
      next: (foods)=>{
        this.foodList = foods;
      },
      error: (fail)=> {
        console.error('FoodComponent.reload: error loading list');
        console.error(fail);
      }
    });
  }

  addFood(food: Food) {
    this.foodService.create(food).subscribe({
      next: (newFood) => {
        this.newFood = new Food();
        this.reload();
      },
      error: (fail) => {
        console.error('FoodListComponent.addFood: error adding food');
        console.error(fail);
      },
    });
  }

}
