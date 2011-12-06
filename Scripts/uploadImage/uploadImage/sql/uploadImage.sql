-- phpMyAdmin SQL Dump
-- version 2.11.6
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: Out 26, 2008 as 12:57 PM
-- Versão do Servidor: 4.1.22
-- Versão do PHP: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Banco de Dados: `uploadImage`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `fotos`
--

CREATE TABLE IF NOT EXISTS `fotos` (
  `id` tinyint(8) NOT NULL auto_increment,
  `id_noticia` tinyint(8) NOT NULL default '0',
  `foto` varchar(30) collate latin1_general_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `noticia`
--

CREATE TABLE IF NOT EXISTS `noticia` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `titulo` varchar(55) collate latin1_general_ci NOT NULL default '',
  `chamada` text collate latin1_general_ci NOT NULL,
  `texto` text collate latin1_general_ci NOT NULL,
  `data` datetime NOT NULL default '0000-00-00 00:00:00',
  `ordem` tinyint(1) NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=25 ;
