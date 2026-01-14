CREATE DATABASE IF NOT EXISTS `inventory_db`;
USE `inventory_db`;

CREATE TABLE IF NOT EXISTS `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `stock_qty` int DEFAULT NULL,
  `min_stock` int DEFAULT NULL,
  `storage_location` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `items` (`id`, `item_name`, `category`, `price`, `stock_qty`, `min_stock`, `storage_location`, `is_active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, 'Kipas', 'Elektronik', 50000, 1, 2, 'Rak B-102', 1, '2026-01-13 18:15:07', 'manager', '2026-01-14 01:24:47', 'admin');

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('manager','admin') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
	(1, 'manager', '12345', 'manager'),
	(2, 'admin', '123', 'admin');

