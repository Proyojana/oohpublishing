<?php
 //   session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
//$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			insertcustomers_TeamsMaster($_POST['teams_customerid'],$_POST['teamname'],$_POST['division'],$_POST['email'],$_POST['phone'],$_POST['poc']);
			break;
		case 2:
			updatecustomers_TeamsMaster($_POST['teamid'],$_POST['teamname'],$_POST['division'],$_POST['email'],$_POST['phone'],$_POST['poc']);
			break;
		case 3:
			getCustomers_team($_POST['customerid']);
			break;
		case 4:
			getCustomers_teamById($_POST["teamid"]);	
			break;
		case 5:
			deleteCustomers_teamById($_POST["teamid"]);	
			break;
		case 6:
			getClientTeam($_POST['clientId']);
			break;		
		default: 
			break;
	}
	
	
	function insertcustomers_TeamsMaster($teams_customerid,$teamname,$division,$email,$phone,$poc)
    {
		$checkquery="SELECT id FROM customers_teams WHERE team_name='".$teamname."' and division='".$division."' and customer_id='".$teams_customerid."' ";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO customers_teams(id,customer_id,team_name,division,email,phone,poc,flag) VALUES('','".$teams_customerid."','".$teamname."','".$division."','".$email."','".$phone."','".$poc."','')");
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
	
	  function updatecustomers_TeamsMaster($teamid,$teamname,$division,$email,$phone,$poc)
    {
		$checkquery="SELECT id FROM customers_teams WHERE id='".$teamid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE customers_teams set team_name='".$teamname."',division='".$division."',email='".$email."',phone='".$phone."',poc='".$poc."' WHERE id=".$teamid."");
				
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
	function getCustomers_team($customerid)
	{
 		$num_result = mysql_query ("Select
  customers_teams.team_name as name,
  customers_teams.division as division,
  customers_teams.email as mail,
  customers_teams.phone as phone,
  customers_teams.poc as poc,
  customers_teams.id as id,
  customers_teams.customer_id  
From
  customers_teams
Where
  customers_teams.customer_id = '".$customerid."' and customers_teams.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  customers_teams.team_name as name,
  customers_teams.division as division,
  customers_teams.email as mail,
  customers_teams.phone as phone,
  customers_teams.poc as poc,
  customers_teams.id as id,
  customers_teams.customer_id  
From
  customers_teams
Where
  customers_teams.customer_id = '".$customerid."' and customers_teams.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	function getCustomers_teamById($teamid)
 	{
		$result1 = mysql_query ("Select
  customers_teams.team_name as custteamname,
  customers_teams.division as custdivision,
  customers_teams.email as custteamemail,
  customers_teams.phone as custteamphone,
  customers_teams.poc as custteampoc,
  customers_teams.id as customers_teamid,
  customers_teams.customer_id  
From
  customers_teams
Where
  customers_teams.id = '".$teamid."'");
			
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
	function deleteCustomers_teamById($teamid)
    {
		$checkquery="SELECT id FROM customers_teams WHERE id='".$teamid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE customers_teams SET flag=1 WHERE id='".$teamid."'");
				
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
	function getClientTeam($clientid)
 	{
		$result1 = mysql_query ("Select
		  customers_teams.team_name as name,
		   customers_teams.id as id,
		  customers_teams.customer_id
		From
		  customers_teams
		Where
		  customers_teams.customer_id = ".$clientid."");
					
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				
			}
			$data=null;
       while($row = mysql_fetch_object($result1)) {
		$data[] = $row;
	}
	echo '({"results":' . json_encode($data) . '})';
    }
  
	
?>