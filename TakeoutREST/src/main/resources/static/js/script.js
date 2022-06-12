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
				//TODO SHOW ERRORS
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
		tr.addEventListener('click', showFoodDetails);
	}
}

function deleteFood(food) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/food/${food.id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				console.log('Deleted food');
			} else {
				console.log('Error deleting food: ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify(food));
}

function updateFood(food) {
	let tbody = document.getElementById('foodTable')
	tbody.textContent = '';
	let updateFoodForm = document.createElement('form');
	updateFoodForm.setAttribute('name', 'updateFoodForm');
	let div = document.getElementById('tableFormDiv');

	let foodName = document.createElement('label');
	foodName.textContent = "Food Name: "
	let foodNameInput = document.createElement('input');
	foodNameInput.setAttribute('name', 'foodName');
	foodNameInput.setAttribute('value', food.name);
	updateFoodForm.appendChild(foodName);
	updateFoodForm.appendChild(foodNameInput);
	updateFoodForm.appendChild(document.createElement('br'));

	let button = document.createElement('button');
	button.textContent = "Update";
	button.setAttribute('id', 'updateFood');
	button.addEventListener('click', function(e) {
		e.preventDefault();

		let updateFood = {
			name: form.name.value,
			description: form.description.value,
			price: form.price.value,
			purchaseDate: form.purchaseDate.value,
			rating: form.rating.value
		};
		sendUpdateFood(updateFood);
		updateFoodForm.textContent = '';
	});
	updateFoodForm.appendChild(button);
	div.appendChild(updateFoodForm);

}

function getFood(foodId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/food/${foodId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 && xhr.responseText) {
				let food = JSON.parse(xhr.responseText);
				showFoodDetails(food);
			}
			else {
				displayError('Film not found.')
			}
		}
	};
	xhr.send();
}

function displayError(message) {
	let dataDiv = document.getElementById('foodData');
	dataDiv.textContent = message;
}

function showFoodDetails(food) {
	let tbody = document.getElementById('foodTable');
	tbody.textContent = '';
	let fname = document.createElement('p');
	let fdescription = document.createElement('p');
	let fprice = document.createElement('p');
	let fdate = document.createElement('p');
	let frating = document.createElement('p');
	fname.textContent = "Takeout Order: " + food.name;
	fdescription.textContent = "Description: " + food.description;
	fprice.textContent = "Price ($): " + food.price;
	fdate.textContent = "Date Purchased: " + food.date;
	frating.textContent = "Rating: " + food.rating;

	let tr = document.createElement('tr');
	tbody.appendChild(tr);
	let td = document.createElement('td');
	td.appendChild(fname);
	td.appendChild(document.createElement('td'));
	td.appendChild(fdescription);
	td.appendChild(document.createElement('td'));
	td.appendChild(fprice);
	td.appendChild(document.createElement('td'));
	td.appendChild(fdate);
	td.appendChild(document.createElement('td'));
	td.appendChild(frating);
	td.appendChild(document.createElement('td'));

	let update = document.createElement('button');
	update.textContent = 'Update';
	let remove = document.createElement('button');
	remove.textContent = 'Delete';
	update.addEventListener('click', function(e) {
		updateFood(food);
	});
	remove.addEventListener('click', function(e) {
		deleteFood(food);
	});
	tbody.appendChild(update);
	tbody.appendChild(remove);

}