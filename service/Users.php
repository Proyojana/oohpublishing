<?php

session_start();    
    include("config.php");
	include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getUserMaster();
			break;
		case 2:
			getUserMasterById($_POST["userid1"]);	
			break;
		case 3:
			deleteUserMasterById($_POST["userid"]);	
			break;
		case 4:
			updateUserMaster($_POST["userid"],$_POST['usercode'],$_POST['username'],$_POST['role'],$_POST['useremail'],$_POST['userdescription']);	
			break;
		case 5:
			insertUserMaster($_POST['usercode'],$_POST['username'],$_POST['password'],$_POST['role'],$_POST['useremail'],$_POST['userdescription'],$id);
			break;
		case 6:
			BulkDelete($_POST['id']);
			break;	
		case 7:
			autoRequestCode($id);
			break;
		default: 
			break;
	}
	
	
	function getUserMaster()
	{
 		$num_result = mysql_query ("Select
  users.id as userid,
  users.name as username,
  users.code as usercode,
  users.email as useremail,
  team_roles.role_name as userrole,
  users.description as userdescription
  From
  users Inner Join
  team_roles On users.role =
    team_roles.id Where users.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  users.id as userid,
  users.name as username,
  users.code as usercode,
  users.email as useremail,
  team_roles.role_name as userrole,
  users.description as userdescription
  From
  users Inner Join
  team_roles On users.role =
    team_roles.id Where users.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getUserMasterById($userid1)
 	{
	$result1 = mysql_query ("Select
  users.id as userid,
  users.name as username,
  users.code as usercode,
  users.email as useremail,
  team_roles.role_name as userrole,
  users.description as userdescription
From
  users Inner Join
  team_roles On users.role =
    team_roles.id
			Where
		  	users.id=".$userid1."");
			
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
  
     function updateUserMaster($userid,$usercode,$username,$userrole,$useremail,$userdescription)
    {
    /*	$autoRequest = mysql_query("Select
  users.password
From
  users
Where
  users.name = 'Gowri'");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['password'];
		}
		$emp_DecryptedPassword=decrypt($data1,'key'); 
		echo $emp_DecryptedPassword;
		}
		*/
		
		$checkquery="SELECT id FROM users WHERE id='".$userid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE users set code='".$usercode."', name='".$username."', role='".$userrole."', email='".$useremail."',description='".$userdescription."',modified_by='".$userid."',modified_on=now() WHERE id=".$userid."");
				
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
			$result["message"] =  'User does not exist';
		}
		

		echo json_encode($result);
    }
    
    
	function deleteUserMasterById($userid)
    {
		$checkquery="SELECT id FROM users WHERE id='".$userid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE users SET flag=1 WHERE id='".$userid."'");
				
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
				$result["message"] =  'Client does not exist';
			}
		
		echo json_encode($result);
	}
	
	function insertUserMaster($usercode,$username,$password,$role,$email,$userdescription,$id)
    {
		$checkquery="SELECT code FROM users WHERE code='".$usercode."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$encrypted_password = encrypt($password,'key'); //Encrypt users password
			$result1 = mysql_query ("INSERT INTO users(id,code,name,password,role,email,description,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$usercode."','".$username."','".$encrypted_password."','".$role."','".$email."','".$userdescription."','".$id."',now(),'','','')");
			
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
			$result["message"] =  "User Code already exists in the same name";
		}
		
		echo json_encode($result);
	}
	function BulkDelete($id)
	{
		    $client_id = explode(',',$id);
			
			for ($i = 0; $i < count($client_id); $i++)
			{
			 	$checkquery = "SELECT code FROM client_master WHERE id='" . $client_id[$i] . "'";
				$result1 = mysql_query($checkquery);
				$num_rows = mysql_num_rows($result1);
				if($num_rows==1){
					$procedure=mysql_query("UPDATE client_master SET flag=1 WHERE id='".$client_id[$i]."'");
								
					$result["success"] = true;
					$result["message"] = 'Deleted successfully';
								
				}
				else{
				$result["success"] = false;
				$result["message"] = 'Delete Failed';
				}
				
			}
		echo json_encode($result);		
	}
	function autoRequestCode($id) {
	$autoRequest = mysql_query("select code from users");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['code'];
		}
	//	echo $data1;
		$data = str_split($data1, 2);
		$remain = substr($data1,2,5);
	

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
	
?>