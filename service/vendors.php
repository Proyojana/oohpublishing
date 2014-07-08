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
		default: 
			break;
	}
	
	
		function getVendorMaster()
	{
 		$num_result = mysql_query ("Select
  Group_Concat(ooh_publishing.services.name) as services,
  ooh_publishing.vendors.code as code,
  ooh_publishing.vendors.name As name,
  ooh_publishing.vendors.email as email,
  ooh_publishing.vendors.id as id
From
  ooh_publishing.vendors Inner Join
  ooh_publishing.vendors_services On ooh_publishing.vendors.code =
    ooh_publishing.vendors_services.vendors_code Inner Join
  ooh_publishing.services On ooh_publishing.vendors_services.service_id =
    ooh_publishing.services.id
  			WHERE ooh_publishing.vendors.flag=0 Group By
  ooh_publishing.vendors.code")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  Group_Concat(ooh_publishing.services.name) as services,
  ooh_publishing.vendors.code as code,
  ooh_publishing.vendors.name As name,
  ooh_publishing.vendors.email as email,
  ooh_publishing.vendors.id as id
From
  ooh_publishing.vendors Inner Join
  ooh_publishing.vendors_services On ooh_publishing.vendors.code =
    ooh_publishing.vendors_services.vendors_code Inner Join
  ooh_publishing.services On ooh_publishing.vendors_services.service_id =
    ooh_publishing.services.id
  			WHERE ooh_publishing.vendors.flag=0 Group By
  ooh_publishing.vendors.code LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getVendorsById($id)
 	{
		$result1 = mysql_query ("Select
		ooh_publishing.vendors.id as basicid,
  ooh_publishing.vendors.code as basiccode,
  ooh_publishing.vendors.name as basicname,
  ooh_publishing.vendors.description as basicdescription,
  ooh_publishing.vendors.address1 as basicaddress1,
  ooh_publishing.vendors.address2 as basicaddress2,
  Group_Concat(ooh_publishing.services.name) as basic_service,
  ooh_publishing.vendors.city as basiccity,
  ooh_publishing.vendors.state as basicstate,
  ooh_publishing.vendors.country as basiccountry,
  ooh_publishing.vendors.pin as basicpin,
  ooh_publishing.vendors.phone as basicphone,
  ooh_publishing.vendors.fax as basicfax,
  ooh_publishing.vendors.email as basicemail,
  ooh_publishing.vendors.website as basicwebsite
From
  ooh_publishing.vendors Inner Join
  ooh_publishing.vendors_services On ooh_publishing.vendors.code =
    ooh_publishing.vendors_services.vendors_code Inner Join
  ooh_publishing.services On ooh_publishing.vendors_services.service_id =
    ooh_publishing.services.id
  			WHERE ooh_publishing.vendors.flag=0 and ooh_publishing.vendors.id = '".$id."' Group By ooh_publishing.vendors.code");
			
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
	
?>