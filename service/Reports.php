<?php
session_start();
include ("config.php");
include ("../inc/php/encryptDecrypt.php");
$userid = $_SESSION['id'];
switch($_POST["action"]) /*Read action sent from front-end */ {
	case 1 :
		getProductionReportHeader($_POST["project_id"]);
		break;
	case 2 :
		getClientTeamMails();
		break;
	case 3 :
		sendEmail($_POST['from'], $_POST['to'], $_POST['cc'], $_POST['html'], $_POST['project_id']);
		break;
	case 4 :
		sendEmailPdf($_POST['from'], $_POST['to'], $_POST['cc'],$_POST['message'],$_POST['project_id']);
		break;
	case 5 :
		sendEmail1($_POST['from'], $_POST['to'], $_POST['cc'], $_POST['html'], $_POST['job_code']);
		break;
	case 6:
		sendEmailPdf1($_POST['from'], $_POST['to'], $_POST['cc'],$_POST['message'],$_POST['job_code']);
		break;
	case 7:
		getProjectReport();
		break;
	default :
		break;
}

function getProductionReportHeader($project_id) {
			$result1 = mysql_query("Select
			project_title.job_code as productionreport_jobCode,
			project_title.title as productionreport_projectTtile,
			CURDATE() as currentdate
			From
			project_title
			Where
			project_title.id = '" . $project_id . "'");
		
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

function getClientTeamMails() {
		
			$result = mysql_query("Select
		                      customers_teams.email as mail
		                       From
		                      customers_teams
		                       Where
		                     customers_teams.flag = 0 LIMIT " . $_POST['start'] . ", " . $_POST['limit']) or die(mysql_error());
		
			while($row = mysql_fetch_object($result)) {
				$data[] = $row;
			}
			echo '({"results":' . json_encode($data) . '})';
		}

function sendEmail($from, $to, $cc, $html, $project_id) {
		    $dat=date("d/m/Y");
			$subject = "Production Report".' '.$dat;
			ob_start();

$template=mysql_query("Select
  project_title.job_code,
  project_title.title,
  project_title.id,
  project_title.hb_isbn,
  project_title.pb_isbn,
  project_title.design,
  project_title.format,
  project_title.castoff_extent,
  project_title.confirmed_extent,
  project_title.agreed_deadline,
  project_title.client_deadline,
  project_title.word_count
From
  project_title
Where
  project_title.id = '" . $project_id . "'");
			while($template1=mysql_fetch_array($template))
			{
				$pTitle = $template1['title'];
				$pJob = $template1['job_code'];
				$pHB= $template1['hb_isbn'];
				$pBP= $template1['pb_isbn'];
				$design= $template1['design'];
				$format= $template1['format'];
				$cast= $template1['castoff_extent'];
				$confirmed= $template1['agreed_deadline'];
				$agreed= $template1['hb_isbn'];
				$client= $template1['client_deadline'];
				$word= $template1['word_count'];
			}	
				
			
			
			$sch=mysql_query("Select
  schedule.stage,
  schedule.estimated_end_date,
  schedule.actual_end_date,
  activity.name
From
  schedule Inner Join
  activity On schedule.activity =
    activity.id
Where
  schedule.project_id = '" . $project_id . "'");
			while($sch1=mysql_fetch_array($sch))
			{
				
				$stage[]= $sch1['stage'];
				$activity[]= $sch1['name'];
				$estimated[]= $sch1['estimated_end_date'];
				$actual[]= $sch1['actual_end_date'];
			
			}	
			
			$team=mysql_query("Select
  users.firstname,
  
  project_team.role
From
  users Inner Join
  project_team On users.id = project_team.user
Where
  project_team.project_id = '" . $project_id . "'");
			while($team1=mysql_fetch_array($team))
			{
				
				$name[]= $team1['firstname'];
				$role[]= $team1['role'];
							
			}
			
			$budget=mysql_query("Select activity.name, budget_expense.no_of_unit, budget_expense.acual_amount_USD, budget_expense.actual_amount_GBP
										From budget_expense Inner Join activity On budget_expense.activity = activity.id
										 Where  budget_expense.project_id= '" . $project_id . "'");
				while($row=mysql_fetch_array($budget))
				{
					
					$bActivity[]= $row['name'];
					$actualUnit[]= $row['no_of_unit'];
					$actual_amount_USD[]= $row['actual_amount_USD']; 
					$actual_amount_GBP[]= $row['actual_amount_GBP'];
					
				}
					
?>
<html>
	
	<body>
		<b><p style="font-size:16px;">Production Report</p> </b>
	<table>
	<table style="margin-bottom:10px;">
	<tr>
	<td><b>JOB #:</b></td>
	<td><?php echo $pJob?></td>
	</tr>
	<tr>
	<td><b>Project Title:</b></td>
	<td><?php echo $pTitle ?></td>
	</tr>
	</table>
	</br>
	<b>Title Info:</br>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
	<td style="padding-left:10px;">Title</td>
	<td style="padding-left:10px;"><?php echo $pTitle?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">HB ISBN</td>
	<td style="padding-left:10px;"><?php echo $pHB ?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">PB ISBN</td>
	<td style="padding-left:10px;"><?php echo $pBP?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Format</td>
	<td style="padding-left:10px;"> <?php echo $format?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">Design</td>
	<td style="padding-left:10px;"> <?php echo $design?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Cast-off Extent</td>
	<td style="padding-left:10px;"><?php echo $cast?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Confirmed Exttent</td>
	<td style="padding-left:10px;"><?php echo $confirmed?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">Client Deadline</td>
	<td style="padding-left:10px;"><?php echo $client?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Agreed deadline</td>
	<td style="padding-left:10px;"><?php echo $agreed?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">Word Count</td>
	<td style="padding-left:10px;"><?php echo $word?></td>
	</tr>
	</table>
	
	</br>
	<b>Schedule</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
		<td style="padding-left:10px;">
			<b>
			Activity
			</b>
		</td>
		<td style="padding-left:10px;">
			<b>
			Stage
			</b>
		</td>
		<td style="padding-left:10px;">
			<b>
			Estimated End Date
			</b>
		</td>
		<td style="padding-left:10px;">
			<b>
			Actual End Date
			</b>
		</td>
	</tr>
<?php for($i=0;$i<count($stage);$i++)
		{
			echo "<tr>";
			echo "<td style='padding-left:10px;'>" .$stage[$i]."</td>";
			echo "<td style='padding-left:10px;'>" .$activity[$i]. "</td>";
			echo "<td style='padding-left:10px;'>" .$estimated[$i]. "</td>";
			echo "<td style='padding-left:10px;'>" .$actual[$i]. "</td>";
			echo "</tr>";
			
		}
		?>
		
	</table>
	</br>
	<b>Team</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px; page-break-after: always;">	
	<tr >
		<td style="padding-left:10px;">
			<b>
			Role
			</b>
		</td>
		<td style="padding-left:10px;">
			<b>
			Name
			</b>
		</td>
		
	</tr>
		<?php for($i=0;$i<count($name);$i++)
		{
			echo "<tr>";
			echo "<td width='20%' style='padding-left:10px;'>" .$role[$i]."</td>";
			echo "<td width='80%' style='padding-left:10px;'>" .$name[$i]. "</td>";
			
			echo "</tr>";
			
		}
		?>
		
	</table>
	</br>
	<b>Budget</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;page-break-after: always;">
	
	 <tr>

		<td style="padding-left:10px;">
			Activity
		</td>
		<td style="text-align:center">
			No. of Units 
		</td>
		<td style="padding-left:10px;">
			Actual Amount in USD
		</td>
		<td style="text-align:center">
			Actual Amount in GBP
		</td>
	</tr>
<?php for($i=0;$i<count($bActivity);$i++)
		{
			echo "<tr>";
			echo "<td style='padding-left:10px;'>" .$bActivity[$i]."</td>";
			echo "<td style='text-align:center'>" .$actualUnit[$i]. "</td>";
			echo "<td style='padding-left:10px;'>" .$actual_amount_USD[$i]. "</td>";
			
			
			echo "<td style='text-align:center'>" .$actual_amount_GBP[$i]. "</td>";
			echo "</tr>";
			
		}
		?>
		
	</table>
	</table>
	
	
	</body></html>
	<?php
	 $variable = ob_get_clean();


		
			 // Always set content-type when sending HTML email
			 $headers = "MIME-Version: 1.0" . "\r\n";
			 $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			 $headers .= 'Cc:'.$cc . "\r\n";
			 $headers .= "From:".$from."\r\n";
			 $headers .= "Reply-To:".$from."\r\n";
			  $retval=mail($to,$subject,$variable,$headers);
			 if(!$retval) {
				$result["failure"] = true;
				$result["message"] = 'Invalid query: ' . mysql_error();
			} else {
				$result["success"] = true;
				$result["message"] = 'Message sent successfully';
			}
			
			echo(json_encode($result));
	

}

function sendEmailPdf($from, $to,$cc, $message,$project_id) {
									
			require_once("dompdf/dompdf_config.inc.php");					
				
				
				ob_start();

$template=mysql_query("Select
  project_title.job_code,
  project_title.title,
  project_title.id,
  project_title.hb_isbn,
  project_title.pb_isbn,
  project_title.design,
  project_title.format,
  project_title.castoff_extent,
  project_title.confirmed_extent,
  project_title.agreed_deadline,
  project_title.client_deadline,
  project_title.word_count
From
  project_title
Where
  project_title.id = '" . $project_id . "'");
			while($template1=mysql_fetch_array($template))
			{
				$pTitle = $template1['title'];
				$pJob = $template1['job_code'];
				$pHB= $template1['hb_isbn'];
				$pBP= $template1['pb_isbn'];
				$design= $template1['design'];
				$format= $template1['format'];
				$cast= $template1['castoff_extent'];
				$confirmed= $template1['agreed_deadline'];
				$agreed= $template1['hb_isbn'];
				$client= $template1['client_deadline'];
				$word= $template1['word_count'];
			}	
				
			
			
			$sch=mysql_query("Select
  schedule.stage,
  schedule.estimated_end_date,
  schedule.actual_end_date,
  activity.name
From
  schedule Inner Join
  activity On schedule.activity =
    activity.id
Where
  schedule.project_id = '" . $project_id . "'");
			while($sch1=mysql_fetch_array($sch))
			{
				
				$stage[]= $sch1['stage'];
				$activity[]= $sch1['name'];
				$estimated[]= $sch1['estimated_end_date'];
				$actual[]= $sch1['actual_end_date'];
			
			}	
			
			$team=mysql_query("Select
  users.firstname,
  
  project_team.role
From
  users Inner Join
  project_team On users.id = project_team.user
Where
  project_team.project_id = '" . $project_id . "'");
			while($team1=mysql_fetch_array($team))
			{
				
				$name[]= $team1['firstname'];
				$role[]= $team1['role'];
							
			}
			
				$budget=mysql_query("Select activity.name, budget_expense.no_of_unit, budget_expense.acual_amount_USD, budget_expense.actual_amount_GBP
										From budget_expense Inner Join activity On budget_expense.activity = activity.id
										 Where  budget_expense.project_id= '" . $project_id . "'");
				while($row=mysql_fetch_array($budget))
				{
					
					$bActivity[]= $row['name'];
					$actualUnit[]= $row['no_of_unit'];
					$actual_amount_USD[]= $row['actual_amount_USD']; 
					$actual_amount_GBP[]= $row['actual_amount_GBP'];
					
				}
			
		
?>

<html>
	
	<body>
	<b><p style="font-size:16px;">Production Report</p> </b>
	<table>
	
	</br>
	<b>Title Info:</br>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px; page-break-after: always;">	
	<tr>
	<td style="padding-left:10px;">Title</td>
	<td style="padding-left:10px;"><?php echo $pTitle?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">HB ISBN</td>
	<td style="padding-left:10px;"><?php echo $pHB ?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">PB ISBN</td>
	<td style="padding-left:10px;"><?php echo $pBP?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Format</td>
	<td style="padding-left:10px;"> <?php echo $format?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">Design</td>
	<td style="padding-left:10px;"> <?php echo $design?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Cast-off Extent</td>
	<td style="padding-left:10px;"><?php echo $cast?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Confirmed Exttent</td>
	<td style="padding-left:10px;"><?php echo $confirmed?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">Client Deadline</td>
	<td style="padding-left:10px;"><?php echo $client?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Agreed deadline</td>
	<td style="padding-left:10px;"><?php echo $agreed?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">Word Count</td>
	<td style="padding-left:10px;"><?php echo $word?></td>
	</tr>
	</table>
	</br>
	<b>Budget</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;page-break-after: always;">
	
	 <tr>

		<td style="padding-left:10px;">
			Activity
		</td>
		<td style="text-align:center">
			No. of Units 
		</td>
		<td style="padding-left:10px;">
			Actual Amount in USD
		</td>
		<td style="text-align:center">
			Actual Amount in GBP
		</td>
	</tr>
<?php for($i=0;$i<count($bActivity);$i++)
		{
			echo "<tr>";
			echo "<td style='padding-left:10px;'>" .$bActivity[$i]."</td>";
			echo "<td style='text-align:center'>" .$actualUnit[$i]. "</td>";
			echo "<td style='padding-left:10px;'>" .$actual_amount_USD[$i]. "</td>";
			
			
			echo "<td style='text-align:center'>" .$actual_amount_GBP[$i]. "</td>";
			echo "</tr>";
			
		}
		?>
		
	</table>
	</br>
	<b>Schedule</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px; page-break-after: always;">	
	<tr >
		<td style="padding-left:10px;">
			<b>
			Stage
			</b>
		</td>
		<td style="padding-left:10px;">
			<b>
			Activity
			</b>
		</td>
		<td style="padding-left:10px;">
			<b>
			Estimated End Date
			</b>
		</td>
		<td style="padding-left:10px;">
			<b>
			Actual End Date
			</b>
		</td>
	</tr>
<?php for($i=0;$i<count($stage);$i++)
		{
			echo "<tr>";
			echo "<td style='padding-left:10px;'>" .$stage[$i]."</td>";
			echo "<td style='padding-left:10px;'>" .$activity[$i]. "</td>";
			echo "<td style='padding-left:10px;'>" .$estimated[$i]. "</td>";
			echo "<td style='padding-left:10px;'>" .$actual[$i]. "</td>";
			echo "</tr>";
			
		}
		?>
		
	</table>
	</br>
	<b>Team</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px; page-break-after: always;">	
	<tr >
		<td style="padding-left:10px;">
			<b>
			Role
			</b>
		</td>
		<td style="padding-left:10px;">
			<b>
			Name
			</b>
		</td>
		
	</tr>
		<?php for($i=0;$i<count($name);$i++)
		{
			echo "<tr>";
			echo "<td width='20%' style='padding-left:10px;'>" .$role[$i]."</td>";
			echo "<td width='80%' style='padding-left:10px;'>" .$name[$i]. "</td>";
			
			echo "</tr>";
			
		}
		?>
		
	</table>
	
	</table>
	
	
	</body></html>
	<?php
	 $variable = ob_get_clean();

				
			$dat=date("d/m/Y");	
			$subject = "Production Report".' '.$dat;
			$dompdf = new DOMPDF();
			$dompdf->load_html($variable);
			$dompdf->render();
			$output = $dompdf->output();
			//file_put_contents('Report.pdf', $output);
			
		
		$separator = md5(time());
        $eol = PHP_EOL;
        $filename = "Report.pdf";
        $pdfdoc = $output;
        $attachment = chunk_split(base64_encode($pdfdoc));
        $headers = "From: " . $from . $eol;
        $headers .= "MIME-Version: 1.0" . $eol;
	    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol . $eol;
	    $body .= "Content-Transfer-Encoding: 7bit" . $eol;
	    $body .= "This is a MIME encoded message." . $eol; 
        $body .= "--" . $separator . $eol;
        $body .= "Content-Type: text/html; charset=\"iso-8859-1\"" . $eol;
        $body .= "Content-Transfer-Encoding: 8bit" . $eol . $eol;
        $body .= $message . $eol;
        $body .= "--" . $separator . $eol;
        $body .= "Content-Type: application/octet-stream; name=\"" . $filename . "\"" . $eol;
        $body .= "Content-Transfer-Encoding: base64" . $eol;
        $body .= "Content-Disposition: attachment" . $eol . $eol;
        $body .= $attachment . $eol;
        $body .= "--" . $separator . "--";
       $retval=mail($to, $subject, $body, $headers);
		 if(!$retval) {
				$result["failure"] = true;
				$result["message"] = 'Invalid query: ' . mysql_error();
			} else {
				$result["success"] = true;
				$result["message"] = 'Message sent sucessfully';
			}
			
			echo(json_encode($result));
			}

function sendEmail1($from, $to, $cc, $html, $jobcode) {
		   $dat=date("d/m/Y");
			$subject = "Typesetting Report".' '.$dat;
			ob_start();

$template=mysql_query("Select
  project_title.title,
  project_title.hb_isbn,
  project_title.pb_isbn,
  project_title.series,
  project_title.format,
  project_title.design,
  project_title.castoff_extent,
  project_title.confirmed_extent,
  project_title.agreed_deadline,
  project_title.client_deadline,
  project_title.word_count,
  Count(author.author) as authorCount,
  project_title.job_code
From
  project_title Inner Join
  author On project_title.job_code =
    author.job_code
Where
  project_title.job_code = '" . $jobcode . "'
Group By
  project_title.job_code");
			while($template1=mysql_fetch_array($template))
			{
				$pTitle = $template1['title'];
				$pJob = $template1['job_code'];
				$pHB= $template1['hb_isbn'];
				$pBP= $template1['pb_isbn'];
				$design= $template1['design'];
				$format= $template1['format'];
				$cast= $template1['castoff_extent'];
				$confirmed= $template1['agreed_deadline'];
				$agreed= $template1['hb_isbn'];
				$client= $template1['client_deadline'];
				$word= $template1['word_count'];
				$author= $template1['authorCount'];
			}	
				
			
			
			$sch=mysql_query("Select
  author.name,
  author.address,
  author.no_proof
From
  author
Where
  author.job_code = '" . $jobcode . "'");
			while($sch1=mysql_fetch_array($sch))
			{
				
				$name[]= $sch1['name'];
				$addr[]= $sch1['address'];
				$proof[]= $sch1['no_proof'];
			
			}	
			
					
		
?>
<html>
	
	<body>
		<b><p style="font-size:16px;">Typesetting Report</p> </b>
	<table>
	
	</br>
	<b>Title Info:</br>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
	<td style="padding-left:10px;">Title</td>
	<td style="padding-left:10px;"><?php echo $pTitle?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">HB ISBN</td>
	<td style="padding-left:10px;"><?php echo $pHB ?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">PB ISBN</td>
	<td style="padding-left:10px;"><?php echo $pBP?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Format</td>
	<td style="padding-left:10px;"> <?php echo $format?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">Design</td>
	<td style="padding-left:10px;"> <?php echo $design?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">No. of Authors</td>
	<td style="padding-left:10px;"><?php echo $author?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Date Proofs required</td>
	<td style="padding-left:10px;"></td>
	</tr>
	
	</table>
	
	</br>
	<b>Author Details</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
		<td>
			<b>
			Name
			</b>
		</td>
		<td>
			<b>
			Address
			</b>
		</td>
		<td>
			<b>
			No. of Proof
			</b>
		</td>
		
	</tr>
<?php for($i=0;$i<count($name);$i++)
		{
			echo "<tr>";
			echo "<td style='padding-left:10px;'>" .$name[$i]."</td>";
			echo "<td style='padding-left:10px;'>" .$addr[$i]. "</td>";
			echo "<td style='padding-left:10px;'>" .$proof[$i]. "</td>";
			echo "</tr>";
			
		}
		?>
		
	</table>
		</table>
	
	
	</body></html>
	<?php
	 $variable = ob_get_clean();


		
			 // Always set content-type when sending HTML email
			 $headers = "MIME-Version: 1.0" . "\r\n";
			 $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			 $headers .= 'Cc:'.$cc . "\r\n";
			 $headers .= "From:".$from."\r\n";
			 $headers .= "Reply-To:".$from."\r\n";
			  $retval=mail($to,$subject,$variable,$headers);
			 if(!$retval) {
				$result["failure"] = true;
				$result["message"] = 'Invalid query: ' . mysql_error();
			} else {
				$result["success"] = true;
				$result["message"] = 'Message sent successfully';
			}
			
			echo(json_encode($result));
	

}

function sendEmailPdf1($from, $to,$cc, $message,$jobcode) {
									
			require_once("dompdf/dompdf_config.inc.php");					
				$dat=date("d/m/Y");
				$subject = "Typesetting Report".' '.$dat;
			ob_start();

$template=mysql_query("Select
  project_title.title,
  project_title.hb_isbn,
  project_title.pb_isbn,
  project_title.series,
  project_title.format,
  project_title.design,
  project_title.castoff_extent,
  project_title.confirmed_extent,
  project_title.agreed_deadline,
  project_title.client_deadline,
  project_title.word_count,
  Count(author.author) as authorCount,
  project_title.job_code
From
  project_title Inner Join
  author On project_title.job_code =
    author.job_code
Where
  project_title.job_code = '" . $jobcode . "'
Group By
  project_title.job_code");
			while($template1=mysql_fetch_array($template))
			{
				$pTitle = $template1['title'];
				$pJob = $template1['job_code'];
				$pHB= $template1['hb_isbn'];
				$pBP= $template1['pb_isbn'];
				$design= $template1['design'];
				$format= $template1['format'];
				$cast= $template1['castoff_extent'];
				$confirmed= $template1['agreed_deadline'];
				$agreed= $template1['hb_isbn'];
				$client= $template1['client_deadline'];
				$word= $template1['word_count'];
				$author= $template1['authorCount'];
			}	
				
			
			
			$sch=mysql_query("Select
  author.name,
  author.address,
  author.no_proof
From
  author
Where
  author.job_code = '" . $jobcode . "'");
			while($sch1=mysql_fetch_array($sch))
			{
				
				$name[]= $sch1['name'];
				$addr[]= $sch1['address'];
				$proof[]= $sch1['no_proof'];
			
			}	
			
					
		
?>
<html>
	
	<body>
		<b><p style="font-size:16px;">Typesetting Report</p> </b>
	<table>
	
	</br>
	<b>Title Info:</br>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
	<td style="padding-left:10px;">Title</td>
	<td style="padding-left:10px;"><?php echo $pTitle?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">HB ISBN</td>
	<td style="padding-left:10px;"><?php echo $pHB ?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">PB ISBN</td>
	<td style="padding-left:10px;"><?php echo $pBP?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Format</td>
	<td style="padding-left:10px;"> <?php echo $format?></td>
	</tr>
	<tr>
	<td style="padding-left:10px;">Design</td>
	<td style="padding-left:10px;"> <?php echo $design?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">No. of Authors</td>
	<td style="padding-left:10px;"><?php echo $author?></td>
	</tr>	
	<tr>
	<td style="padding-left:10px;">Date Proofs required</td>
	<td style="padding-left:10px;"></td>
	</tr>
	
	</table>
	
	</br>
	<b>Author Details</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
		<td>
			<b>
			Name
			</b>
		</td>
		<td>
			<b>
			Address
			</b>
		</td>
		<td>
			<b>
			No. of Proof
			</b>
		</td>
		
	</tr>
<?php for($i=0;$i<count($name);$i++)
		{
			echo "<tr>";
			echo "<td style='padding-left:10px;'>" .$name[$i]."</td>";
			echo "<td style='padding-left:10px;'>" .$addr[$i]. "</td>";
			echo "<td style='padding-left:10px;'>" .$proof[$i]. "</td>";
			echo "</tr>";
			
		}
		?>
		
	</table>
		</table>
	
	
	</body></html>
	<?php
	 $variable = ob_get_clean();
				
				
		//	$subject = "Report";
			$dompdf = new DOMPDF();
			$dompdf->load_html($variable);
			$dompdf->render();
			$output = $dompdf->output();
			//file_put_contents('Report.pdf', $output);
			
		
		$separator = md5(time());
        $eol = PHP_EOL;
        $filename = "Report.pdf";
        $pdfdoc = $output;
        $attachment = chunk_split(base64_encode($pdfdoc));
        $headers = "From: " . $from . $eol;
        $headers .= "MIME-Version: 1.0" . $eol;
	    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol . $eol;
	    $body .= "Content-Transfer-Encoding: 7bit" . $eol;
	    $body .= "This is a MIME encoded message." . $eol; 
        $body .= "--" . $separator . $eol;
        $body .= "Content-Type: text/html; charset=\"iso-8859-1\"" . $eol;
        $body .= "Content-Transfer-Encoding: 8bit" . $eol . $eol;
        $body .= $message . $eol;
        $body .= "--" . $separator . $eol;
        $body .= "Content-Type: application/octet-stream; name=\"" . $filename . "\"" . $eol;
        $body .= "Content-Transfer-Encoding: base64" . $eol;
        $body .= "Content-Disposition: attachment" . $eol . $eol;
        $body .= $attachment . $eol;
        $body .= "--" . $separator . "--";
       $retval=mail($to, $subject, $body, $headers);
		 if(!$retval) {
				$result["failure"] = true;
				$result["message"] = 'Invalid query: ' . mysql_error();
			} else {
				$result["success"] = true;
				$result["message"] = 'Message sent successfully';
			}
			
			echo(json_encode($result));
			}

function getProjectReport()
	{
 		$num_result = mysql_query ("Select Distinct
  project_title.job_code As code,
  project_title.title As title,
  project_title.castoff_extent As coe,
  project_title.confirmed_extent As ce,
  author.name As author,
  project_title.agreed_deadline As adeadline,
  Max(Case
    When project_team.role = 'Project Manager' Then
    project_team.user End) pm,
  Max(Case
    When project_team.role = 'Production Editor' Then
    project_team.user End) pe,
  Max(Case
    When schedule.stage = 'First proofs due' Then
    schedule.actual_start_date End) stage1,
  Max(Case
    When schedule.stage = 'Revised proofs due' Then
    schedule.actual_start_date End) stage2,
  Max(Case
    When schedule.stage = 'Send for typesetting' Then
    schedule.actual_start_date End) stage3,
  Max(Case
    When schedule.stage = 'PDF due' Then
    schedule.actual_start_date End) stage4
From
  project_title Inner Join
  author On project_title.job_code =
    author.job_code Inner Join
  project_team On project_title.id =
    project_team.project_id Inner Join
  schedule On project_title.id =
    schedule.project_id
Where
  author.author = 'Main Contact' And
  project_title.flag = 0
Group By
  schedule.project_id
  ")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select Distinct
  project_title.job_code As code,
  project_title.title As title,
  project_title.castoff_extent As coe,
  project_title.confirmed_extent As ce,
  author.name As author,
  project_title.agreed_deadline As adeadline,
  Max(Case
    When project_team.role = 'Project Manager' Then
    project_team.user End) pm,
  Max(Case
    When project_team.role = 'Production Editor' Then
    project_team.user End) pe,
  Max(Case
    When schedule.stage = 'First proofs due' Then
    schedule.actual_start_date End) stage1,
  Max(Case
    When schedule.stage = 'Revised proofs due' Then
    schedule.actual_start_date End) stage2,
  Max(Case
    When schedule.stage = 'Send for typesetting' Then
    schedule.actual_start_date End) stage3,
  Max(Case
    When schedule.stage = 'PDF due' Then
    schedule.actual_start_date End) stage4
From
  project_title Inner Join
  author On project_title.job_code =
    author.job_code Inner Join
  project_team On project_title.id =
    project_team.project_id Inner Join
  schedule On project_title.id =
    schedule.project_id
Where
  author.author = 'Main Contact' And
  project_title.flag = 0
Group By
  schedule.project_id
  LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}

?>