<?php
    include("config.php");
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getVendorMastercntct();
			break;
		
		default: 
			break;
	}
	
	
		function getVendorMastercntct()
	{
 		$num_result = mysql_query ("Select 
  
  vendors_contacts.firstname
From
  vendors_contacts
WHERE vendors_contacts.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select 
 
  vendors_contacts.firstname
From
  vendors_contacts
WHERE vendors_contacts.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	?>