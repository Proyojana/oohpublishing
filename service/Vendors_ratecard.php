<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getRatecardMaster($_POST['vendorid']);
			break;
		case 2:
			insertRateCardMaster($_POST['services'],$_POST['uom'],$_POST['dollars'],$_POST['pounds'],$_POST['ratecardid'],$_POST['vendorid']);
			break;
		case 3:
			deleteRatecardById($_POST["ratecardid"]);	
			break;
			
		default: 
			break;
	}
	function getRatecardMaster($vendorid)
	{
 		$num_result = mysql_query ("Select
  vendors_ratecard.uom as uom,
  vendors_ratecard.dollars as dollars,
  vendors_ratecard.pounds as pounds,
  vendors_ratecard.id as ratecardid,
  vendors_ratecard.services as services
From
  vendors_ratecard Inner Join
  services On vendors_ratecard.services =
    services.id
Where
  vendors_ratecard.vendor_id =  '".$vendorid."' and vendors_ratecard.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  vendors_ratecard.uom as uom,
  vendors_ratecard.dollars as dollars,
  vendors_ratecard.pounds as pounds,
  vendors_ratecard.id as ratecardid,
  vendors_ratecard.services as services
From
  vendors_ratecard Inner Join
  services On vendors_ratecard.services =
    services.id
Where
  vendors_ratecard.vendor_id =  '".$vendorid."' and vendors_ratecard.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	function insertRateCardMaster($services,$uom,$dollars,$pounds,$ratecardid,$vendorid)
    {
		$checkquery="SELECT id FROM vendors_ratecard WHERE id='".$ratecardid."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO vendors_ratecard(id,vendor_id,services,uom,dollars,pounds,flag) VALUES('','".$vendorid."','".$services."','".$uom."','".$dollars."','".$pounds."','')");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Ratecard Inserted successfully";
			}
		}
		else if($num_rows==1)
		{
			
			$result1 = mysql_query ("Update vendors_ratecard set services='".$services."',uom='".$uom."',dollars='".$dollars."',pounds='".$pounds."' where id='".$ratecardid."'");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Ratecard Saved successfully";
			}
		}
		else
			{
				$result["success"] = true;
				$result["message"] = "Ratecard is not exist";
			}
		
		echo json_encode($result);
	}
	function deleteRatecardById($ratecardid)
    {
		$checkquery="SELECT id FROM vendors_ratecard WHERE id='".$ratecardid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE vendors_ratecard SET flag=1 WHERE id='".$ratecardid."'");
				
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
				$result["message"] =  'Ratecard does not exist';
			}
		
		echo json_encode($result);
	}
?>