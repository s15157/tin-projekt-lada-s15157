-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Czas generowania: 05 Lut 2021, 09:52
-- Wersja serwera: 8.0.22
-- Wersja PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `tin-projekt`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Car`
--

CREATE TABLE `Car` (
  `_id` int UNSIGNED NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `engine` int NOT NULL,
  `power` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` int NOT NULL,
  `bail` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `Car`
--

INSERT INTO `Car` (`_id`, `brand`, `model`, `engine`, `power`, `type`, `price`, `bail`) VALUES
(1, 'AUDI', 'RS6 C6', 5000, 400, 'Kombi', 500, 3000),
(3, 'NISSAN', 'GTR R35', 3600, 600, 'Coupe', 1200, 7500),
(5, 'Mercedes', 'C63', 6208, 460, 'Coupe', 1500, 8000),
(7, 'Porshe', '911 Turbo S', 3745, 650, 'Coupe', 4000, 10000),
(8, 'BMW', 'M3 E92', 4000, 420, 'Coupe', 4000, 10000);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Customer`
--

CREATE TABLE `Customer` (
  `_id` int UNSIGNED NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pesel` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `Customer`
--

INSERT INTO `Customer` (`_id`, `firstName`, `lastName`, `email`, `pesel`) VALUES
(1, 'Jan', 'Kowalski', 'jan.kowalski@acme.com', 21474836475),
(2, 'Adam', 'Nowak', 'adam.nowak@carent.com', 93022712375),
(3, 'Karolina', 'Sowa', 'karolina.sowa@carent.com', 75061209874),
(22, 'Daria', 'Zambrowska', 'daria.zambrowska@carent.com', 67897467212),
(34, 'Justyna', 'Gałązka', 'justyna.galazka@carent.com', 89564534125);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Rent`
--

CREATE TABLE `Rent` (
  `_id` int UNSIGNED NOT NULL,
  `customer_id` int UNSIGNED NOT NULL,
  `car_id` int UNSIGNED NOT NULL,
  `dateFrom` date DEFAULT NULL,
  `dateTo` date DEFAULT NULL,
  `price` int NOT NULL,
  `bail` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `Rent`
--

INSERT INTO `Rent` (`_id`, `customer_id`, `car_id`, `dateFrom`, `dateTo`, `price`, `bail`) VALUES
(1, 1, 1, '2019-08-11', '2019-08-22', 5500, 3000),
(6, 2, 5, '2021-01-18', '2021-01-28', 15000, 8000),
(10, 22, 3, '2021-02-19', '2021-02-21', 7500, 1200);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `User`
--

CREATE TABLE `User` (
  `_id` int NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `lastName` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `User`
--

INSERT INTO `User` (`_id`, `firstName`, `lastName`, `email`, `password`, `type`) VALUES
(5, 'Admin', 'Adminowski', 'admin.adminowski@carent.com', '$2a$08$DKoI2SiHq.2keDo7OdQ5Q.mD0y8yTrN.Fbam0gxhEV5mAC/CCpmFK', 'admin'),
(7, 'Damian', 'Pikaczu', 'damian.pikaczu@carent.com', '$2a$08$binleiZuXuTbd4g9T6RNLu9Jt72u2iaj6.wwYCmm1xb9WNuVwvXT.', 'user'),
(10, 'Adrian', 'Łada', 'adrian.lada@carent.com', '$2a$08$NM.NNoicGpSDbwIaNmRU9ecRFOE7b1mEC.ei4v1VeIS1tXszUN4Mu', 'user'),
(13, 'Janek', 'Jankowski', 'janek.jankowski@carent.com', '$2a$08$B/D2zsQTXsUZuy9kgmMOpOxI0a3Pn1kfDYB2frKNd1drU2cHqitAy', 'user');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `Car`
--
ALTER TABLE `Car`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `dept_id_UNIQUE` (`_id`);

--
-- Indeksy dla tabeli `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `pesel` (`pesel`),
  ADD UNIQUE KEY `customer_id_UNIQUE` (`_id`);

--
-- Indeksy dla tabeli `Rent`
--
ALTER TABLE `Rent`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `employment_id_UNIQUE` (`_id`),
  ADD KEY `customer_fk` (`customer_id`),
  ADD KEY `car_fk` (`car_id`);

--
-- Indeksy dla tabeli `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`_id`) USING BTREE;

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `Car`
--
ALTER TABLE `Car`
  MODIFY `_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `Customer`
--
ALTER TABLE `Customer`
  MODIFY `_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT dla tabeli `Rent`
--
ALTER TABLE `Rent`
  MODIFY `_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `User`
--
ALTER TABLE `User`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `Rent`
--
ALTER TABLE `Rent`
  ADD CONSTRAINT `car_fk` FOREIGN KEY (`car_id`) REFERENCES `Car` (`_id`),
  ADD CONSTRAINT `customer_fk` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
