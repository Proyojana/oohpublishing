<?php 
/*
* PAGE ID		: PHP
* CREATED ON	: 02-11-2010
* MODIFIED ON	: 09-11-2010
* AUTHOR ID		: 003573
* PROJECT URL	: 
* CLIENT NAME	: Laserwords
* DEVELOPED BY	: Laserwords [www.laserwords.com]
* DESCRIPTION	: 
*/
$page="loginChk";
include("config.php");
include("../inc/php/encryptDecrypt.php");
$loginUsername = isset($_POST["loginUsername"]) ? $_POST["loginUsername"] : "";
$loginPassword = isset($_POST["loginPassword"]) ? $_POST["loginPassword"] : "";


	$qry1="SELECT user_name,user_pwd FROM user_masters WHERE user_name='".$loginUsername."'";
	
	$result2=mysql_query($qry1);
	$num_rows1=mysql_num_rows($result2);
	if($num_rows1 > 0){
	while($rs1=mysql_fetch_array($result2)){
	$user_pwd1=$rs1['user_pwd'];
	}//while end
	}//if end

	$user_DecryptedPassword=decrypt($user_pwd1,'key'); //Decrypt users password
	

	$qry="SELECT * FROM user_masters WHERE user_name='".$loginUsername."'";
	$result1=mysql_query($qry);
	$num_rows=mysql_num_rows($result1);
	
	
	if($num_rows > 0){
			
	while($rs=mysql_fetch_array($result1)){
	session_start();
	$user_id=$rs['user_id'];
	$user_no=$rs['user_no'];
	$user_name=$rs['user_name'];
	$user_mas_name=$rs['user_mas_name'];
	$user_role=$rs['user_role'];
	$user_is_admin=$rs['user_is_admin'];
	//$validuser=1;
	}//while end
	}//if end


	//$encUN=encrypt($un,'key');

	//echo $pwd.'<br>';

	
	if($loginUsername!=$user_name || $loginPassword!=$user_DecryptedPassword){
	$result["success"] = false;
	$result["role"]=$user_role;
	$result["user_is_admin"]=$user_is_admin;
	$result["user_no"]=$user_no;
	$_SESSION['user_is_admin'] =$user_is_admin;  
	$_SESSION['user_no'] = $user_no;  
    $result["errors"]["reason"] = "Please check a password";
	}//if end
	
	else
	{
		$_SESSION['loggedIn'] = 'youAreLogged';  
		$_SESSION['user_id'] = $user_id;  
		$_SESSION['user_is_admin'] =$user_is_admin;  
		$_SESSION['user_no'] = $user_no;  
		$_SESSION['user_name'] = $user_name;  
		$_SESSION['user_mas_name'] = $user_mas_name;  
		$_SESSION['user_role'] = $user_role; 
	  $result["success"] = true;
	  $result["role"] = $user_role;
	  $result["user_no"]=$user_no;
	}
	echo json_encode($result);
	
?>
