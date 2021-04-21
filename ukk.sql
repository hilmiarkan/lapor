-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2021 at 05:50 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukk`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(25) NOT NULL,
  `username` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `email`, `password`) VALUES
(6, 'hilmi', 'hilmi@admin.com', 'hilmi');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id_report` int(25) NOT NULL,
  `content` text NOT NULL,
  `respon` text DEFAULT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp(),
  `id_user` int(25) NOT NULL,
  `status` varchar(225) NOT NULL,
  `id_staff` int(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id_report`, `content`, `respon`, `date_created`, `id_user`, `status`, `id_staff`) VALUES
(28, 'give me another elite skin pls', 'no', '2021-03-28', 12, 'Rejected', NULL),
(29, 'hmmmmmmmmm', 'tidak bisa', '2021-03-28', 12, 'Rejected', NULL),
(33, 'tes', 'sudah jadi', '2021-03-30', 13, 'Finished', NULL),
(34, 'ban gembos', '', '2021-03-30', 13, 'Work in progress', 6),
(35, 'jalan berlubang\n\ntolong pak', 'done pak', '2021-03-30', 13, 'Finished', NULL),
(39, 'selamat siang\n', NULL, '2021-03-30', 12, 'Pending', NULL),
(40, 'woke', NULL, '2021-03-30', 12, 'Pending', NULL),
(41, 'rmah banjir\n', '', '2021-03-30', 12, 'Work in progress', 6),
(44, 'nothing', 'NICEEE', '2021-04-21', 18, 'Finished', 9),
(45, 'to do', '??', '2021-04-21', 18, 'Rejected', 9),
(46, 'ban gembos', 'sudahhh', '2021-04-21', 18, 'Finished', 2),
(47, 'rumah kebakaran', 'ga bisa', '2021-04-21', 18, 'Rejected', 2),
(48, 'jalan berlubang', NULL, '2021-04-21', 18, 'Pending', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id_staff` int(20) NOT NULL,
  `email` varchar(225) NOT NULL,
  `username` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id_staff`, `email`, `username`, `password`) VALUES
(2, 'mute@gmail.com', 'mute', '$2a$10$gABqggbHoz8.gEPgvgNpNeykcbtK5bp.GOpksQi/9jU1cYcAC02IK'),
(4, 'montagne@gmail.com', 'montagne', '$2a$10$36DLXsKzvK1LCW2GzEfJ9.h2t1TU0IXNml6WDriuBOJ3lWeu73XTm'),
(6, 'kaid@gmail.com', 'kaid', '$2a$10$XyV1V2iV6pEUEHJHepav4.hqEAlYTt41FtDzFIxkneEBfZQPYfmj.'),
(7, 'maulana@gmail.com', 'maulana', '$2a$10$DqoTh9uabnvjwRzIJ99hEuzGkcjKceNaiAM.ZuorzfyqmrmOBPIiy'),
(9, 'arkan@gmail.com', 'arkan', '$2a$10$BZnftk6xiDF0NRCU8rshqOscfObQY4tpqLllcfgXqg/mxeONQNXx.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(20) NOT NULL,
  `email` varchar(225) NOT NULL,
  `username` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `telp` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `email`, `username`, `password`, `telp`) VALUES
(12, 'hilmi@gmail.com', 'hilmi', '$2a$10$P2vBprwZwFpasANR2QjUTOr7TlAdrzwW/70Ep.dnFq2QN6mb8bqJ6', '1233456'),
(13, 'zulu@gmail.com', 'zulu', '$2a$10$F.gVOP4Ty4EUBdEU1uqnxOJy7xRdSPp0UfAvhySJDfkZOoRrGsJZa', '12345'),
(18, 'she@gmail.com', 'she', '$2a$10$1H7IYaQaYBavbTmXvaNfIu.q27HbDNO/P9JFjElWHAPjaqnMyCxKG', '573982');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id_report`),
  ADD KEY `id_admin` (`id_staff`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id_staff`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id_report` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id_staff` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `report_ibfk_5` FOREIGN KEY (`id_staff`) REFERENCES `staff` (`id_staff`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
