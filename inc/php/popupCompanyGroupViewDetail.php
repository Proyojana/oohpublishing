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
$page="popupCompanyGroupViewDetail";
include("../config.php"); 
	
	extract($_POST);
	extract($_GET);
	$qry="SELECT * FROM company_groups WHERE cg_id='$id'";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	$rs=mysql_fetch_array($result);

		echo $rs['cg_code']."|";
		echo $rs['cg_name']."|";
		echo $rs['cg_domain']."|";

?>