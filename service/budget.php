<?php
//session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
//$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getActivity($_POST['job_code']);
			break;
		case 2:
			getProjectDetails($_POST['job_code']);
			break;
		case 3:
			getBudgetUnit($_POST["vendor"],$_POST["activityid"]);	
			break;
		case 4:
			insertBudgetExpense($_POST['job_code'],$_POST['budget_id'],$_POST['activity'],$_POST['stage'],$_POST['vendor'],$_POST['unit'],$_POST['budgeted_unit'],$_POST['rate_USD'],$_POST['rate_GBP'],$_POST['budgeted_amount_USD'],$_POST['budgeted_amount_GBP'],$_POST['actual_unit'],$_POST['actual_amount_USD'],$_POST['actual_amount_GBP']);
			break;
		case 5:
			deleteBudgetactivity($_POST['budgetid']);
			break;
		case 6:
			insertBudgetReceivables_p($_POST['job_code'],$_POST['projectID'],$_POST['rate_USD'],$_POST['rate_GBP'],$_POST['actual_unit'],$_POST['amt_USD'],$_POST['amt_GBP']);
			break;
		case 7:
			getStagesdependsonWorkflow($_POST['workflowid']);
			break;
		case 8:
			insertSchedule($_POST['job_code'],$_POST['stage'],$_POST['estimated_daysperstage'],$_POST['actual_daysperstage'],$_POST['estimated_start_date'],$_POST['actual_start_date'],$_POST['estimated_end_date'],$_POST['actual_end_date']);		
			break;
		case 9:
			getHeaderData($_POST['job_code']);
			break;
		case 10:
			getActivity_a($_POST['job_code']);
			break;
		case 11:
			insertBudgetReceivables_a($_POST['job_code'],$_POST['projectID'],$_POST['activity_name'],$_POST['uom'],$_POST['rate_USD'],$_POST['rate_GBP'],$_POST['actual_unit'],$_POST['amt_USD'],$_POST['amt_GBP']);
			break;
		
		
		default: 
			break;
	}
	function getActivity($job_code/*$workflowid,$projectid*/)
	{
		//echo $job_code;
		$workflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($workflow)) {
				
			$workflowid = $row['workflow'];
			$projectid = $row['id'];
			
		}
	//	echo $workflowid;
		$checkquery="SELECT id FROM budget_expense WHERE project_id='".$projectid."'";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			//echo $num_rows;
			if($num_rows >= 1)
		{
		
		$result = mysql_query("Select Distinct
			  budget_expense.project_id,
			  stages.workflow_id,
			   stages.stage_name as stage,
			  budget_expense.vendor as vendor,
			  budget_expense.unit as unit,
			  budget_expense.num_units_budgeted as num_units_budgeted,
			  budget_expense.rate_USD as rate_USD,
			  budget_expense.rate_GBP rate_GBP,
			  budget_expense.budgeted_amount_USD as budgeted_amount_USD,
			  budget_expense.budgeted_amount_GBP as budgeted_amount_GBP,
			  budget_expense.actual_units as actual_unit,
			  budget_expense.acual_amount_USD as actual_amount_USD,
			  budget_expense.actual_amount_GBP actual_amount_GBP,
			  stages.activity as activityid,
			  budget_expense.id as budgetExpense_id,
			  activity.name as activity_name
			 
			From
			  stages Left Join
			  budget_expense On stages.activity =
			    budget_expense.activity Inner Join
  activity On stages.activity =
    activity.id
			Where
			  (budget_expense.project_id = '".$projectid."' Or
			    budget_expense.project_id Is Null) And
			  stages.workflow_id = '".$workflowid."' And
			  stages.flag = 0 and budget_expense.flag = 0
			Union 
			Select Distinct
			  budget_expense.project_id,
			  budget_expense.workflow_id,
			  budget_expense.stage as stage,
			  budget_expense.vendor as vendor,
			  budget_expense.unit as unit,
			  budget_expense.num_units_budgeted as num_units_budgeted,
			  budget_expense.rate_USD as rate_USD,
			  budget_expense.rate_GBP as rate_GBP,
			  budget_expense.budgeted_amount_USD as budgeted_amount_USD,
			  budget_expense.budgeted_amount_GBP budgeted_amount_GBP,
			  budget_expense.actual_units as actual_unit,
			  budget_expense.acual_amount_USD as actual_amount_USD,
			  budget_expense.actual_amount_GBP as actual_amount_GBP,
			  budget_expense.activity As activityid,
  			  budget_expense.id as budgetExpense_id,
  			   activity.name as activity_name
			From
			  stages Right Join
			  budget_expense On stages.activity =
			    budget_expense.activity Inner Join
  activity On stages.activity =
    activity.id
			Where
			  budget_expense.project_id = '".$projectid."' And
			  budget_expense.workflow_id = '".$workflowid."'  And
			  budget_expense.flag = 0")or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
	   }
		else
			{
				
				$result = mysql_query("Select
		  activity.id as activityid,
		  activity.name As activity,
		  stages.stage_name As stage,
		  stages.id As stageid
		From
		  stages Inner Join
		  activity On stages.activity =
		    activity.id
		Where
		  stages.workflow_id = '".$workflowid."'  And
		  stages.flag = 0
		")or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
				
			}
	}
	 
	function getProjectDetails($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as budgetHeader_ClientName,
	  customers.code as budgetHeader_ClientCode,
	  customers.id as budgetHeader_clientId,
	  project_title.title as budgetHeader_ProjectName,
	  project_title.workflow as budgetHeader_workflow,
	  project_title.job_code as budgetHeader_Job,
	  project_title.id as budgetHeader_projectID,
	  project_title.castoff_extent as budgetHeader_castoffextent,
	  project_title.confirmed_extent as budgetHeader_confirmedextent
	  
	From
	  project_title Inner Join
	  customers On project_title.client =
	    customers.id
	Where
	  project_title.job_code = '".$job_code."'");
			
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
    
    function getBudgetUnit($vendor,$activityid)
	{
			$result1 = mysql_query("Select
	  vendors_ratecard.uom as uom,
	  vendors_ratecard.dollars As rate_USD,
	  vendors_ratecard.pounds as rate_GBP
	From
	  vendors_ratecard
	Where
	  vendors_ratecard.vendor_id = '".$vendor."' And
	  vendors_ratecard.activity = '".$activityid."'")or die(mysql_error());
			
			if(!$result1)
			{
			$result["failure"] = true;
			$result["message"] =  'Invalid query:'. mysql_error();
		}
		else
		{
			$result["success"] = true;
			$result["message"] =  'reportto:'. mysql_error();
		}
  
		while($row=mysql_fetch_object($result1))
	   	{
	   		
			$result ["data"] = $row;
	  	}
		
      	echo(json_encode($result));
	  
    }
	
	function insertBudgetExpense($job_code,$budget_id,$activity,$stage,$vendor,$unit,$budgeted_unit,$rate_USD,$rate_GBP,$budgeted_amount_USD,$budgeted_amount_GBP,$actual_unit,$actual_amount_USD,$actual_amount_GBP)
    {
    		$selectworkflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$workflow = $row['workflow'];
			$projectID = $row['id'];
			
		}
		
			$activity1 = explode(',',$activity);
			$budget_id1 = explode(',',$budget_id);
			$stage1 = explode(',',$stage);
			$vendor1 = explode(',',$vendor);
			$unit1 = explode(',',$unit);
			$budgeted_unit1 = explode(',',$budgeted_unit);
			$rate_USD1 = explode(',',$rate_USD);
			$rate_GBP1 = explode(',',$rate_GBP);
			$budgeted_amount_USD1 = explode(',',$budgeted_amount_USD);
			$budgeted_amount_GBP1 = explode(',',$budgeted_amount_GBP);
			$actual_unit1 = explode(',',$actual_unit);
			$actual_amount_USD1 = explode(',',$actual_amount_USD);
			$actual_amount_GBP1 = explode(',',$actual_amount_GBP);
		for ($i = 0; $i < count($activity1)-1; $i++)
		{
			$checkquery="SELECT id FROM budget_expense WHERE project_id='".$projectID."' And activity='".$activity1[$i]."' ";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			if($num_rows == 1)
			{
				
				$result1 = mysql_query("UPDATE budget_expense SET  workflow_id='".$workflow."',activity = '".$activity1[$i]."', stage = '".$stage1[$i]."', vendor = '".$vendor1[$i]."', unit = '".$unit1[$i]."', num_units_budgeted = '".$budgeted_unit1[$i]."', rate_USD = '".$rate_USD1[$i]."', rate_GBP = '".$rate_GBP1[$i]."', budgeted_amount_USD ='".$budgeted_amount_USD1[$i]."' , budgeted_amount_GBP ='".$budgeted_amount_GBP1[$i]."', actual_units = '".$actual_unit1[$i]."', acual_amount_USD = '".$actual_amount_USD1[$i]."', actual_amount_GBP = '".$actual_amount_GBP1[$i]."' WHERE id = '".$budget_id1[$i]."'");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Budget saved successfully";
				}
		  }
			
			else
			{
				$result1 = mysql_query("INSERT INTO budget_expense (id ,project_id ,workflow_id,activity ,stage ,vendor ,unit ,num_units_budgeted ,rate_USD ,rate_GBP ,budgeted_amount_USD ,budgeted_amount_GBP ,actual_units ,acual_amount_USD ,actual_amount_GBP ,created_by ,created_on ,modified_by ,modified_on ,flag)
                               VALUES ('' ,'".$projectID."', '".$workflow."','".$activity1[$i]."','".$stage1[$i]."','".$vendor1[$i]."','".$unit1[$i]."',  '".$budgeted_unit1[$i]."',  '".$rate_USD1[$i]."',  '".$rate_GBP1[$i]."',  '".$budgeted_amount_USD1[$i]."',  '".$budgeted_amount_GBP1[$i]."',  '".$actual_unit1[$i]."',  '".$actual_amount_USD1[$i]."',  '".$actual_amount_GBP1[$i]."',  '', '','', '0000-00-00 00:00:00',  '')");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Budget inserted successfully";
				}
			}
		}
		echo json_encode($result);
	}

function deleteBudgetactivity($budgetid)
    {
		$checkquery="SELECT id FROM budget_expense WHERE id='".$budgetid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE budget_expense SET flag=1 WHERE id='".$budgetid."'");
				
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
			else
			{
				$result["failure"] = true;
				$result["message"] =  'Budget Expending does not exist';
			}
		
		echo json_encode($result);
	}
	
	function insertBudgetReceivables_p($job_code,$projectID,$rate_USD,$rate_GBP,$actual_unit,$amt_USD,$amt_GBP)
    {
/*	$selectworkflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$workflow = $row['workflow'];
			$projectID = $row['id'];
			
		// }*/
		
			$rate_USD1 = explode(',',$rate_USD);
			$rate_GBP1 = explode(',',$rate_GBP);
			$actual_unit1 = explode(',',$actual_unit);
			$amt_USD1 = explode(',',$amt_USD);
			$amt_GBP1 = explode(',',$amt_GBP);
			
		for ($i = 0; $i < count($rate_USD1)-1; $i++)
		{
			$checkquery="SELECT id FROM budget_receivable WHERE project_id='".$projectID."'";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			if($num_rows == 1)
			{
				
				$result1 = mysql_query("UPDATE budget_receivable SET  unit='Per Page',unit_usd = '".$rate_USD1[$i]."', unit_gbp = '".$rate_GBP1[$i]."', actual_billable_unit = '".$actual_unit1[$i]."', actual_billable_amount_usd= '".$amt_USD1[$i]."', actual_billable_amount_gbp = '".$amt_GBP1[$i]."' WHERE project_id='".$projectID."'");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Budget saved successfully";
				}
		  }
			
			else
			{
				$result1 = mysql_query("INSERT INTO budget_receivable (id ,project_id, activity, unit, unit_usd, unit_gbp, actual_billable_unit, actual_billable_amount_usd, actual_billable_amount_gbp,total_usd,total_gbp,created_by,created_on,modified_by,modified_on,flag)
                                VALUES ('','".$projectID."',' ','Per Project','".$rate_USD1[$i]."','".$rate_GBP1[$i]."','".$actual_unit1[$i]."','".$amt_USD1[$i]."','".$amt_GBP1[$i]."','".$amt_USD1[$i]."', '".$amt_GBP1[$i]."','','','','','')");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Budget inserted successfully";
				}
			}
		}
		echo json_encode($result);
	}
	function getStagesdependsonWorkflow($workflowid)
	{
		
			$result = mysql_query("Select
		  activity.id as activityid,
		  activity.name As activity,
		  stages.stage_name As stage,
		  stages.id As stageid
		From
		  stages Inner Join
		  activity On stages.activity =
		    activity.id
		Where
		  stages.workflow_id = '".$workflowid."'  And
		  stages.flag = 0
		")or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
		
	}
	
	
	function insertSchedule($job_code,$stage,$estimated_daysperstage,$actual_daysperstage,$estimated_start_date,$actual_start_date,$estimated_end_date,$actual_end_date)
    {
    	$selectworkflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$workflow = $row['workflow'];
			$projectID = $row['id'];
			
		}
			//$activity1 = explode(',',$activity);
			//$budget_id1 = explode(',',$budget_id);
			$stage1 = explode(',',$stage);
			$estimated_daysperstage1 = explode(',',$estimated_daysperstage);
			$actual_daysperstage1 = explode(',',$actual_daysperstage);
			$estimated_start_date1 = explode(',',$estimated_start_date);
			$actual_start_date1 = explode(',',$actual_start_date);
			$estimated_end_date1 = explode(',',$estimated_end_date);
			$actual_end_date1 = explode(',',$actual_end_date);
			/*$budgeted_amount_GBP1 = explode(',',$budgeted_amount_GBP);
			$actual_unit1 = explode(',',$actual_unit);
			$actual_amount_USD1 = explode(',',$actual_amount_USD);
			$actual_amount_GBP1 = explode(',',$actual_amount_GBP);*/
		for ($i = 0; $i < count($stage1)-1; $i++)
		{
			$checkquery="SELECT id FROM schedule WHERE project_id='".$projectID."' ";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			if($num_rows == 1)
			{
				
				$result1 = mysql_query("UPDATE schedule SET  estimated_daysperstage = '".$estimated_daysperstage1[$i]."', actual_daysperstage = '".$actual_daysperstage1[$i]."', estimated_start_date = '".$estimated_start_date1[$i]."', actual_start_date = '".$actual_start_date1[$i]."', estimated_end_date = '".$estimated_end_date1[$i]."', actual_end_date = '".$actual_end_date1[$i]."' WHERE id = '".$budget_id1[$i]."'");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "shedule saved successfully";
				}
		  }
			
			else
			{
			//	echo 'insert';
				$result1 = mysql_query("INSERT INTO schedule (id ,project_id ,workflow_id,stage ,estimated_daysperstage ,actual_daysperstage ,estimated_start_date ,actual_start_date ,estimated_end_date ,actual_end_date ,weekday ,created_by ,created_on ,modified_by ,modified_on ,flag)
                               VALUES ('' ,'".$projectID."', '".$workflow."','".$stage1[$i]."','".$estimated_daysperstage1[$i]."','".$actual_daysperstage1[$i]."',  '".$estimated_start_date1[$i]."',  '".$actual_start_date1[$i]."',  '".$estimated_end_date1[$i]."',  '".$actual_end_date1[$i]."','', '','', '0000-00-00 00:00:00', '', '')");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "shedule inserted successfully";
				}
			}
		}
		echo json_encode($result);
	}
	function getHeaderData($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as editbudgetHeader_ClientName,
	  customers.code as editbudgetHeader_ClientCode,
	  customers.id as editbudgetHeader_clientId,
	  project_title.title as editbudgetHeader_ProjectName,
	  project_title.workflow as editbudgetHeader_workflow,
	  project_title.job_code as edit_Job_code,
	  project_title.id as editbudgetHeader_projectID,
	  project_title.job_code as editbudgetHeader_projectID,
	  project_title.castoff_extent as editbudgetHeader_castoffextent,
	  project_title.confirmed_extent as editbudgetHeader_confirmedextent
	  
	From
	  project_title Inner Join
	  customers On project_title.client =
	  customers.id
	Where
	  project_title.job_code = '".$job_code."'");
			
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
	
	function getActivity_a($job_code)
	{
		$workflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($workflow)) {
				
			$workflowid = $row['workflow'];
			$projectid = $row['id'];
			
		}
		$result = mysql_query("
		 Select
 customers_ratecard.uom as uom,
 customers_ratecard.dollars as rate_USD,
 customers_ratecard.pounds as rate_GBP,
 activity.id as activity_name
From
 stages Left Join
 customers_ratecard On stages.activity =
   customers_ratecard.activity Inner Join
 activity On stages.activity =
   activity.id
Where
 stages.workflow_id = '".$workflowid."' And
 stages.flag = 0
")or die(mysql_error());
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
	}
	
	function insertBudgetReceivables_a($job_code,$projectID,$activity_name,$uom,$rate_USD,$rate_GBP,$actual_unit,$amt_USD,$amt_GBP)
    {
/*	$selectworkflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$workflow = $row['workflow'];
			$projectID = $row['id'];
			
		// }*/
		    $activity_name1 = explode(',',$activity_name);
		    $uom1 = explode(',',$uom);
			$rate_USD1 = explode(',',$rate_USD);
			$rate_GBP1 = explode(',',$rate_GBP);
			$actual_unit1 = explode(',',$actual_unit);
			$amt_USD1 = explode(',',$amt_USD);
			$amt_GBP1 = explode(',',$amt_GBP);
			
		for ($i = 0; $i < count($activity_name1)-1; $i++)
		{
			$checkquery="SELECT id FROM budget_receivable WHERE project_id='".$projectID."'And activity='".$activity_name1[$i]."' ";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			if($num_rows == 1)
			{
				
				$result1 = mysql_query("UPDATE budget_receivable SET  unit='".$uom1[$i]."',unit_usd = '".$rate_USD1[$i]."', unit_gbp = '".$rate_GBP1[$i]."', actual_billable_unit = '".$actual_unit1[$i]."', actual_billable_amount_usd= '".$amt_USD1[$i]."', actual_billable_amount_gbp = '".$amt_GBP1[$i]."',total_usd='".$amt_USD1[$i]."',total_gbp='".$amt_USD1[$i]."' WHERE project_id='".$projectID."'And activity='".$activity_name1[$i]."'");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Budget saved successfully";
				}
		  }
			
			else
			{
				$result1 = mysql_query("INSERT INTO budget_receivable (id ,project_id, activity, unit, unit_usd, unit_gbp, actual_billable_unit, actual_billable_amount_usd, actual_billable_amount_gbp,total_usd,total_gbp,created_by,created_on,modified_by,modified_on,flag)
                                VALUES ('','".$projectID."','".$activity_name1[$i]."','".$uom1[$i]."','".$rate_USD1[$i]."','".$rate_GBP1[$i]."','".$actual_unit1[$i]."','".$amt_USD1[$i]."','".$amt_GBP1[$i]."','".$amt_USD1[$i]."', '".$amt_GBP1[$i]."','','','','','')");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Budget inserted successfully";
				}
			}
		}
		echo json_encode($result);
	}
	?>