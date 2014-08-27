<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getRatecardMaster($_POST['vendorid']);
			break;
		case 2:
			insertRateCardMaster($_POST['activity'],$_POST['uom'],$_POST['dollars'],$_POST['pounds'],$_POST['ratecardid'],$_POST['vendorid']);
			break;
		case 3:
			deleteRatecardById($_POST["ratecardid"]);	
			break;
		case 4:
			saveRateCardMaster($_POST['activity'],$_POST['uom'],$_POST['dollars'],$_POST['pounds'],$_POST['ratecardid'],$_POST['vendorid']);
			break;
		default: 
			break;
	}
	function getRatecardMaster($vendorid)
	{
 		$num_result = mysql_query ("Select
  vendors_ratecard.uom As uom,
  vendors_ratecard.dollars As dollars,
  vendors_ratecard.pounds As pounds,
  vendors_ratecard.id As ratecardid,
  activity.id As activity
From
  vendors_ratecard Inner Join
  activity On vendors_ratecard.activity =
    activity.id
Where
  vendors_ratecard.vendor_id =  '".$vendorid."' and vendors_ratecard.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  vendors_ratecard.uom As uom,
  vendors_ratecard.dollars As dollars,
  vendors_ratecard.pounds As pounds,
  vendors_ratecard.id As ratecardid,
  activity.id As activity
From
  vendors_ratecard Inner Join
  activity On vendors_ratecard.activity =
    activity.id
Where
  vendors_ratecard.vendor_id =  '".$vendorid."' and vendors_ratecard.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	function insertRateCardMaster($activity,$uom,$dollars,$pounds,$ratecardid,$vendorid)
    {
    		
    		$activity1 = explode(',',$activity);
			$uom1 = explode(',',$uom);
			$dollars1 = explode(',',$dollars);
			$pounds1 = explode(',',$pounds);
			$ratecardid1 = explode(',',$ratecardid);
		
		for ($i = 0; $i < count($activity1)-1; $i++)
		{
    	
		$checkquery="SELECT id FROM vendors_ratecard WHERE id='".$ratecardid1[$i]."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO vendors_ratecard(id,vendor_id,activity,uom,dollars,pounds,flag) VALUES('','".$vendorid."','".$activity1[$i]."','".$uom1[$i]."','".$dollars1[$i]."','".$pounds1[$i]."','')");
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
			
			$result1 = mysql_query ("Update vendors_ratecard set activity='".$activity1[$i]."',uom='".$uom1[$i]."',dollars='".$dollars1[$i]."',pounds='".$pounds1[$i]."' where id='".$ratecardid1[$i]."'");
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
	function saveRateCardMaster($activity,$uom,$dollars,$pounds,$ratecardid,$vendorid)
    {
		$checkquery="SELECT id FROM vendors_ratecard WHERE id='".$ratecardid."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO vendors_ratecard(id,vendor_id,activity,uom,dollars,pounds,flag) VALUES('','".$vendorid."','".$activity."','".$uom."','".$dollars."','".$pounds."','')");
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
			
			$result1 = mysql_query ("Update vendors_ratecard set activity='".$activity."',uom='".$uom."',dollars='".$dollars."',pounds='".$pounds."' where id='".$ratecardid."'");
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
?>