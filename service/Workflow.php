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
			updateWorkflowMaster($_POST["workflow_id"],$_POST['workflow_code'],$_POST['workflow_name'],$_POST['clients'],$_POST['workflow_description']);	
			break;
		case 5:
			insertWorkflowMaster($_POST['workflow_code'],$_POST['workflow_name'],$_POST['clients'],$_POST['workflow_description']);
			break;
		case 6:
			insertClients($_POST['code'],$_POST['clients']);
			break;	
		case 7: 
			autoRequestCode();
			break;
		case 8:
			getClientWorkflow($_POST['clientId']);
			break;
		default: 
			break;
	}
		
	function getWorkflowMaster()
	{
 		$num_result = mysql_query ("Select
  workflow.code as workflow_code,
  workflow.name as workflow_name,
  Group_Concat(customers.name) as workflow_client,
  workflow.id as workflow_id,
  workflow.description as workflow_description
From
  workflow Inner Join
  clients_choosen On workflow.code =
    clients_choosen.code_workflow Inner Join
  customers On clients_choosen.clients =
    customers.id Where workflow.flag=0 and clients_choosen.flag = 0
Group By
  workflow.id, workflow.description ")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  workflow.code as workflow_code,
  workflow.name as workflow_name,
  Group_Concat(customers.name) as workflow_client,
  workflow.id as workflow_id,
  workflow.description as workflow_description
From
  workflow Inner Join
  clients_choosen On workflow.code =
    clients_choosen.code_workflow Inner Join
  customers On clients_choosen.clients =
    customers.id Where workflow.flag=0 and clients_choosen.flag = 0
Group By
  workflow.id, workflow.description  LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getWorkflowMasterById($workflow_id)
 	{
	$result1 = mysql_query ("Select
  workflow.code as workflow_code,
  workflow.name as workflow_name,
 Group_Concat(customers.name) as workflow_client,
  workflow.id as workflow_id,
  workflow.description as workflow_description
From
  workflow Inner Join
  clients_choosen On workflow.code =
    clients_choosen.code_workflow Inner Join
  customers On clients_choosen.clients =
    customers.id Where workflow.flag=0 and clients_choosen.flag = 0 And workflow.id = '".$workflow_id."'
Group By
  workflow.id, workflow.description");
			
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
  
     function updateWorkflowMaster($workflow_id,$workflow_code,$workflow_name,$client,$workflow_description)
    {
		$checkquery="SELECT id FROM workflow WHERE id='".$workflow_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE workflow set code='".$workflow_code."', name='".$workflow_name."',description='".$workflow_description."',modified_by='',modified_on=now() WHERE id=".$workflow_id."");
				
			
			$delete = mysql_query("update clients_choosen set flag = 1 where code_workflow = '" .$workflow_code."'");
			 
			 $clients=explode(',',$client);
			for($i=0;$i<count($clients)-1;$i++){
				//echo $id;
			$result2 = mysql_query ("INSERT INTO clients_choosen(id,code_workflow,clients,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$workflow_code."','".$clients[$i]."','',now(),'','','')");
			 }
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
			$result1 = mysql_query ("INSERT INTO workflow(id,code,name,description,client,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$workflow_code."','".$workflow_name."','".$workflow_description."','".$client."','',now(),'','','')");
			$codegen = mysql_insert_id();
			$insertcodgen = mysql_query("UPDATE codegen set value = '".$codegen."' where tablename='workflow'");
		
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
	function autoRequestCode(){
	$autoRequest = mysql_query("select value from codegen where tablename='workflow'");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['value'];
		}
		$code = $data1 + 1;
		$code = str_pad($code, 3, '0', STR_PAD_LEFT);
		$new_code = 'WFL' . $code;
	} else {
		$new_code = "WFL001";
	}

	if(!$autoRequest) {
		$result["failure"] = true;
		$result["message"] = 'Invalid query: ' . mysql_error();
	} else {
		$result["success"] = true;
		$result["message"] = $new_code;
	}

	echo json_encode($result);
}	

function getClientWorkflow($clientid)
 	{
		$result1 = mysql_query ("Select
  workflow.name As workflow_name,
  workflow.id As workflow_id
From
  workflow Inner Join
  clients_choosen On workflow.code =
    clients_choosen.code_workflow Inner Join
  customers On clients_choosen.clients =
    customers.id
Where
  clients_choosen.clients = ".$clientid." And
  clients_choosen.flag = 0 ");
					
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				
			}
			$data=null;
       while($row = mysql_fetch_object($result1)) {
		$data[] = $row;
	}
	echo '({"results":' . json_encode($data) . '})';
    }
	

?>