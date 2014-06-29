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
$page="viewTemplateDetails";
include("adminHeader.php"); 
include("../class/templatesClass.php"); 
include("myprideInc.php"); 

	extract($_POST);
	$obj=new templatesClass();//For create templates
	$obj1=new myPrideInc();//For get Role name,Section Name
	
	extract($_GET);
	$tid =$_GET['tid'];
	$qry="SELECT * FROM templates WHERE tid='$tid'";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	$rs=mysql_fetch_array($result);


?>

<div style="width:300px;border-bottom:1px dashed #000;float:left;margin:15px 0 15px 0;">
<b>Templates</b>
</div>
<?php

	 if($rs['template']!='')echo $rs['template'];


?>
