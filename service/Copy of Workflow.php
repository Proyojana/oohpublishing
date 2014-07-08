<?php

    
    include("config.php");
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getWorkflowMaster();
			break;
		case 2:
			getWorkflowMasterById($_POST["workflow_id"]);	
			break;
		case 3:
			deleteWorkflow($_POST["workflow_id"]);	
			break;
		case 4:
			updateWorkflowMaster($_POST["workflow_id"],$_POST['workflow_code'],$_POST['workflow_name'],$_POST['workflow_description']);	
			break;
		case 5:
			insertWorkflowMaster($_POST['workflow_code'],$_POST['workflow_name'],$_POST['clients'],$_POST['workflow_description']);
			break;
		case 6:
			insertClients($_POST['code'],$_POST['clients']);
			break;	
		
		default: 
			break;
	}
		
	function getWorkflowMaster()
	{
 		$num_result = mysql_query ("Select
  id as workflow_id,
  name as workflow_name,
  code as workflow_code,
  client as workflow_client,
  description as workflow_description
  From
  workflow Where flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  id as workflow_id,
  name as workflow_name,
  code as workflow_code,
  client as workflow_client,
  description as workflow_description
  From
  workflow Where flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getWorkflowMasterById($workflow_id)
 	{
	$result1 = mysql_query ("Select
  id as workflow_id,
  name as workflow_name,
  code as workflow_code,
  description as workflow_description
From
  workflow 
			Where
		  	id=".$workflow_id."");
			
		if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  'Invalid query: ' . mysql_error();
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
  
     function updateWorkflowMaster($workflow_id,$workflow_code,$workflow_name,$workflow_description)
    {
		$checkquery="SELECT id FROM workflow WHERE id='".$workflow_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE workflow set code='".$workflow_code."', name='".$workflow_name."',description='".$workflow_description."',modified_by='',modified_on=now() WHERE id=".$workflow_id."");
				
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
			$result["message"] =  'User does not exist';
		}
		

		echo json_encode($result);
    }
    
    
	function deleteWorkflow($workflow_id)
    {
		$checkquery="SELECT id FROM workflow WHERE id='".$workflow_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE workflow SET flag=1 WHERE id='".$workflow_id."'");
				
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
				$result["message"] =  'Client does not exist';
			}
		
		echo json_encode($result);
	}
	
	function insertWorkflowMaster($workflow_code,$workflow_name,$client,$workflow_description)
    {
    		//echo $client;
		$checkquery="SELECT code FROM workflow WHERE code='".$workflow_code."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO workflow(id,code,name,description,client,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$workflow_code."','".$workflow_name."','".$workflow_description."','".$workflow_client."','',now(),'','','')");
		
			$clients=explode(',',$client);
			for($i=0;$i<count($clients)-1;$i++){
				//echo $id;
			$result1 = mysql_query ("INSERT INTO clients_choosen(id,code_workflow,clients,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$workflow_code."','".$clients[$i]."','',now(),'','','')");
			
			}
			
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
		else
		{
			$result["success"] = false;
			$result["message"] =  "User Code already exists in the same name";
		}
		
		echo json_encode($result);
	}
	function insertClients($code,$clients)
	{
		$clients1 = explode(',',$clients);
		for ($i = 0; $i < count($clients1)-1; $i++)
		{
		$result = mysql_query ("INSERT INTO clients_choosen(id,code_workflow,clients,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$code."','".$clients1[$i]."','',now(),'','','')");
			if(!$result)
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
Select
  ooh_publishing.workflow.code as workflow_code,
  ooh_publishing.workflow.name as workflow_name,
 Group_Concat(ooh_publishing.customers.name) as workflow_client,
  ooh_publishing.workflow.id as workflow_id,
  ooh_publishing.workflow.description as workflow_description
From
  ooh_publishing.workflow Inner Join
  ooh_publishing.clients_choosen On ooh_publishing.workflow.code =
    ooh_publishing.clients_choosen.code_workflow Inner Join
  ooh_publishing.customers On ooh_publishing.clients_choosen.clients =
    ooh_publishing.customers.id Where ooh_publishing.workflow.flag=0 And ooh_publishing.workflow.code = '".$workflow_id."'
Group By
  ooh_publishing.workflow.id, ooh_publishing.workflow.description