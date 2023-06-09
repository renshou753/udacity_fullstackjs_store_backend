# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create [token required]: '/products' [POST]
- [OPTIONAL] Top 5 most popular products : '/products/popular' [GET]
- [OPTIONAL] Products by category (args: product category): '/products/category/:category' [GET]

#### Users

- Index [token required]: '/users' [GET]
- Show [token required]: '/users/:id' [GET]
- Create N[token required]: '/users' [POST]
- Authenticate N[token required]: '/users/login' [POST]

#### Orders

- Current Order by user (args: user id)[token required]: '/orders/current/users/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: '/orders/completed/users/:id' [GET]

## Data Shapes

#### product

- id (integer)
- name (varchar)
- price (decimal)
- category (integer) [foreign key to Category table]

#### user

- id (integer)
- first_name (varchar)
- last_name (varchar)
- password (varchar)

#### order

- id (integer)
- user_id (integer) [foreign key to Users table]
- status (varchar)

#### orderProducts

- id (primary key)
- order_id (integer) [foreign key referencing the orders table]
- product_id (integer) [foreign key referencing the products table]
- quantity (integer)

#### category

- id (integer)
- name (varchar)

## ERD

![](erd.png)
