<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];
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
			insertProjectMaster($_POST['job_code'],$_POST['project_title'],$_POST['project_name'],$_POST['hb_isbn'],$_POST['pb_isbn'],$_POST['project_series'],$_POST['project_format'],$_POST['project_design'],$_POST['castoff_extent'],$_POST['confirmed_extent'],$_POST['conversionrate'],$_POST['client_deadline'],$_POST['agreed_deadline'],$_POST['project_start_date'],$_POST['word_count'],$_POST['manuscript'],$_POST['index_extent'],$_POST['chapter_footer'],$_POST['contain_colour'],$_POST['project_client'],$_POST['project_team'],$_POST['project_workflow'],$id,$_POST['word_count_indexing'],$_POST['cover_type'],$_POST['print_run'],$_POST['print_run_confirmed'],$_POST['project_note'],$_POST['ebook_isbn'],$_POST['author_create'],$_POST['author_name'],$_POST['author_last_name'],$_POST['author_designation'],$_POST['author_email']);
			break;
		case 6:
			BulkDelete($_POST['id']);
			break;	
		case 7: 
			autoRequestCode();
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
	   case 17:
			tauthorinfo($_POST['job_code']);
			break;
	   case 18:
			autoRequestCurrencyRate();
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
  project_title.author As author,
  project_title.series As series,
  project_title.format As format,
  project_title.design As design,
  project_title.agreed_deadline As deadline,
  project_title.client_team As client_team,
  project_title.word_count As word_count,
  customers.name As client,
  workflow.name As workflow,
  customers_teams.team_name As client_team,
  budget_total_detail.project_id
From
  project_title Inner Join
  customers On project_title.client = customers.id Inner Join
  workflow On project_title.workflow = workflow.id Left Join
  customers_teams On project_title.client_team =
    customers_teams.id Inner Join
  budget_total_detail On project_title.id =
    budget_total_detail.project_id
Where
  project_title.flag = 0 And
  budget_total_detail.status = 'Current'")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  project_title.job_code As code,
  project_title.id As id,
  project_title.title As title,
  project_title.author As author,
  project_title.series As series,
  project_title.format As format,
  project_title.design As design,
  project_title.agreed_deadline As deadline,
  project_title.client_team As client_team,
  project_title.word_count As word_count,
  customers.name As client,
  workflow.name As workflow,
  customers_teams.team_name As client_team,
  budget_total_detail.project_id
From
  project_title Inner Join
  customers On project_title.client = customers.id Inner Join
  workflow On project_title.workflow = workflow.id Left Join
  customers_teams On project_title.client_team =
    customers_teams.id Inner Join
  budget_total_detail On project_title.id =
    budget_total_detail.project_id
