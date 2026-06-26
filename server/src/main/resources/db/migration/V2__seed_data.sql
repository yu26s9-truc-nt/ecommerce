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
INSERT INTO `products` (`product_id`, `name`, `price`, `category_id`, `description`, `subcategory`, `image_url`, `stock`, `featured`) VALUES
      (1, 'Iced Coffee', 4.99, 1, 'Refreshing iced coffee served chilled.', NULL, 'b7005e81-7a5a-4ac2-9b47-7ee973385504_cdllej.png', 50, 0),
      (2, 'Hot Latte', 4.49, 1, 'Warm latte with creamy foam.', NULL, '01a1be30-d2aa-452d-997d-93318f0e8c9f_coutmt.jpeg', 50, 0),
      (3, 'Snack Bites', 3.99, 3, 'Crispy fried snack bites.', NULL, 'hash_fdpus6.jpg', 50, 0),
      (4, 'Glazed Donut', 2.49, 2, 'Classic sweet glazed donut.', NULL, 'glazed_vej9ro.jpg', 50, 0),
      (5, 'Cappuccino', 4.29, 1, 'Hot cappuccino with cinnamon.', NULL, 'f7d25a1e-a3a0-4934-a31f-0431143b5d25_ytfegl.jpeg', 50, 0),
      (6, 'Iced Tea Lemon', 3.99, 1, 'Iced tea with fresh lemon slices.', NULL, 'ebb0bb36-e303-4277-af9d-0d6e63c9cdf1_eftuba.jpeg', 50, 0),
      (7, 'Iced Water', 1.49, 1, 'Cold refreshing water with ice.', NULL, 'e8858b6c-cc73-4b81-a38f-c6866bafcdfb_ttqurz.jpeg', 50, 0),
      (8, 'Black Coffee', 2.99, 1, 'Strong hot black coffee.', NULL, 'coffee_yybqfc.jpg', 50, 0),
      (9, 'Caramel Iced Latte', 5.49, 1, 'Iced latte with caramel drizzle.', NULL, 'dcfeb632-bc7d-42b1-abb8-47f9a5e15f2c_nqros9.jpeg', 50, 0),
      (10, 'Hot Coffee', 2.99, 1, 'Freshly brewed hot coffee.', NULL, 'd45f138a-2aa2-45cb-886f-4730507da716_hkcadk.jpeg', 50, 0),
      (11, 'Croissant', 3.49, 2, 'Flaky buttery croissant.', NULL, 'croissant_x3jtfj.jpg', 50, 0),
      (12, 'Chocolate Donut', 2.79, 2, 'Donut topped with chocolate glaze.', NULL, 'boston_rbrhzj.jpg', 50, 0),
      (13, 'Caramel Iced Latte (Tall)', 5.99, 1, 'Tall iced latte with caramel.', NULL, 'c554e94d-2c4e-402e-a7f2-0cddf29e44c4_tpzwif.jpeg', 50, 0),
      (14, 'Hot Tea', 2.49, 1, 'Warm soothing tea.', NULL, '4c5add33-51cf-4f0d-8dcf-b5d320ba0caf_kcjyij.jpeg', 50, 0),
      (15, 'Breakfast Sandwich', 6.49, 3, 'Egg, bacon, and cheese breakfast sandwich.', NULL, 'bec_q8mdk8.jpg', 50, 0),
      (16, 'Iced Coffee Milk', 4.99, 1, 'Iced coffee with milk.', NULL, 'e57df8de-34c0-4f5a-850f-a46f2f21682e-2.png', 50, 0),
      (17, 'Caramel Frappe', 5.99, 1, 'Blended caramel frappe.', NULL, '976bb2c6-9b02-4d17-81b3-226fb563249f_r8fxgc.png', 50, 0),
      (18, 'Matcha Latte', 4.99, 1, 'Creamy matcha latte with latte art.', NULL, '63f89326-cf89-4c0b-832e-1100711ffdb6_hiy9sc.jpeg', 50, 0),
      (19, 'Iced Black Coffee', 3.99, 1, 'Cold brew black coffee.', NULL, '4108fd98-5565-4f70-8997-3f44f7e5e57c_jxbcq0.jpeg', 50, 0),
      (20, 'Hot Chocolate', 3.99, 1, 'Hot chocolate with whipped cream.', NULL, '0381cc7f-c385-42a1-bc40-2b98cd83bfb8_pbsqom.jpeg', 50, 0),
      (21, 'Strawberry Milk', 4.49, 1, 'Sweet iced strawberry milk.', NULL, '56eb35e3-99bf-4506-892e-3f85839057da_z7pl4o.png', 50, 0),
      (22, 'Strawberry Lemonade', 4.99, 1, 'Pink lemonade with strawberries.', NULL, '6f350f37-ba83-4f86-87b5-d896eb446cc0_awkudk.jpeg', 50, 0),
      (23, 'Latte', 4.49, 1, 'Hot latte with latte art.', NULL, '32c41789-593f-4c6e-ba0d-5402f6d9798e_gu98cb.jpeg', 50, 0),
      (24, 'Paper Cup Latte', 4.29, 1, 'Latte served in a paper cup.', NULL, 'latte_nehqmi.jpg', 50, 0),
      (25, 'Iced Latte', 5.29, 1, 'Iced latte with milk.', NULL, 'bf80b9f4-92b0-41f0-847c-854c98958fc6_aud9rx.jpeg', 50, 0);


-- add shopping cart items
INSERT INTO cart_items (user_id, product_id, quantity)
VALUES  (3, 8, 1),
        (3, 10, 1);
