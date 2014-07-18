<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getActivity();
			break;
		/*case 2:
			insertStageMaster($_POST['stage_id'],$_POST['stage_order'],$_POST['workflow_id'],$_POST['activity'],$_POST['stage_name']);
			break;
		case 3:
			deleteStageById($_POST["stage_id"]);	
			break;
			*/
		default: 
			break;
	}
	function getActivity()
	{

		$result = mysql_query("Select
  activity.name as activity,
  activity.id,
  stages.stage_name as stage,
  stages.workflow_id
From
  stages Inner Join
  activity On stages.activity =
    activity.id
")or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
	}
	function insertStageMaster($stage_id,$stage_order,$workflow_id,$activity,$stage_name)
    {
		$checkquery="SELECT id FROM stages WHERE id='".$stage_id."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO stages(id,workflow_id,stage_order,stage_name,activity,flag) VALUES('','".$workflow_id."','".$stage_order."','".$stage_name."','".$activity."','')");
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