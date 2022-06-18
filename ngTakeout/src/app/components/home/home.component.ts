import { FoodService } from './../../services/food.service';
import { Food } from './../../models/food';
import { Component, OnInit } from '@angular/core';
import { formatPercent, formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foodList: Food[] = [];
  newFood: Food = new Food();
  selected: Food | null = null;
  editFood: null | Food = null;

  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit(): void {
    this.reload();
  }

  displayFood(food: Food) {
    this.selected = food;
  }
  displayTable() {
    this.selected = null;
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

  updateFood(food: Food, setSelected: boolean = true): void {
    this.foodService.update(food).subscribe({
      next: (updated) => {
        this.reload();
        if (setSelected) {
          this.selected = updated; // back to detail view
        }
        this.selected = null; // back to list
        this.newFood = new Food();
      },
      error: (fail) => {
        console.error('FoodListComponent.updateFood: error updating food');
        console.error(fail);
      },
    });
  }
  deleteFood(id: number): void {
    this.foodService.delete(id).subscribe({
      next: () => {
        this.reload();
      },
    });
  }

  setEditFood() {
    this.editFood = Object.assign({}, this.selected);
  }

}
