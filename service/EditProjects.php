<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getProjects();
			break;
		case 2:
			getProjectById($_POST["project_code"]);	
			break;
		case 3:
			updateProjectMaster($_POST['project_id'],$_POST['job_code'],$_POST['project_title'],$_POST['hb_isbn'],$_POST['pb_isbn'],$_POST['project_series'],$_POST['project_format'],$_POST['project_design'],$_POST['castoff_extent'],$_POST['confirmed_extent'],$_POST['edit_word_count_indexing'],$_POST['edit_print_run'],$_POST['edit_print_run_confirmed'],$_POST['edit_cover_type'],$_POST['client_deadline'],$_POST['agreed_deadline'],$_POST['word_count'],$_POST['manuscript'],$_POST['index_extent'],$_POST['chapter_footer'],$_POST['contain_colour'],$_POST['project_client'],$_POST['project_team'],$_POST['project_workflow'],$_POST['project_note'],$_POST['ebook_isbn'],$id);	
			break;
		case 4:
			getBudgetReceivables($_POST['projectid']);
			break;
		case 5:
			updateBudgetReceivables($id,$_POST['projectid'],$_POST['edit_cast_off_extent'],$_POST['edit_confirmed_extent'],$_POST['edit_unit_account_receivable'],$_POST['edit_unit_usd_ar'],$_POST['edit_unit_gbp_ar'],$_POST['edit_actual_billable_ar'],$_POST['edit_actual_billable_usd_ar'],$_POST['edit_actual_billable_gbp_ar'],$_POST['edit_total_contract_usd'],$_POST['edit_total_contract_gbp']);
			break;
						
		default: 
			break;
	}
	

