<?php
    include("config.php");
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getVendorMastercntct();
			break;
		case 2:
			getVendorEmailId($_POST["userid1"]);
			break;
		default: 
			break;
	}
	
	
		function getVendorMastercntct()
	{
 		$num_result = mysql_query ("Select 
  vendors_contacts.id as vendor_id,
  vendors_contacts.firstname
From
  vendors_contacts
WHERE vendors_contacts.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select 
 vendors_contacts.id as vendor_id,
  vendors_contacts.firstname as vendor_firstname
From
  vendors_contacts
WHERE vendors_contacts.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	
	
	function getVendorEmailId($userid1)
	{
	
	$result1 = mysql_query ("Select
			  
			  vendors_contacts.email as useremail
			  
			  From vendors_contacts Where vendors_contacts.id=".$userid1."");
			
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