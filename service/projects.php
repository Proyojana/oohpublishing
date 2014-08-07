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
			getProjectById($_POST["project_code"]);	
			break;
		case 3:
			deleteDeptMasterById($_POST["deptid"]);	
			break;
		case 4:
			updateProjectMaster($_POST['project_id'],$_POST['job_code'],$_POST['project_title'],$_POST['project_author'],$_POST['hb_isbn'],$_POST['pb_isbn'],$_POST['project_series'],$_POST['project_format'],$_POST['project_design'],$_POST['castoff_extent'],$_POST['confirmed_extent'],$_POST['client_deadline'],$_POST['agreed_deadline'],$_POST['word_count'],$_POST['manuscript'],$_POST['index_extent'],$_POST['chapter_footer'],$_POST['contain_colour'],$_POST['project_client'],$_POST['project_team'],$_POST['project_workflow'],$id);	
			break;
		case 5:
			insertProjectMaster($_POST['job_code'],$_POST['project_title'],$_POST['hb_isbn'],$_POST['pb_isbn'],$_POST['project_series'],$_POST['project_format'],$_POST['project_design'],$_POST['castoff_extent'],$_POST['confirmed_extent'],$_POST['client_deadline'],$_POST['agreed_deadline'],$_POST['word_count'],$_POST['manuscript'],$_POST['index_extent'],$_POST['chapter_footer'],$_POST['contain_colour'],$_POST['project_client'],$_POST['project_team'],$_POST['project_workflow'],$id,$_POST['word_count_indexing'],$_POST['cover_type'],$_POST['print_run'],$_POST['print_run_confirmed']);
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
			insertProjectTeam($_POST['job_code'],$_POST['project_id'],$_POST['project_manager'],$_POST['production_editor'],$_POST['proofreader'],$_POST['indexer'],$_POST['copy_editor'],$_POST['typesetter'],$id);
			break;
		case 10:
			teamInfo($_POST['project_id']);
			break;
		case 11:
			ptitleInfo($_POST['project_id']);
			break;
		case 12:
			pteaminfo($_POST['project_id']);
			break;
		case 13:
			pbudgetinfo($_POST['project_id']);
			break;
		case 14:
			tgeneralinfo($_POST['project_id']);
			break;
		case 15:
		    getTeamInfo($_POST['project_id']);
			break;
		case 16:
			getProjectDetails($_POST['job_code']);
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
    
	function getProjectById($project_code)
 	{
 		$project_id = mysql_query("Select project_title.id From project_title Where project_title.job_code = '".$project_code."'");
 		while($row = mysql_fetch_array($project_id)) {				
			$proj_id = $row['id'];			
		}
 		
		$result1 = mysql_query ("Select
  project_title.id As edit_project_id,
  project_title.job_code As edit_job_code,
  project_title.title As edit_project_title,
  project_title.author As edit_project_author,
  project_title.hb_isbn As edit_hb_isbn,
  project_title.pb_isbn As edit_pb_isbn,
  project_title.series As edit_project_series,
  project_title.format As edit_project_format,
  project_title.design As edit_project_design,
  project_title.castoff_extent As edit_castoff_extent,
  project_title.confirmed_extent As edit_confirmed_extent,
  project_title.client_deadline As edit_client_deadline,
  project_title.agreed_deadline As edit_agreed_deadline,
  project_title.word_count As edit_word_count,
  project_title.manuscript_pages As edit_manuscript,
  project_title.expect_index_extent As edit_index_extent,
  project_title.chapter_footer_req As edit_chapter_footer,
  project_title.contains_color As edit_contain_colour,
  project_title.client As edit_project_client,
  project_title.client_team As edit_project_team,
  project_title.workflow As edit_project_workflow
From
  project_title
Where
  project_title.job_code ='".$project_code."' and
  project_title.flag = 0 ");
			
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
  
     function updateProjectMaster($proj_id,$job_code,$title,$author,$hb_isbn,$pb_isbn,$series,$format,$design,$castoff_extent,$confirmed_extent,$client_deadline,$agreed_deadline,$word_count,$manuscript,$index_extent,$footer,$colour,$client,$team,$workflow,$id)
    {
		$checkquery="SELECT id FROM project_title WHERE id='".$proj_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE project_title set title='".$title."',author='".$author."',hb_isbn='".$hb_isbn."',pb_isbn='".$pb_isbn."',series='".$series."',format='".$format."',design='".$design."',castoff_extent='".$castoff_extent."',confirmed_extent='".$confirmed_extent."',client_deadline='".$client_deadline."',agreed_deadline='".$agreed_deadline."',word_count='".$word_count."',manuscript_pages='".$manuscript."',expect_index_extent='".$index_extent."',chapter_footer_req='".$footer."',contains_color='".$colour."',client='".$client."',client='".$client."',client_team='".$team."',workflow='".$workflow."',modified_by='".$id."',modified_on=now() WHERE id=".$proj_id."");
				
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
	
	function insertProjectMaster($job_code,$title,$hb_isbn,$pb_isbn,$series,$format,$design,$castoff_extent,$confirmed_extent,$client_deadline,$agreed_deadline,$word_count,$manuscript,$index_extent,$footer,$colour,$client,$team,$workflow,$id,$word_count_indexing,$cover_type,$print_run,$print_run_confirmed)
		
    {
    	

		$checkquery="SELECT job_code FROM project_title WHERE job_code='".$job_code."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO project_title(id,job_code,title,author,hb_isbn,pb_isbn,series,format,design,castoff_extent,confirmed_extent,client_deadline,agreed_deadline,word_count,word_count_indexing,manuscript_pages,expect_index_extent,chapter_footer_req,contains_color,cover_type,print_run,print_run_confirmed,client,client_team,workflow,created_by,created_on,modified_by,modified_on,flag) 
			VALUES('','".$job_code."','".$title."','','".$hb_isbn."','".$pb_isbn."','".$series."','".$format."','".$design."','".$castoff_extent."','".$confirmed_extent."','".$client_deadline."','".$agreed_deadline."','".$word_count."','".$word_count_indexing."','".$manuscript."','".$index_extent."','".$footer."','".$colour."','".$cover_type."','".$print_run."','".$print_run_confirmed."','".$client."','".$team."','".$workflow."','".$id."',now(),'','','')");
			
/** mail function
 			$to = "durairajgowri13@gmail.com";
			$subject = "Mail";
			$message = "You got mail";
			$from = "gowri.sundari@proyojana.com";
			$headers ="Hi";
			$mail_sent= mail($to,$subject,$message,$headers);

**/
			
			
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Project Inserted successfully";
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
	
	function insertProjectTeam($jobcode,$project_id,$pm,$pe,$pr,$ir,$ce,$ts,$id)
    {
		$checkquery="SELECT id FROM project_team WHERE project_id='".$project_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			//$encrypted_password = encrypt($password,'key'); //Encrypt users password
			$result1 = mysql_query ("INSERT INTO project_team(id,project_id,project_manager,production_editor,proof_reader,indexer,copy_editor,typesetter,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$project_id."','".$pm."','".$pe."','".$pr."','".$ir."','".$ce."','".$ts."','".$id."',now(),'','','')");
			
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
			$result1 = mysql_query("UPDATE project_team SET  project_manager='".$pm."',production_editor = '".$pe."', proof_reader = '".$pr."', indexer = '".$ir."', copy_editor = '".$ce."', typesetter = '".$ts."' WHERE project_id = '".$project_id."'");
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
  users.username As pm,
  users1.username As pe
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
function ptitleInfo($project_id)
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
  project_title.confirmed_extent as confirmed,
  project_title.client_deadline as cdeadline,
  project_title.agreed_deadline as adeadline,
  project_title.word_count as wcount
From
  project_title
Where
  project_title.id = '" . $project_id . "'");
			while($row = mysql_fetch_array($result1)) {
				
			$data1 = $row['Title'];
			$data2 = $row['Author'];
			$data3 = $row['Hbisbn'];
			$data4 = $row['Pbisbn'];
			$data5 = $row['Format'];
			$data6 = $row['Design'];
			$data7 = $row['castoff'];
			$data8 = $row['confirmed'];
			$data9 = $row['cdeadline'];
			$data10 = $row['adeadline'];
			$data11 = $row['wcount'];
			
		}
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["Title"] = $data1;
				$result["HB ISBN"] = $data3;
				$result["PB ISBN"] = $data4;
				$result["Format"] = $data5;
				$result["Design"] = $data6;
				$result["Cast-off Extent"] = $data7;
				$result["Confirmed Extent"] = $data8;
				$result["Client deadline"] = $data9;
				$result["Agreed deadline"] = $data10;
				$result["Word Count"] = $data11;
								
			}
       /*	while($row=mysql_fetch_object($result1))
	   	{
			$result ["data"] = $row;
	  	}*/
      	echo(json_encode($result));
	}
function pteaminfo($project_id)
	{
	
		$data1 = "";
		$data2 = "";
				$result1 = mysql_query ("Select 
  project_team.project_manager as pmanager,
  project_team.production_editor as peditor,
  project_team.proof_reader as preader,
  project_team.indexer as indexer,
  project_team.copy_editor as ceditor
From
  project_team
Where
  project_team.project_id = '" . $project_id . "'");
			while($row = mysql_fetch_array($result1)) {
				
			$data1 = $row['pmanager'];
			$data2 = $row['peditor'];
			$data3 = $row['preader'];
			$data4 = $row['ceditor'];
			$data5 = $row['indexer'];
			
		}
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["Production Editor"] = $data2;
				$result["Project Manager"] = $data1;
				$result["Copy Editor"] = $data3;
				$result["Proof Reader"] = $data4;
				$result["Indexer"] = $data5;
								
			}
       /*	while($row=mysql_fetch_object($result1))
	   	{
			$result ["data"] = $row;
	  	}*/
      	echo(json_encode($result));
	}

function pbudgetinfo($project_id)
	{
 		$num_result = mysql_query ("Select
  activity.name as activity,
  budget_expense.stage as stage,
  budget_expense.unit as unit,
  budget_expense.acual_amount_USD as amt
From
  budget_expense Inner Join
  activity On budget_expense.activity =
    activity.id
Where
  budget_expense.project_id = '" . $project_id . "'")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  activity.name as activity,
  budget_expense.stage as stage,
  budget_expense.unit as unit,
  budget_expense.acual_amount_USD as amt
From
  budget_expense Inner Join
  activity On budget_expense.activity =
    activity.id
Where
  budget_expense.project_id = '" . $project_id . "' LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
    function tgeneralinfo($project_id)
	{
	
		$data1 = "";
		$data2 = "";
				$result1 = mysql_query ("Select 
				
  project_title.title as title,
  project_title.hb_isbn as hb,
  project_title.pb_isbn as pb,
  project_title.design as design,
  project_title.format as format
From
  project_title
Where
  project_title.id = '" . $project_id . "'");
			while($row = mysql_fetch_array($result1)) {
				
			$data1 = $row['title'];
			$data2 = $row['hb'];
			$data3 = $row['pb'];
			$data4 = $row['design'];
			$data5 = $row['format'];
			
		}
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["No.of Authors"] = " ";
				$result["Path"]="/ooh/users/ooh-newgen/To Newgen/";
				$result["File Name"] = "Typesetter";
				$result["Book Title"] = $data1;
				$result["HB ISBN"] = $data2;
				$result["PB ISBN"] = $data3;
				$result["Date proofs required"] = " ";
				$result["Design"] = $data4;
				$result["Format"] = $data5;
				$result["Notes"] = " ";
				$result["Index Included?"] = " ";
								
			}
       /*	while($row=mysql_fetch_object($result1))
	   	{
			$result ["data"] = $row;
	  	}*/
      	echo(json_encode($result));
	}
function tauthorinfo($job_code)
	{
 		$num_result = mysql_query ("Select
  author.name as au_name,
  author.address as au_address,
  author.no_proof as au_nop
  
From
  author 
Where
  author.job_code = '" . $job_code . "'")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  author.name as au_name,
  author.address as au_address,
  author.no_proof as au_nop
  
From
  author 
Where
  author.job_code = '" . $job_code . "' LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	
	function getProjectDetails($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as teamHeader_ClientName,
	  customers.code as teamHeader_ClientCode,
	  customers.id as teamHeader_clientId,
	  project_title.title as teamHeader_ProjectName,
	  project_title.workflow as teamHeader_workflow,
	  project_title.job_code as teamHeader_Job,
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
  	function getTeamInfo($project_id)
 	{
 		
		$result1 = mysql_query ("Select 
  project_team.project_manager as edit_project_manager,
  project_team.production_editor as edit_production_editor,
  project_team.proof_reader as edit_proofreader,
  project_team.indexer as edit_indexer,
  project_team.copy_editor as edit_copy_editor,
  project_team.typesetter as edit_typesetter
From
  project_team
Where
  project_team.project_id = '" . $project_id . "'");
			
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