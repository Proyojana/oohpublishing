<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getProjects();
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
			insertProjectMaster($_POST['job_code'],$_POST['project_title'],$_POST['project_author'],$_POST['hb_isbn'],$_POST['pb_isbn'],$_POST['project_series'],$_POST['project_format'],$_POST['project_design'],$_POST['castoff_extent'],$_POST['confirmed_extent'],$_POST['client_deadline'],$_POST['agreed_deadline'],$_POST['word_count'],$_POST['manuscript'],$_POST['index_extent'],$_POST['chapter_footer'],$_POST['contain_colour'],$_POST['project_client'],$_POST['project_team'],$_POST['project_workflow'],$id);
			break;
		case 6:
			BulkDelete($_POST['id']);
			break;	
		case 7: 
			autoRequestCode($id);
			break;
		case 8:
			titleInfo($_POST['project_id']);
			break;
		case 9:
			insertProjectTeam($_POST['job_code'],$_POST['project_manager'],$_POST['production_editor'],$_POST['proofreader'],$_POST['indexer'],$_POST['copy_editor'],$_POST['typesetter'],$id);
			break;
		case 10:
			teamInfo($_POST['project_id']);
			break;
		default: 
			break;
	}
	

function getProjects()
	{
 		$num_result = mysql_query ("Select
  project_title.job_code As code,
  project_title.id As id,
  project_title.title As title,
  project_title.author as author,
  project_title.series As series,
  project_title.format As format,
  project_title.design As design,
  project_title.agreed_deadline As deadline,
  project_title.client_team As client_team,
  project_title.word_count As word_count,
  customers.name As client,
  workflow.name As workflow,
  customers_teams.team_name As client_team
From
  project_title Inner Join
  customers On project_title.client =
    customers.id Inner Join
  workflow On project_title.workflow =
    workflow.id Inner Join
  customers_teams On project_title.client_team =
    customers_teams.id
Where
  project_title.flag = 0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  project_title.job_code As code,
  project_title.id As id,
  project_title.title As title,
  project_title.author as author,
  project_title.series As series,
  project_title.format As format,
  project_title.design As design,
  project_title.agreed_deadline As deadline,
  project_title.client_team As client_team,
  project_title.word_count As word_count,
  customers.name As client,
  workflow.name As workflow,
  customers_teams.team_name as client_team
From
  project_title Inner Join
  customers On project_title.client =
    customers.id Inner Join
  workflow On project_title.workflow =
    workflow.id Inner Join
  customers_teams On project_title.client_team =
    customers_teams.id
Where
  project_title.flag = 0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
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
  dept_master Where	id=".$deptid."");
			
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
	
	function insertProjectMaster($job_code,$title,$author,$hb_isbn,$pb_isbn,$series,$format,$design,$castoff_extent,$confirmed_extent,$client_deadline,$agreed_deadline,$word_count,$manuscript,$index_extent,$footer,$colour,$client,$team,$workflow,$id)
		
    {
		$checkquery="SELECT job_code FROM project_title WHERE job_code='".$job_code."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO project_title(id,job_code,title,author,hb_isbn,pb_isbn,series,format,design,castoff_extent,confirmed_extent,client_deadline,agreed_deadline,word_count,manuscript_pages,expect_index_extent,chapter_footer_req,contains_color,client,client_team,workflow,created_by,created_on,modified_by,modified_on,flag) 
			VALUES('','".$job_code."','".$title."','".$author."','".$hb_isbn."','".$pb_isbn."','".$series."','".$format."','".$design."','".$castoff_extent."','".$confirmed_extent."','".$client_deadline."','".$agreed_deadline."','".$word_count."','".$manuscript."','".$index_extent."','".$footer."','".$colour."','".$client."','".$team."','".$workflow."','".$id."',now(),'','','')");
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
			$result["message"] =  "Job Code already exists in the same name";
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
function autoRequestCode($id) {
	$autoRequest = mysql_query("select job_code from project_title");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['job_code'];
		}
	//	echo $data1;
		$data = str_split($data1, 4);
		$remain = substr($data1,3,6);
	

		//$data1 = substr($data1, -4);
		$code = $remain + 1;
		//echo $code;
		$code = str_pad($code, 2, '0', STR_PAD_LEFT);
	//	echo $code;
		$new_code = $data[0] . $code;
		
		//echo $new_code;
	} else {
		
		$new_code = "JOB001";
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
function titleInfo($project_id)
	{
	//	echo $project_id;
		$data1 = "";
		$data2 = "";
				$result1 = mysql_query ("Select 
  project_title.title as Title,
  project_title.author as Author,
  project_title.hb_isbn as Hbisbn,
  project_title.pb_isbn as Pbisbn,
  project_title.format as Format,
  project_title.design as Design,
  project_title.job_code as Jobcode,
  project_title.castoff_extent as castoff,
  project_title.confirmed_extent as confirmed
From
  project_title
Where
  project_title.id = '" . $project_id . "'");
			while($row = mysql_fetch_array($result1)) {
				
			$data1 = $row['Title'];
			$data2 = $row['Jobcode'];
			$data3 = $row['Hbisbn'];
			$data4 = $row['Pbisbn'];
			$data5 = $row['Format'];
			$data6 = $row['Design'];
			$data7 = $row['castoff'];
			$data8 = $row['confirmed'];
		}
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["Title"] = $data1;
				$result["Job Code"] = $data2;
				$result["HB ISBN"] = $data3;
				$result["PB ISBN"] = $data4;
				$result["Format"] = $data5;
				$result["Design"] = $data6;
				$result["Cast-off Extent"] = $data7;
				$result["Confirmed Extent"] = $data8;
								
			}
       /*	while($row=mysql_fetch_object($result1))
	   	{
			$result ["data"] = $row;
	  	}*/
      	echo(json_encode($result));
	}
	
	function insertProjectTeam($jobcode,$pm,$pe,$pr,$ir,$ce,$ts,$id)
    {
	//	$checkquery="SELECT code FROM users WHERE code='".$usercode."'";
	//	$result1=mysql_query($checkquery);
	//	$num_rows=mysql_num_rows($result1);
		
		//if($num_rows==0)
		//{
			$encrypted_password = encrypt($password,'key'); //Encrypt users password
			$result1 = mysql_query ("INSERT INTO project_team(id,project_id,project_manager,production_editor,proof_reader,indexer,copy_editor,typesetter,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$jobcode."','".$pm."','".$pe."','".$pr."','".$ir."','".$ce."','".$ts."','".$id."',now(),'','','')");
			
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
		//}
	/*	else
		{
			$result["success"] = false;
			$result["message"] =  "User Code already exists in the same name";
		}*/
		
		echo json_encode($result);
	}
	function teamInfo($project_id)
	{
	//	echo $project_id;
		$data1 = "";
		$data2 = "";
				$result1 = mysql_query ("Select
  project_team.proof_reader As pr,
  project_team.indexer As ir,
  project_team.copy_editor As ce,
  project_team.typesetter As ts,
  project_title.job_code As jc,
  users.name As pm,
  users1.name As pe
From
  project_team Inner Join
  project_title On project_team.project_id =
    project_title.id Inner Join
  users On project_team.project_manager =
    users.id Inner Join
  users users1 On project_team.production_editor =
    users1.id
Where
  project_title.id = '" . $project_id . "'");
			while($row = mysql_fetch_array($result1)) {
				
			$data1 = $row['jc'];
			$data2 = $row['pm'];
			$data3 = $row['pe'];
			$data4 = $row['pr'];
			$data5 = $row['ir'];
			$data6 = $row['ce'];
			$data7 = $row['ts'];
		}
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["Job Code"] = $data1;
				$result["Project Manager"] = $data2;
				$result["Production Editor"] = $data3;
				$result["Proof Reader"] = $data4;
				$result["Indexer"] = $data5;
				$result["Copy Editor"] = $data6;
				$result["Typesetter"] = $data7;											
			}
     
      	echo(json_encode($result));
	}
	
?>