function getProjects()
	{
 		$num_result = mysql_query ("Select
  project_title.job_code As pro_code,
  project_title.id As pro_id,
  project_title.title As pro_title,
  project_title.hb_isbn As pro_hb,
  project_title.pb_isbn As pro_pb,
  project_title.workflow As workflow
From
  project_title 
Where
  project_title.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
 project_title.job_code As pro_code,
  project_title.id As pro_id,
  project_title.title As pro_title,
  project_title.hb_isbn As pro_hb,
  project_title.pb_isbn As pro_pb,
  project_title.workflow As workflow
From
  project_title 
Where
  project_title.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
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
  project_title.ebook_isbn As edit_ebook_isbn,
  project_title.series As edit_project_series,
  project_title.format As edit_project_format,
  project_title.design As edit_project_design,
  project_title.castoff_extent As edit_castoff_extent,
  project_title.confirmed_extent As edit_confirmed_extent,
  project_title.client_deadline As edit_client_deadline,
  project_title.agreed_deadline As edit_agreed_deadline,
  project_title.word_count As edit_word_count,
  project_title.word_count_indexing As edit_word_count_indexing,
  project_title.manuscript_pages As edit_manuscript,
  project_title.expect_index_extent As edit_index_extent,
  project_title.chapter_footer_req As edit_chapter_footer,
  project_title.contains_color As edit_contain_colour,
  project_title.cover_type As edit_cover_type,
  project_title.print_run As print_run,
  project_title.print_run_confirmed As edit_print_run,
  project_title.note As edit_project_note,
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
  
     function updateProjectMaster($proj_id,$job_code,$title,$hb_isbn,$pb_isbn,$series,$format,$design,$castoff_extent,$confirmed_extent,$edit_word_count_indexing,$edit_print_run,$edit_print_run_confirmed,$edit_cover_type,$client_deadline,$agreed_deadline,$word_count,$manuscript,$index_extent,$footer,$colour,$client,$team,$workflow,$project_note,$ebook_isbn,$id)
    {
		$checkquery="SELECT id FROM project_title WHERE id='".$proj_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE project_title set title='".$title."',hb_isbn='".$hb_isbn."',pb_isbn='".$pb_isbn."',ebook_isbn='".$ebook_isbn."',series='".$series."',format='".$format."',design='".$design."',castoff_extent='".$castoff_extent."',confirmed_extent='".$confirmed_extent."',word_count_indexing='".$edit_word_count_indexing."',print_run='".$edit_print_run."',print_run_confirmed='".$edit_print_run_confirmed."',cover_type='".$edit_cover_type."',client_deadline='".$client_deadline."',agreed_deadline='".$agreed_deadline."',word_count='".$word_count."',manuscript_pages='".$manuscript."',expect_index_extent='".$index_extent."',chapter_footer_req='".$footer."',contains_color='".$colour."',note='".$project_note."',client='".$client."',client='".$client."',client_team='".$team."',workflow='".$workflow."',modified_by='".$id."',modified_on=now() WHERE id=".$proj_id."");
				
		if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = 'Updated successfully';
			}
		}
		else
		{
			$result["failure"] = true;
			$result["message"] =  'Dept does not exist';
		}
		

		echo json_encode($result);
    }
    
	function getBudgetReceivables($projectid)
	{
		$result1 = mysql_query ("Select
  budget_receivable.project_id as projectid,
  budget_receivable.cast_off_extent as edit_cast_off_extent_ar,
  budget_receivable.confirmed_extent as edit_confirmed_extent_ar,
  budget_receivable.unit as edit_unit_acount_receivable,
  budget_receivable.unit_usd as edit_unit_usd_ar,
  budget_receivable.unit_gbp as edit_unit_gbp_ar,
  budget_receivable.actual_billable_unit as edit_actual_billable_ar,
  budget_receivable.actual_billable_amount_usd as edit_actual_billable_usd_ar,
  budget_receivable.actual_billable_amount_gbp as edit_actual_billable_gbp_ar,
  budget_receivable.total_usd as edit_total_contract_usd,
  budget_receivable.total_gbp as edit_total_contract_gbp
From
  budget_receivable
Where
 budget_receivable.project_id ='".$projectid."' and
  budget_receivable.flag = 0 ");
			
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
  function updateBudgetReceivables($id,$projectid,$edit_cast_off_extent,$edit_confirmed_extent,$edit_unit_account_receivable,$edit_unit_usd_ar,$edit_unit_gbp_ar,$edit_actual_billable_ar,$edit_actual_billable_usd_ar,$edit_actual_billable_gbp_ar,$edit_total_contract_usd,$edit_total_contract_gbp)
	{
		$checkquery="SELECT id FROM budget_receivable WHERE project_id='".$projectid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE budget_receivable set cast_off_extent='".$edit_cast_off_extent."',confirmed_extent='".$edit_confirmed_extent."',unit='".$edit_unit_account_receivable."',unit_usd='".$edit_unit_usd_ar."',unit_gbp='".$edit_unit_gbp_ar."',actual_billable_unit='".$edit_actual_billable_ar."',actual_billable_amount_usd='".$edit_actual_billable_usd_ar."',actual_billable_amount_gbp='".$edit_actual_billable_gbp_ar."',total_usd='".$edit_total_contract_usd."',total_gbp='".$edit_total_contract_gbp."' WHERE project_id=".$projectid."");
				
		if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = 'Updated successfully';
			}
		}
		else
		{
			$result1 = mysql_query ("INSERT INTO budget_receivable (id, project_id, cast_off_extent, confirmed_extent, unit, unit_usd, unit_gbp, actual_billable_unit, actual_billable_amount_usd, actual_billable_amount_gbp, total_usd, total_gbp, created_by, created_on, modified_by, modified_on, flag)
			 VALUES('','".$projectid."','".$edit_cast_off_extent."','".$edit_confirmed_extent."','".$edit_unit_account_receivable."','".$edit_unit_usd_ar."','".$edit_unit_gbp_ar."','".$edit_actual_billable_ar."','".$edit_actual_billable_usd_ar."','".$edit_actual_billable_gbp_ar."','".$edit_total_contract_usd."','".$edit_total_contract_gbp."','',now(),'','','')");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Inserted successfully";
			}
		}
		

		echo json_encode($result);
		}
	
?>