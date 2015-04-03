<?php
 
    
    include("config.php");
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getServiceMaster();
			break;
		case 2:
			getServiceMasterById($_POST["serviceid"]);	
			break;
		case 3:
			deleteServiceMasterById($_POST["serviceid"]);	
			break;
		case 4:
			updateServiceMaster($_POST["serviceid"],$_POST['servicecode'],$_POST['servicename'],$_POST['servicedescription']);	
			break;
		case 5:
			insertServiceMaster($_POST[
			'servicecode'],$_POST['servicename'],$_POST['servicedescription']);
			break;
		case 6:
			BulkDelete($_POST['id']);
			break;	
		case 7:
			getServiceListMaster($_POST['custcode']);
			break;
		case 8:
			getServiceListMasterByVendors($_POST['code']);
			break;
		case 9: 
			autoRequestCode();
			break;
		default: 
			break;
	}
	
	
	function getServiceMaster()
	{
 		$num_result = mysql_query ("Select
  services.id as service_id,
  services.name as service_name,
  services.code as service_code,
  services.description as service_description
  From
  services Where services.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  services.id as service_id,
  services.name as service_name,
  services.code as service_code,
  services.description as service_description
  From
  services Where services.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getServiceMasterById($serviceid)
 	{
	$result1 = mysql_query ("Select
  services.id as service_id,
  services.name as service_name,
  services.code as service_code,
  services.description as service_description
From
  services 
			Where
		  	services.id=".$serviceid."");
			
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
  
     function updateServiceMaster($serviceid,$servicecode,$servicename,$servicedescription)
    {
		$checkquery="SELECT id FROM services WHERE id='".$serviceid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE services set code='".$servicecode."', name='".$servicename."',description='".$servicedescription."',modified_by=' ',modified_on=now() WHERE id=".$serviceid."");
				
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
    
    
	function deleteServiceMasterById($serviceid)
    {
		$checkquery="SELECT id FROM services WHERE id='".$serviceid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE services SET flag=1 WHERE id='".$serviceid."'");
				
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
				$result["message"] =  'Service does not exist';
			}
		
		echo json_encode($result);
	}
	
	function insertServiceMaster($servicecode,$servicename,$servicedescription)
    {
		$checkquery="SELECT code FROM services WHERE code='".$servicecode."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO services(id,code,name,description,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$servicecode."','".$servicename."','".$servicedescription."','',now(),'','','')");
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
	function BulkDelete($id)
	{
		    $client_id = explode(',',$id);
			
			for ($i = 0; $i < count($client_id); $i++)
			{
			 	$checkquery = "SELECT code FROM client_master WHERE id='" . $client_id[$i] . "'";
				$result1 = mysql_query($checkquery);
				$num_rows = mysql_num_rows($result1);
				if($num_rows==1){
					$procedure=mysql_query("UPDATE client_master SET flag=1 WHERE id='".$client_id[$i]."'");
								
					$result["success"] = true;
					$result["message"] = 'Deleted successfully';
								
				}
				else{
				$result["success"] = false;
				$result["message"] = 'Delete Failed';
				}
				
			}
		echo json_encode($result);		
	}
	function getServiceListMaster($code)
	{
 		$num_result = mysql_query ("Select
  services.code,
  customers_services.service_id As service_id,
  services.name as service_name
From
  customers_services Inner Join
  services On customers_services.service_id =
    services.id
Where
  customers_services.customer_code = '".$code."' And customers_services.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  services.code,
  customers_services.service_id As service_id,
  services.name as service_name
From
  customers_services Inner Join
  services On customers_services.service_id =
    services.id
Where
  customers_services.customer_code = '".$code."' And customers_services.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
    function getServiceListMasterByVendors($code)
	{
 		$num_result = mysql_query ("Select
  services.code,
  vendors_services.service_id As service_id,
  services.name as service_name
From
  vendors_services Inner Join
  services On vendors_services.service_id =
    services.id
Where
  vendors_services.vendors_code = '".$code."' And vendors_services.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  services.code,
  vendors_services.service_id As service_id,
  services.name as service_name
From
  vendors_services Inner Join
  services On vendors_services.service_id =
    services.id
Where
  vendors_services.vendors_code = '".$code."' And vendors_services.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
		function autoRequestCode() {
	$autoRequest = mysql_query("select code from services");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['code'];
		}
	//	echo $data1;
		$data = str_split($data1, 2);
		$remain = substr($data1,2,5);
	

		//$data1 = substr($data1, -4);
		$code = $remain + 1;
		//echo $code;
		$code = str_pad($code, 3, '0', STR_PAD_LEFT);
	//	echo $code;
		$new_code = $data[0] . $code;
		
		//echo $new_code;
	} else {
		
		$new_code = "S0001";
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
?>