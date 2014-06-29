<?php
/*
* PAGE ID		: PHP
* CREATED ON	: 21-10-2010
* MODIFIED ON	: 27-10-2010
* AUTHOR ID		: 003573
* PROJECT URL	: 
* CLIENT NAME	: Laserwords
* DEVELOPED BY	: Laserwords [www.laserwords.com]
* DESCRIPTION	: 
*/
function sendEmail($from,$to,$subject,$message){
$headers = 'X-Mailer:PHP 5.1' . "\r\n";
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From:Disha Mail Alert From HR' . "\r\n";
@mail($to,$subject,$message,$headers);
}
?>