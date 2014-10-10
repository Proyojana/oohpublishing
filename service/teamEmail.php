<?php

session_start();    
    include("config.php");
	include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getProductionHtmlEmail($_POST['project_id'],$id);
	        break;
		case 2:
			getProductionPdfEmail($_POST['project_id'],$id);
	        break;
		case 3:
			getTypesettingHtmlEmail($_POST['project_id'],$id);
	        break;
		case 4:
			getTypesettingPdfEmail($_POST['project_id'],$id);
	        break;
		default: 
			break;
	}
	
	
	
	function getProductionHtmlEmail($project_id,$id)
 	{
	$result1 = mysql_query ("Select 
Group_Concat(project_team.email) as production_html_to,
user_masters.user_email as production_html_from
From
 project_team,
 user_masters
    Where (project_team.project_id='".$project_id."' and project_team.flag=0) || user_masters.user_id='".$id."' ");
			
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				
			}
       	while($row=mysql_fetch_object($result1))
	   	{
			$result ["data"] = $row;
	  	}
		
		
      	echo(json_encode($result));
    }
    function getProductionPdfEmail($project_id,$id)
 	{
	$result1 = mysql_query ("Select 
Group_Concat(project_team.email) as production_pdf_to,
user_masters.user_email as production_pdf_from
From
 project_team,
 user_masters
    Where (project_team.project_id='".$project_id."' and project_team.flag=0) || user_masters.user_id='".$id."' ");
			
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				
			}
       	while($row=mysql_fetch_object($result1))
	   	{
			$result ["data"] = $row;
	  	}
		
		
      	echo(json_encode($result));
    }
	 function getTypesettingHtmlEmail($project_id,$id)
 	{
	$result1 = mysql_query ("Select 
Group_Concat(project_team.email) as typesetting_html_to,
user_masters.user_email as typesetting_html_from
From
 project_team,
 user_masters
    Where (project_team.project_id='".$project_id."' and project_team.flag=0) || user_masters.user_id='".$id."' ");
			
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				
			}
       	while($row=mysql_fetch_object($result1))
	   	{
			$result ["data"] = $row;
	  	}
		
		
      	echo(json_encode($result));
    }
	 function getTypesettingPdfEmail($project_id,$id)
 	{
	$result1 = mysql_query ("Select 
Group_Concat(project_team.email) as typesetting_pdf_to,
user_masters.user_email as typesetting_pdf_from
From
 project_team,
 user_masters
    Where (project_team.project_id='".$project_id."' and project_team.flag=0) || user_masters.user_id='".$id."' ");
			
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				
			}
       	while($row=mysql_fetch_object($result1))
	   	{
			$result ["data"] = $row;
	  	}
		
		
      	echo(json_encode($result));
    }
?>