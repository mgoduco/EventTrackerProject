# EventTrackerProject

## Description
Added Angular functionality and asynchronous requests to a server using http. Added JavaScript functionality and added asynchronous requests to Java controllers with JavaScript's XMLHttpRequest. This application is a simple event tracker which tracks spending on takeout. The user can view all previous takeout orders, individual orders, orders based on keyword of name, and orders between a certain price range. The user can also create, update, and delete orders.

## REST Endpoints
| Return Type        | Route           | Functionality  |
| ------------- |-------------| -----|
| `List<Food>`     | `GET api/food` | Gets all food (takeout orders)|
| `Food`      | `GET api/food/{id}`      |   Gets a specific food (takeout order)|
| `Food` | `POST api/food`      |    Creates a food (takeout order) |
| `Food` | `PUT api/food/{id}`      |    Updates a food (takeout order)|
| `void` | `DELETE api/food/{id}`      |    Deletes a food (takeout order) |
| `List<Food>` | `GET api/food/search/{keyword}`      |    Gets all food (takeout orders) based on search keyword |
| `List<Food>` | `GET api/food/search/{low}/{high}`      |    Gets all food (takeout orders) based on search low and high price |

## Lessons Learned
- Handling ambiguous handler methods mapped in REST application with Spring
- Fixing repeated server issues with port

## Technologies Used
- Angular
- Java
- JavaScript
- Spring REST
- Postman
- MySQLWorkbench
- MySQL
- Gradle
- Unix Terminal
- Git and Github
- StackOverflow

## EER Diagram
<img src="DB/takeoutdb.png" alt="DB Schema"/>
