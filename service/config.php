<?php
$hostname="166.62.8.8";	//Host name of the Server
$username="oohpublishing";	//User Name of the Server
$password="Ooh@2014";	//Password of the Server
$dbname="oohpublishing";	//Database Name of the server
$connect=mysql_pconnect("$hostname","$username","$password") or die("Unable to connect to SQL server");
@mysql_select_db($dbname,$connect) or die("Unable to select database");
?>