<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			insertJobAuthors($_POST['id'],$_POST['job_code'],$_POST['author'],$_POST['name'],$_POST['address'],$_POST['email'],$_POST['phone'],$_POST['see_proof'],$_POST['no_proof'],$id);
			break;
		case 2:
			SelectJobAuthors($_POST['job_code']);
			break;
		case 3:
			insertJobContrib($_POST['id'],$_POST['job_code'],$_POST['chap_num'],$_POST['contrib_name'],$_POST['email'],$_POST['see_proof'],$_POST['proof_sent'],$_POST['proof_back'],$id);
			break;
		case 4:
			SelectJobContributor($_POST['job_code']);
			break;
		case 5:
			deleteAuthor($_POST['id']);
			break;
		case 6:
			deleteContributor($_POST['id']);
			break;
		case 7:
			deleteRatecardById($_POST["ratecardid"]);	
			break;
		case 8:
			getProjectDetails($_POST['job_code']);
			break;
		case 9:
			getHeaderData($_POST['job_code']);
			break;
			
		default: 
			break;
	}
	function insertJobAuthors($author_id,$job_code,$author_type,$author_name,$author_address,$author_email,$author_phone,$see_proof,$no_proof,$id)
	{
		//echo $author_name;
		$id = explode(',',$author_id);
		$author = explode(',',$author_type);
		$name = explode(',',$author_name);
		$address = explode('_',$author_address);
		$email = explode(',',$author_email);
		$phone = explode(',',$author_phone);
		$sproof = explode(',',$see_proof);
		$nproof = explode(',',$no_proof);
		//echo $name[0];
		$l = count($name);
	//	echo $id[0];
		for ($i = 0; $i <$l-1; $i++)
		{
			$checkquery="SELECT id FROM author WHERE id='".$id[$i]."'";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
		//	echo $num_rows;
			if($num_rows ==1)
				{
				
					$result1 = mysql_query("UPDATE author SET author = '".$author[$i]."', name = '".$name[$i]."',address = '".$address[$i]."',email = '".$email[$i]."',phone = '".$phone[$i]."',see_proof = '".$sproof[$i]."', no_proof = '".$nproof[$i]."'where id = '".$id[$i]."'");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
					
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Author saved successfully";
				}
				
				}
		else
		{

			$result1 = mysql_query ("INSERT INTO author(id,job_code,author,name,address,email,phone,see_proof,no_proof,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$job_code."','".$author[$i]."','".$name[$i]."','".$address[$i]."','".$email[$i]."','".$phone[$i]."','".$sproof[$i]."','".$nproof[$i]."','".$id."',now(),'','','')");		
		
		if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Author Inserted successfully";
			}
			
		}
		}
			echo json_encode($result);
		
	}
	function SelectJobAuthors($job_code)
		{
			$num_result = mysql_query ("Select
  author.id as id,
  author.job_code as job_code,
  author.author As author,
  author.name As name,
  author.address As address,
  author.email As email,
  author.phone As phone,
  author.see_proof As see_proof,
  author.no_proof As no_proof
From
  author
Where
  author.job_code = '".$job_code."' And
  author.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);
	//	echo $totaldata;

		$result = mysql_query("Select
 author.id as id,
  author.job_code as job_code,
  author.author As author,
  author.name As name,
  author.address As address,
  author.email As email,
  author.phone As phone,
  author.see_proof As see_proof,
  author.no_proof As no_proof
From
  author
Where
  author.job_code = '".$job_code."' And
  author.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
		}
	
	function insertJobContrib($contrib_id,$job_code,$chap_num,$contrib_name,$author_email,$see_proof,$proof_sent,$proof_back,$id)
	{
		//echo $author_name;
		$id = explode(',',$contrib_id);
		$cnum = explode(',',$chap_num);
		$name = explode(',',$contrib_name);		
		$email = explode(',',$author_email);
		$sproof = explode(',',$see_proof);
		$psent = explode(',',$proof_sent);
		$pback = explode(',',$proof_back);
		//echo $name[0];
		$l = count($name);
				for ($i = 0; $i <$l-1; $i++)
		{
			$checkquery="SELECT id FROM contributor WHERE id='".$id[$i]."'";
       		$result2=mysql_query($checkquery);
       		$num_rows=mysql_num_rows($result2);
		//	echo $num_rows;
			if($num_rows ==1)
				{
				
					$result1 = mysql_query("UPDATE contributor SET chap_num = '".$cnum[$i]."', contrib_name = '".$name[$i]."',email = '".$email[$i]."',see_proof = '".$sproof[$i]."', proof_sent = '".$psent[$i]."',proof_back = '".$pback[$i]."'where id = '".$id[$i]."'");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
					
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Contributor saved successfully";
				}
				
				}
		else
		{

			$result1 = mysql_query ("INSERT INTO contributor(id,job_code,chap_num,contrib_name,email,see_proof,proof_sent,proof_back,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$job_code."','".$cnum[$i]."','".$name[$i]."','".$email[$i]."','".$sproof[$i]."','".$psent[$i]."','".$pback[$i]."','".$id."',now(),'','','')");		
		
		if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Contributor Inserted successfully";
			}
			
		}
		}
				echo json_encode($result);
		
	}
	function SelectJobContributor($job_code)
		{
			$num_result = mysql_query ("Select
  contributor.id as id,
  contributor.job_code,
  contributor.chap_num As chap_num,
  contributor.contrib_name As contrib_name,
  contributor.email As email,
  contributor.see_proof As see_proof,
  contributor.proof_sent As proof_sent,
  contributor.proof_back As proof_back
From
  contributor
Where
  contributor.flag = 0 And
  contributor.job_code = '".$job_code."'")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);
	//	echo $totaldata;

		$result = mysql_query("Select
  contributor.id as id,
  contributor.job_code,
  contributor.chap_num As chap_num,
  contributor.contrib_name As contrib_name,
  contributor.email As email,
  contributor.see_proof As see_proof,
  contributor.proof_sent As proof_sent,
  contributor.proof_back As proof_back
From
  contributor
Where
  contributor.flag = 0 And
  contributor.job_code = '".$job_code."' LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
		}
		function deleteAuthor($id)
		{
			$checkquery="SELECT id FROM author WHERE id='".$id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE author SET flag=1 WHERE id='".$id."'");
				
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
	function deleteContributor($id)
		{
			$checkquery="SELECT id FROM contributor WHERE id='".$id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE contributor SET flag=1 WHERE id='".$id."'");
				
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
				$result["message"] =  'Contributor does not exist';
			}
		
		echo json_encode($result);
		}
	function deleteRatecardById($ratecardid)
    {
		$checkquery="SELECT id FROM customers_ratecard WHERE id='".$ratecardid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE customers_ratecard SET flag=1 WHERE id='".$ratecardid."'");
				
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
	
	function getProjectDetails($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as authorHeader_ClientName,
	  customers.code as authorHeader_ClientCode,
	  customers.id as authorHeader_clientId,
	  project_title.title as authorHeader_ProjectName,
	  project_title.workflow as authorHeader_workflow,
	  project_title.job_code as authorHeader_Job,
	  project_title.id as authorHeader_projectID
	  
	From
	  project_title Inner Join
	  customers On project_title.client =
	    customers.id
	Where
	  project_title.job_code = '".$job_code."'");
			
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
	function getHeaderData($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as editauthHeader_ClientName,
	  customers.code as editauthHeader_ClientCode,
	  customers.id as editauthHeader_clientId,
	  project_title.title as editauthHeader_ProjectName,
	  project_title.workflow as editauthHeader_workflow,
	  project_title.job_code as editauthHeader_Job,
	  project_title.id as editauthHeader_projectID
	  
	From
	  project_title Inner Join
	  customers On project_title.client =
	    customers.id
	Where
	  project_title.job_code = '".$job_code."'");
			
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