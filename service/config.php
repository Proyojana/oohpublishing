<?php
$hostname="localhost";	//Host name of the Server
$username="root";	//User Name of the Server
$password="";	//Password of the Server
$dbname="oohonline";	//Database Name of the server
$connect=mysql_pconnect("$hostname","$username","$password") or die("Unable to connect to SQL server");
@mysql_select_db($dbname,$connect) or die("Unable to select database");
?>
