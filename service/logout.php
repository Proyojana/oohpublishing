<?php  
/*
* PAGE ID		: PHP
* CREATED ON	: 02-11-2010
* MODIFIED ON	: 
* AUTHOR ID		: 003573
* PROJECT URL	: 
* CLIENT NAME	: Laserwords
* DEVELOPED BY	: Laserwords [www.laserwords.com]
* DESCRIPTION	: 
*/
$page="logout";

session_start();
//session_destroy();
$file = session_save_path()."sess_".session_id();
unlink($file);  
$result["success"] = true;

echo json_encode($result);
?>  