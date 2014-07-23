<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getActivity($_POST['workflowid'],$_POST['projectid']);
			break;
		case 2:
			getProjectDetails($_POST['project_code']);
			break;
		case 3:
			getBudgetUnit($_POST["vendor"],$_POST["activityid"]);	
			break;
		case 4:
			insertBudgetExpense($_POST['budget_id'],$_POST['projectID'],$_POST['activity'],$_POST['stage'],$_POST['vendor'],$_POST['unit'],$_POST['budgeted_unit'],$_POST['rate_USD'],$_POST['rate_GBP'],$_POST['budgeted_amount_USD'],$_POST['budgeted_amount_GBP'],$_POST['actual_unit'],$_POST['actual_amount_USD'],$_POST['actual_amount_GBP']);
			break;
		default: 
			break;
	}
	function getActivity($workflowid,$projectid)
	{
		
		$checkquery="SELECT id FROM budget_expense WHERE project_id='".$projectid."'";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			//echo $num_rows;
			if($num_rows >= 1)
		{
		
		$result = mysql_query("Select
		 activity.id As activityid,
		 activity.name As activity,
		 stages.stage_name As stage,
		 stages.workflow_id,
		 stages.id as stageid,
		 budget_expense.vendor as vendor,
		 budget_expense.unit as unit,
		 budget_expense.num_units_budgeted as num_units_budgeted,
		 budget_expense.rate_USD as rate_USD,
		 budget_expense.rate_GBP as rate_GBP,
		 budget_expense.budgeted_amount_USD as budgeted_amount_USD,
		 budget_expense.budgeted_amount_GBP as budgeted_amount_GBP,
		 budget_expense.actual_units as actual_unit,
		 budget_expense.acual_amount_USD as actual_amount_USD,
		 budget_expense.actual_amount_GBP as actual_amount_GBP,
		 budget_expense.id as budgetExpense_id
		From
		 stages Inner Join
		 activity Onstages.activity =
		   activity.id Left Join
		 budget_expense Onactivity.id =
		   budget_expense.activity
		Where
		 stages.workflow_id = '".$workflowid."' And(  
		 budget_expense.project_id = '".$projectid."' orbudget_expense.project_id is null ) And
		 stages.flag = 0")or die(mysql_error());
  
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
			 activity Onstages.activity =
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
	 
	function getProjectDetails($project_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as budgetHeader_ClientName,
	  customers.code as budgetHeader_ClientCode,
	  customers.id as budgetHeader_clientId,
	  project_title.title as budgetHeader_ProjectName,
	  project_title.workflow as budgetHeader_workflow,
	  project_title.id as budgetHeader_projectID
	  
	From
	  project_title Inner Join
	  customers On project_title.client =
	    customers.id
	Where
	  project_title.job_code = '".$project_code."'");
			
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
	   		
			$result [data] = $row;
	  	}
		
      	echo(json_encode($result));
	  
    }
	
	function insertBudgetExpense($budget_id,$projectID,$activity,$stage,$vendor,$unit,$budgeted_unit,$rate_USD,$rate_GBP,$budgeted_amount_USD,$budgeted_amount_GBP,$actual_unit,$actual_amount_USD,$actual_amount_GBP)
    {
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
				
				$result1 = mysql_query("UPDATE budget_expense SET  activity = '".$activity1[$i]."', stage = '".$stage1[$i]."', vendor = '".$vendor1[$i]."', unit = '".$unit1[$i]."', num_units_budgeted = '".$budgeted_unit1[$i]."', rate_USD = '".$rate_USD1[$i]."', rate_GBP = '".$rate_GBP1[$i]."', budgeted_amount_USD ='".$budgeted_amount_USD1[$i]."' , budgeted_amount_GBP ='".$budgeted_amount_GBP1[$i]."', actual_units = '".$actual_unit1[$i]."', acual_amount_USD = '".$actual_amount_USD1[$i]."', actual_amount_GBP = '".$actual_amount_GBP1[$i]."' WHERE id = '".$budget_id1[$i]."'");
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
				$result1 = mysql_query("INSERT INTO budget_expense (id ,project_id ,activity ,stage ,vendor ,unit ,num_units_budgeted ,rate_USD ,rate_GBP ,budgeted_amount_USD ,budgeted_amount_GBP ,actual_units ,acual_amount_USD ,actual_amount_GBP ,created_by ,created_on ,modified_by ,modified_on ,flag)
                               VALUES ('' ,'".$projectID."', '".$activity1[$i]."','".$stage1[$i]."','".$vendor1[$i]."','".$unit1[$i]."',  '".$budgeted_unit1[$i]."',  '".$rate_USD1[$i]."',  '".$rate_GBP1[$i]."',  '".$budgeted_amount_USD1[$i]."',  '".$budgeted_amount_GBP1[$i]."',  '".$actual_unit1[$i]."',  '".$actual_amount_USD1[$i]."',  '".$actual_amount_GBP1[$i]."',  '', '','', '0000-00-00 00:00:00',  '')");
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