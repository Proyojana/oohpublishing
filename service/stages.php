<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getRatecardMaster($_POST['workflowid']);
			break;
		case 2:
			insertStageMaster($_POST['stage_id'],$_POST['workflow_id'],$_POST['activity'],$_POST['stage_name']);
			break;
		case 3:
			deleteStageById($_POST["stage_id"]);	
			break;
			
		default: 
			break;
	}
	function getRatecardMaster($workflowid)
	{
 		$num_result = mysql_query ("Select
  ooh_publishing.stages.stage_name As stage_name,
  ooh_publishing.stages.activity As activity,
  ooh_publishing.stages.id As stage_id,
  ooh_publishing.stages.workflow_id
From
  ooh_publishing.stages Inner Join
  ooh_publishing.workflow On ooh_publishing.stages.workflow_id =
    ooh_publishing.workflow.id
Where
  ooh_publishing.stages.workflow_id ='".$workflowid."' and ooh_publishing.stages.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  ooh_publishing.stages.stage_name As stage_name,
  ooh_publishing.stages.activity As activity,
  ooh_publishing.stages.id As stage_id,
  ooh_publishing.stages.workflow_id
From
  ooh_publishing.stages Inner Join
  ooh_publishing.workflow On ooh_publishing.stages.workflow_id =
    ooh_publishing.workflow.id
Where
  ooh_publishing.stages.workflow_id ='".$workflowid."' and ooh_publishing.stages.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	function insertStageMaster($stage_id,$workflow_id,$activity,$stage_name)
    {
		$checkquery="SELECT id FROM stages WHERE id='".$stage_id."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO stages(id,workflow_id,stage_name,activity,flag) VALUES('','".$workflow_id."','".$stage_name."','".$activity."','')");
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
			
			$result1 = mysql_query ("Update stages set stage_name='".$stage_name."',activity='".$activity."' where id='".$stage_id."'");
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
	function deleteStageById($stage_id)
    {
		$checkquery="SELECT id FROM stages WHERE id='".$stage_id."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
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
				$result["message"] =  'Stage does not exist';
			}
		
		echo json_encode($result);
	}
?>