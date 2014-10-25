<?php

session_start();    
    include("config.php");
	include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];
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
			updateUserMaster($_POST["userid"],$_POST['usercode'],$_POST['userper'],$_POST['userfirstname'],$_POST['usermiddlename'],$_POST['userlastname'],$_POST['username'],$_POST['role'],$_POST['useremail'],$_POST['userdescription']);	
			break;
		case 5:
			insertUserMaster($_POST['usercode'],$_POST['userper'],$_POST['userfirstname'],$_POST['usermiddlename'],$_POST['userlastname'],$_POST['username'],$_POST['password'],$_POST['role'],$_POST['useremail'],$_POST['userdescription'],$id);
			break;
		case 6:
			BulkDelete($_POST['id']);
			break;	
		case 7:
			autoRequestCode($id);
			break;
		case 8:
			getProjectManagers();
			break;
		case 9:
			getUser();
			break;
		case 10:
		    getHeaderData($_POST['job_code']);
			break;
        case 11:
			insertTeam($_POST['project_id'],$_POST['role'],$_POST['name'],$_POST['email']);
			break;
	   case 12:
			getTeam($_POST['project_id']);
	        break;
		
		default: 
			break;
	}
	
	
	function getUserMaster()
	{
 		$num_result = mysql_query ("Select
  users.id as userid,
  users.per as per,
  users.firstname as firstname,
  users.middlename as middlename,
  users.lastname as lastname,
  users.username as username,
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
  users.per as per,
  users.firstname as firstname,
  users.middlename as middlename,
  users.lastname as lastname,
  users.username as username,
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
  users.per as user_per,
  users.firstname as user_first_name,
  users.middlename as user_middle_name,
  users.lastname as user_last_name,
  users.username as username,
  users.code as usercode,
  users.email as useremail,
  team_roles.id as userrole,
  users.description as userdescription
From users Inner Join team_roles On users.role = team_roles.id Where users.id=".$userid1."");
			
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
  
     function updateUserMaster($userid,$usercode,$per,$firstname,$middlename,$lastname,$username,$userrole,$useremail,$userdescription)
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
			$result1= mysql_query("UPDATE users set code='".$usercode."',per='".$per."',firstname='".$firstname."',middlename='".$middlename."',lastname='".$lastname."', username='".$username."', role='".$userrole."', email='".$useremail."',description='".$userdescription."',modified_by='".$userid."',modified_on=now() WHERE id=".$userid."");
				
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
	
	function insertUserMaster($usercode,$per,$firstname,$middlename,$lastname,$username,$password,$role,$email,$userdescription,$id)
    {
		$checkquery="SELECT code FROM users WHERE code='".$usercode."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$encrypted_password = encrypt($password,'key'); //Encrypt users password
			$result1 = mysql_query ("INSERT INTO users(id,code,per,firstname,middlename,lastname,username,password,role,email,description,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$usercode."','".$per."','".$firstname."','".$middlename."','".$lastname."','".$username."','".$encrypted_password."','".$role."','".$email."','".$userdescription."','".$id."',now(),'','','')");
			
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
	
	function getProjectManagers()
		{
			
			 		$num_result = mysql_query ("Select
  users.code As usercode,
  users.firstname As username,
  users.id As userid
From
  users
Where
  users.role = '1' And
  users.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  users.code As usercode,
  users.firstname As username,
  users.id As userid
From
  users
Where
  users.role = '1' And
  users.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
			
			
			
		}
		
			function getUser()
		{
			
			 		$num_result = mysql_query ("Select
  users.code As usercode,
  users.firstname As username,
  users.id As userid
From
  users
Where
  
  users.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  users.code As usercode,
  users.firstname As username,
  users.id As userid
From
  users
Where
  
  users.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
			
			
			
		}
		function getHeaderData($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as editteamHeader_ClientName,
	  customers.code as editteamHeader_ClientCode,
	  customers.id as editteamHeader_clientId,
	  project_title.title as editteamHeader_ProjectName,
	  project_title.workflow as editteamHeader_workflow,
	  project_title.job_code as editteamHeader_Job,
	  project_title.id as editteamHeader_projectID,
	  author.name as editteamHeader_AuthorName
	  
	From
	  project_title Inner Join
	  customers On project_title.client =
	    customers.id Inner Join
	  author On project_title.job_code=author.job_code
	Where
	  project_title.job_code = '".$job_code."' And author.author='Author'");
			
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
	
	function insertTeam($project_id, $role, $name, $email){
		$role = explode(',',$role);
		$name = explode(',',$name);
		$email = explode(',',$email);
		for ($i = 0; $i < count($name)-1; $i++)
		{
			$checkquery="SELECT id FROM project_team WHERE project_id='".$project_id."' and role='".$role[$i]."'";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
			if($num_rows == 1)
			{
				
				$result1 = mysql_query("UPDATE project_team SET  user = '".$name[$i]."', email = '".$email[$i]."' WHERE project_id='".$project_id."' and role='".$role[$i]."'");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Team Updated successfully";
				}
		  }
			
			else
			{
				$result2 = mysql_query("INSERT INTO project_team (id ,project_id, role, user, email,created_by,created_on,modified_by,modified_on,flag)
                                VALUES ('','".$project_id."','".$role[$i]."','".$name[$i]."','".$email[$i]."','','','','','')");
				if(!$result2)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Team saved successfully";
				}
			}
			}
	}
	function getTeam($project_id)
	{
 		$num_result = mysql_query ("Select
  oohpublishing.project_team.id As id,
  oohpublishing.project_team.role As role,
  oohpublishing.project_team.email As email,
  oohpublishing.vendors.name As name
From
  oohpublishing.project_team Inner Join
  oohpublishing.vendors On oohpublishing.project_team.user =
    oohpublishing.vendors.id
Where
  oohpublishing.project_team.project_id = '".$project_id."' And
  oohpublishing.project_team.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  oohpublishing.project_team.id As id,
  oohpublishing.project_team.role As role,
  oohpublishing.project_team.email As email,
  oohpublishing.vendors.name As name
From
  oohpublishing.project_team Inner Join
  oohpublishing.vendors On oohpublishing.project_team.user =
    oohpublishing.vendors.id
Where
  oohpublishing.project_team.project_id = '".$project_id."' And
  oohpublishing.project_team.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	//new change
	
?>