<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getCompletedProjects();
			break;
		case 2:
			getProjectById($_POST["project_code"]);	
			break;
		
		default: 
			break;
	}
	

function getCompletedProjects()
	{
 		$num_result = mysql_query ("Select
  project_title.job_code As code,
  project_title.id As id,
  project_title.title As title,
  project_title.author as author,
  project_title.series As series,
  project_title.format As format,
  project_title.design As design,
  project_title.agreed_deadline As deadline,
  project_title.client_team As client_team,
  project_title.word_count As word
  
From
  project_title Inner Join
  budget_total_detail On project_title.id =
    budget_total_detail.project_id 
Where
  project_title.flag = 0 And budget_total_detail.invoice_date!='0000-00-00'")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  project_title.job_code As code,
  project_title.id As id,
  project_title.title As title,
  project_title.author as author,
  project_title.series As series,
  project_title.format As format,
  project_title.design As design,
  project_title.agreed_deadline As deadline,
  project_title.client_team As client_team,
  project_title.word_count As word
  
From
  project_title Inner Join
  budget_total_detail On project_title.id =
    budget_total_detail.project_id 
Where
  project_title.flag = 0 And budget_total_detail.invoice_date!='0000-00-00' LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getProjectById($project_code)
 	{
 		$project_id = mysql_query("Select project_title.id From project_title Where project_title.job_code = '".$project_code."'");
 		while($row = mysql_fetch_array($project_id)) {				
			$proj_id = $row['id'];			
		}
 		
		$result1 = mysql_query ("Select
  project_title.id As edit_project_id,
  project_title.job_code As edit_job_code,
  project_title.title As edit_project_title,
  project_title.author As edit_project_author,
  project_title.hb_isbn As edit_hb_isbn,
  project_title.pb_isbn As edit_pb_isbn,
  project_title.series As edit_project_series,
  project_title.format As edit_project_format,
  project_title.design As edit_project_design,
  project_title.castoff_extent As edit_castoff_extent,
  project_title.confirmed_extent As edit_confirmed_extent,
  project_title.client_deadline As edit_client_deadline,
  project_title.agreed_deadline As edit_agreed_deadline,
  project_title.word_count As edit_word_count,
  project_title.manuscript_pages As edit_manuscript,
  project_title.expect_index_extent As edit_index_extent,
  project_title.chapter_footer_req As edit_chapter_footer,
  project_title.contains_color As edit_contain_colour,
  project_title.client As edit_project_client,
  project_title.client_team As edit_project_team,
  project_title.workflow As edit_project_workflow
From
  project_title
Where
  project_title.job_code ='".$project_code."' and
  project_title.flag = 0 ");
			
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