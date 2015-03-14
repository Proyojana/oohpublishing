<?php
session_start();
if(isset($_SESSION['user_name']))
  unset($_SESSION['user_name']);
 session_destroy();
?>
<html>
	<head>
	<link rel="stylesheet" type="text/css" href="inc/ext/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="inc/ext/resources/css/multidate.css">	
	<script type="text/javascript" src="inc/ext/ext-all.js"></script>
	<script type="text/javascript" src="login.js"></script>
	<script type="text/javascript" src="inc/ext/src/ux/exporter/swfobject.js"></script>
       <script type="text/javascript" src="inc/ext/src/ux/exporter/downloadify.min.js"></script>
	<link rel="stylesheet" type="text/css" href="../../resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="inc/ext/resources/css/multidate.css">	
    <link rel="stylesheet" type="text/css" href="inc/ext/resources/css/desktop.css" />	
	</head>
	<body background="wallpapers/desktop.jpg">
   <a href="http://www.proyojana.in" target="_blank" alt="Powered by Proyojana" id="poweredby"><div></div></a>
	      <a href="http://www.oohpublishing.co.uk" target="_blank" alt="Proyojana" id="poweredby1"><div></div></a>

	</body>
</html>