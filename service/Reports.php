<?php
session_start();
include ("config.php");
include ("../inc/php/encryptDecrypt.php");
$id = $_SESSION['user_no'];
switch($_POST["action"]) /*Read action sent from front-end */ {
	case 1 :
		getProductionReportHeader($_POST["project_id"]);
		break;
	case 2 :
		getClientTeamMails();
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

}?>