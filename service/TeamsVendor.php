<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			insertvendors_TeamsMaster($_POST['basicvendorid'],$_POST['teamname'],$_POST['division'],$_POST['teamemail'],$_POST['teamphone'],$_POST['teampoc']);
			break;
		case 2:
			updatevendors_TeamsMaster($_POST['teamid'],$_POST['teamname'],$_POST['division'],$_POST['teamemail'],$_POST['teamphone'],$_POST['teampoc']);
			break;
		case 3:
			getVendors_team($_POST['basicvendorid']);
			break;
		case 4:
			getVendors_teamById($_POST["teamid"]);	
			break;
		case 5:
			deleteVendors_teamById($_POST["teamid"]);	
			break;
			
		default: 
			break;
	}
	
	
	function insertvendors_TeamsMaster($basicvendorid,$teamname,$division,$teamemail,$teamphone,$teampoc)
    {
		$checkquery="SELECT id FROM vendors_teams WHERE team_name='".$teamname."' and division='".$division."' and vendor_id='".$basicvendorid."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO vendors_teams(id,vendor_id,team_name,division,email,phone,poc,flag) VALUES('','".$basicvendorid."','".$teamname."','".$division."','".$teamemail."','".$teamphone."','".$teampoc."','')");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Team Inserted successfully";
			}
		}
		else
		{
			$result["success"] = false;
			$result["message"] =  "Team is already exists ";
		}
		
		echo json_encode($result);
	}
	
	  function updatevendors_TeamsMaster($teamid,$teamname,$division,$teamemail,$teamphone,$teampoc)
    {
		$checkquery="SELECT id FROM vendors_teams WHERE id='".$teamid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE vendors_teams set team_name='".$teamname."',division='".$division."',email='".$teamemail."',phone='".$teamphone."',poc='".$teampoc."' WHERE id=".$teamid."");
				
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
			$result["message"] =  'Team does not exist';
		}
		

		echo json_encode($result);
    }
	function getVendors_team($basicvendorid)
	{
 		$num_result = mysql_query ("Select
  vendors_teams.team_name as teamname,
  vendors_teams.division as division,
  vendors_teams.email as email,
  vendors_teams.phone as phone,
  vendors_teams.poc as poc,
  vendors_teams.id as id,
  vendors_teams.vendor_id as basicvendorid  
From
  vendors_teams
Where
  vendors_teams.vendor_id = '".$basicvendorid."' and vendors_teams.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  vendors_teams.team_name as teamname,
  vendors_teams.division as division,
  vendors_teams.email as email,
  vendors_teams.phone as phone,
  vendors_teams.poc as poc,
  vendors_teams.id as id,
  vendors_teams.vendor_id  as basicvendorid 
From
  vendors_teams
Where
  vendors_teams.vendor_id = '".$basicvendorid."' and vendors_teams.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	function getVendors_teamById($teamid)
 	{
		$result1 = mysql_query ("Select
  vendors_teams.team_name as teamname,
  vendors_teams.division as division,
  vendors_teams.email as teamemail,
  vendors_teams.phone as teamphone,
  vendors_teams.poc as teampoc,
  vendors_teams.id as teamid,
  vendors_teams.vendor_id  
From
  vendors_teams
Where
  vendors_teams.id = '".$teamid."'");
			
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
	function deleteVendors_teamById($teamid)
    {
		$checkquery="SELECT id FROM vendors_teams WHERE id='".$teamid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE vendors_teams SET flag=1 WHERE id='".$teamid."'");
				
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
				$result["message"] =  'Team does not exist';
			}
		
		echo json_encode($result);
	}
	
  
	
?>