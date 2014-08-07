<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getProjectDetails($_POST['job_code']);
			break;
		case 2:
			getStagesdependsonWorkflow($_POST['workflowid']);
			break;
		case 3:
			insertSchedule($_POST['scheduleid'],$_POST['projectid'],$_POST['workflow'],$_POST['stage'],$_POST['estimated_daysperstage'],$_POST['actual_daysperstage'],$_POST['estimated_start_date'],$_POST['actual_start_date'],$_POST['estimated_end_date'],$_POST['actual_end_date'],$_POST['bufferday']);		
			break;
		case 4:
			selectSchedule($_POST['projectid']);
			break;	
		case 5:
			getScheduleDetails($_POST['job_code']);
			break;	
		default: 
			break;
	}
	
	function getProjectDetails($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as scheduleHeader_ClientName,
	  customers.code as scheduleHeader_ClientCode,
	  customers.id as scheduleHeader_clientId,
	  project_title.title as scheduleHeader_ProjectName,
	  project_title.workflow as scheduleHeader_workflow,
	  project_title.job_code as scheduleHeader_Job,
	  project_title.id as scheduleHeader_projectID
	  
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
  
	  
function insertSchedule($scheduleid,$projectid,$workflow,$stage,$estimated_daysperstage,$actual_daysperstage,$estimated_start_date,$actual_start_date,$estimated_end_date,$actual_end_date,$bufferday)
    {
    	
			$scheduleid1=explode(',',$scheduleid);
			$stage1 = explode(',',$stage);
			$estimated_daysperstage1 = explode(',',$estimated_daysperstage);
			$actual_daysperstage1 = explode(',',$actual_daysperstage);
			$estimated_start_date1 = explode(',',$estimated_start_date);
			$actual_start_date1 = explode(',',$actual_start_date);
			$estimated_end_date1 = explode(',',$estimated_end_date);
			$actual_end_date1 = explode(',',$actual_end_date);
			$bufferday1 = explode(',',$bufferday);
		for ($i = 0; $i < count($stage1)-1; $i++)
		{
			$checkquery="SELECT project_id FROM schedule WHERE id='".$scheduleid1[$i]."'";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			
			//convert string to date
			$eStartDate_date = substr($estimated_start_date1[$i],0,16);
			$eStartDate_string=strtotime($eStartDate_date);
		    $eStartDate=date("Y-m-d h:i:sa", $eStartDate_string);  
			
			$aStartDate_date = substr($actual_start_date1[$i],0,16);
			$aStartDate_string=strtotime($aStartDate_date);
		    $aStartDate=date("Y-m-d h:i:sa", $aStartDate_string);  
			
			$eEndDate_date = substr($estimated_end_date1[$i],0,16);
			$eEndDate_string=strtotime($eEndDate_date);
		    $eEndDate=date("Y-m-d h:i:sa", $eEndDate_string);  
			
			$aEndDate_date = substr($actual_end_date1[$i],0,16);
			$aEndDate_string=strtotime($aEndDate_date);
		    $aEndDate=date("Y-m-d h:i:sa", $aEndDate_string);  
								
						
			if($num_rows == 1)
			{
				
				
				$result1 = mysql_query("UPDATE schedule SET  estimated_daysperstage = '".$estimated_daysperstage1[$i]."', actual_daysperstage = '".$actual_daysperstage1[$i]."', estimated_start_date = '".$eStartDate."', actual_start_date = '".$aStartDate."', estimated_end_date = '".$eEndDate."', actual_end_date = '".$aEndDate."' WHERE id = '".$scheduleid1[$i]."'");
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
				$result1 = mysql_query("INSERT INTO schedule (id ,project_id ,workflow_id,stage ,estimated_daysperstage ,actual_daysperstage ,estimated_start_date ,actual_start_date ,estimated_end_date ,actual_end_date ,bufferday ,created_by ,created_on ,modified_by ,modified_on ,flag)
                               VALUES ('' ,'".$projectid."', '".$workflow."','".$stage1[$i]."','".$estimated_daysperstage1[$i]."','".$actual_daysperstage1[$i]."',  '".$eStartDate."',  '".$aStartDate."',  '".$eEndDate."',  '".$aEndDate."','', '','', '0000-00-00 00:00:00', '', '')");
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

	function selectSchedule($projectid)
	{
 		$num_result = mysql_query ("Select
  schedule.id as schedule_id,
  schedule.stage as schedule_stage,
  schedule.estimated_daysperstage as schedule_estimated_daysperstage,
  schedule.actual_daysperstage as schedule_actual_daysperstage,
  schedule.estimated_start_date as schedule_estimated_start_date,
  schedule.actual_start_date as schedule_actual_start_date,
  schedule.estimated_end_date as schedule_estimated_end_date,
  schedule.actual_end_date as schedule_actual_end_date,
  schedule.bufferday as schedule_bufferday,
  schedule.project_id
From
  schedule
Where
    schedule.project_id ='".$projectid."' ")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  schedule.id as schedule_id,
  schedule.stage as schedule_stage,
  schedule.estimated_daysperstage as schedule_estimated_daysperstage,
  schedule.actual_daysperstage as schedule_actual_daysperstage,
  schedule.estimated_start_date as schedule_estimated_start_date,
  schedule.actual_start_date as schedule_actual_start_date,
  schedule.estimated_end_date as schedule_estimated_end_date,
  schedule.actual_end_date as schedule_actual_end_date,
  schedule.bufferday as schedule_bufferday,
  schedule.project_id
From
  schedule
Where
    schedule.project_id ='".$projectid."'  LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
		function getScheduleDetails($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as edit_scheduleHeader_ClientName,
	  customers.code as edit_scheduleHeader_ClientCode,
	  customers.id as edit_scheduleHeader_clientId,
	  project_title.title as edit_scheduleHeader_ProjectName,
	  project_title.workflow as edit_scheduleHeader_workflow,
	  project_title.job_code as edit_scheduleHeader_Job,
	  project_title.id as edit_scheduleHeader_projectID
	  
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
  
?>