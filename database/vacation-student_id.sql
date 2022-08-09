-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2022 at 06:06 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation-student_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` enum('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `isAdmin`) VALUES
(1, 'ruth', 'ohayon', 'admin', 'e99a18c428cb38d5f260853678922e03', 'yes'),
(2, 'yosi', 'ohayon', 'yosi', 'e99a18c428cb38d5f260853678922e03', 'no'),
(4, 'reut', 'levi', 'reut', 'e99a18c428cb38d5f260853678922e03', 'no'),
(5, 'yael', 'ohayon', 'yael', 'e99a18c428cb38d5f260853678922e03', 'no'),
(6, 'israel', 'ohayon', 'israel', 'e99a18c428cb38d5f260853678922e03', 'no'),
(26, 'tami', 'ohayon', 'tami', 'e99a18c428cb38d5f260853678922e03', 'no'),
(27, 'avi', 'cohen', 'avi', 'e99a18c428cb38d5f260853678922e03', 'no'),
(29, 'yakov', 'levi', 'yakov', 'e99a18c428cb38d5f260853678922e03', 'no'),
(30, 'sara', 'levi', 'sara', 'e99a18c428cb38d5f260853678922e03', 'no'),
(31, 'hadasa', 'dim', 'hadasa', 'e99a18c428cb38d5f260853678922e03', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `id` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `picture` varchar(50) NOT NULL,
  `dateFrom` date NOT NULL,
  `dateTo` date NOT NULL,
  `price` int(11) NOT NULL,
  `followers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`id`, `description`, `destination`, `picture`, `dateFrom`, `dateTo`, `price`, `followers`) VALUES
