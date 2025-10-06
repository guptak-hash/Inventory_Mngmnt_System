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

## Stock Management Endpoints

| Method | Endpoint                       | Description                 | Request Body |
|--------|--------------------------------|-----------------------------|--------------|
| PATCH  | `/product/:id/increase-stock`  | Increase stock quantity     | `{ quantity }`(optional, defaults to 1) |
| PATCH  | `/product/:id/decrease-stock`  | Decrease stock quantity     | `{ quantity }`(optional, defaults to 1) |
| GET    | `/product/low-stock`           | Get products below threshold | - |
