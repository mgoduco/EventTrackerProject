window.addEventListener('load', function(evt) {
	console.log('script.js loaded');
	init();
});

function init() {
	console.log('In init()');
	loadFoodList();
	
	document.newFoodForm.addFoodButton.addEventListener('click', addNewFood);
}

function addNewFood(evt) {
	evt.preventDefault();
	let form = document.newFoodForm;
	let newFood = {
		name: form.name.value,
		description: form.description.value,
		price: form.price.value,
		purchaseDate: form.purchaseDate.value,
		rating: form.rating.value
	};
	sendNewFood(newFood);
}

function sendNewFood(newFood) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', `api/food`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let newFood = JSON.parse(xhr.responseText);
				loadFoodList();
			}
			else {
				console.log("Error creating food: " + xhr.status)
			}
		}
	};
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(newFood));
}

function deleteFood(food) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/food/${food.id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				console.log('Food deleted ' + xhr.status);
			} else {
				console.log('Error deleting food ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify(food));
}

function loadFoodList() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "api/food");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let food = JSON.parse(xhr.responseText);
				displayFoodList(food);
			}
			else {
				console.log("Error loading food: " + xhr.status)
			}
		}
	};
	xhr.send();
}

function displayFoodList(foodList) {
	let tbody = document.getElementById('foodRows');
	tbody.textContent = '';
	for (let food of foodList) {
		let tr = document.createElement('tr');
		tbody.appendChild(tr);
		let td = document.createElement('td');
		td.textContent = food.id;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = food.name;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = food.description;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = food.price;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = food.purchaseDate;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = food.rating;
		tr.appendChild(td);
		let update = document.createElement('button');
		update.textContent = 'Update';
		let remove = document.createElement('button');
		remove.textContent = 'Delete';
		update.addEventListener('click', function(e){
		updateFood(food);
		});
		remove.addEventListener('click', function(e){
		deleteFood(food);
		});
		table.appendChild(edit);
		table.appendChild(dele);
	
	}
	
}

function displayError(message) {
	let dataDiv = document.getElementById('foodData');
	dataDiv.textContent = message;
}

function showFoodDetails(evt) {
	evt.preventDefault();
	let row = evt.target;
	console.log(row);
	let foodId = row.parentElement.firstElementChild.textContent;
	console.log('Food stuff ' + foodId);
	
	let update = document.createElement('button');
	update.textContent = 'Update';
	let remove = document.createElement('button');
	remove.textContent = 'Delete';
	update.addEventListener('click', function(e){
		updateFood(food);
	});
	remove.addEventListener('click', function(e){
		deleteFood(food);
	});
	table.appendChild(edit);
	table.appendChild(dele);
	
}