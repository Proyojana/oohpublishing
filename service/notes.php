<?php
//session_start();
include ("config.php");
include ("../inc/php/encryptDecrypt.php");
//$id = $_SESSION['user_no'];
switch($_POST["action"]) /*Read action sent from front-end */ {
	case 1 :
		getProjectDetails($_POST['job_code']);
		break;

	case 2 :
		insertNotes($_POST['notes_id'], $_POST['project_id'], $_POST['dateraised'], $_POST['narrative'], $_POST['dateresolved']);
		break;
	case 3 :
		selectNotes($_POST['project_id']);
		break;
	case 4:
		deleteNotes($_POST['id']);
		break;
	case 5:
		getAddProjectDetails($_POST['job_code']);
		break;
	case 5:
		getHeaderData($_POST['job_code']);
		break;
	case 6:
			test($_POST['author_to'],$_POST['author_message']);
		    break;
	default :
		break;
}

function getProjectDetails($job_code) {
				$result1 = mysql_query("Select
				  customers.name as editnotesHeader_ClientName,
				  customers.code as editnotesHeader_ClientCode,
				  customers.id as editnotesHeader_clientId,
				  project_title.title as editnotesHeader_ProjectName,
				  project_title.workflow as editnotesHeader_workflow,
				  project_title.job_code as editnotesHeader_Job,
				  project_title.id as editnotesHeader_projectID,
				  author.name as editnotesHeader_AuthorName
				  
				From
				  project_title Inner Join
				  customers On project_title.client =
				    customers.id Inner Join
	  author On project_title.job_code=author.job_code
				Where
				  project_title.job_code = '". $job_code ."' And author.author='Author'");
			
				if(!$result1) {
					$result[failure] = true;
					$result[message] = 'Invalid query: ' . mysql_error();
				} else {
					$result["success"] = true;
				}
				while($row = mysql_fetch_object($result1)) {
					$result["data"] = $row;
				}
				echo(json_encode($result));
			}

function insertNotes($notes_id, $project_id, $dateraised, $narrative, $dateresolved) {
		
			$notes_id1 = explode(',', $notes_id);
			$dateraised1 = explode(',', $dateraised);
			$narrative1 = explode(',', $narrative);
			$dateresolved1 = explode(',', $dateresolved);
			for($i = 0; $i < count($narrative1) - 1; $i++) {
				$checkquery = "SELECT id FROM notes WHERE id='" . $notes_id1[$i] . "'";
				$result2 = mysql_query($checkquery);
				$num_rows = mysql_num_rows($result2);
					if($dateraised1[$i]!='null'){
				//convert string to date
				$dateraised_date = substr($dateraised1[$i], 0, 16);
				$dateraised_string = strtotime($dateraised_date);
				$raisedDate = date("Y-m-d h:i:sa", $dateraised_string);
					}
					else
						{
						$raisedDate='';	
						}
					if($dateresolved1[$i]!='null'){
				$dateresolved_date = substr($dateresolved1[$i], 0, 16);
				$dateresolved_string = strtotime($dateresolved_date);
				$resolvedDate = date("Y-m-d h:i:sa", $dateresolved_string);
		      }
					else
						{
							$resolvedDate='';
						}
				if($num_rows == 1) {
		
					$result1 = mysql_query("UPDATE notes SET  date_raised = '" . $raisedDate . "', narrative = '" . $narrative1[$i] . "',  date_resolved = '" . $resolvedDate . "' WHERE id = '" . $notes_id1[$i] . "'");
					if(!$result1) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "shedule saved successfully";
					}
				} else {
					//	echo 'insert';
					$result1 = mysql_query("INSERT INTO notes (id ,project_id ,date_raised,narrative ,date_resolved,created_by ,created_on ,modified_by ,modified_on ,flag)
		                               VALUES ('' ,'" . $project_id . "', '" . $raisedDate . "','" . $narrative1[$i] . "','" . $resolvedDate . "', '','', '0000-00-00 00:00:00', '', '')");
					if(!$result1) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "Notes saved successfully";
					}
				}
			}
			echo json_encode($result);
		}

function selectNotes($projectid) {
	
				$num_result = mysql_query("Select
			  notes.id as id ,
			  notes.date_raised as dateraised,
			  notes.narrative as narrative,
			  notes.date_resolved as dateresolved
			From
			  notes
			Where
			  notes.flag = 0 And
			  notes.project_id = '" . $projectid . "' ") or die(mysql_error());
			
				$totaldata = mysql_num_rows($num_result);
			
				$result = mysql_query("Select
			  notes.id as id ,
			  notes.date_raised as dateraised,
			  notes.narrative as narrative,
			  notes.date_resolved as dateresolved
			From
			  notes
			Where
			  notes.flag = 0 And
			  notes.project_id = '" . $projectid . "' LIMIT " . $_POST['start'] . ", " . $_POST['limit']) or die(mysql_error());
			
				while($row = mysql_fetch_object($result)) {
					$data[] = $row;
				}
				echo '({"total":"' . $totaldata . '","results":' . json_encode($data) . '})';
				}
				
				
function deleteNotes($id)
    {
		$checkquery="SELECT id FROM notes WHERE id='".$id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE notes SET flag=1 WHERE id='".$id."'");
				
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
				$result["message"] =  'Deleted successfully';
			}
		
		echo json_encode($result);
	}
	
	
		function getAddProjectDetails($job_code) {
				$result1 = mysql_query("Select
				  customers.name as addnotesHeader_ClientName,
				  customers.code as addnotesHeader_ClientCode,
				  customers.id as editnotesHeader_clientId,
				  project_title.title as addnotesHeader_ProjectName,
				  project_title.workflow as addnotesHeader_workflow,
				  project_title.job_code as addnotesHeader_Job,
				  project_title.id as addnotesHeader_projectID
				  
				From
				  project_title Inner Join
				  customers On project_title.client =
				    customers.id
				Where
				  project_title.job_code = '" . $job_code . "'");
			
				if(!$result1) {
					$result[failure] = true;
					$result[message] = 'Invalid query: ' . mysql_error();
				} else {
					$result["success"] = true;
				}
				while($row = mysql_fetch_object($result1)) {
					$result["data"] = $row;
				}
				echo(json_encode($result));
			}
function getHeaderData($job_code) {
				$result1 = mysql_query("Select
				  customers.name as addnotesHeader_ClientName,
				  customers.code as addnotesHeader_ClientCode,
				  project_title.title as addnotesHeader_ProjectName,
				  project_title.workflow as addnotesHeader_workflow,
				  project_title.job_code as addnotesHeader_Job,
				  project_title.id as addnotesHeader_projectID
				  
				From
				  project_title Inner Join
				  customers On project_title.client =
				    customers.id 
				Where
				  project_title.job_code = '" . $job_code . "'");
			
				if(!$result1) {
					$result[failure] = true;
					$result[message] = 'Invalid query: ' . mysql_error();
				} else {
					$result["success"] = true;
				}
				while($row = mysql_fetch_object($result1)) {
					$result["data"] = $row;
				}
				echo(json_encode($result));
			}
	
	function test($author_to,$author_message) {
		
		    $result2 = mysql_query("INSERT INTO temp (id,message)
		                               VALUES ('' ,'" . $author_message . "')");
					if(!$result2) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "Notes saved successfully";
					}
			}
?>