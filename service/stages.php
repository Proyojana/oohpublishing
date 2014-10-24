<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getRatecardMaster($_POST['workflowid']);
			break;
		case 2:
			insertStageMaster($_POST['stage_id'],$_POST['stage_order'],$_POST['workflow_id'],$_POST['activity'],$_POST['stage_name']);
			break;
		case 3:
			deleteStageById($_POST["stage_id"]);	
			break;
		case 4:
			saveStageMaster($_POST['stage_id'],$_POST['stage_order'],$_POST['workflow_id'],$_POST['activity'],$_POST['stage_name'],$_POST['no_of_days'],$_POST['ratecard_USD'],$_POST['ratecard_GBP']);
			break;
		case 5:
			getDefaultStages();
			break;	
		default: 
			break;
	}
	function getRatecardMaster($workflowid)
	{
 		$num_result = mysql_query ("Select
  stages.stage_order As stage_order,
  stages.stage_name As stage_name,
  stages.no_of_days As no_of_days,
  stages.ratecard_USD As ratecard_USD,
  stages.ratecard_GBP As ratecard_GBP,
  activity.id As activity,
  stages.id As stage_id
From
  stages Inner Join
  activity On stages.activity =
    activity.id
Where
  stages.workflow_id ='".$workflowid."' and stages.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  stages.stage_order As stage_order,
  stages.stage_name As stage_name,
  stages.no_of_days As no_of_days,
  stages.ratecard_USD As ratecard_USD,
  stages.ratecard_GBP As ratecard_GBP,
  activity.id As activity,
  stages.id As stage_id
From
  stages Inner Join
  activity On stages.activity =
    activity.id

Where
  stages.workflow_id ='".$workflowid."' and stages.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	function insertStageMaster($stage_id,$stage_order,$workflow_id,$activity,$stage_name)
    {
    	
    		$stage_id1 = explode(',',$stage_id);
			$stage_order1 = explode(',',$stage_order);
			$activity1 = explode(',',$activity);
			$stage_name1= explode(',',$stage_name);
		
		for ($i = 0; $i < count($stage_id1)-1; $i++)
		{
		$checkquery="SELECT id FROM stages WHERE id='".$stage_id1[$i]."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO stages(id,workflow_id,stage_order,stage_name,activity,flag) VALUES('','".$workflow_id."','".$stage_order1[$i]."','".$stage_name1[$i]."','".$activity1[$i]."','')");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Stage Inserted successfully";
			}
		}
		else if($num_rows==1)
		{
			
			$result1 = mysql_query ("Update stages set stage_name='".$stage_name1[$i]."',activity='".$activity1[$i]."' where id='".$stage_id1[$i]."'");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Stage Saved successfully";
			}
		}
		else
			{
				$result["success"] = true;
				$result["message"] = "Stage is not exist";
			}
			}
		echo json_encode($result);
	}
	function deleteStageById($stage_id)
    {
		$checkquery="Select ooh_publishing.stages.workflow_id From ooh_publishing.stages Where ooh_publishing.stages.id = '".$stage_id."' ";
		$result1=mysql_query($checkquery);
		while($row = mysql_fetch_array($result1)) {				
			$workflow_id = $row['workflow_id'];			
		}
	//	echo $workflow_id;
		$numquery = mysql_query("Select
  ooh_publishing.stages.workflow_id
From
  ooh_publishing.stages Inner Join
  ooh_publishing.budget_expense On ooh_publishing.stages.workflow_id =
    ooh_publishing.budget_expense.workflow_id
Where
  ooh_publishing.stages.workflow_id = '".$workflow_id."' And
  ooh_publishing.budget_expense.flag = 0");
	
		$num_rows=mysql_num_rows($numquery);
		if($num_rows==0){
				$result1= mysql_query("UPDATE stages SET flag=1 WHERE id='".$stage_id."'");
				
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
				$result["message"] =  'This Stage is assigned to budget.So Delete action is not possible';
			}
		
		echo json_encode($result);
	}
	
	function saveStageMaster($stage_id,$stage_order,$workflow_id,$activity,$stage_name,$no_of_days,$ratecard_USD,$ratecard_GBP)
    {
		$checkquery="SELECT id FROM stages WHERE id='".$stage_id."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO stages(id,workflow_id,stage_order,stage_name,activity,no_of_days,ratecard_USD,ratecard_GBP,flag) VALUES('','".$workflow_id."','".$stage_order."','".$stage_name."','".$activity."','".$no_of_days."','".$ratecard_USD."','".$ratecard_GBP."','')");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Stage Inserted successfully";
			}
		}
		else if($num_rows==1)
		{
			
			$result1 = mysql_query ("Update stages set stage_name='".$stage_name."',activity='".$activity."',no_of_days='".$no_of_days."',ratecard_USD='".$ratecard_USD."',ratecard_GBP='".$ratecard_GBP."' where id='".$stage_id."'");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Stage Saved successfully";
			}
		}
		else
			{
				$result["success"] = true;
				$result["message"] = "Stage is not exist";
			}
		
		echo json_encode($result);
	}

	function getDefaultStages()
	{
 		$num_result = mysql_query ("Select
  default_stages.stage_order As stage_order,
  default_stages.stage_name As stage_name
From
  default_stages")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  default_stages.stage_order As stage_order,
  default_stages.stage_name As stage_name
From
  default_stages 
 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
?>