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
		sendEmail($_POST['from'], $_POST['to'], $_POST['cc'], $_POST['html'], $_POST['message']);
		break;
	case 4 :
		sendEmailPdf($_POST['from'], $_POST['to'], $_POST['cc'], $_POST['html'],$_POST['message']);
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

function sendEmail($from, $to, $cc, $html, $message) {
		
			$subject = "Production Report";
			$html='<html><head><style>
			.x-box-inner{position: relative;}.x-box-item {position: absolute !important;} 
		</style></head><body>'.$html.'</body></html> ';	
		
			 // Always set content-type when sending HTML email
			 $headers = "MIME-Version: 1.0" . "\r\n";
			 $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			 $headers .= 'Cc:'.$cc . "\r\n";
			 $headers .= "From:".$from."\r\n";
			 $headers .= "Reply-To:".$from."\r\n";
			  $retval=mail($to,$subject,$html,$headers);
			 if(!$retval) {
				$result["failure"] = true;
				$result["message"] = 'Invalid query: ' . mysql_error();
			} else {
				$result["success"] = true;
				$result["message"] = 'Message send sucessfully';
			}
			
			echo(json_encode($result));
	

}

function sendEmailPdf($from, $to,$cc, $html,$message) {
									
			require_once("dompdf/dompdf_config.inc.php");	
			
			
				$html='<html><head><link rel="stylesheet" type="text/css" href="../inc/ext/resources/css/ext-all.css" />
				</head><body>'.$html.'</body></html> ';	
			
			$dompdf = new DOMPDF();
			$dompdf->load_html($html);
			$dompdf->render();
			$output = $dompdf->output();
			file_put_contents('Report.pdf', $output);
			
		
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
        mail($to, $subject, $body, $headers);
}?>