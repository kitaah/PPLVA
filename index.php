<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/vendor/autoloader.php';

$page = $_GET['page'];
if(isset($page))
{
	switch($page)
	{
		case 'accueil':
			$siteController = new Controller\Controller();
			$siteController ->displayWebsiteHome();
			break;
		case 'presentation':
			$siteController = new Controller\Controller();
			$siteController ->displaySitePresentation();
			break;
		default: 
			exit(header('Location: index.php?page=accueil'));
			break;
	}
} else {
	exit(header('Location: index.php?page=accueil'));
}
