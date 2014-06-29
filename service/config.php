<?php
$hostname="proyojana.db.7069069.hostedresource.com";	//Host name of the Server
$username="proyojana";	//User Name of the Server
$password="Amnesty@123";	//Password of the Server
$dbname="proyojana";	//Database Name of the server
$connect=mysql_pconnect("$hostname","$username","$password") or die("Unable to connect to SQL server");
@mysql_select_db($dbname,$connect) or die("Unable to select database");
?>