(26, 'It’s a prime destination for travelers from around the world. The Eiffel Tower, Louvre, Le Marais, Champs-Élysées, Arc de Triomphe are some of the sights to see when visiting Paris. No trip to the City of Light is complete without a stroll on the ornate Pont Alexandre III Bridge, over the serene Seine River.', 'Paris', 'b9e82537-e636-4609-9979-d98bc2f2af38.jpg', '2022-08-08', '2022-08-15', 2800, 3),
(27, 'New York City is the full of culture and diversity. Broadway, the Statue of Liberty, Ellis Island, the Empire State Building, Rockefeller Center, Ground Zero, Harlem, Central Park and SoHo shopping are great reasons to visit the Big Apple. Venture out beyond Manhattan and experience the flavor of Brooklyn and NYC’s other boroughs.', 'New York City', '414bfdb8-18ba-4792-8745-3e63ef2b5618.jpg', '2022-08-10', '2022-08-24', 11997, 1),
(28, 'The Big Island of Hawaii is always a popular destination for travelers. Maui, Oahu and Honolulu are a few Hawaiian hot spots to relax and unwind. There\'s something for everyone, including sunset paddling, the Hawaii Volcanoes National Park, USS Arizona Memorial, Panaewa Rainforest Zoo and Waimea Canyon.', 'Hawaii', 'ef145f9a-81ae-4c0b-84cc-c8e7dffe0a95.jpg', '2022-08-16', '2022-08-21', 5200, 2),
(29, 'This is Rome\'s famous Ponte Sant\'Angelo Bridge, leading to Castel Sant\'Angelo. Plan your trip to see more must-see attractions in the Eternal City, including the Vatican, Trevi Fountain, the Colosseum, Pantheon, National Museum of Rome, Sistine Chapel and Piazza Navona.', 'Rome', 'e71307b9-6885-4658-82f0-c9c345fcaa26.jpg', '2022-08-14', '2022-08-21', 6000, 2),
(30, 'Take a jungle tour; swim with the dolphins; go snorkeling in the second largest reef in the world; or take a Party Hopper Tour of fun pubs in Cancun, Mexico. We also recommend that you indulge in a couple of relaxing days on the pristine, sandy shores of this popular destination.', 'Cancun, Mexico', '752bd63f-952c-496f-a5f4-2b077f2f4eaf.jpeg', '2022-08-22', '2022-08-31', 9900, 0),
(31, 'Epcot Center is just one of the magical Disney parks in Orlando. Looking for more family theme-park adventures? Then head to Magic Kingdom Park, Universal Studios Florida, SeaWorld and Disney’s Animal Kingdom Theme Park. Orlando is also a great destination for adults with dozens of places to visit a spa, golf, shop and it\'s also a popular destination for weddings.', 'Orlando', 'cf8be28e-4df3-4299-b686-81f99d53406d.jpg', '2022-08-16', '2022-08-31', 11500, 1),
(32, 'Old and new worlds meet in London with a walk across the Millennium Bridge to the historic St. Paul\'s Cathedral. Looking for other things to do? Visit Buckingham Palace to see the changing of the guard; spend the day shopping around Piccadilly Circus; or get a view of Big Ben and Westminster palace from the London Eye.', 'London', 'e1fbd3ca-8f39-4ac8-89ae-c90f037b05a0.jpg', '2022-08-21', '2022-08-28', 5500, 0),
(33, 'Miami is pulsating with nighttime energy, with hot restaurants and hotter clubs. Enjoy shopping on Lincoln Avenue; partying on Ocean Drive; sunbathing on South Beach; and visit Parrot and Monkey Jungle Islands.', 'Miami', 'ae1f30e0-258c-4b22-8bd4-e451250b4132.jpg', '2022-08-22', '2022-09-05', 13200, 1),
(34, 'Luck can be more than a lady in Sin City. With dozens of posh hotels, casinos and a variety of buffets, Las Vegas is definitely a top destination for tourists. Go indoor skydiving; ride a rollercoaster at the Stratosphere Hotel Casino; stroll through the Bellagio\'s Botanical Gardens; or race your friends in a mini kart at the Las Vegas Mini Gran Prix.', 'Las Vegas', '2405ae25-2b84-43e5-821b-9387eb86aa85.jpg', '2022-08-08', '2022-08-23', 8500, 0),
(35, 'You’ll be amazed at what you can see in just a day with the right tour guide! Our selection of Jerusalem’s best day tours will take you to the most important places and attractions in and around the city, including the Old City, New City, Bethlehem, the Dead Sea, Masada, Jericho, Jerusalem Hills, and more.', 'Jerusalem', 'ac610256-9626-44c8-baaf-bc5e28b37e3e.jpg', '2022-08-10', '2022-08-11', 400, 2),
(36, 'Myrtle Beach\'s Broadway at the Beach is 350 acres of fun with restaurants, movies, mini golf, music pavilions and more. Tourists come to this quaint Southern town to bathe in the sun on the beach. But there are dozens of other things to do and see, including the Carolina Opry, Family Kingdom Amusement Park & Water Park, Apache Family Campgrounds and Le Grande Cirque Adrenaline.', 'Myrtle Beach, South Carolina', 'c3601a22-0fc8-45a7-b81a-a2dc2d030cd5.jpg', '2022-08-18', '2022-08-25', 7500, 0),
(37, 'Morro Castle, Turtle Beach, Old San Juan, El Yunque Tropical Rainforest and Rio Cumuy Cave Park are some must-see sights in Puerto Rico. The Vieques Biobay is also a popular destination and one of a few bioluminescent bays in the world. Go midnight kayaking or take a dive into the glowing green waters of Mosquito Bay. It\'s one of the most amazing experiences Puerto Rico has to offer.', 'Puerto Rico', 'e755b2af-5bf1-443d-a5ed-e0a1b4b2c2a9.jpg', '2022-08-18', '2022-09-01', 8800, 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations_follwers`
--

CREATE TABLE `vacations_follwers` (
  `u_id` int(11) NOT NULL,
  `v_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations_follwers`
--

INSERT INTO `vacations_follwers` (`u_id`, `v_id`) VALUES
(6, 26),
(6, 27),
(6, 35),
(30, 26),
(30, 28),
(30, 29),
(30, 31),
(30, 33),
(31, 26),
(31, 28),
(31, 29),
(31, 35);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations_follwers`
--
ALTER TABLE `vacations_follwers`
  ADD PRIMARY KEY (`u_id`,`v_id`),
  ADD KEY `v_id` (`v_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vacations_follwers`
--
ALTER TABLE `vacations_follwers`
  ADD CONSTRAINT `vacations_follwers_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `vacations_follwers_ibfk_2` FOREIGN KEY (`v_id`) REFERENCES `vacation` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
