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
('Iced Coffee', 4.99, 1, 'Refreshing iced coffee served chilled.', NULL, 'b7005e81-7a5a-4ac2-9b47-7ee973385504.png', 50, 0),
('Hot Latte', 4.49, 1, 'Warm latte with creamy foam.', NULL, '01a1be30-d2aa-452d-997d-93318f0e8c9f.jpeg', 50, 0),
('Snack Bites', 3.99, 3, 'Crispy fried snack bites.', NULL, 'hash.jpg', 50, 0),
('Glazed Donut', 2.49, 2, 'Classic sweet glazed donut.', NULL, 'glazed.jpg', 50, 0),
('Cappuccino', 4.29, 1, 'Hot cappuccino with cinnamon.', NULL, 'f7d25a1e-a3a0-4934-a31f-0431143b5d25.jpeg', 50, 0),
('Iced Tea Lemon', 3.99, 1, 'Iced tea with fresh lemon slices.', NULL, 'ebb0bb36-e303-4277-af9d-0d6e63c9cdf1.jpeg', 50, 0),
('Iced Water', 1.49, 1, 'Cold refreshing water with ice.', NULL, 'e8858b6c-cc73-4b81-a38f-c6866bafcdfb.jpeg', 50, 0),
('Black Coffee', 2.99, 1, 'Strong hot black coffee.', NULL, 'coffee.jpg', 50, 0),
('Caramel Iced Latte', 5.49, 1, 'Iced latte with caramel drizzle.', NULL, 'dcfeb632-bc7d-42b1-abb8-47f9a5e15f2c.jpeg', 50, 0),
('Hot Coffee', 2.99, 1, 'Freshly brewed hot coffee.', NULL, 'd45f138a-2aa2-45cb-886f-4730507da716.jpeg', 50, 0),
('Croissant', 3.49, 2, 'Flaky buttery croissant.', NULL, 'croissant.jpg', 50, 0),
('Chocolate Donut', 2.79, 2, 'Donut topped with chocolate glaze.', NULL, 'boston.jpg', 50, 0),
('Caramel Iced Latte (Tall)', 5.99, 1, 'Tall iced latte with caramel.', NULL, 'c554e94d-2c4e-402e-a7f2-0cddf29e44c4.jpeg', 50, 0),
('Hot Tea', 2.49, 1, 'Warm soothing tea.', NULL, '4c5add33-51cf-4f0d-8dcf-b5d320ba0caf.jpeg', 50, 0),
('Breakfast Sandwich', 6.49, 3, 'Egg, bacon, and cheese breakfast sandwich.', NULL, 'bec.jpg', 50, 0),
('Iced Coffee Milk', 4.99, 1, 'Iced coffee with milk.', NULL, 'e57df8de-34c0-4f5a-850f-a46f2f21682e-2.png', 50, 0),
('Caramel Frappe', 5.99, 1, 'Blended caramel frappe.', NULL, '976bb2c6-9b02-4d17-81b3-226fb563249f.png', 50, 0),
('Matcha Latte', 4.99, 1, 'Creamy matcha latte with latte art.', NULL, '63f89326-cf89-4c0b-832e-1100711ffdb6.jpeg', 50, 0),
('Iced Black Coffee', 3.99, 1, 'Cold brew black coffee.', NULL, '4108fd98-5565-4f70-8997-3f44f7e5e57c.jpeg', 50, 0),
('Hot Chocolate', 3.99, 1, 'Hot chocolate with whipped cream.', NULL, '0381cc7f-c385-42a1-bc40-2b98cd83bfb8.jpeg', 50, 0),
('Strawberry Milk', 4.49, 1, 'Sweet iced strawberry milk.', NULL, '56eb35e3-99bf-4506-892e-3f85839057da.png', 50, 0),
('Strawberry Lemonade', 4.99, 1, 'Pink lemonade with strawberries.', NULL, '6f350f37-ba83-4f86-87b5-d896eb446cc0.jpeg', 50, 0),
('Latte', 4.49, 1, 'Hot latte with latte art.', NULL, '32c41789-593f-4c6e-ba0d-5402f6d9798e.jpeg', 50, 0),
('Paper Cup Latte', 4.29, 1, 'Latte served in a paper cup.', NULL, 'latte.jpg', 50, 0),
('Iced Latte', 5.29, 1, 'Iced latte with milk.', NULL, 'bf80b9f4-92b0-41f0-847c-854c98958fc6.jpeg', 50, 0);

-- add shopping cart items
INSERT INTO cart_items (user_id, product_id, quantity)
VALUES  (3, 8, 1),
        (3, 10, 1);
