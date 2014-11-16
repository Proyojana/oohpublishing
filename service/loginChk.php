<?php 

$page="loginChk";
include("config.php");
include("../inc/php/encryptDecrypt.php");
$loginUsername = isset($_POST["loginUsername"]) ? $_POST["loginUsername"] : "";
$loginPassword = isset($_POST["loginPassword"]) ? $_POST["loginPassword"] : "";


	$qry1="SELECT username,password FROM users WHERE username='".$loginUsername."'";
	
	$result2=mysql_query($qry1);
	$num_rows1=mysql_num_rows($result2);
	//echo $num_rows1;
	if($num_rows1 > 0){
	while($rs1=mysql_fetch_array($result2)){
	$user_pwd1=$rs1['password'];
		
	}//while end
	}//if end

	$user_DecryptedPassword=decrypt($user_pwd1,'key'); //Decrypt users password
	//echo $user_DecryptedPassword;

	$qry="SELECT * FROM users WHERE username='".$loginUsername."'";
	$result1=mysql_query($qry);
	$num_rows=mysql_num_rows($result1);
	
	
	if($num_rows > 0){
			
	while($rs=mysql_fetch_array($result1)){
	session_start();
	$user_id=$rs['id'];
	$user_no=$rs['code'];
	$user_name=$rs['username'];
	//$user_mas_name=$rs['user_mas_name'];
	$user_role=$rs['role'];
	$user_mail=$rs['email'];
	//$user_is_admin=$rs['user_is_admin'];
	//$validuser=1;
	}//while end
	}//if end


	//$encUN=encrypt($un,'key');

	//echo $pwd.'<br>';

	
	if($loginUsername!=$user_name || $loginPassword!=$user_DecryptedPassword){
	$result["success"] = false;
	$result["role"]=$user_role;
	//$result["user_is_admin"]=$user_is_admin;
	$result["code"]=$user_no;
	$result["errors"]["reason"] = "Please check a password";
	}//if end
	
	else
	{
		$_SESSION['loggedIn'] = 'youAreLogged';  
		$_SESSION['id'] = $user_id;  
	//	$_SESSION['user_is_admin'] =$user_is_admin;  
		$_SESSION['code'] = $user_no;  
		$_SESSION['username'] = $user_name;  
		$_SESSION['email'] = $user_mail;  
		$_SESSION['role'] = $user_role; 
		  $result["success"] = true;
		  $result["role"] = $user_role;
		  $result["code"]=$user_no;
		  $result["email"]=$user_mail;
	  
	}
	echo json_encode($result);
	//echo $user_DecryptedPassword;
?>
