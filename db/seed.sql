-- Connect to DB
\c clicker_game;

INSERT INTO users (username, email, coins, crystals, energy) VALUES
('user1', 'user1@example.com', 1000, 50, 100),
('user2', 'user2@example.com', 500, 20, 50),
('user3', 'user3@example.com', 2000, 100, 200);

INSERT INTO upgrades (user_id, upgrade_type, level, cost) VALUES
(1, 'click_income', 2, 100),
(1, 'auto_clicker', 1, 200),
(2, 'click_income', 1, 100),
(3, 'auto_clicker', 3, 500);

INSERT INTO missions (user_id, mission_type, progress, completed) VALUES
(1, 'click_100_times', 50, FALSE),
(1, 'earn_1000_coins', 800, FALSE),
(2, 'click_100_times', 100, TRUE),
(3, 'earn_1000_coins', 1000, TRUE);

INSERT INTO promotions (title, description, start_date, end_date, reward_coins, reward_crystals) VALUES
('Double Coins Weekend', 'Earn double coins for every click!', '2023-10-01 00:00:00', '2023-10-03 23:59:59', 200, 10),
('Crystal Bonanza', 'Get extra crystals for completing missions!', '2023-10-05 00:00:00', '2023-10-07 23:59:59', 100, 50);

INSERT INTO payments (user_id, payment_type, amount, status) VALUES
(1, 'stars', 100, 'completed'),
(2, 'ton', 50, 'pending'),
(3, 'stars', 200, 'failed');