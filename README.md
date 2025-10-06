# Inventory Management System API
A robust backend API for managing products and inventory in a warehouse environment. Built with Node.js, Express, and MongoDB.


## Core Features
1. Product Management: Full CRUD operations for products

2. Inventory Control: Stock quantity management with validation

3. Error Handling: Comprehensive error handling with appropriate HTTP status codes

4. Data Validation: Input validation and sanitization

## Bonus Features
1. Low Stock Alerts: Automatic detection of products below threshold

2. RESTful Design: Clean API endpoints following REST principles


## API Endpoints

### Product Management

| Method | Endpoint       | Description          | Request Body |
|--------|----------------|----------------------|--------------|
| POST   | `/product`     | Create a new product | `{ name, description,stock_quantity,low_stock_threshold }` |
| GET    | `/product`     | Get all products     | - |
| GET    | `/product/:id` | Get product by ID    | - |
| PATCH  | `/product/:id` | Update product       | `{ name, description,stock_quantity,low_stock_threshold }` |
| DELETE | `/product/:id` | Delete product       | - |


### Inventory Operations

| Method | Endpoint                       | Description                 | Request Body |
|--------|--------------------------------|-----------------------------|--------------|
| PATCH  | `/product/:id/increase-stock`  | Increase stock quantity     | `{ quantity }`(optional, defaults to 1) |
| PATCH  | `/product/:id/decrease-stock`  | Decrease stock quantity     | `{ quantity }`(optional, defaults to 1) |
| GET    | `/product/low-stock`           | Get products below threshold | - |


## Installation & Setup

1. Clone the Repository<br>
  git clone <repository-url><br>
  cd Inventory_Mngmnt_System<br>

2. Install Dependencies<br>
   npm install

3. Install Mongodb in local. 

4. Environment Configuration
  Create a .env file in the root directory:<br>
  PORT=3000<br>
  MONGO_URI=mongodb://localhost:27017<br>

5. Start the Server
   npm start


## Data Models
Product Schema

{<br>
  name: { type: String, required: true, unique: true },<br>
  description: { type: String, trim: true },<br>
  stock_quantity: { <br>
    type: Number, <br>
    required: true, <br>
    min: 0,<br>
    default: 0<br>
  },<br>
  low_stock_threshold: {<br>
    type: Number,<br>
    default: 10,<br>
    min: 0<br>
  },<br>
  createdAt: Date,<br>
  updatedAt: Date<br>
}<br>


## Project Structure

Inventory_Mngmnt_System/<br>
├── controllers/<br>
│   └── product.controller.js<br>
├── models/<br>
│   └── product.model.js<br>
├── routes/<br>
│   └── product.routes.js<br>
├── server.js<br>
├── package.json<br>
└── .env<br>


##  Business Logic Rules

1. Stock Validation: Stock quantity cannot go below zero

2. Unique Names: Product names must be unique

3. Positive Quantities: Stock operations require positive quantities

4. Low Stock Detection: Automatic monitoring of products below threshold

5. Atomic Operations: Stock updates are atomic to prevent race conditions