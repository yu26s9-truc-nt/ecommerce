/*  INSERT Users  */
INSERT INTO users (username, hashed_password, role)
VALUES  ('user','$2a$10$NkufUPF3V8dEPSZeo1fzHe9ScBu.LOay9S3N32M84yuUM2OJYEJ/.','USER'),
        ('admin','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ADMIN'),
        ('george','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','USER');

/* INSERT Profiles */
INSERT INTO profiles (user_id, first_name, last_name, phone, email, address, city, state, zip)
VALUES  (1, 'Joe', 'Joesephus', '800-555-1234', 'joejoesephus@email.com', '789 Oak Avenue', 'Dallas', 'TX', '75051'),
        (2, 'Adam', 'Admamson', '800-555-1212', 'aaadamson@email.com', '456 Elm Street','Dallas','TX','75052'),
        (3, 'George', 'Jetson', '800-555-9876', 'george.jetson@email.com', '123 Birch Parkway','Dallas','TX','75051')     ;

/* INSERT Categories */
INSERT INTO categories (name, description)
VALUES  ('Drink', 'Some drinks'),
        ('Bakery', 'Some bakery'),
        ('Food', 'Some food');

/* INSERT Products */
INSERT INTO products (name, price, category_id, description, subcategory, image_url, stock, featured) VALUES
('Iced Coffee', 4.99, 1, 'Refreshing iced coffee served chilled.', NULL, 'URL_HERE', 50, 0),

('Hot Latte', 4.49, 1, 'Warm latte with creamy foam.', NULL, 'URL_HERE', 50, 0),

('Snack Bites', 3.99, 3, 'Crispy fried snack bites.', NULL, 'URL_HERE', 50, 0),

('Glazed Donut', 2.49, 2, 'Classic sweet glazed donut.', NULL, 'URL_HERE', 50, 0),

('Cappuccino', 4.29, 1, 'Hot cappuccino with cinnamon.', NULL, 'URL_HERE', 50, 0),

('Iced Tea Lemon', 3.99, 1, 'Iced tea with fresh lemon slices.', NULL, 'URL_HERE', 50, 0),

('Iced Water', 1.49, 1, 'Cold refreshing water with ice.', NULL, 'URL_HERE', 50, 0),

('Black Coffee', 2.99, 1, 'Strong hot black coffee.', NULL, 'URL_HERE', 50, 0),

-- GRID 2

('Caramel Iced Latte', 5.49, 1, 'Iced latte with caramel drizzle.', NULL, 'URL_HERE', 50, 0),

('Hot Coffee', 2.99, 1, 'Freshly brewed hot coffee.', NULL, 'URL_HERE', 50, 0),

('Croissant', 3.49, 2, 'Flaky buttery croissant.', NULL, 'URL_HERE', 50, 0),

('Chocolate Donut', 2.79, 2, 'Donut topped with chocolate glaze.', NULL, 'URL_HERE', 50, 0),

('Caramel Iced Latte (Tall)', 5.99, 1, 'Tall iced latte with caramel.', NULL, 'URL_HERE', 50, 0),

('Hot Tea', 2.49, 1, 'Warm soothing tea.', NULL, 'URL_HERE', 50, 0),

('Iced Coffee', 4.99, 1, 'Classic iced coffee.', NULL, 'URL_HERE', 50, 0),

('Breakfast Sandwich', 6.49, 3, 'Egg, bacon, and cheese breakfast sandwich.', NULL, 'URL_HERE', 50, 0),

-- GRID 3

('Iced Coffee Milk', 4.99, 1, 'Iced coffee with milk.', NULL, 'URL_HERE', 50, 0),

('Caramel Frappe', 5.99, 1, 'Blended caramel frappe.', NULL, 'URL_HERE', 50, 0),

('Matcha Latte', 4.99, 1, 'Creamy matcha latte with latte art.', NULL, 'URL_HERE', 50, 0),

('Iced Black Coffee', 3.99, 1, 'Cold brew black coffee.', NULL, 'URL_HERE', 50, 0),

('Hot Chocolate', 3.99, 1, 'Hot chocolate with whipped cream.', NULL, 'URL_HERE', 50, 0),

('Strawberry Milk', 4.49, 1, 'Sweet iced strawberry milk.', NULL, 'URL_HERE', 50, 0),

('Hot Tea', 2.49, 1, 'Steaming cup of tea.', NULL, 'URL_HERE', 50, 0),

('Strawberry Lemonade', 4.99, 1, 'Pink lemonade with strawberries.', NULL, 'URL_HERE', 50, 0),

-- GRID 4

('Latte', 4.49, 1, 'Hot latte with latte art.', NULL, 'URL_HERE', 50, 0),

('Foamy Coffee', 3.99, 1, 'Coffee with thick foam.', NULL, 'URL_HERE', 50, 0),

('Paper Cup Latte', 4.29, 1, 'Latte served in a paper cup.', NULL, 'URL_HERE', 50, 0),

('Hot Tea', 2.49, 1, 'Warm tea in a paper cup.', NULL, 'URL_HERE', 50, 0),

('Iced Coffee', 4.99, 1, 'Iced coffee in a clear cup.', NULL, 'URL_HERE', 50, 0),

('Iced Latte', 5.29, 1, 'Iced latte with milk.', NULL, 'URL_HERE', 50, 0),

('Breakfast Sandwich', 6.49, 3, 'Bacon, egg, and cheese sandwich.', NULL, 'URL_HERE', 50, 0),

('Glazed Donut', 2.49, 2, 'Classic glazed donut.', NULL, 'URL_HERE', 50, 0),

-- GRID 5

('Iced Coffee Milk', 4.99, 1, 'Iced coffee with milk.', NULL, 'URL_HERE', 50, 0),

('Iced Coffee', 4.49, 1, 'Classic iced coffee.', NULL, 'URL_HERE', 50, 0),

('Breakfast Sandwich', 6.49, 3, 'Egg, bacon, and cheese sandwich.', NULL, 'URL_HERE', 50, 0),

('Glazed Donut', 2.49, 2, 'Sweet glazed donut.', NULL, 'URL_HERE', 50, 0),

('Snack Bites', 3.99, 3, 'Crispy fried snack bites.', NULL, 'URL_HERE', 50, 0),

('Black Coffee', 2.99, 1, 'Hot black coffee.', NULL, 'URL_HERE', 50, 0),

('Green Frappe', 5.49, 1, 'Green blended drink.', NULL, 'URL_HERE', 50, 0);

-- add shopping cart items
INSERT INTO cart_items (user_id, product_id, quantity)
VALUES  (3, 8, 1),
        (3, 10, 1);