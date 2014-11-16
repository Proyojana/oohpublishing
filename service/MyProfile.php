<?php
session_start();
$user_name = $_SESSION['username'];
$user_id = $_SESSION['id'];
include ("config.php");
include ("../inc/php/encryptDecrypt.php");
switch($_POST["action"]) /*Read action sent from front-end */ {
	case 1 :
		getMyProfileInfoById($user_name, $user_id);
		break;
	case 2 :
		updateMyProfile($_POST["userid"], $_POST['myprofper'],$_POST['myprof_first_name'], $_POST['myprofmn'], $_POST['myprofln'], $_POST['myprofname'], $_POST['passwordmyprof'], $_POST['myprofemail']);
		break;
}

function getMyProfileInfoById($user_name, $user_id) {

	

	$result1 = mysql_query("Select
  users.code as usercode,
  users.firstname as myprof_first_name,
  users.middlename as myprofmn,
  users.lastname as myprofln,
  users.username as myprofname,
  users.password as passwordmyprof,
   users.email as myprofemail,
   oohpm.users.per as myprofper , 
  users.id as myprofuid
From
  users
Where
  users.username = '" . $user_name . "' And
  users.id = '" . $user_id . "'");

	if(!$result1) {
		$result[failure] = true;
		$result[message] = 'Invalid query:' . mysql_error();
	} else {
		$result["success"] = true;
	}
	while($row = mysql_fetch_object($result1)) {
		$result["data"] = $row;
	}
	echo(json_encode($result));
}

function updateMyProfile($userid, $myprofper,$myprof_first_name, $myprofmn, $myprofln, $myprofname, $passwordmyprof, $myprofemail) {
	$encryptpassword = encrypt($passwordmyprof);

	$checkquery = "SELECT id FROM users WHERE id='" . $userid . "'";
	$result1 = mysql_query($checkquery);
	$num_rows = mysql_num_rows($result1);

	if($num_rows == 1) {
		$result1 = mysql_query("UPDATE users set per='" . $myprofper . "',firstname='" . $myprof_first_name . "',middlename='" . $myprofmn . "',lastname='" . $myprofln . "', username='" . $myprofname . "',password='" . $encryptpassword . "', email='" . $myprofemail . "',modified_by='" . $userid . "',modified_on=now() WHERE id=" . $userid . "");

		if(!$result1) {
			$result["failure"] = true;
			$result["message"] = 'Invalid query: ' . mysql_error();
		} else {
			$result["success"] = true;
			$result["message"] = 'Profile Updated successfully';
		}
	} else {
		$result["failure"] = true;
		$result["message"] = 'Profile does not exist';
	}

	echo json_encode($result);
}
?>