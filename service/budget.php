<?php
//session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
//$id=$_SESSION['user_no'];
	switch($_POST['action']) /*Read action sent from front-end */
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
			insertBudgetExpense($_POST['job_code'],$_POST['budget_id'],$_POST['activity'],$_POST['currency_rate'],$_POST['unit_of_measurement'],$_POST['vendor'],$_POST['no_of_unit'],$_POST['rate_USD_GBP'],$_POST['budgeted_amount_USD_GBP'],$_POST['actual_amount_USD_GBP']);
			break;
		case 5:
			deleteBudgetactivity($_POST['budgetid']);
			break;
		case 6:
			insertBudgetReceivables_p($_POST['job_code'],$_POST['projectID'],$_POST['rate_USD'],$_POST['rate_GBP'],$_POST['no_of_unit'],$_POST['budgeted_USD'],$_POST['budgeted_GBP'],$_POST['actual_amount_USD'],$_POST['actual_amount_GBP']);
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
			insertBudgetReceivables_a($_POST['job_code'],$_POST['projectID'],$_POST['activity_name'],$_POST['currency_rate'],$_POST['unit_of_measurement'],$_POST['rate_USD_GBP'],$_POST['no_of_unit'],$_POST['budgeted_USD_GBP'],$_POST['actual_amount_USD_GBP']);
			break;
		case 12:
			getReceivable_p($_POST['job_code']);
			break;
		case 13:
			getReceivable_a($_POST['job_code']);
			break;
	   case 14:
			insertBudgetDetails($_POST['projectID'],$_POST['ponumber1'],$_POST['ponumber2'],$_POST['total_receive_USD'],$_POST['total_receive_GDP'],$_POST['total_receive_project_USD'],$_POST['total_receive_project_GDP'],$_POST['total_pay_USD'],$_POST['total_pay_GDP'],$_POST['profit_GDP'],$_POST['profit_percentage'],$_POST['edit_total_receive_budgeted_GBP'],$_POST['edit_total_receive_budgeted_total'],$_POST['edit_total_receive_actual_USD'],$_POST['edit_total_receive_actual_total'],$_POST['edit_total_pay_budgeted_GBP'],$_POST['edit_total_pay_budgeted_total'],$_POST['edit_total_pay_actual_USD'],$_POST['edit_total_pay_actual_total'],$_POST['edit_profit_budget_GBP'],$_POST['edit_profit_budget_percentage'],$_POST['invoice_date'],$_POST['prostatus']);
			break;
       case 15:
		    getCurrencyRate();
		    break; 
	   case 16:
		    getTotal($_POST['project_id']);
		    break;
	  case 17:
		    getExtent($_POST['project_id']);
		    break;
	  case 18:
			getActivity_edit($_POST['job_code'],$_POST['activity']);
			break;
	  case 19:
			get_total_for_project($_POST['job_code']);
			break;			
	  case 20:
			deleteBudgetactivityReceivables_a($_POST['receivable_id']);
			break;
	  case 21:
			deleteBudgetprojectReceivables_p($_POST['receivable_id']);
			break;
	 case 22:
			get_total_for_activity($_POST['job_code']);
			break;
	 case 23:
			get_total_for_expense($_POST['job_code']);
			break;
	 case 24:
			getUnitOfMeasurement($_POST['unit_of_measurement'],$_POST['edit_Job_code']);
			break;
	 case 25:
			getCurrencyRateReceivable($_POST['edit_Job_code'],$_POST['activityid']);
			break;
	 case 26:
			getUnitOfMeasurementPayable($_POST['unit_of_measurement'],$_POST['edit_Job_code']);
			break;
	 case 27:
			getCurrencyRatePayable($_POST['edit_Job_code'],$_POST['activityid']);
			break;
	case 28:
			getbudgetdetails($_POST['projectID']);
			break;
	case 29:
			getbudgetinfodetails($_POST['projectID']);
			break;
	case 30:
			getbudgetdetailspay($_POST['projectID']);
			break;
	case 31:
			getbudgetpayableinfodetails($_POST['projectID']);
			break;
	case 32:
			getbudgetprofit($_POST['projectID']);
			break;
	case 33:
			getProductionReport($_POST['projectid']);
			break;
	default: 
			break;
	}
	function getActivity($job_code)
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
			  budget_expense.vendor as vendor,
			  budget_expense.no_of_unit as no_of_unit,
			  budget_expense.rate_USD_GBP as rate_USD_GBP,
			  		  
			 budgeted_amount_USD_GBP as budgeted_amount_USD_GBP,
             
			  acual_amount_USD_GBP as actual_amount_USD_GBP,
			 
			  stages.activity as activityid,
			  budget_expense.id as budgetExpense_id,
			 budget_expense.currency_rate as currency_rate,
			  budget_expense.unit_of_measurement as unit_of_measurement,			  
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
			 budget_expense.vendor as vendor,
			  budget_expense.no_of_unit as no_of_unit,
			  budget_expense.rate_USD_GBP as rate_USD_GBP,
			  
			 budgeted_amount_USD_GBP as budgeted_amount_USD_GBP,
             
			  acual_amount_USD_GBP as actual_amount_USD_GBP,
			 
			  budget_expense.activity As activityid,
  			  budget_expense.id as budgetExpense_id,
			    budget_expense.currency_rate as currency_rate,
			  budget_expense.unit_of_measurement as unit_of_measurement,	
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
		  stages.id As stageid,
		  project_title.confirmed_extent as no_of_unit
		From
		  stages Inner Join
		  activity On stages.activity =
		    activity.id,
		    project_title
		Where
		  stages.workflow_id = '".$workflowid."'  And
		  stages.flag = 0 And project_title.id='".$projectid."'
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
	  project_title.job_code = '".$job_code."' ");
			
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
	
	function insertBudgetExpense($job_code,$budget_id,$activity,$currency_rate,$unit_of_measurement,$vendor,$no_of_unit,$rate_USD_GBP,$budgeted_amount_USD_GBP,$actual_amount_USD_GBP)
    {
    		$selectworkflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$workflow = $row['workflow'];
			$projectID = $row['id'];
			
		}
		
			$activity1 = explode(',',$activity);
			$budget_id1 = explode(',',$budget_id);
			$vendor1 = explode(',',$vendor);
			$no_of_unit1 = explode(',',$no_of_unit);
			$rate_USD1_GBP = explode(',',$rate_USD_GBP);
			//$rate_GBP1 = explode(',',$rate_GBP);
			$budgeted_amount_USD1_GBP = explode(',',$budgeted_amount_USD_GBP);
			//$budgeted_amount_GBP1 = explode(',',$budgeted_amount_GBP);
			$actual_amount_USD1_GBP = explode(',',$actual_amount_USD_GBP);
			//$actual_amount_GBP1 = explode(',',$actual_amount_GBP);
			$currency_rate1 = explode(',',$currency_rate);
			$unit_of_measurement1 = explode(',',$unit_of_measurement);
		for ($i = 0; $i < count($activity1)-1; $i++)
		{
			$checkquery="SELECT id FROM budget_expense WHERE project_id='".$projectID."' And activity='".$activity1[$i]."' ";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			if($num_rows == 1)
			{
				
				$result1 = mysql_query("UPDATE budget_expense SET  workflow_id='".$workflow."',activity = '".$activity1[$i]."',currency_rate = '".$currency_rate1[$i]."', unit_of_measurement = '".$unit_of_measurement1[$i]."', vendor = '".$vendor1[$i]."', no_of_unit = '".$no_of_unit1[$i]."', rate_USD_GBP = '".$rate_USD1_GBP[$i]."', budgeted_amount_USD_GBP ='".$budgeted_amount_USD1_GBP[$i]."', acual_amount_USD_GBP = '".$actual_amount_USD1_GBP[$i]."' WHERE id = '".$budget_id1[$i]."'");
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
				$result1 = mysql_query("INSERT INTO budget_expense (id ,project_id,workflow_id,activity,vendor ,no_of_unit,rate_USD_GBP,budgeted_amount_USD_GBP,acual_amount_USD_GBP ,created_by,created_on,modified_by,modified_on,flag)
                                VALUES ('' ,'".$projectID."', '".$workflow."','".$activity1[$i]."','".$currency_rate1[$i]."','".$unit_of_measurement1[$i]."','".$vendor1[$i]."','".$no_of_unit1[$i]."',  '".$rate_USD1_GBP[$i]."',  '".$budgeted_amount_USD1_GBP[$i]."',  '".$actual_amount_USD1_GBP[$i]."',  '', '','', '0000-00-00 00:00:00',  '')");
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
	
	function insertBudgetReceivables_p($job_code,$projectID,$rate_USD,$rate_GBP,$no_of_unit,$budgeted_USD,$budgeted_GBP,$actual_amount_USD,$actual_amount_GBP)
    {
/*	$selectworkflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$workflow = $row['workflow'];
			$projectID = $row['id'];
			
		// }*/
		
			$rate_USD1 = explode(',',$rate_USD);
			$rate_GBP1 = explode(',',$rate_GBP);
			$no_of_unit1 = explode(',',$no_of_unit);
			$budgeted_USD1 = explode(',',$budgeted_USD);
			$budgeted_GBP1 = explode(',',$budgeted_GBP);
			$actual_amount_USD1 = explode(',',$actual_amount_USD);
			$actual_amount_GBP1 = explode(',',$actual_amount_GBP);
			
		for ($i = 0; $i < count($rate_USD1)-1; $i++)
		{
			$checkquery="SELECT id FROM budget_receivable_project WHERE project_id='".$projectID."'";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			if($num_rows == 1)
			{
				
				$result1 = mysql_query("UPDATE budget_receivable_project SET  no_of_unit='".$no_of_unit1[$i]."', rate_usd = '".$rate_USD1[$i]."', rate_gbp = '".$rate_GBP1[$i]."', budgeted_usd = '".$budgeted_USD1[$i]."', 
		budgeted_gbp= '".$budgeted_GBP1[$i]."', actual_usd = '".$actual_amount_USD1[$i]."',actual_gbp = '".$actual_amount_GBP1[$i]."' WHERE project_id='".$projectID."'");
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
				$result1 = mysql_query("INSERT INTO budget_receivable_project (id ,project_id, no_of_unit, rate_usd, rate_gbp, budgeted_usd, budgeted_gbp,actual_usd,actual_gbp,created_by,created_on,modified_by,modified_on,flag)
                                VALUES ('','".$projectID."','".$no_of_unit1[$i]."','".$rate_USD1[$i]."','".$rate_GBP1[$i]."','".$budgeted_USD1[$i]."','".$budgeted_GBP1[$i]."','".$actual_amount_USD1[$i]."','".$actual_amount_GBP1[$i]."','','','','','')");
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
  customers.name As editbudgetHeader_ClientName,
  customers.code As editbudgetHeader_ClientCode,
  customers.id As editbudgetHeader_clientId,
  project_title.project_name As editbudgetHeader_ProjectName,
  project_title.workflow As editbudgetHeader_workflow,
  project_title.job_code As edit_Job_code,
  project_title.id As editbudgetHeader_projectID,
  project_title.castoff_extent As editbudgetHeader_castoffextent,
  project_title.confirmed_extent As editbudgetHeader_confirmedextent,
  project_title.conversionrate As conversion_rate,
  author.name As editbudgetHeader_author_name,
  budget_total_detail.ponumber1 As edit_budgetHeader_ponumber1,
  budget_total_detail.ponumber2 As edit_budgetHeader_ponumber2,
  budget_total_detail.invoice_date As invoice_date,
  budget_total_detail.status As prostatus
From
  project_title Inner Join
  customers On project_title.client = customers.id Inner Join
  budget_total_detail On budget_total_detail.project_id =
    project_title.id Inner Join
  author On project_title.job_code = author.job_code
Where
  project_title.job_code = '".$job_code."' And
 (author.author = 'Author' Or
    author.author ='Main Contact' or author.author ='Editor' or author.author ='Others')");
			
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
		 Select distinct
activity.id as activity_name,
stages.ratecard_USD as rate_USD,
stages.ratecard_GBP as rate_GBP,
project_title.confirmed_extent as no_of_unit,
project_title.castoff_extent as cast,
(ratecard_USD*confirmed_extent) as budgeted_amount_USD,
(ratecard_GBP*confirmed_extent) as budgeted_amount_GBP,
(ratecard_USD*confirmed_extent) as actual_amount_USD,
(ratecard_GBP*confirmed_extent) as actual_amount_GBP
 From
 stages Inner Join
 activity On stages.activity =
   activity.id,
   project_title
Where
 stages.workflow_id = '".$workflowid."' And
 stages.flag = 0 And
 project_title.id = '".$projectid."'
")or die(mysql_error());
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
	}
	
	function insertBudgetReceivables_a($job_code,$projectID,$activity_name,$currency_rate,$unit_of_measurement,$rate_USD_GBP,$no_of_unit,$budgeted_USD_GBP,$actual_amount_USD_GBP)
    {
/*	$selectworkflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$workflow = $row['workflow'];
			$projectID = $row['id'];
			
		// }*/
		    $activity_name1 = explode(',',$activity_name);
		    //$activity_id1 = explode(',',$activity_id);
		    $no_of_unit1 = explode(',',$no_of_unit);
			$rate_USD1_GBP = explode(',',$rate_USD_GBP);
			//$rate_GBP1 = explode(',',$rate_GBP);
			$budgeted_USD1_GBP = explode(',',$budgeted_USD_GBP);
			//$budgeted_GBP1 = explode(',',$budgeted_GBP);
			$actual_amount_USD1_GBP = explode(',',$actual_amount_USD_GBP);
			//$actual_amount_GBP1 = explode(',',$actual_amount_GBP);
			$currency_rate1 = explode(',',$currency_rate);
			$unit_of_measurement1 = explode(',',$unit_of_measurement);
			
		for ($i = 0; $i < count($activity_name1)-1; $i++)
		{
			$checkquery="SELECT id FROM budget_receivable WHERE project_id='".$projectID."'And activity='".$activity_name1[$i]."' ";
			//echo "activity id".$activity_name1[$i];
			/*$workflow = mysql_query("Select id From activity Where name = '".$activity_name1[$i]."'");
while($row = mysql_fetch_array($workflow))
{
$activity_id[] = $row['id'];


}*/
			
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			if($num_rows == 1)
			{
				
				$result1 = mysql_query("UPDATE budget_receivable SET  currency_rate = '".$currency_rate1[$i]."', unit_of_measurement = '".$unit_of_measurement1[$i]."',no_of_unit='".$no_of_unit1[$i]."', rate_usd_gbp= '".$rate_USD1_GBP[$i]."', budgeted_usd_gbp = '".$budgeted_USD1_GBP[$i]."', actual_usd_gbp = '".$actual_amount_USD1_GBP[$i]."' WHERE project_id='".$projectID."'And activity='".$activity_name1[$i]."'");
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
				$result1 = mysql_query("INSERT INTO budget_receivable (id ,project_id, activity,currency_rate,unit_of_measurement, no_of_unit, rate_usd_gbp, budgeted_usd_gbp, actual_usd_gbp,created_by,created_on,modified_by,modified_on,flag)
                                VALUES ('','".$projectID."','".$activity_name1[$i]."','".$currency_rate1[$i]."','".$unit_of_measurement1[$i]."','".$no_of_unit1[$i]."','".$rate_USD1_GBP[$i]."','".$budgeted_USD1_GBP[$i]."','".$actual_amount_USD1_GBP[$i]."','','','','','')");
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
function getReceivable_p($job_code)
	{
		$workflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($workflow)) {
				
			$workflowid = $row['workflow'];
			$projectid = $row['id'];
			
		}
		$result = mysql_query("
		 Select
  budget_receivable_project.id as budgetReceive_id,
  budget_receivable_project.rate_gbp as rate_GBP,
  budget_receivable_project.rate_usd as rate_USD,
  budget_receivable_project.no_of_unit as no_of_unit,
  budget_receivable_project.actual_usd as actual_amount_USD,
  budget_receivable_project.actual_gbp as actual_amount_GBP,
   (ratecard_USD*confirmed_extent) as budgeted_amount_USD,
(ratecard_GBP*confirmed_extent) as budgeted_amount_GBP  
  
From
  budget_receivable_project
Where
  budget_receivable_project.project_id = '".$projectid."'
  And
			  budget_receivable_project.flag = 0
")or die(mysql_error());
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
	}
function getReceivable_a($job_code)
	{
		$workflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($workflow)) {
				
			$workflowid = $row['workflow'];
			$projectid = $row['id'];
			
		}
		$result = mysql_query("
		Select
		
 budget_receivable.id As budgetReceive_id,
 budget_receivable.currency_rate as currency_rate,
 budget_receivable.unit_of_measurement as unit_of_measurement,
 budget_receivable.no_of_unit As no_of_unit,

 budget_receivable.rate_usd_gbp As rate_USD_GBP,
budgeted_usd_gbp as budgeted_amount_USD_GBP,

actual_usd_gbp As actual_amount_USD_GBP,

 activity.name as activity_name,
 activity.id as activityid
From
 budget_receivable Inner Join
 activity On budget_receivable.activity =
   activity.id
Where
 budget_receivable.project_id ='".$projectid."'
And
			  budget_receivable.flag = 0")or die(mysql_error());
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
	}

function insertBudgetDetails($projectid,$ponumber1,$ponumber2,$total_receive_USD,$total_receive_GDP,$total_receive_project_USD,$total_receive_project_GDP,$total_pay_USD,$total_pay_GDP,$profit_GDP,$profit_percentage,$edit_total_receive_budgeted_GBP,$edit_total_receive_budgeted_total,$edit_total_receive_actual_USD,$edit_total_receive_actual_total,$edit_total_pay_budgeted_GBP,$edit_total_pay_budgeted_total,$edit_total_pay_actual_USD,$edit_total_pay_actual_total,$edit_profit_budget_GBP,$edit_profit_budget_percentage,$invoice_date,$prostatus){
$checkquery="SELECT id FROM budget_total_detail WHERE project_id='".$projectid."' ";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			if($num_rows == 1)
			    {
			    	if($prostatus=="")
									{
									$prostatus="Current";
									}
					
					
				
				$result1 = mysql_query("UPDATE budget_total_detail SET  ponumber1='".$ponumber1."',ponumber2 = '".$ponumber2."', total_receive_usd = '".$total_receive_USD."', edit_total_receive_budgeted_GBP = '".$edit_total_receive_budgeted_GBP."', edit_total_receive_budgeted_total = '".$edit_total_receive_budgeted_total."', edit_total_receive_actual_USD = '".$edit_total_receive_actual_USD."', total_receive_gdp = '".$total_receive_GDP."',edit_total_receive_actual_total = '".$edit_total_receive_actual_total."',total_receive_project_usd='".$total_receive_project_USD."', total_receive_project_gdp='".$total_receive_project_GDP."',total_pay_usd = '".$total_pay_USD."',edit_total_pay_budgeted_GBP = '".$edit_total_pay_budgeted_GBP."',edit_total_pay_budgeted_total = '".$edit_total_pay_budgeted_total."', edit_total_pay_actual_USD = '".$edit_total_pay_actual_USD."',total_pay_gdp = '".$total_pay_GDP."',edit_total_pay_actual_total = '".$edit_total_pay_actual_total."', project_profit_gdp='".$profit_GDP."', project_profit_per='".$profit_percentage."',budget_project_profit='".$edit_profit_budget_GBP."',budget_profit_per='".$edit_profit_budget_percentage."', invoice_date='".$invoice_date."', status='".$prostatus."'  WHERE project_id = '".$projectid."'");
				
				
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
				$result1 = mysql_query("INSERT INTO budget_total_detail (id ,project_id,ponumber1,ponumber2,total_receive_usd ,edit_total_receive_budgeted_GBP,edit_total_receive_budgeted_total,edit_total_receive_actual_USD,total_receive_gdp,edit_total_receive_actual_total,total_receive_project_usd,total_receive_project_gdp,total_pay_usd,edit_total_pay_budgeted_GBP,edit_total_pay_budgeted_total,edit_total_pay_actual_USD,total_pay_gdp,edit_total_pay_actual_total,project_profit_gdp,project_profit_per,budget_project_profit,budget_profit_per,invoice_date,status)
                                VALUES ('' ,'".$projectid."', '".$ponumber1."','".$ponumber2."','".$total_receive_USD."','".$edit_total_receive_budgeted_GBP."','".$edit_total_receive_budgeted_total."','".$edit_total_receive_actual_USD."','".$total_receive_GDP."','".$edit_total_receive_actual_total."', '".$total_receive_project_USD."','".$total_receive_project_GDP."','".$total_pay_USD."','".$edit_total_pay_budgeted_GBP."','".$edit_total_pay_budgeted_total."','".$edit_total_pay_actual_USD."', '".$total_pay_GDP."', '".$profit_GDP."', '".$edit_total_pay_actual_total."','".$edit_profit_budget_GBP."','".$edit_profit_budget_percentage."','".$profit_percentage."', '', 'Current')");
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
			
function getCurrencyRate()
	{
		$now   = new DateTime();
        $month = (int)$now->format("m");
		
		$result1 = mysql_query("Select
  		rate As rate
		From
  		currency 
		Where
  		month = '".$month."'")or die(mysql_error());
		
		if(!$result1)
		{
			$result["failure"] = true;
			$result["message"] =  'Invalid query:'. mysql_error();
		}
		else
		{
			$result["success"] = true;
			$result["message"] =  'rate:'. mysql_error();
		}
  
		while($row=mysql_fetch_object($result1))
	   	{
	   		
			$result ["data"] = $row;
	  	}
		
      	echo(json_encode($result));
      //echo '({"results":'.json_encode($data).'})';
	  
    }
	function getTotal($project_id)
 	{
		$result1 = mysql_query ("Select
 budget_total_detail.total_receive_usd as edit_total_receive_USD,
 budget_total_detail.total_receive_gdp as edit_total_receive_GBP,
 budget_total_detail.edit_total_receive_budgeted_GBP as edit_total_receive_budgeted_GBP,
 budget_total_detail.edit_total_receive_budgeted_total as edit_total_receive_budgeted_total,
 budget_total_detail.edit_total_receive_actual_USD as edit_total_receive_actual_USD,
 budget_total_detail.edit_total_receive_actual_total as edit_total_receive_actual_total,
 budget_total_detail.total_pay_gdp as edit_total_pay_GBP,
 budget_total_detail.total_pay_usd as edit_total_pay_USD,
 budget_total_detail.edit_total_pay_budgeted_GBP as edit_total_pay_budgeted_GBP,
 budget_total_detail.edit_total_pay_budgeted_total as edit_total_pay_budgeted_total,
 budget_total_detail.edit_total_pay_actual_USD as edit_total_pay_actual_USD,
 budget_total_detail.edit_total_pay_actual_total as edit_total_pay_actual_total,
 ROUND(budget_total_detail.project_profit_gdp,0) as edit_profit_GBP,
ROUND(budget_total_detail.project_profit_per,0) as edit_profit_percentage,
ROUND(budget_total_detail.budget_project_profit,0) as edit_profit_budget_GBP,
ROUND(budget_total_detail.budget_profit_per,0) as edit_profit_budget_percentage

From
 budget_total_detail
	Where
	  project_id = '".$project_id."'");
			
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
function getExtent($project_id)
	{
		$now   = new DateTime();
        $month = (int)$now->format("m");
		
		$result1 = mysql_query("Select
  		confirmed_extent As confirmed_extent,
  		castoff_extent As castoff_extent
		From
  		project_title 
		Where
  		id = '".$project_id."'")or die(mysql_error());
		
		if(!$result1)
		{
			$result["failure"] = true;
			$result["message"] =  'Invalid query:'. mysql_error();
		}
		else
		{
			$result["success"] = true;
			$result["message"] =  'rate:'. mysql_error();
		}
  
		while($row=mysql_fetch_object($result1))
	   	{
	   		
			$result ["data"] = $row;
	  	}
		
      	echo(json_encode($result));
      //echo '({"results":'.json_encode($data).'})';
	  
    }

function getActivity_edit($job_code,$activity)
	{
		$workflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($workflow)) {
				
			$workflowid = $row['workflow'];
			$projectid = $row['id'];
			
		}
			$result1 = mysql_query("Select
 stages.ratecard_USD as rate_USD,
 stages.ratecard_GBP as rate_GBP
From
 stages
Where
 stages.workflow_id = 20 And
 stages.activity = 8")or die(mysql_error());
			
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
	
	
function get_total_for_project($job_code)
	{
		$workflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($workflow)) {
				
			$workflowid = $row['workflow'];
			$projectid = $row['id'];
			
		}
		$result2 = mysql_query("
		Select
  budget_receivable_project.project_id ,
  budget_receivable_project.no_of_unit,
  budget_receivable_project.rate_usd,
  budget_receivable_project.rate_gbp,
  sum(budget_receivable_project.budgeted_usd) as budg_edit_total_receive_USD_p,
 sum(budget_receivable_project.budgeted_gbp) as budg_edit_total_receive_GBP_p,
 sum(budget_receivable_project.actual_usd)as edit_total_receive_USD_p,
  sum(budget_receivable_project.actual_gbp) as edit_total_receive_GBP_p
From
  budget_receivable_project
Where
 
  budget_receivable_project.project_id = '".$projectid."'
")or die(mysql_error());
		if(!$result2)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;				
			}
       	while($row=mysql_fetch_object($result2))
	   	{
			$result ["data"] = $row;
	  	}
      	echo(json_encode($result));
	}




function deleteBudgetactivityReceivables_a($receivable_id)
{
		$checkquery="SELECT id FROM budget_receivable WHERE id='".$receivable_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE budget_receivable SET flag=1 WHERE id='".$receivable_id."'");
				
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
				$result["message"] =  'Budget Receivable Id does not exist';
			}
		
		echo json_encode($result);
	}
function deleteBudgetprojectReceivables_p($receivable_id)
{
		$checkquery="SELECT id FROM budget_receivable_project WHERE id='".$receivable_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE budget_receivable_project SET flag=1 WHERE id='".$receivable_id."'");
				
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
				$result["message"] =  'Budget Receivable Id does not exist';
			}
		
		echo json_encode($result);
	}

	
	
function get_total_for_activity($job_code)
	{
		$workflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($workflow)) {
				
			$workflowid = $row['workflow'];
			$projectid = $row['id'];
			
		}
		$result2 = mysql_query("
		Select
	budget_receivable.no_of_unit As no_of_unit,
 budget_receivable.rate_gbp As rate_GBP,
 budget_receivable.rate_usd As rate_USD,
  sum(rate_USD*no_of_unit) as edit_total_receive_USD,
  sum(rate_GBP*no_of_unit) as edit_total_receive_GBP
From
  budget_receivable
Where
  
  budget_receivable.project_id = '".$projectid."'
")or die(mysql_error());
		if(!$result2)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;				
			}
       	while($row=mysql_fetch_object($result2))
	   	{
			$result ["data"] = $row;
	  	}
      	echo(json_encode($result));
	}
	
	
	
	function get_total_for_expense($job_code)
	{
		$workflow = mysql_query("select workflow, id from project_title where job_code = '".$job_code."'");
		while($row = mysql_fetch_array($workflow)) {
				
			$workflowid = $row['workflow'];
			$projectid = $row['id'];
			
		}
		$result2 = mysql_query("
		Select
	budget_expense.no_of_unit As no_of_unit,
 budget_expense.rate_gbp As rate_GBP,
 budget_expense.rate_usd As rate_USD,
  sum(rate_USD*no_of_unit) as edit_total_pay_USD,
  sum(rate_GBP*no_of_unit) as edit_total_pay_GBP
From
  budget_expense
Where
  
  budget_expense.project_id = '".$projectid."'
")or die(mysql_error());
		if(!$result2)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;				
			}
       	while($row=mysql_fetch_object($result2))
	   	{
			$result ["data"] = $row;
	  	}
      	echo(json_encode($result));
	}
	
	function getUnitOfMeasurement($unit_of_measurement,$edit_Job_code)
	{
	
		$result1 = mysql_query ("Select
			  
			  project_title.castoff_extent as no_of_unit,
			  project_title.manuscript_pages as no_of_unit1
			  From project_title Where project_title.job_code = '".$edit_Job_code."' ");
		
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
	function getCurrencyRateReceivable($edit_Job_code,$activityid)
	{
	
		$workflow_id = mysql_query ("Select
			  project_title.workflow
			  From project_title Where project_title.job_code = '".$edit_Job_code."' ");
		while($row = mysql_fetch_array($workflow_id)) {				
			$workflow = $row['workflow'];			
		}
		$result1 = mysql_query ("Select
			  
			  stages.activity as currency_activity,
			  stages.ratecard_USD as ratecard_USD,
			  stages.ratecard_GBP as ratecard_GBP
			  From stages Where stages.workflow_id = '".$workflow."' and stages.activity = '".$activityid."'");
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
	function getUnitOfMeasurementPayable($unit_of_measurement,$edit_Job_code)
	{
	
		$result1 = mysql_query ("Select
			  
			  project_title.castoff_extent as no_of_unit,
			  project_title.manuscript_pages as no_of_unit1
			  From project_title Where project_title.job_code = '".$edit_Job_code."' ");
		
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
	function getCurrencyRatePayable($edit_Job_code,$activityid)
	{
	
		$workflow_id = mysql_query ("Select
			  project_title.workflow
			  From project_title Where project_title.job_code = '".$edit_Job_code."' ");
		while($row = mysql_fetch_array($workflow_id)) {				
			$workflow = $row['workflow'];			
		}
		$result1 = mysql_query ("Select
			  
			  stages.activity as currency_activity,
			  stages.payable_ratecard_USD as ratecard_USD,
			  stages.payable_ratecard_GBP as ratecard_GBP
			  From stages Where stages.workflow_id = '".$workflow."' and stages.activity = '".$activityid."'");
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
	function getbudgetdetails($projectID) {
		
		$num_result = mysql_query("SELECT  activity.name as activity,
		budget_receivable.currency_rate as currency_rate,
		budget_receivable.unit_of_measurement as unit_of_measurement,
		budget_receivable.no_of_unit as no_of_unit,
		budget_receivable.rate_usd_gbp as rat_usd_gbp,
		budget_receivable.budgeted_usd_gbp as budgeted_usd_gbp,
		budget_receivable.actual_usd_gbp as actual_usd_gbp
		
		FROM
		
		budget_receivable Inner Join
		 activity On budget_receivable.activity =
   			activity.id
		Where
		 budget_receivable.project_id ='".$projectID."'
			And
			  budget_receivable.flag = 0")or die(mysql_error());
		
		//from budget_receivable WHERE flag = 0 and project_id = '".$projectID."' ")or die(mysql_error());
		
		
		while($row=mysql_fetch_object($num_result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
		
	}
	function getbudgetinfodetails($projectID){
		
		$result1 = mysql_query("SELECT 
		budget_total_detail.total_receive_usd as budgetedreceivableamountUSD,
		budget_total_detail.total_receive_gdp as budgetedreceivableamountGDP FROM budget_total_detail Where project_id = '".$projectID."'");
		while($row = mysql_fetch_array($result1)) {
				
			$data1 = $row['budgetedreceivableamountUSD'];
			$data2 = $row['budgetedreceivableamountGDP'];
			if($result1==1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["budgetedreceivableamountUSD"] = $data1;
				$result["budgetedreceivableamountGDP"] = $data2;
				
								
			}
			echo(json_encode($result));
		}
		
	}
	function getbudgetdetailspay($projectID) {
		
		$num_result = mysql_query("SELECT  activity.name as activitys,
		vendors.name as vendor,
		budget_expense.currency_rate as currency_rate,
		budget_expense.unit_of_measurement as unit_of_measurement,
		budget_expense.no_of_unit as no_of_unit,
		budget_expense.rate_USD_GBP as rate_USD_GBP,
		budget_expense.budgeted_amount_USD_GBP as budgeted_amount_USD_GBP,
		budget_expense.acual_amount_USD_GBP as acual_amount_USD_GBP
	
		
		from

		
		
		budget_expense Inner Join
		 vendors On budget_expense.vendor=vendors.id Inner Join activity On budget_expense.activity = activity.id
		
		
		 WHERE budget_expense.flag = 0 and budget_expense.project_id = '".$projectID."' ")or die(mysql_error());
		
		
		while($row=mysql_fetch_object($num_result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
		
	}
	function getbudgetpayableinfodetails($projectID){
		
		$result1 = mysql_query("SELECT 
		budget_total_detail.total_pay_usd as budgetedpayableamountUSD,
		budget_total_detail.total_pay_gdp as budgetedpayableamountGDP FROM budget_total_detail Where project_id = '".$projectID."'");
		while($row = mysql_fetch_array($result1)) {
				
			$data1 = $row['budgetedpayableamountUSD'];
			$data2 = $row['budgetedpayableamountGDP'];
			if($result1==1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["budgetedpayableamountUSD"] = $data1;
				$result["budgetedpayableamountGDP"] = $data2;
				
								
			}
			echo(json_encode($result));
		}
		
	}
	function getbudgetprofit($projectID){
		
		$result1 = mysql_query("SELECT 
		budget_total_detail.project_profit_gdp as ActualprojectprofitGDP,
		budget_total_detail.project_profit_per as Actualprojectprofit FROM budget_total_detail Where project_id = '".$projectID."'");
		while($row = mysql_fetch_array($result1)) {
				
			$data1 = $row['ActualprojectprofitGDP'];
			$data2 = $row['Actualprojectprofit'];
			if($result1==1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["ActualprojectprofitGDP"] = $data1;
				$result["Actualprojectprofit"] = $data2;
				
								
			}
			echo(json_encode($result));
		}
		
	}
	
	function getProductionReport($projectid){
		$result1 = mysql_query("Select activity.name, budget_expense.currency_rate, budget_expense.unit_of_measurement, budget_expense.no_of_unit, budget_expense.rate_USD_GBP, budget_expense.acual_amount_USD_GBP
								From budget_expense Inner Join activity On budget_expense.activity = activity.id
								Where  
								budget_expense.activity != '0' 
								And 
								project_id = '".$projectid."'");
		
		while($row=mysql_fetch_object($result1))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
	}
	
	?>