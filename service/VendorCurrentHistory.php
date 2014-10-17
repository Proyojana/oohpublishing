<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getCurrentProjects($_POST["vendorid"]);
			break;
	     case 2:
			getHistoryProjects($_POST["vendorid"]);
			break;				
		default: 
			break;
	}
	

function getCurrentProjects($vendorid)
	{
 		$num_result = mysql_query ("Select
  vendors.id,
  project_title.title As cur_proj_title,
  project_title.author As cur_proj_authors,
  project_title.hb_isbn ,
  project_title.pb_isbn,
  project_title.job_code As cur_proj_code,
  budget_expense.project_id,
  budget_total_detail.invoice_date,
  project_title.agreed_deadline As cur_proj_deadline,
  project_title.format
From
  budget_expense Inner Join
  vendors On vendors.id =
  budget_expense.vendor Inner Join
  project_title On budget_expense.project_id =
    project_title.id Inner Join
  budget_total_detail On budget_expense.project_id
    = budget_total_detail.project_id
Where
  vendors.id =  '".$vendorid."' and budget_total_detail.invoice_date Is Not Null and project_title.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  vendors.id,
  project_title.title As cur_proj_title,
  project_title.author As cur_proj_authors,
  project_title.hb_isbn,
  project_title.pb_isbn,
  project_title.job_code As cur_proj_code,
  budget_expense.project_id,
  budget_total_detail.invoice_date,
  project_title.agreed_deadline As cur_proj_deadline,
  project_title.format
From
  budget_expense Inner Join
  vendors On vendors.id =
  budget_expense.vendor Inner Join
  project_title On budget_expense.project_id =
    project_title.id Inner Join
  budget_total_detail On budget_expense.project_id
    = budget_total_detail.project_id
Where
  vendors.id =  '".$vendorid."' and budget_total_detail.invoice_date Is Not Null and project_title.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}   
	
	
function getHistoryProjects($vendorid)
	{
 		$num_result = mysql_query ("Select
  vendors.id,
  project_title.title As histry_proj_title,
  project_title.author As histry_proj_authors,
  project_title.hb_isbn As histry_proj_hbisbn,
  project_title.pb_isbn As histry_proj_pbisbn,
  project_title.job_code As histry_proj_code,
  budget_expense.project_id,
  budget_total_detail.invoice_date,
  project_title.agreed_deadline As histry_proj_deadline,
  project_title.format
From
  budget_expense Inner Join
  vendors On vendors.id =
  budget_expense.vendor Inner Join
  project_title On budget_expense.project_id =
    project_title.id Inner Join
  budget_total_detail On budget_expense.project_id
    = budget_total_detail.project_id
Where
  vendors.id =  '".$vendorid."' and budget_total_detail.invoice_date Is Null and project_title.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  vendors.id,
  project_title.title As histry_proj_title,
  project_title.author As histry_proj_authors,
  project_title.hb_isbn As histry_proj_hbisbn,
  project_title.pb_isbn As histry_proj_pbisbn,
  project_title.job_code As histry_proj_code,
  budget_expense.project_id,
  budget_total_detail.invoice_date,
  project_title.agreed_deadline As histry_proj_deadline,
  project_title.format
From
  budget_expense Inner Join
  vendors On vendors.id =
  budget_expense.vendor Inner Join
  project_title On budget_expense.project_id =
    project_title.id Inner Join
  budget_total_detail On budget_expense.project_id
    = budget_total_detail.project_id
Where
  vendors.id =  '".$vendorid."' and budget_total_detail.invoice_date Is Null and project_title.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}   	
	
		
?>