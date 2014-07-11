<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
//echo $id;
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			autoRequestCode($id);
			break;
		case 2:
			insertTeamRoles($_POST['trole_code'],$_POST['trole_name'],$_POST['trole_description'],$_POST['createdby'],$id);
			break;
		case 3:
			getTeamRoles();
			break;
		case 4:
			getTeamRolesById($_POST["trolesid"]);	
			break;		
		case 5:
			deleteTeamRolesById($_POST["trolesid"]);	
			break;
		case 6:
			updateTeamRolesById($_POST['trole_id'],$_POST['trole_code'],$_POST['trole_name'],$_POST['trole_description'],$id);	
			break;
	/*	case 5:
			getDeptMasterById($_POST["deptid"]);	
			break;*/
		default: 
			break;
	}
	
	function autoRequestCode($userid) {
	$autoRequest = mysql_query("select role_code from team_roles");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['role_code'];
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
		
		$new_code = "R0001";
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
	
	function insertTeamRoles($trole_code,$trole_name,$trole_description,$id)
    {
    	//echo $id;
		$checkquery="SELECT role_code FROM team_roles WHERE role_code='".$trole_code."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO team_roles(id,role_code,role_name,description,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$trole_code."','".$trole_name."','".$trole_description."','".$id."',now(),'','','')");
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
			$result["message"] =  "Team Role already exists in the same name";
		}
		
		echo json_encode($result);
	}
	
		function getTeamRoles()
	{
 		$num_result = mysql_query ("Select
  team_roles.role_code as trolescode,
  team_roles.role_name as trolesname,
  team_roles.description as description,
  team_roles.id as trolesid
From
  team_roles
Where
  team_roles.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  team_roles.role_code as trolescode,
  team_roles.role_name as trolesname,
  team_roles.description as description,
  team_roles.id as trolesid
From
  team_roles
Where
  team_roles.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
function getTeamRolesById($trolesid)
 	{
		$result1 = mysql_query ("Select
  team_roles.role_code as trolescode,
  team_roles.role_name as trolesname,
  team_roles.description as trolesdescription
From
  team_roles
Where
  team_roles.id =".$trolesid."");
			
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
function deleteTeamRolesById($trolesid)
    {
		$checkquery="SELECT id FROM team_roles WHERE id='".$trolesid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE team_roles SET flag=1 WHERE id='".$trolesid."'");
				
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
				$result["message"] =  'Team Roles does not exist';
			}
		
		echo json_encode($result);
	}
     function updateTeamRolesById($trolesid,$trolescode,$trolesname,$trolesdescription,$id)
    {
		$checkquery="SELECT id FROM team_roles WHERE role_code='".$trolescode."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE team_roles set role_code='".$trolescode."',role_name='".$trolesname."',description='".$trolesdescription."',modified_by='".$id."',modified_on=now() WHERE role_code='".$trolescode."'");
				
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
			$result["message"] =  'Team Role does not exist';
		}
		

		echo json_encode($result);
    }	
?>