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
$page="popupCompanyViewDetail";
include("../config.php"); 
	
	extract($_POST);
	extract($_GET);
	$qry="SELECT * FROM company_master WHERE com_mas_id='$id'";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	$rs=mysql_fetch_array($result);

		echo $rs['com_mas_code']."|";
		echo $rs['com_mas_name']."|";
		echo $rs['com_mas_group']."|";
		echo $rs['com_mas_branch']."|";
		echo $rs['com_mas_location']."|";
		echo nl2br($rs['com_mas_address'])."|";
		echo $rs['com_mas_fax']."|";
		echo $rs['com_mas_email']."|";
		echo $rs['com_mas_phone']."|";
		echo $rs['com_mas_headed']."|";

?>