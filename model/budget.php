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
		case 2:
			getProjectDetails($_POST['project_code']);
			break;
		/*case 3:
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
	
	 
	function getProjectDetails($project_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as budgetHeader_ClientName,
	  customers.code as budgetHeader_ClientCode,
	  project_title.title as budgetHeader_ProjectName
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
?>