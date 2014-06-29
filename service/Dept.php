<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getDeptMaster();
			break;
		case 2:
			getDeptMasterById($_POST["deptid"]);	
			break;
		case 3:
			deleteDeptMasterById($_POST["deptid"]);	
			break;
		case 4:
			updateDeptMaster($_POST["deptid"],$_POST['deptcode'],$_POST['deptname'],$_POST['deptdesc'],$_POST['deptcourse'],$_POST['deptreview'],$id);	
			break;
		case 5:
			insertDeptMaster($_POST['deptcode'],$_POST['deptname'],$_POST['deptdesc'],$_POST['deptcourse'],$_POST['deptreview'],$id);
			break;
		case 6:
			BulkDelete($_POST['id']);
			break;	
		case 7:
			importcsv();
			break;	
		case 8:
			courseoffered();
			break;	
		case 9:
			reviewer();
			break;	
		default: 
			break;
	}
	
	function reviewer()
	{
		$num_result = mysql_query ("Select
  reviewer.id as id,
  reviewer.reviewername as deptreview
From
  reviewer")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  reviewer.id as id,
  reviewer.reviewername as deptreview
From
  reviewer LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	function courseoffered()
	{
		$num_result = mysql_query ("Select
  course_master.id as id,
  course_master.name as deptcourse
From
  course_master")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  course_master.id as id,
  course_master.name as deptcourse
From
  course_master LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	
	function getDeptMaster()
	{
 		$num_result = mysql_query ("Select
  dept_master.id As deptid,
  dept_master.code As deptcode,
  dept_master.name As deptname,
  dept_master.description As deptdesc,
  course_master.name As deptcourse,
  reviewer.reviewername as deptreview
From
  dept_master Inner Join
  course_master On dept_master.courseoffered =
    course_master.id Inner Join
  reviewer On dept_master.reviewer = reviewer.id
Where
  dept_master.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  dept_master.id As deptid,
  dept_master.code As deptcode,
  dept_master.name As deptname,
  dept_master.description As deptdesc,
  course_master.name As deptcourse,
  reviewer.reviewername as deptreview
From
  dept_master Inner Join
  course_master On dept_master.courseoffered =
    course_master.id Inner Join
  reviewer On dept_master.reviewer = reviewer.id
Where
  dept_master.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    
	function getDeptMasterById($deptid)
 	{
		$result1 = mysql_query ("Select
  dept_master.id As deptid,
  dept_master.code As deptcode,
  dept_master.name As deptname,
  dept_master.description As deptdesc
From
  dept_master
			Where
		  	id=".$deptid."");
			
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
  
     function updateDeptMaster($deptid,$deptcode,$deptname,$deptdesc,$deptcourse,$deptreview,$id)
    {
		$checkquery="SELECT id FROM dept_master WHERE id='".$deptid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE dept_master set code='".$deptcode."',name='".$deptname."',description='".$deptdesc."',courseoffered='".$deptcourse."',reviewer='".$deptreview."',modified_by='".$id."',modified_on=now() WHERE id=".$deptid."");
				
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
			$result["message"] =  'Dept does not exist';
		}
		

		echo json_encode($result);
    }
    
    
	function deleteDeptMasterById($deptid)
    {
		$checkquery="SELECT id FROM dept_master WHERE id='".$deptid."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE dept_master SET flag=1 WHERE id='".$deptid."'");
				
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
				$result["message"] =  'Dept does not exist';
			}
		
		echo json_encode($result);
	}
	
	function insertDeptMaster($deptcode,$deptname,$deptdesc,$deptcourse,$deptreview,$id)
    {
		$checkquery="SELECT code FROM dept_master WHERE code='".$deptcode."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO dept_master(id,code,name,description,courseoffered,reviewer,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$deptcode."','".$deptname."','".$deptdesc."','".$deptcourse."','".$deptreview."','".$id."',now(),'','','')");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Department Inserted successfully";
			}
		}
		else
		{
			$result["success"] = false;
			$result["message"] =  "Dept Code already exists in the same name";
		}
		
		echo json_encode($result);
	}
	function BulkDelete($id)
	{
		    $deptid = explode(',',$id);
			
			for ($i = 0; $i < count($deptid); $i++)
			{
			 	$checkquery = "SELECT code FROM dept_master WHERE id='" . $deptid[$i] . "'";
				$result1 = mysql_query($checkquery);
				$num_rows = mysql_num_rows($result1);
				if($num_rows==1){
					$procedure=mysql_query("UPDATE dept_master SET flag=1 WHERE id='".$deptid[$i]."'");
								
					$result["success"] = true;
					$result["message"] = 'Deleted successfully';
								
				}
				else{
				$result["success"] = false;
				$result["message"] = 'City does not exists';
				}
				
			}
		echo json_encode($result);		
	}	
	
	function importcsv()
	{
		if ($_FILES[cityimprt][size] > 0)
 { 
    $file = $_FILES[cityimprt][tmp_name]; 
    $handle = fopen($file,"r");  
	fgets($handle);     	 
    do { 
        if ($data[0]) {
        	 
            $result1=mysql_query("INSERT INTO dept_master (code,name,description) VALUES ('".addslashes($data[0])."', '".addslashes($data[1])."', '".addslashes($data[2])."')");  
        } 
    } 
    while ($data = fgetcsv($handle,1000,",","'")); 
 
 	 if ($result1)

 {  
	            $result2["success"] = true;
				$result2["message"] = "csv uploaded successfully";
 }   
else
	{
		        $result2["failure"] = true;
				$result2["message"] =  "Not uploaded: " . mysql_error();
	}
   echo(json_encode($result2));
} 

	}
	
?>