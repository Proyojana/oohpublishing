<?php
$hostname="localhost:3306";	//Host name of the Server
$username="oohpmadmin";	//User Name of the Server
$password="Oohpm@2014";	//Password of the Server
$dbname="oohpm";	//Database Name of the server
$connect=mysql_pconnect("$hostname","$username","$password") or die("Unable to connect to SQL server");
@mysql_select_db($dbname,$connect) or die("Unable to select database");
?>
