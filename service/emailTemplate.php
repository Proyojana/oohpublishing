<?php
    session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
$id=$_SESSION['id'];

	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			vendorEmail($_POST['job_code'],$id);
			break;
		case 2:
			authorEmail($_POST['job_code'],$id);
			break;
		case 3:
			sendEmailVendor($_POST['vendor_to'],$_POST['vendor_message']);
		    break;
        case 4:
			sendEmailAuthor($_POST['author_to'],$_POST['author_message']);
		    break;
		default: 
			break;
	}
	

function authorEmail($job_code,$id)
 	{
 		
		/** insert into temp**/
 		$selectworkflow = mysql_query("Select
 		 project_title.title as title, 
 		 author.name as name
 		 from 
 		 project_title Inner Join
 		 author On project_title.job_code=author.job_code
 		 where 
 		 project_title.job_code = '".$job_code."'
 		 And author.author='Main contact' ");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$title = $row['title'];
			$name = $row['name'];
		}
		
		$result1 = "Dear ".$name."

The proofs for your forthcoming book ".$title." have been dispatched from our typesetter and should be with you shortly.

You will receive two copies of the proofs – one is for your own records, the other should be marked with any essential corrections. I have also uploaded the PDFs to our ftp site:

Address:
Username:
Password:
Filename:

Please mark only essential corrections, and ensure that your corrections are clearly marked. A table of mark-up symbols is attached to this message for your reference. Let me know as soon as possible if you wish to make any changes to the page numbering in the index.

Please aim to return the proofs to arrive with me at the address below no later than date.

Please confirm receipt of this email. I hope you are pleased with the proofs – do let me know if you have any queries or problems at any time.";
		
     $result2 = mysql_query("INSERT INTO temp (id,message)
		                               VALUES ('' ,'" . $result1 . "')");
					if(!$result2) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "Notes saved successfully";
					}
		/** Get message from temp **/			
	$result3 = mysql_query ("Select distinct
oohpublishing.author.email as authorEmail,
oohpublishing.temp.message as authorMessage,
oohpublishing.user_masters.user_email as authorFrom
From
oohpublishing.author,
oohpublishing.temp,
oohpublishing.user_masters
Where
oohpublishing.author.job_code='".$job_code."' || oohpublishing.user_masters.user_id='".$id."'");
			
		if(!$result3)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;				
			}
       	while($row=mysql_fetch_object($result3))
	   	{
			$result ["data"] = $row;
	  	}
      	echo(json_encode($result));
		
		/** Delete the temp**/
		$result1= mysql_query("DELETE FROM temp");
				
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
	
function vendorEmail($job_code,$id)
 	{
		/** insert into temp**/
 		$selectworkflow = mysql_query("Select
 		 customers.name as client, 
 		 author.name as name,
 		 author.email as email,
 		 author.phone as phone,
 		 author.address as address
 		 from 
 		 project_title Inner Join
 		 customers On project_title.client=customers.id Inner Join
 		 author On project_title.job_code=author.job_code
 		 where 
 		 project_title.job_code = '".$job_code."'
 		 And author.author='Main contact' ");
		while($row = mysql_fetch_array($selectworkflow)) {
				
			$client = $row['client'];
			$name = $row['name'];
			$email = $row['email'];
			$phone = $row['phone'];
			$address = $row['address'];
		}
		
		$result1 = "Dear ".$client."

Thank you very much for agreeing to take on this project.

The templated Word file(s) for this title are saved to our ftp site for you to download. 

The details of the site are as follows:

URL:
Username:
Password:
Filename:

Please refer to the <<>> file for a full briefing on the requirements for this title – please also send the <<>> to the author so they can see the changes being made to the text.


The author’s contact information is as follows:
".$name."  
".$email."  
".$phone." 
".$address."


Please contact the author as soon as possible to introduce yourself and to confirm their availability for answering queries. It would also be helpful if you could outline how your queries will be presented to them so they know what to expect. Note that the pagination of the document the author views onscreen may differ to yours. Please clearly refer to specific points in the text without using page and line numbers, perhaps pasting the relevant passages into an email or inserting your queries directly into the Word document.

Note that this title is to follow the Cambridge University Press global workflow, so the author will review the Manuscript and be sent the majority of queries once the edit is complete – please allow time for this in your schedule. If you do not have the guidelines for the global workflow then please let me know.

As soon as it is ready we will send through the index list for editing – this is <<>> in the fee.

The fee for this project is <<£***>>. The OOH job number for this title is <<***>>- please quote this when invoicing OOH. Invoices should be submitted to accounts@oohpublishing.co.uk. Payment terms: 45 days.

Please return the copy-edited files to me no later than <<schedule completion date>>. Files should be returned via the Out of House FTP site (details above). We suggest that you switch 

off TC before editing anything to do with automated numbers, e.g. adding/removing footnotes.

When you are ready to return the completed script please include:

• the copy-edited files (one with changes tracked and one clean file with all changes accepted)

• list of running heads – see copy-eds brief for hat is required, or query if youre unsure

• any pertinent style points (we have supplied a Production information form for you to fill in)

Please note that this is an onscreen copy-edit. Please refer to the detailed instructions in our guide to onscreen editing";
		
     $result2 = mysql_query("INSERT INTO temp (id,message)
		                               VALUES ('' ,'" . $result1 . "')");
					if(!$result2) {
						$result["failure"] = true;
						$result["message"] = "Invalid query: " . mysql_error();
					} else {
						$result["success"] = true;
						$result["message"] = "Notes saved successfully";
					}
			/** Get message from temp **/		
		$result1 = mysql_query (" Select distinct
oohpublishing.author.email as vendorEmail,
oohpublishing.temp.message as vendorMessage,
oohpublishing.user_masters.user_email as vendorFrom
From
oohpublishing.author,
oohpublishing.temp,
oohpublishing.user_masters
Where
oohpublishing.author.job_code='".$job_code."' || oohpublishing.user_masters.user_id='".$id."'");
			
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
      	
      /**	Delete the temp**/
		$result1= mysql_query("DELETE FROM temp");
				
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
    
	
	function sendEmailVendor($vendor_to,$vendor_message) {
	$dat=date("d/m/Y");
$subject = "Check".' '.$dat;
ob_start();



$variable = ob_get_clean();


// $subject = "Report";
$dompdf = new DOMPDF();
$dompdf->load_html($variable);
$dompdf->render();
$output = $dompdf->output();
//file_put_contents('Report.pdf', $output);

$variable = ob_get_clean();



// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'Cc:'.$cc . "\r\n";
$headers .= "From:".$from."\r\n";
$headers .= "Reply-To:".$from."\r\n";
$retval=mail($vendor_to,$subject,$vendor_message,$headers);
if(!$retval) {
$result["failure"] = true;
$result["message"] = 'Invalid query: ' . mysql_error();
} else {
$result["success"] = true;
$result["message"] = 'Message send sucessfully';
}

echo(json_encode($result));	
		
			}
	
	function sendEmailAuthor($author_to,$author_message) {
									
			$dat=date("d/m/Y");
$subject = "Check".' '.$dat;
ob_start();



$variable = ob_get_clean();




$variable = ob_get_clean();



// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'Cc:'.$cc . "\r\n";
$headers .= "From:".$from."\r\n";
$headers .= "Reply-To:".$from."\r\n";
$retval=mail($author_to,$subject,$author_message,$headers);
if(!$retval) {
$result["failure"] = true;
$result["message"] = 'Invalid query: ' . mysql_error();
} else {
$result["success"] = true;
$result["message"] = 'Message send sucessfully';
}

echo(json_encode($result));
			}
    ?>