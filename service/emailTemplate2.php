<?php
session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
require 'PHPMailerAutoload.php';

$id = $_SESSION['id'];

switch ($_POST["action"]) /*Read action sent from front-end */ {
    case 1:
        vendorEmail($_POST['job_code'], $_POST['projectID'], $id, $_POST['activity_id']);
        break;
    case 2:
        authorEmail($_POST['job_code'], $id);
        break;
    case 3:
        sendEmailVendor($_POST['vendor_from'], $_POST['vendor_to'], $_POST['vendor_cc'], $_POST['vendor_message']);
        break;
    case 4:
        sendEmailAuthor($_POST['author_from'], $_POST['author_to'], $_POST['author_cc'], $_POST['author_message']);
        break;
    case 5:
        getTemplateMaster();
        break;
    case 6:
        getTemplateMasterById($_POST["templateid"]);
        break;
    case 7:
        updateTemplateMaster($_POST["templateid"], $_POST['templatecode'], $_POST['templatename'], $_POST['templaterole'], $_POST['templatemain'], $_POST['templatefooter']);
        break;
    case 8:
        deleteProjectById($_POST["project_id"]);
        break;
    case 9:
        Archive();
        break;
    
    default:
        break;
}

function authorEmail($job_code, $id)
{
    
    /** insert into temp**/
    $selectworkflow = mysql_query("Select
 project_title.title As title,
 project_title.client_deadline As client_deadline,
 author.name As name,
 email_template.main As main,
 email_template.footer As footer,
 user_masters.user_mas_name As user
From
 project_title Inner Join
 author On project_title.job_code =
   author.job_code,
 email_template,
 user_masters
Where
 project_title.job_code = '".$job_code."' And
 author.author = 'Main contact' And
 email_template.role = 1 And user_masters.user_id=1 ");
    while ($row = mysql_fetch_array($selectworkflow)) {
        
        $title  = $row['title'];
        $date   = $row['client_deadline'];
        $name   = $row['name'];
        $main   = $row['main'];
        $footer = $row['footer'];
        $user   = $row['user'];
    }
    
    $result1 = "<p>Dear <b>" . $name . "</b>,<p>
		
<p>The proofs for your forthcoming book <b>" . $title . "</b> have been dispatched from our typesetter and should be with you shortly.</p>
" . $main . "
<p>Please aim to return the proofs to arrive with me at the address below no later than date <b>" . $date . "</b></p>
" . $footer . "
Thanks, 
" . $user . " ";
    
    $result2 = mysql_query("INSERT INTO temp (id,message)
		                               VALUES ('' ,'" . $result1 . "')");
    if (!$result2) {
        $result["failure"] = true;
        $result["message"] = "Invalid query: " . mysql_error();
    } else {
        $result["success"] = true;
        $result["message"] = "Saved successfully";
    }
    /** Get message from temp **/
    $result3 = mysql_query("Select Distinct
 Group_Concat(author.email) As authorEmail,
  users.email As authorFrom,
  temp.message As authorMessage
From
 author,
 temp,
 users
Where
 (author.job_code = '" . $job_code . "' And
 author.author = 'Main Contact' And author.flag=0) And
 users.id =  '" . $id . "' ");
    
    if (!$result3) {
        $result[failure] = true;
        $result[message] = 'Invalid query: ' . mysql_error();
    } else {
        $result["success"] = true;
    }
    while ($row = mysql_fetch_object($result3)) {
        $result["data"] = $row;
    }
    echo (json_encode($result));
    
    /**Delete the temp**/
    $result1 = mysql_query("DELETE FROM temp");
    
    if (!$result1) {
        $result["failure"] = true;
        $result["message"] = 'Invalid query: ' . mysql_error();
    } else {
        $result["success"] = true;
        $result["message"] = 'Deleted successfully';
    }
}

function vendorEmail($job_code, $projectID, $id, $activity_id)
{
    /** insert into temp**/
    $selectworkflow = mysql_query("Select
 		 customers.name as client, 
 		 author.name as name,
 		 author.email as email,
 		 author.phone as phone,
 		 author.address as address,
 		 email_template.main as main,
 		 email_template.footer as footer,
		 users.username As user
 		 from 
 		 project_title Inner Join
 		 customers On project_title.client=customers.id Inner Join
 		 author On project_title.job_code=author.job_code,
 		 email_template,
		 users
 		 where 
 		 project_title.job_code = '" . $job_code . "'
 		 And author.author='Main contact' And email_template.role=2 And users.id= '" . id . "'");
    while ($row = mysql_fetch_array($selectworkflow)) {
        
        $client  = $row['client'];
        $name    = $row['name'];
        $email   = $row['email'];
        $phone   = $row['phone'];
        $address = $row['address'];
        $main    = $row['main'];
        $footer  = $row['footer'];
        $user    = $row['user'];
    }
    
    $result_sub = "<p>Dear <b>" . $client . "</b>,</p>

<p>Thank you very much for agreeing to take on this project.</p>

<p>The templated Word file(s) for this title are saved to our ftp site for you to download.</p>

<p>The details of the site are as follows:</p>

<p>URL:</p>
<p>Username:</p>
<p>Password:</p>
<p>Filename:</p>

<p>Please refer to the <<>> file for a full briefing on the requirements for this title – please also send the <<>> to the author so they can see the changes being made to the text.</p>


<p>The author’s contact information is as follows:</p>
<p>Name: <b>" . $name . "</b></p>
<p>Email: <b>" . $email . "</b></p>
<p>Phone: <b>" . $phone . "</b></p>
<p>Address <b>" . $address . "</b></p>

" . $main . "

" . $footer . " 

Thanks,
" . $user . "

";
    
    
    /** Get message from temp **/
    
    $activity_id1 = explode(',', $activity_id);
    $activity_id1 = array_unique($activity_id1);
    for ($i = 0; $i < count($activity_id1) - 1; $i++) {
        //echo "ID".count($activity_id1);;
        $result1 = mysql_query("Select
  budget_expense.project_id,
  budget_expense.vendor,
 Group_Concat(vendors.email),
 
  budget_expense.activity
From

  budget_expense Inner Join
  vendors On budget_expense.vendor = vendors.id Inner Join
  
  activity On budget_expense.activity = activity.id
Where       
  budget_expense.project_id = '" . $projectID . "'  And
  budget_expense.activity in ( '" . $activity_id1[$i] . "')");
        
        while ($row = mysql_fetch_array($result1)) {
            
            //$result ["data"] = $row;
            
            $maill = $row[2] . ",";
            
            
        }
        $mailll .= $maill . "";
        
    }
    //echo "mail_id's".$mailll;	
    
    
    $result2 = mysql_query("INSERT INTO temp (id,message,email_id)
		                               VALUES ('' ,'" . $result_sub . "','" . $mailll . "')");
    if (!$result2) {
        $result["failure"] = true;
        $result["message"] = "Invalid query: " . mysql_error();
    } else {
        $result["success"] = true;
        $result["message"] = "Notes saved successfully";
    }
    
    
    $result1 = mysql_query(" Select distinct
temp.email_id as vendorEmail,
temp.message as vendorMessage,
users.email as vendorFrom
From
budget_expense Inner Join
vendors_contacts On budget_expense.vendor =
vendors_contacts.vendor_id,
temp,
users
Where
budget_expense.project_id='" . $projectID . "' AND users.id='" . $id . "'");
    
    if (!$result1) {
        $result[failure] = true;
        $result[message] = 'Invalid query: ' . mysql_error();
    } else {
        $result["success"] = true;
    }
    while ($row = mysql_fetch_object($result1)) {
        $result["data"] = $row;
    }
    echo (json_encode($result));
    
    
    
    /*if(!$result1)
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
    echo(json_encode($result));*/
    
    //	Delete the temp
    $result1 = mysql_query("DELETE FROM temp");
    
    if (!$result1) {
        $result["failure"] = true;
        $result["message"] = 'Invalid query: ' . mysql_error();
    } else {
        $result["success"] = true;
        $result["message"] = 'Deleted successfully';
    }
}


function sendEmailVendor($vendor_from, $vendor_to, $vendor_cc, $vendor_message)
{
    $dat     = date("d/m/Y");
    $subject = "Check" . ' ' . $dat;
    ob_start();
       
    $variable = ob_get_clean();
    
    $variable = ob_get_clean();
        
    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'Cc:' . $vendor_cc . "\r\n";
    $headers .= "From:" . $vendor_from . "\r\n";
    $headers .= "Reply-To:" . $vendor_from . "\r\n";
    $retval = mail($vendor_to, $subject, $vendor_message, $headers);
    if (!$retval) {
        $result["failure"] = true;
        $result["message"] = 'Invalid query: ' . mysql_error();
    } else {
        $result["success"] = true;
        $result["message"] = 'Message sent sucessfully';
    }
    
    echo (json_encode($result));
    
}

function sendEmailAuthor($author_from, $author_to, $author_cc, $author_message)
{
	$dat     = date("d/m/Y");
    $subject = "Check" . ' ' . $dat;
    ob_start();
    
    $variable = ob_get_clean();
   
    $variable = ob_get_clean();
    //$message = "msg";
    $subject = "subject";
	if($_FILES["file"]["name"]!="")
	{
		$upload_name = $_FILES["file"]["name"];
		$upload_type = $_FILES["file"]["type"];	
		$upload_size = $_FILES["file"]["size"];
		$upload_temp = $_FILES["file"]["tmp_name"];
		$fp   = fopen($upload_temp, "rb");
		$file = fread($fp, $upload_size);
    
		$file = chunk_split(base64_encode($file));
		$num  = md5(time());
		fclose($fp);
	
    /*************/
    
    //Normal headers
	 
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; ";
    $headers .= "boundary=" . $num . "\r\n";
    $headers .= "--$num\r\n";
    
    // This two steps to help avoid spam
    
    $headers .= "Message-ID: <" . gettimeofday() . " TheSystem@" . $_SERVER['SERVER_NAME'] . ">\r\n";
    $headers .= "X-Mailer: PHP v" . phpversion() . "\r\n";
    }
    // With message
    
    $headers .= "Content-Type: text/html; charset=iso-8859-1\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= 'Cc:' . $author_cc . "\r\n";
    $headers .= "From:" . $author_from . "\r\n";
    $headers .= "Reply-To:" . $author_from . "\r\n";
    $headers .= "" . $author_message . "\n";
	
    if($_FILES["file"]["name"]!=""){
	
	$headers .= "--" . $num . "\n";
      // Attachment headers
    $headers .= "Content-Type:" . $upload_type . " ";
    $headers .= "name=\"" . $upload_name . "\"r\n";
    $headers .= "Content-Transfer-Encoding: base64\r\n";
    $headers .= "Content-Disposition: attachment; ";
    $headers .= "filename=\"" . $upload_name . "\"\r\n\n";
		$headers .= "" . $file . "\r\n";
		$headers .= "--" . $num . "--";
	}
	
    
    // SEND MAIL
    
    $retval = mail($author_to, $subject, $message, $headers);
   
    /*************/
    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    
    //$retval=mail($author_to,$subject,$author_message,$headers);
    
    if (!$retval) {
        $result["failure"] = true;
        $result["message"] = 'Mail Error: ' . $retval;
    } else {
        $result["success"] = true;
        $result["message"] = 'Message sent sucessfully';
    }
    
    echo (json_encode($result));
}

function getTemplateMaster()
{
    $num_result = mysql_query("Select
			  email_template.id as template_id,
			  email_template.code as template_code,
			  email_template.name as template_name,
			  email_template.role as template_role,
			  email_template.main as template_main,
			  email_template.footer as template_footer
			From
			  email_template
			") or die(mysql_error());
    
    $totaldata = mysql_num_rows($num_result);
    
    $result = mysql_query("Select
			  email_template.id as template_id,
			  email_template.code as template_code,
			  email_template.name as template_name,
			  email_template.role as template_role
			  
			From
			  email_template LIMIT " . $_POST['start'] . ", " . $_POST['limit']) or die(mysql_error());
    
    while ($row = mysql_fetch_object($result)) {
        $data[] = $row;
    }
    echo '({"total":"' . $totaldata . '","results":' . json_encode($data) . '})';
}
function getTemplateMasterById($templateid)
{
    $result1 = mysql_query("Select
  email_template.id as template_id,
  email_template.name as template_name,
  email_template.code as template_code,
  email_template.role as template_role,
  email_template.main as template_main,
  email_template.footer as template_footer,
  email_template.header as template_header
From
  email_template 
			Where
		  	email_template.id=" . $templateid . "");
    
    if (!$result1) {
        $result[failure] = true;
        $result[message] = 'Invalid query: ' . mysql_error();
    } else {
        $result["success"] = true;
        
    }
    while ($row = mysql_fetch_object($result1)) {
        $result["data"] = $row;
    }
    
    
    echo (json_encode($result));
}
function updateTemplateMaster($templateid, $templatecode, $templatename, $templaterole, $templatemain, $templatefooter)
{
    $checkquery = "SELECT id FROM email_template WHERE id='" . $templateid . "'";
    $result1    = mysql_query($checkquery);
    $num_rows   = mysql_num_rows($result1);
    
    if ($num_rows == 1) {
        $result1 = mysql_query("UPDATE email_template set code='" . $templatecode . "', name='" . $templatename . "',role='" . $templaterole . "',main='" . $templatemain . "',footer='" . $templatefooter . "' WHERE id=" . $templateid . "");
        
        if (!$result1) {
            $result["failure"] = true;
            $result["message"] = 'Invalid query: ' . mysql_error();
        } else {
            $result["success"] = true;
            $result["message"] = 'Updated successfully';
        }
    } else {
        $result["failure"] = true;
        $result["message"] = 'User does not exist';
    }
    
    
    echo json_encode($result);
}

function deleteProjectById($project_id)
{
    $project_id1 = explode(',', $project_id);
    for ($i = 0; $i < count($project_id1) - 1; $i++) {
        $checkquery = "SELECT id FROM project_title WHERE id='" . $project_id1[$i] . "' ";
        $result1    = mysql_query($checkquery);
        $num_rows   = mysql_num_rows($result1);
        
        if ($num_rows == 1) {
            $result1 = mysql_query("UPDATE project_title SET flag=1 WHERE id='" . $project_id1[$i] . "'");
            if (!$result1) {
                $result["failure"] = true;
                $result["message"] = "Invalid query: " . mysql_error();
            } else {
                $result["success"] = true;
                $result["message"] = "Archived successfully";
            }
        } else {
            $result["success"] = true;
            $result["message"] = "Cannot Archive";
        }
        
    }
    echo json_encode($result);
}

function Archive()
{
    $num_result = mysql_query("Select
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
  budget_total_detail.status = 'Completed'") or die(mysql_error());
    
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
  project_title.flag = 1 And
  budget_total_detail.status = 'Completed' LIMIT " . $_POST['start'] . ", " . $_POST['limit']) or die(mysql_error());
    
    while ($row = mysql_fetch_object($result)) {
        $data[] = $row;
    }
    echo '({"total":"' . $totaldata . '","results":' . json_encode($data) . '})';
}

?>