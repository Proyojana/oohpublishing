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
		
			$subject = "Production Report";
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
  project_team Inner Join
  users On project_team.user =
    users.id
Where
  project_team.project_id = '" . $project_id . "'");
			while($team1=mysql_fetch_array($team))
			{
				
				$name[]= $team1['firstname'];
				$role[]= $team1['role'];
							
			}
			
				$budget=mysql_query("Select
  budget_expense.stage,
  budget_expense.unit,
  budget_expense.actual_units,
  budget_expense.acual_amount_USD,
  activity.name
From
  budget_expense Inner Join
  activity On budget_expense.activity =
    activity.id
Where
  budget_expense.project_id = '" . $project_id . "'");
			while($budget1=mysql_fetch_array($budget))
			{
				
				$bActivity[]= $budget1['name'];
					$unit[]= $budget1['unit'];
						$actualUnit[]= $budget1['actual_units'];
							$actualAmount[]= $budget1['acual_amount_USD']; 
								$bStage[]= $budget1['stage'];
							
			}
			
		
?>
<html>
	
	<body>
		<b><center><p style="font-size:16px;">Production Report</p></center> </b>
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
	<td>Title</td>
	<td><?php echo $pTitle?></td>
	</tr>
	<tr>
	<td>HB ISBN</td>
	<td><?php echo $pHB ?></td>
	</tr>	
	<tr>
	<td>PB ISBN</td>
	<td><?php echo $pBP?></td>
	</tr>	
	<tr>
	<td>Format</td>
	<td> <?php echo $format?></td>
	</tr>
	<tr>
	<td>Design</td>
	<td> <?php echo $design?></td>
	</tr>	
	<tr>
	<td>Cast-off Extent</td>
	<td><?php echo $cast?></td>
	</tr>	
	<tr>
	<td>Confirmed Exttent</td>
	<td><?php echo $confirmed?></td>
	</tr>
	<tr>
	<td>Client Deadline</td>
	<td><?php echo $client?></td>
	</tr>	
	<tr>
	<td>Agreed deadline</td>
	<td><?php echo $agreed?></td>
	</tr>
	<tr>
	<td>Word Count</td>
	<td><?php echo $word?></td>
	</tr>
	</table>
	
	</br>
	<b>Schedule</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
		<td>
			Activity
		</td>
		<td>
			Stage
		</td>
		<td>
			Estimated End Date
		</td>
		<td>
			Actual End Date
		</td>
	</tr>
<?php for($i=0;$i<count($stage);$i++)
		{
			echo "<tr>";
			echo "<td>" .$stage[$i]."</td>";
			echo "<td>" .$activity[$i]. "</td>";
			echo "<td>" .$estimated[$i]. "</td>";
			echo "<td>" .$actual[$i]. "</td>";
			echo "</tr>";
			
		}
		?>
		
	</table>
	</br>
	<b>Team</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">
		
		<?php for($i=0;$i<count($name);$i++)
		{
			echo "<tr>";
			echo "<td width='20%'>" .$role[$i]."</td>";
			echo "<td width='80%'>" .$name[$i]. "</td>";
			
			echo "</tr>";
			
		}
		?>
		
	</table>
	</br>
	<b>Budget</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">
	
	<tr>
		<td>
			Activity
		</td>
		<td>
			Stage
		</td>
		<td>
			Unit
		</td>
		<td style="text-align:center">
			No. of Units Actual
		</td>
		<td style="text-align:center">
			Actual Amount in $
		</td>
	</tr>
<?php for($i=0;$i<count($bActivity);$i++)
		{
			echo "<tr>";
			echo "<td>" .$bActivity[$i]."</td>";
			echo "<td>" .$bStage[$i]. "</td>";
			echo "<td>" .$unit[$i]. "</td>";
			echo "<td style='text-align:center'>" .$actualUnit[$i]. "</td>";
			echo "<td style='text-align:center'>" .$actualAmount[$i]. "</td>";
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
				$result["message"] = 'Message send sucessfully';
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
  project_team Inner Join
  users On project_team.user =
    users.id
Where
  project_team.project_id = '" . $project_id . "'");
			while($team1=mysql_fetch_array($team))
			{
				
				$name[]= $team1['firstname'];
				$role[]= $team1['role'];
							
			}
			
				$budget=mysql_query("Select
  budget_expense.stage,
  budget_expense.unit,
  budget_expense.actual_units,
  budget_expense.acual_amount_USD,
  activity.name
From
  budget_expense Inner Join
  activity On budget_expense.activity =
    activity.id
Where
  budget_expense.project_id = '" . $project_id . "'");
			while($budget1=mysql_fetch_array($budget))
			{
				
				$bActivity[]= $budget1['name'];
					$unit[]= $budget1['unit'];
						$actualUnit[]= $budget1['actual_units'];
							$actualAmount[]= $budget1['acual_amount_USD']; 
								$bStage[]= $budget1['stage'];
							
			}
			
		
?>
<html>
	
	<body>
		<b><center><p style="font-size:16px;">Production Report</p></center> </b>
	<table>
	<table style="border-collapse: collapse;margin-bottom:10px;">
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
	<td>Title</td>
	<td><?php echo $pTitle?></td>
	</tr>
	<tr>
	<td>HB ISBN</td>
	<td><?php echo $pHB ?></td>
	</tr>	
	<tr>
	<td>PB ISBN</td>
	<td><?php echo $pBP?></td>
	</tr>	
	<tr>
	<td>Format</td>
	<td> <?php echo $format?></td>
	</tr>
	<tr>
	<td>Design</td>
	<td> <?php echo $design?></td>
	</tr>	
	<tr>
	<td>Cast-off Extent</td>
	<td><?php echo $cast?></td>
	</tr>	
	<tr>
	<td>Confirmed Exttent</td>
	<td><?php echo $confirmed?></td>
	</tr>
	<tr>
	<td>Client Deadline</td>
	<td><?php echo $client?></td>
	</tr>	
	<tr>
	<td>Agreed deadline</td>
	<td><?php echo $agreed?></td>
	</tr>
	<tr>
	<td>Word Count</td>
	<td><?php echo $word?></td>
	</tr>
	</table>
	
	</br>
	<b>Schedule</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
		<td>
			Activity
		</td>
		<td>
			Stage
		</td>
		<td>
			Estimated End Date
		</td>
		<td>
			Actual End Date
		</td>
	</tr>
<?php for($i=0;$i<count($stage);$i++)
		{
			echo "<tr>";
			echo "<td>" .$stage[$i]."</td>";
			echo "<td>" .$activity[$i]. "</td>";
			echo "<td>" .$estimated[$i]. "</td>";
			echo "<td>" .$actual[$i]. "</td>";
			echo "</tr>";
			
		}
		?>
		
	</table>
	</br>
	<b>Team</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">
		
		<?php for($i=0;$i<count($name);$i++)
		{
			echo "<tr>";
			echo "<td width='20%'>" .$role[$i]."</td>";
			echo "<td width='80%'>" .$name[$i]. "</td>";
			
			echo "</tr>";
			
		}
		?>
		
	</table>
	</br>
	<b>Budget</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">
	
	<tr>
		<td>
			Activity
		</td>
		<td>
			Stage
		</td>
		<td>
			Unit
		</td>
		<td style="text-align:center">
			No. of Units Actual
		</td>
		<td style="text-align:center">
			Actual Amount in $
		</td>
	</tr>
<?php for($i=0;$i<count($bActivity);$i++)
		{
			echo "<tr>";
			echo "<td>" .$bActivity[$i]."</td>";
			echo "<td>" .$bStage[$i]. "</td>";
			echo "<td>" .$unit[$i]. "</td>";
			echo "<td style='text-align:center'>" .$actualUnit[$i]. "</td>";
			echo "<td style='text-align:center'>" .$actualAmount[$i]. "</td>";
			echo "</tr>";
			
		}
		?>
		
	</table>
	</table>
	
	
	</body></html>
	<?php
	 $variable = ob_get_clean();

				
				
			$subject = "Report";
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
				$result["message"] = 'Message send sucessfully';
			}
			
			echo(json_encode($result));
			}

function sendEmail1($from, $to, $cc, $html, $jobcode) {
		
			$subject = "Typesetting Report";
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
		<b><center><p style="font-size:16px;">Typesetting Report</p></center> </b>
	<table>
	
	</br>
	<b>Title Info:</br>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
	<td>Title</td>
	<td><?php echo $pTitle?></td>
	</tr>
	<tr>
	<td>HB ISBN</td>
	<td><?php echo $pHB ?></td>
	</tr>	
	<tr>
	<td>PB ISBN</td>
	<td><?php echo $pBP?></td>
	</tr>	
	<tr>
	<td>Format</td>
	<td> <?php echo $format?></td>
	</tr>
	<tr>
	<td>Design</td>
	<td> <?php echo $design?></td>
	</tr>	
	<tr>
	<td>No. of Authors</td>
	<td><?php echo $author?></td>
	</tr>	
	<tr>
	<td>Date Proofs required</td>
	<td></td>
	</tr>
	
	</table>
	
	</br>
	<b>Author Details</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
		<td>
			Name
		</td>
		<td>
			Address
		</td>
		<td>
			No. of Proof
		</td>
		
	</tr>
<?php for($i=0;$i<count($name);$i++)
		{
			echo "<tr>";
			echo "<td>" .$name[$i]."</td>";
			echo "<td>" .$addr[$i]. "</td>";
			echo "<td>" .$proof[$i]. "</td>";
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
				$result["message"] = 'Message send sucessfully';
			}
			
			echo(json_encode($result));
	

}

function sendEmailPdf1($from, $to,$cc, $message,$jobcode) {
									
			require_once("dompdf/dompdf_config.inc.php");					
				
				
						$subject = "Typesetting Report";
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
		<b><center><p style="font-size:16px;">Typesetting Report</p></center> </b>
	<table width="100%">
	
	</br>
	<b>Title Info:</br>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
	<td>Title</td>
	<td><?php echo $pTitle?></td>
	</tr>
	<tr>
	<td>HB ISBN</td>
	<td><?php echo $pHB ?></td>
	</tr>	
	<tr>
	<td>PB ISBN</td>
	<td><?php echo $pBP?></td>
	</tr>	
	<tr>
	<td>Format</td>
	<td> <?php echo $format?></td>
	</tr>
	<tr>
	<td>Design</td>
	<td> <?php echo $design?></td>
	</tr>	
	<tr>
	<td>No. of Authors</td>
	<td><?php echo $author?></td>
	</tr>	
	<tr>
	<td>Date Proofs required</td>
	<td></td>
	</tr>
	
	</table>
	
	</br>
	<b>Author Details</b>
	<table width="100%" border="1" style="border-collapse: collapse;margin-bottom:10px;">	
	<tr>
		<td>
			Name
		</td>
		<td>
			Address
		</td>
		<td>
			No. of Proof
		</td>
		
	</tr>
<?php for($i=0;$i<count($name);$i++)
		{
			echo "<tr>";
			echo "<td>" .$name[$i]."</td>";
			echo "<td>" .$addr[$i]. "</td>";
			echo "<td>" .$proof[$i]. "</td>";
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
				$result["message"] = 'Message send sucessfully';
			}
			
			echo(json_encode($result));
			}

?>