Where
  project_title.flag = 0 And
  budget_total_detail.status = 'Current' LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
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
	
	function insertProjectMaster($job_code,$title,$project_name,$hb_isbn,$pb_isbn,$series,$format,$design,$castoff_extent,$confirmed_extent,$conversionrate,$client_deadline,$agreed_deadline,$project_start_date,$word_count,$manuscript,$index_extent,$footer,$colour,$client,$team,$workflow,$id,$word_count_indexing,$cover_type,$print_run,$print_run_confirmed,$project_note,$ebook_isbn,$author_create,$author_name,$author_last_name,$author_designation,$author_email)
		
    {
    	

		$checkquery="SELECT job_code FROM project_title WHERE job_code='".$job_code."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==0)
		{
			$result1 = mysql_query ("INSERT INTO project_title(id,job_code,title,project_name,author,hb_isbn,pb_isbn,ebook_isbn,series,format,design,castoff_extent,confirmed_extent,conversionrate,client_deadline,agreed_deadline,project_start_date,word_count,word_count_indexing,manuscript_pages,expect_index_extent,chapter_footer_req,contains_color,cover_type,print_run,print_run_confirmed,note,client,client_team,workflow,created_by,created_on,modified_by,modified_on,flag) 
			VALUES('','".$job_code."','".$title."','".$project_name."','','".$hb_isbn."','".$pb_isbn."','".$ebook_isbn."','".$series."','".$format."','".$design."','".$castoff_extent."','".$confirmed_extent."','".$conversionrate."','".$client_deadline."','".$agreed_deadline."','".$project_start_date."','".$word_count."','".$word_count_indexing."','".$manuscript."','".$index_extent."','".$footer."','".$colour."','".$cover_type."','".$print_run."','".$print_run_confirmed."','".$project_note."','".$client."','".$team."','".$workflow."','".$id."',now(),'','','')");
			if($result1)
			{
				$codegen = mysql_insert_id();
				autoinsertschedule($codegen,$project_start_date,$workflow);			
				$insertcodgen = mysql_query("UPDATE codegen set value = '".$codegen."' where tablename='projects'");
				
				insertBudgetTotal($codegen);                     
				autoinsertbudget($codegen,$workflow,$castoff_extent,$confirmed_extent);
				insertAuthor($job_code,$author_create,$author_name,$author_last_name,$author_designation,$author_email);
				$result["success"] = true;
				//$result["schedule"] = $scherror;
				$result["message"] = "Project Inserted successfully";
		 
				
			}
			else
			{
				$result["failure"] = true;
				//$result["schedule"] = $scherror;
				$result["message"] =  "Invalid query: " . mysql_error();
				
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
function autoRequestCode() {
	$autoRequest = mysql_query("select value from codegen where tablename='projects'");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['value'];
		}
		$code = $data1 + 1;
		$code = str_pad($code, 3, '0', STR_PAD_LEFT);
		$new_code = 'PROJ' . $code;
	} else {
		$new_code = "PROJ001";
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
	  project_title.id as teamHeader_projectID
	  
	From
	  project_title Inner Join
	  customers On project_title.client =
	    customers.id 
	Where
	  project_title.job_code = '".$job_code."' ");
			
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
	
	function autoinsertschedule($projectid,$project_start_date,$workflow)
	{
		
		$getworkflowstages = mysql_query("SELECT stage_order, stage_name, no_of_days, activity from stages where workflow_id='".$workflow."' and flag='0' order by stage_order asc");
		while($row = mysql_fetch_array($getworkflowstages))
		{
			$stage_order = $row['stage_order'];
			$stage_name = $row['stage_name'];
			$activity = $row['activity'];
			$daysperstage = $row['no_of_days'];
				
			$date = strtotime($project_start_date);
			$date = strtotime("+".$daysperstage." day", $date);
			$newdate = date('Y-m-d', $date);
			$newresult = mysql_query("Insert into schedule (id, project_id, workflow_id, activity, stage_order, stage, estimated_daysperstage, actual_daysperstage, estimated_start_date, actual_start_date, estimated_end_date, actual_end_date, bufferday, status, created_by, created_on, modified_by, modified_on, flag) 
			VALUES (NULL, '".$projectid."', '".$workflow."', '".$activity."', '".$stage_order."', '".$stage_name."', '".$daysperstage."', '".$daysperstage."', '".$project_start_date."', '".$project_start_date."', '".$newdate."', '".$newdate."', NULL, NULL, NULL, now(), NULL, NULL, '0')");
			
			$date1 = strtotime($newdate);
			$date1 = strtotime("+1 day", $date);
			$newdate1 = date('Y-m-d', $date1);
			
			$project_start_date = $newdate1;
			
		}
		
		
	}


//insert budget receivable  
function autoinsertbudget($project_id,$workflow,$castoff_extent,$confirmed_extent)
{
if($castoff_extent!=0 && $confirmed_extent!=0)
$finalextent=$castoff_extent;
else if($castoff_extent!=0)
$finalextent=$castoff_extent;
else
$finalextent=$confirmed_extent;

$getworkflowstages = mysql_query("Select



stages.activity,

stages.ratecard_USD,
stages.ratecard_GBP,
 stages.payable_ratecard_USD,
  stages.payable_ratecard_GBP
From
stages
Where
stages.workflow_id = '".$workflow."'
Group By

stages.activity");
//$total_USD = 0;
//$total_GBP = 0;
$rec_budget_USD_total=0;
$rec_budget_GBP_total=0;
$rec_actuals_USD_total=0;
$rec_actuals_GBP_total=0;
$pay_budget_USD_total=0;
$pay_budget_GBP_total=0;
$pay_actuals_USD_total=0;
$pay_actuals_GBP_total=0;
while($row = mysql_fetch_array($getworkflowstages))
{
$activity = $row['activity'];
$ratecard_USD = $row['ratecard_USD'];

$ratecard_GBP = $row['ratecard_GBP'];
$payable_ratecard_USD = $row['payable_ratecard_USD'];

$payable_ratecard_GBP = $row['payable_ratecard_GBP'];


$budgeted_USD=$finalextent*$ratecard_USD;
$budgeted_GBP=$finalextent*$ratecard_GBP;
//RECEIVABLE TOTAL(budgeted) 
$rec_budget_USD_total+=$budgeted_USD;
$rec_budget_GBP_total+=$budgeted_GBP;

$actuals_USD=$finalextent*$ratecard_USD;
$actuals_GBP=$finalextent*$ratecard_GBP;
//RECEIVABLE TOTAL(actuals) 
$rec_actuals_USD_total+=$actuals_USD;
$rec_actuals_GBP_total+=$actuals_GBP;



//payables
$payable_budgeted_USD=$finalextent*$payable_ratecard_USD;
$payable_budgeted_GBP=$finalextent*$payable_ratecard_GBP;
//payable TOTAL(budgeted) 
$pay_budget_USD_total+=$payable_budgeted_USD;
$pay_budget_GBP_total+=$payable_budgeted_GBP;

$payable_actuals_USD=$finalextent*$payable_ratecard_USD;
$payable_actuals_GBP=$finalextent*$payable_ratecard_GBP;

//payable TOTAL(actuals)
$pay_actuals_USD_total+=$payable_actuals_USD;
$pay_actuals_GBP_total+=$payable_actuals_GBP;



$budget_receivable = mysql_query("INSERT INTO budget_receivable (id ,project_id, activity,currency_rate,unit_of_measurement, no_of_unit, rate_usd_gbp, budgeted_usd_gbp, actual_usd_gbp,created_by,created_on,modified_by,modified_on,flag)
VALUES ('','".$project_id."','".$activity."','','','','','','','','','','','')");


$budget_expense = mysql_query("INSERT INTO budget_expense (id ,project_id,workflow_id,activity,currency_rate,unit_of_measurement,vendor ,no_of_unit,rate_USD_GBP,budgeted_amount_USD_GBP,acual_amount_USD_GBP,created_by,created_on,modified_by,modified_on,flag)
VALUES ('' ,'".$project_id."', '','".$activity."','','','','', '', '', '', '', '','', '0000-00-00 00:00:00', '')");
}
//USD
$bal=$rec_budget_USD_total-$pay_budget_USD_total;
$profit_USD=@ceil(($bal/$rec_budget_USD_total)*100);
//echo "profit USd ".$profit_USD;

//GBP
$balance=$rec_budget_GBP_total-$pay_budget_GBP_total;
$profit_GBP=@ceil(($balance/$rec_budget_GBP_total)*100);

//echo "profit GBP ".$profit_GBP;

//insertBudgetTotal($project_id,$profit_USD,$profit_GBP);

}


//insert budget total
function insertBudgetTotal($project_id)
{
$result2 = mysql_query("INSERT INTO budget_total_detail (id ,project_id,ponumber1,ponumber2,total_receive_usd ,edit_total_receive_budgeted_GBP ,edit_total_receive_budgeted_total, edit_total_receive_actual_USD, total_receive_gdp,edit_total_receive_actual_total,total_receive_project_usd,total_receive_project_gdp,total_pay_usd,
edit_total_pay_budgeted_GBP,edit_total_pay_budgeted_total, edit_total_pay_actual_USD,total_pay_gdp,edit_total_pay_actual_total,project_profit_gdp,project_profit_per,invoice_date,status)

VALUES ('' ,'".$project_id."', '','','','','','','','','','','', '', '','','', '', '', '', '', 'Current')");
if(!$result2)
{
$result["failure"] = true;
$result["message"] = "Invalid query: " . mysql_error();
}
else
{
$result["success"] = true;
$result["message"] = "Inserted successfully";
}
}


//insert author

function insertAuthor($job_code,$author_create,$author_name,$author_last_name,$author_designation,$author_email)
{
	$result2 = mysql_query("INSERT INTO author(id,job_code,author,name,last_name,designation,address,email,phone,see_proof,no_proof,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$job_code."','".$author_create."','".$author_name."','".$author_last_name."','".$author_designation."','','".$author_email."','','','','',now(),'','','')");
	if(!$result2) 
	{
		$result["failure"] = true;
		$result["message"] = "Invalid query: " . mysql_error();
	}
	else
	{
		$result["success"] = true;
		$result["message"] = "Inserted successfully";
	}
}
function autoRequestCurrencyRate() 
{
	$sys_date=date("Y-m-d");
//echo "System Date".$sys_date;
	$autoRequest = mysql_query("SELECT MAX(currency_rate_to) FROM currency_rate WHERE currency_rate_from<'".$sys_date."' and currency_rate_to>'".$sys_date."'");
	$row = mysql_fetch_row($autoRequest);
    $date1 = $row[0];
	//echo "Server date".$date1;
	
	$currency_rate_value = mysql_query("Select currency_rate_gbp From currency_rate Where currency_rate.currency_rate_to = '".$date1."'");
 		while($row = mysql_fetch_array($currency_rate_value)) {				
			$currency_rate_gbp = $row['currency_rate_gbp'];			
		}
	
	if(!$currency_rate_value)
	{
		$result["failure"] = true;
		$result["message"] = 'Invalid query: ' . mysql_error();
	} else 
	{
		$result["success"] = true;
		$result["message"] = $currency_rate_gbp;
	}

	echo json_encode($result);
}

?>