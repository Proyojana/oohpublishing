<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];

	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			vendorEmail($_POST['job_code'],$id);
			break;
		case 2:
			authorEmail($_POST['job_code'],$id);
			break;
		
		default: 
			break;
	}
	

function vendorEmail($job_code,$id)
 	{
		$result1 = mysql_query ("
		Select distinct
oohpublishing.author.email as vendorEmail,
oohpublishing.email_template.message as vendorMessage,
oohpublishing.user_masters.user_email as vendorFrom
From
oohpublishing.author,
oohpublishing.email_template,
oohpublishing.user_masters
Where
oohpublishing.email_template.email_to ='1' || oohpublishing.author.job_code='".$job_code."' || oohpublishing.user_masters.user_id='".$id."'");
			
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
function authorEmail($job_code,$id)
 	{
		$result1 = mysql_query ("Select distinct
oohpublishing.author.email as authorEmail,
oohpublishing.email_template.message as authorMessage,
oohpublishing.user_masters.user_email as authorFrom
From
oohpublishing.author,
oohpublishing.email_template,
oohpublishing.user_masters
Where
oohpublishing.email_template.email_to ='1' || oohpublishing.author.job_code='".$job_code."' || oohpublishing.user_masters.user_id='".$id."'");
			
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