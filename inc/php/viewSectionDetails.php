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
$page="viewSectionDetails";
include("../class/templatesClass.php"); 
include("../inc/myprideInc.php"); 

	extract($_POST);
	$obj=new templatesClass();//For create templates
	$obj1=new myPrideInc();//For get Role name,Question
	
	extract($_GET);
	$qry="SELECT * FROM sections WHERE sid='$id'";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	$rs=mysql_fetch_array($result);

		echo $rs['scode']."|";
		echo $rs['section']."|";
		echo $obj1->viewRolesDetail($rs['srole'])."|";
		echo $obj1->listQuestionsDetails($rs['squestion'])."|";

?>