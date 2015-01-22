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
 		$template=mysql_query("Select
  project_title.job_code,
  project_title.title,
  project_title.id,
  project_title.hb_isbn,
  project_title.pb_isbn,
  project_title.design,
  project_title.format,
  project_title.castoff_extent,
  project_title.confirmed_extent,
  project_title.agreed_deadline,
  project_title.client_deadline,
  project_title.word_count
From
  project_title
Where
  project_title.id = '" . $project_id . "'");
			while($template1=mysql_fetch_array($template))
			{
				$pTitle = $template1['title'];
				$pJob = $template1['job_code'];
				
				$confirmed= $template1['agreed_deadline'];
				
			}	
 		$template="<p>Dear Team,<p>
 		<p>Please see below the production report for <b>".$pTitle."</b>(".$pJob.") with the agreed deadline of <b>".$confirmed."</b></p>
 		<p>Please revert if you have any questions.</p>";
 		
 		//insert
	  $result2 = mysql_query("INSERT INTO temp (id,message)
		                               VALUES ('' ,'" . $template . "')");
					if(!$result2) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "Saved successfully";
					}
	$result1 = mysql_query ("Select 
Group_Concat(project_team.email) as production_html_to,
user_masters.user_email as production_html_from,
temp.message as production_html_message
From
 project_team,
 user_masters,
 temp
    Where (project_team.project_id='".$project_id."' and project_team.flag=0)");
			
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
		/**Delete the temp**/
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
    function getProductionPdfEmail($project_id,$id)
 	{
 			$template=mysql_query("Select
  project_title.job_code,
  project_title.title,
  project_title.id,
  project_title.hb_isbn,
  project_title.pb_isbn,
  project_title.design,
  project_title.format,
  project_title.castoff_extent,
  project_title.confirmed_extent,
  project_title.agreed_deadline,
  project_title.client_deadline,
  project_title.word_count
From
  project_title
Where
  project_title.id = '" . $project_id . "'");
			while($template1=mysql_fetch_array($template))
			{
				$pTitle = $template1['title'];
				$pJob = $template1['job_code'];
				
				$confirmed= $template1['agreed_deadline'];
				
			}	
 		$template="<p>Dear Team,<p>
 		<p>Enclosed please find production report for <b>".$pTitle."</b>(".$pJob.") with the agreed deadline of <b>".$confirmed."</b></p>
 		<p>Please revert if you have any questions.</p>";
 		
 		//insert
	  $result2 = mysql_query("INSERT INTO temp (id,message)
		                               VALUES ('' ,'" . $template . "')");
					if(!$result2) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "Saved successfully";
					}
	$result1 = mysql_query ("Select 
Group_Concat(project_team.email) as production_pdf_to,
user_masters.user_email as production_pdf_from,
temp.message as production_pdf_message
From
 project_team,
 user_masters,
 temp
    Where (project_team.project_id='".$project_id."' and project_team.flag=0)");
			
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
		
		/**Delete the temp**/
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
	 function getTypesettingHtmlEmail($project_id,$id)
 	{
 		$template=mysql_query("Select
  project_title.job_code,
  project_title.title,
  project_title.id,
  project_title.hb_isbn,
  project_title.pb_isbn,
  project_title.design,
  project_title.format,
  project_title.castoff_extent,
  project_title.confirmed_extent,
  project_title.agreed_deadline,
  project_title.client_deadline,
  project_title.word_count
From
  project_title
Where
  project_title.id = '" . $project_id . "'");
			while($template1=mysql_fetch_array($template))
			{
				$pTitle = $template1['title'];
				$pJob = $template1['job_code'];
				
				$confirmed= $template1['agreed_deadline'];
				
			}	
 		$template="<p>Dear Team,<p>
 		<p>Please see below the production report for <b>".$pTitle."</b>(".$pJob.") with the agreed deadline of <b>".$confirmed."</b></p>
 		<p>Please revert if you have any questions.</p>";
 		
 		//insert
	  $result2 = mysql_query("INSERT INTO temp (id,message)
		                               VALUES ('' ,'" . $template . "')");
					if(!$result2) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "Saved successfully";
					}
	$result1 = mysql_query ("Select 
Group_Concat(project_team.email) as typesetting_html_to,
user_masters.user_email as typesetting_html_from,
temp.message as typesetting_html_message
From
 project_team,
 user_masters,
 temp
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
		/**Delete the temp**/
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
	 function getTypesettingPdfEmail($project_id,$id)
 	{
 		$template=mysql_query("Select
  project_title.job_code,
  project_title.title,
  project_title.id,
  project_title.hb_isbn,
  project_title.pb_isbn,
  project_title.design,
  project_title.format,
  project_title.castoff_extent,
  project_title.confirmed_extent,
  project_title.agreed_deadline,
  project_title.client_deadline,
  project_title.word_count
From
  project_title
Where
  project_title.id = '" . $project_id . "'");
			while($template1=mysql_fetch_array($template))
			{
				$pTitle = $template1['title'];
				$pJob = $template1['job_code'];
				
				$confirmed= $template1['agreed_deadline'];
				
			}	
 		$template="<p>Dear Team,<p>
 		<p>Enclosed please find production report for <b>".$pTitle."</b>(".$pJob.") with the agreed deadline of <b>".$confirmed."</b></p>
 		<p>Please revert if you have any questions.</p>";
 		
 		//insert
	  $result2 = mysql_query("INSERT INTO temp (id,message)
		                               VALUES ('' ,'" . $template . "')");
					if(!$result2) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "Saved successfully";
					}
	$result1 = mysql_query ("Select 
Group_Concat(project_team.email) as typesetting_pdf_to,
user_masters.user_email as typesetting_pdf_from,
temp.message as typesetting_pdf_message
From
 project_team,
 user_masters,
 temp
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
      	/**Delete the temp**/
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
?>