<?php
    include("config.php");
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getContactVendor($_POST["vendorid"]);
			break;
		case 2:
			getContactVendorId($_POST["id"]);	
			break;
		case 3:
			deletevendorsById($_POST["id"]);	
			break;
		case 4:
			updateContactVendor($_POST['cntctvenid'],$_POST['vendorid'],$_POST['contctname'],$_POST['contctphone'],$_POST['cntctemail'],$_POST['cntctdesignation']);	
			break;
		case 5:
			insertContactVendor($_POST['vendorid'],$_POST['contctname'],$_POST['contctphone'],$_POST['cntctemail'],$_POST['cntctdesignation']);
			break;
		case 6:
			BulkDelete($_POST['id']);
			break;	
		case 7:
			importcsv();
			break;	
		case 8:
			getFreelancerMasterById($_POST["state_id"]);	
			break;
		default: 
			break;
	}
	
	
		function getContactVendor($vendorid)
	{
 		$num_result = mysql_query ("Select
 		 vendors_contacts.id,
  vendors_contacts.vendor_id,
  vendors_contacts.name,
  vendors_contacts.phone,
  vendors_contacts.email,
  vendors_contacts.designation
From
  vendors_contacts
  			WHERE vendors_contacts.vendor_id='".$vendorid."' and  vendors_contacts.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
		 vendors_contacts.id,
  vendors_contacts.vendor_id,
  vendors_contacts.name,
  vendors_contacts.phone,
  vendors_contacts.email,
  vendors_contacts.designation
From
  vendors_contacts
  			WHERE vendors_contacts.vendor_id='".$vendorid."' and  vendors_contacts.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getContactVendorId($id)
 	{
		$result1 = mysql_query ("Select
		vendors_contacts.id as cntctvenid,
  vendors_contacts.vendor_id as venid,
  vendors_contacts.name as contctname,
  vendors_contacts.phone as contctphone,
  vendors_contacts.email as cntctemail,
  vendors_contacts.designation as cntctdesignation
  
From
  vendors_contacts
		Where
		  vendors_contacts.id = '".$id."'");
			
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
  
     function updateContactVendor($cntctvenid,$vendorid,$contctname,$contctphone,$cntctemail,$cntctdesignation)
    {
		$checkquery="SELECT id as id FROM vendors_contacts WHERE id='".$cntctvenid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE vendors_contacts set vendor_id='".$vendorid."',name='".$contctname."',phone='".$contctphone."',email='".$cntctemail."',designation='".$cntctdesignation."'");
				
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
			$result["message"] =  'vendor does not exist';
		}
		

		echo json_encode($result);
    }
    
    
	function deletevendorsById($id)
    {
		$checkquery="SELECT id FROM vendors_contacts WHERE id='".$id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE vendors_contacts SET flag=1 WHERE id='".$id."'");
				
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
				$result["message"] =  'Customer does not exist';
			}
		
		echo json_encode($result);
	}
	
	function insertContactVendor($vendorid,$contctname,$contctphone,$cntctemail,$cntctdesignation)
    {
		$checkquery="SELECT name FROM vendors_contacts WHERE name='".$contctname."' and phone = '".$contctphone."'" ;
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO vendors_contacts(id,vendor_id,name,phone,email,designation) VALUES('','".$vendorid."','".$contctname."','".$contctphone."','".$cntctemail."','".$cntctdesignation."')");
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
			$result["message"] =  "vendor Code already exists in the same name";
		}
		
		echo json_encode($result);
	}
	function BulkDelete($id)
	{
		    $city_id = explode(',',$id);
			
			for ($i = 0; $i < count($city_id); $i++)
			{
			 	$checkquery = "SELECT city_code FROM city WHERE city_id='" . $city_id[$i] . "'";
				$result1 = mysql_query($checkquery);
				$num_rows = mysql_num_rows($result1);
				if($num_rows==1){
					$procedure=mysql_query("UPDATE city SET flag=1 WHERE city_id='".$city_id[$i]."'");
								
					$result["success"] = true;
					$result["message"] = 'Deleted successfully';
								
				}
				else{
				$result["success"] = false;
				$result["message"] = 'City does not exists';
				}
				
			}
		echo json_encode($result);		
	}	
	
	function importcsv()
	{
		if ($_FILES[cityimprt][size] > 0)
 { 
    $file = $_FILES[cityimprt][tmp_name]; 
    $handle = fopen($file,"r");  
	fgets($handle);     	 
    do { 
        if ($data[0]) {
        	 
            $result1=mysql_query("INSERT INTO city (city_code,city_name,city_state) VALUES ('".addslashes($data[0])."', '".addslashes($data[1])."', '".addslashes($data[2])."')");  
        } 
    } 
    while ($data = fgetcsv($handle,1000,",","'")); 
 
 	 if ($result1)

 {  
	            $result2["success"] = true;
				$result2["message"] = "csv uploaded successfully";
 }   
else
	{
		        $result2["failure"] = true;
				$result2["message"] =  "Not uploaded: " . mysql_error();
	}
   echo(json_encode($result2));
} 

	}

function getFreelancerMasterById($id)
 	{
		$result1 = mysql_query ("Select
  			city_id,
 			city_code,
 			city_name,
 			city_state
 			FROM city where
 			city.city_state='".$id."'");
			
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
			$data [] = $row;
		}
	   	echo'({"results":'.json_encode($data).'})';
    }
	
?>