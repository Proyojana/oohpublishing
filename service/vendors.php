<?php
    include("config.php");
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getVendorMaster();
			break;
		case 2:
			getVendorsById($_POST["id"]);	
			break;
		case 3:
			deletevendorsById($_POST["id"]);	
			break;
		case 4:
			updateBasicInfoVendor($_POST['basicid'],$_POST['basiccode'],$_POST['basicname'],$_POST['basicdescription'],$_POST['basicaddress1'],$_POST['basicaddress2'],$_POST['basicservice'],$_POST['basiccity'],$_POST['basicstate'],$_POST['basiccountry'],$_POST['basicpin'],$_POST['basicphone'],$_POST['basicfax'],$_POST['basicemail'],$_POST['basicwebsite']);	
			break;
		case 5:
			insertBasicInfoVendor($_POST['basiccode'],$_POST['basicname'],$_POST['basicdescription'],$_POST['basicaddress1'],$_POST['basicaddress2'],$_POST['basicservice'],$_POST['basiccity'],$_POST['basicstate'],$_POST['basiccountry'],$_POST['basicpin'],$_POST['basicphone'],$_POST['basicfax'],$_POST['basicemail'],$_POST['basicwebsite']);
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
		case 9: 
			autoRequestCode($id);
			break;
		default: 
			break;
	}
	
	
		function getVendorMaster()
	{
 		$num_result = mysql_query ("Select
  Group_Concat(services.name) as services,
  vendors.code as code,
  vendors.name As name,
  vendors.email as email,
  vendors.id as id
From
  vendors Inner Join
  vendors_services On vendors.code =
    vendors_services.vendors_code Inner Join
  services On vendors_services.service_id =
    services.id
  			WHERE vendors.flag=0 Group By
  vendors.code")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  Group_Concat(services.name) as services,
  vendors.code as code,
  vendors.name As name,
  vendors.email as email,
  vendors.id as id
From
  vendors Inner Join
  vendors_services On vendors.code =
    vendors_services.vendors_code Inner Join
  services On vendors_services.service_id =
    services.id
  			WHERE vendors.flag=0 Group By
  vendors.code LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getVendorsById($id)
 	{
		$result1 = mysql_query ("Select
		vendors.id as basicid,
  vendors.code as basiccode,
  vendors.name as basicname,
  vendors.description as basicdescription,
  vendors.address1 as basicaddress1,
  vendors.address2 as basicaddress2,
  Group_Concat(services.name) as basic_service,
  vendors.city as basiccity,
  vendors.state as basicstate,
  vendors.country as basiccountry,
  vendors.pin as basicpin,
  vendors.phone as basicphone,
  vendors.fax as basicfax,
  vendors.email as basicemail,
  vendors.website as basicwebsite
From
  vendors Inner Join
  vendors_services On vendors.code =
    vendors_services.vendors_code Inner Join
  services On vendors_services.service_id =
    services.id
  			WHERE vendors.flag=0 and vendors.id = '".$id."' Group By vendors.code");
			
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
  
     function updateBasicInfoVendor($basicid,$basiccode,$basicname,$basicdescription,$basicaddress1,$basicaddress2,$sevicesven,$basiccity,$basicstate,$basiccountry,$basicpin,$basicphone,$basicfax,$basicemail,$basicwebsite)
    {
		$checkquery="SELECT id as id FROM vendors WHERE id='".$basicid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE vendors set code='".$basiccode."',name='".$basicname."',description='".$basicdescription."',address1='".$basicaddress1."',address2='".$basicaddress2."',services='".$sevicesven."',city='".$basiccity."',state='".$basicstate."',country='".$basiccountry."',pin='".$basicpin."',phone='".$basicphone."',fax='".$basicfax."',email='".$basicemail."',website='".$basicwebsite."' WHERE id=".$basicid."");
				
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
		$checkquery="SELECT id FROM vendors WHERE id='".$id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE vendors SET flag=1 WHERE id='".$id."'");
				
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
	
	function insertBasicInfoVendor($basiccode,$basicname,$basicdescription,$basicaddress1,$basicaddress2,$sevicesven,$basiccity,$basicstate,$basiccountry,$basicpin,$basicphone,$basicfax,$basicemail,$basicwebsite)
    {
		$checkquery="SELECT code FROM vendors WHERE code='".$basiccode."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO vendors(id,code,name,description,address1,address2,services,city,state,country,pin,phone,fax,email,website,flag) VALUES('','".$basiccode."','".$basicname."','".$basicdescription."','".$basicaddress1."','".$basicaddress2."','".$sevicesven."','".$basiccity."','".$basicstate."','".$basiccountry."','".$basicpin."','".$basicphone."','".$basicfax."','".$basicemail."','".$email."','".$basicwebsite."')");
			$services = explode(',', $sevicesven);
		for($i = 0; $i < count($services) - 1; $i++) {
			//echo $id;
			$result2 = mysql_query("INSERT INTO vendors_services(id,vendors_code,service_id,created_by,created_on,modified_by,modified_on,flag) VALUES('','" . $basiccode . "','" . $services[$i] . "','',now(),'','','')");

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
	
		function autoRequestCode($id) {
	$autoRequest = mysql_query("select code from vendors");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['code'];
		}
	//	echo $data1;
		$data = str_split($data1, 1);
		$remain = substr($data1,1,4);
	

		//$data1 = substr($data1, -4);
		$code = $remain + 1;
		//echo $code;
		$code = str_pad($code, 3, '0', STR_PAD_LEFT);
	//	echo $code;
		$new_code = $data[0] . $code;
		
		//echo $new_code;
	} else {
		
		$new_code = "V001";
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