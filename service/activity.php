<?php
    include("config.php");
//	session_start();
//$user_no=$_SESSION["user_no"];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getProductionMaster();
			break;
		case 2:
			getFreelancerMasterById($_POST["product_id"]);	
			break;
		case 3:
			deleteproductionMasterById($_POST["product_id"]);	
			break;
		case 4:
		  updateProductionMaster($_POST["product_id"],$_POST['product_code'],$_POST['product_name'],$_POST['product_description'],$_POST['product_template']);	
			break;
		case 5:
			insertProduction($_POST['product_code'],$_POST['product_name'],$_POST['product_description'],$_POST['product_template']);
			break;
		case 6: 
			autoRequestCode();
			break;
		
		default: 
			break;
	}
	
	
				function getProductionMaster()
				{
			 		$num_result = mysql_query ("Select
			  activity.id as product_id,
			  activity.code as code,
			  activity.name as name,
			  activity.description as description
			From
			  activity
			Where
			  activity.flag = 0")or die(mysql_error());
					
					$totaldata = mysql_num_rows($num_result);
			
					$result = mysql_query("Select
			 			activity.id as product_id,
			  activity.code as product_code,
			  activity.name as product_name,
			  activity.description as product_description
			From
			  activity
			Where
			  activity.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getFreelancerMasterById($product_id)
 	{
		$result1 = mysql_query ("Select
		activity.id as product_id,
  			activity.code as product_code,
			  activity.name as product_name,
			  activity.description as product_description,
			  activity.template as product_template
From
  activity
Where
    activity.id ='".$product_id."'");
			
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
  
     function updateProductionMaster($product_id,$product_code,$product_name,$product_description,$product_template)
    {
		$checkquery="SELECT id FROM activity WHERE id ='".$product_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE activity set name='".$product_name."', template='".$product_template."',description='".$product_description."' WHERE id ='".$product_id."'");
				
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
			$result["message"] =  'Activity does not exist';
		}
		

		echo json_encode($result);
    }
    
    
	function deleteproductionMasterById($product_id)
    {
		$checkquery="SELECT id FROM activity WHERE id='".$product_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE activity SET flag=1 WHERE id='".$product_id."'");
				
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
				$result["message"] =  'Activity does not exist';
			}
		
		echo json_encode($result);
	}
	
	function insertProduction($product_code,$product_name,$product_description,$product_template)
    {
		$checkquery="SELECT code FROM  activity WHERE code='".$product_code."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO  activity(id,code,name,template,description,created_on,created_by,modified_on,modified_by,flag) VALUES('','".$product_code."','".$product_name."','".$product_template."','".$product_description."','','','','','')");
			$codegen = mysql_insert_id();
			$insertcodgen = mysql_query("UPDATE codegen set value = '".$codegen."' where tablename='activity'");
		
			
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
			$result["message"] =  "Activity Code already exists in the same name";
		}
		
		echo json_encode($result);
	}
	
	function autoRequestCode() {
	$autoRequest = mysql_query("select value from codegen where tablename='activity'");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['value'];
		}
		$code = $data1 + 1;
		$code = str_pad($code, 3, '0', STR_PAD_LEFT);
		$new_code = 'ACT' . $code;
	} else {
		$new_code = "ACT001";
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