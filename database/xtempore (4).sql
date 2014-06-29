-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 19, 2013 at 12:51 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `xtempore`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(25) NOT NULL,
  `description` varchar(25) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` varchar(10) NOT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `flag` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `code`, `name`, `description`, `created_by`, `created_on`, `modified_by`, `modified_on`, `flag`) VALUES
(1, 'R001', 'Admin', '', 0, '', 0, '2013-12-13 07:48:19', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_masters`
--

CREATE TABLE IF NOT EXISTS `user_masters` (
  `user_id` bigint(10) NOT NULL AUTO_INCREMENT,
  `user_mas_name` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_no` varchar(20) NOT NULL,
  `author_name` varchar(100) NOT NULL,
  `user_role` int(10) NOT NULL,
  `resource_type` varchar(20) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `publisher` int(11) NOT NULL,
  `user_pwd` text NOT NULL,
  `user_email` varchar(75) NOT NULL,
  `user_is_admin` int(11) NOT NULL,
  `created_by` varchar(75) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(75) NOT NULL,
  `modified_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `flag` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `user_masters`
--

INSERT INTO `user_masters` (`user_id`, `user_mas_name`, `user_name`, `user_no`, `author_name`, `user_role`, `resource_type`, `resource_id`, `publisher`, `user_pwd`, `user_email`, `user_is_admin`, `created_by`, `created_on`, `modified_by`, `modified_on`, `flag`) VALUES
(1, 'Ram Kumar', '000001', '000001', '', 1, '', 0, 0, 'VjJ0a2MyVnNhM2xQVkVwaFYwVnJPUT09K0k=', '', 0, '1', '2013-12-13 07:52:46', '0', '0000-00-00 00:00:00', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
