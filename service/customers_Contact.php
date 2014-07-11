<?php
    include("config.php");
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getContactCustomerbyCustID($_POST['id']);
			break;
		case 2:
			getContactCustomerId($_POST["id"]);	
			break;
		case 3:
			deleteCustomersContactsById($_POST["id"]);	
			break;
		case 4:
			updateContactCustomer($_POST['cntctvenid'],$_POST['teams_customerid'],$_POST['contctname'],$_POST['contctphone'],$_POST['cntctemail'],$_POST['cntctdesignation']);	
			break;
		case 5:
			insertContactCustomer($_POST['teams_customerid'],$_POST['contctname'],$_POST['contctphone'],$_POST['cntctemail'],$_POST['cntctdesignation']);
			break;
		
		default: 
			break;
	}
	
	
		function getContactCustomerbyCustID($id)
	{
 		$num_result = mysql_query ("Select
 		 cutomers_contacts.id,
  cutomers_contacts.customer_id,
  cutomers_contacts.name,
  cutomers_contacts.phone,
  cutomers_contacts.email,
  cutomers_contacts.designation
From
  cutomers_contacts
  			WHERE cutomers_contacts.customer_id='".$id."' and cutomers_contacts.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
		 cutomers_contacts.id as id,
  cutomers_contacts.customer_id,
  cutomers_contacts.name as name,
  cutomers_contacts.phone as phone,
  cutomers_contacts.email as email,
  cutomers_contacts.designation as designation
From
  cutomers_contacts
  			WHERE cutomers_contacts.customer_id='".$id."' and cutomers_contacts.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getContactCustomerId($id)
 	{
		$result1 = mysql_query ("Select
		cutomers_contacts.id as custcntctvenid,
  cutomers_contacts.name as custcontctname,
  cutomers_contacts.phone as custcontctphone,
  cutomers_contacts.email as custcntctemail,
  cutomers_contacts.designation as custcntctdesignation
  
From
  cutomers_contacts
		Where
		  cutomers_contacts.id = '".$id."'");
			
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
  
     function updateContactCustomer($cntctvenid,$teams_customerid,$contctname,$contctphone,$cntctemail,$cntctdesignation)
    {
		$checkquery="SELECT id as id FROM cutomers_contacts WHERE id='".$cntctvenid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE cutomers_contacts set name='".$contctname."',phone='".$contctphone."',email='".$cntctemail."',designation='".$cntctdesignation."' where id='".$cntctvenid."'");
				
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
			$result["message"] =  'Contact does not exist';
		}
		

		echo json_encode($result);
    }
    
    
	function deleteCustomersContactsById($id)
    {
		$checkquery="SELECT id FROM cutomers_contacts WHERE id='".$id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE cutomers_contacts SET flag=1 WHERE id='".$id."'");
				
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
				$result["message"] =  'Contact does not exist';
			}
		
		echo json_encode($result);
	}
	
	function insertContactCustomer($teams_customerid,$contctname,$contctphone,$cntctemail,$cntctdesignation)
    {
		$checkquery="SELECT name FROM cutomers_contacts WHERE name='".$contctname."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO cutomers_contacts(id,customer_id,name,phone,email,designation) VALUES('','".$teams_customerid."','".$contctname."','".$contctphone."','".$cntctemail."','".$cntctdesignation."')");
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
			$result["message"] =  "Customer Code already exists in the same name";
		}
		
		echo json_encode($result);
	}

?>