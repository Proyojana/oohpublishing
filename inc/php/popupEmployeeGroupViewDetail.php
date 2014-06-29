<?php
/*
* PAGE ID		: PHP
* CREATED ON	: 01-11-2010
* MODIFIED ON	: 
* AUTHOR ID		: 003573 [velu]
* PROJECT URL	: 
* CLIENT NAME	: Laserwords
* DEVELOPED BY	: Laserwords [www.laserwords.com]
* DESCRIPTION	: 
*/
ob_start();
session_start();
$page="popupEmployeeGroupViewDetail";
include("../config.php"); 
include("myprideInc.php"); 

$obj=new myPrideInc();
	
	extract($_POST);
	extract($_GET);
	$qry="SELECT * FROM employee_groups WHERE eg_id='$id'";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	$rs=mysql_fetch_array($result);

		echo $rs['eg_code']."|";
		echo $rs['eg_name']."|";
		echo $obj->getReportingPersonName($rs['eg_headed'])."|";

?>