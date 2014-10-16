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
	

function authorEmail($job_code,$id)
 	{
 		
		/** insert into temp**/
 		$selectworkflow = mysql_query("Select
 		 project_title.title as title, 
 		 author.name as name
 		 from 
 		 project_title Inner Join
 		 author On project_title.job_code=author.job_code
 		 where 
 		 project_title.job_code = '".$job_code."'
 		 And author.author='Main contact' ");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$title = $row['title'];
			$name = $row['name'];
		}
		
		$result1 = "Dear ".$name."

The proofs for your forthcoming book ".$title." have been dispatched from our typesetter and should be with you shortly.

You will receive two copies of the proofs – one is for your own records, the other should be marked with any essential corrections. I have also uploaded the PDFs to our ftp site:

Address:
Username:
Password:
Filename:

Please mark only essential corrections, and ensure that your corrections are clearly marked. A table of mark-up symbols is attached to this message for your reference. Let me know as soon as possible if you wish to make any changes to the page numbering in the index.

Please aim to return the proofs to arrive with me at the address below no later than date.

Please confirm receipt of this email. I hope you are pleased with the proofs – do let me know if you have any queries or problems at any time.";
		
     $result2 = mysql_query("INSERT INTO temp (id,message)
		                               VALUES ('' ,'" . $result1 . "')");
					if(!$result2) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "Notes saved successfully";
					}
		/** Get message from temp **/			
	$result3 = mysql_query ("Select distinct
oohpublishing.author.email as authorEmail,
oohpublishing.temp.message as authorMessage,
oohpublishing.user_masters.user_email as authorFrom
From
oohpublishing.author,
oohpublishing.temp,
oohpublishing.user_masters
Where
oohpublishing.author.job_code='".$job_code."' || oohpublishing.user_masters.user_id='".$id."'");
			
		if(!$result3)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;				
			}
       	while($row=mysql_fetch_object($result3))
	   	{
			$result ["data"] = $row;
	  	}
      	echo(json_encode($result));
		
		/** Delete the temp**/
		$result1= mysql_query("DELETE FROM temp");
				
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  'Invalid query: ' . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = 'Deleted successfully';
				}			
    }
	
function vendorEmail($job_code,$id)
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