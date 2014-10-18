<?php
			ob_start();
			session_start();
			$user_name = $_SESSION['username'];
			$user_role = $_SESSION['role'];
			$user_id = $_SESSION['id'];
			$user_mail = $_SESSION['email'];
		//	$user_mas_name = $_SESSION['user_mas_name'];
			if((!isset($_SESSION['username']))) {
				header("Location:index.php");
			}?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
		<title>PMT - Project Management Tool</title>

		<link rel="stylesheet" type="text/css" href="inc/ext/resources/css/multidate.css">
		<link rel="stylesheet" type="text/css" href="inc/ext/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="inc/ext/resources/css/LiveSearchGridPanel.css" />
		<link rel="stylesheet" type="text/css" href="inc/ext/resources/css/desktop.css" />
		<link rel="stylesheet" type="text/css" href="inc/ext/resources/css/MultiSelect.css" />
		<link rel="stylesheet" type="text/css" href="inc/ext/src/ux/grid/gridPrinterCss/print.css" />

		<!-- GC -->

		<!-- <x-compile> -->
		<!-- <x-bootstrap> -->
		<script>
		var name1 = <?php	echo json_encode($user_name);?>;
		var name2 = <?php	echo json_encode($user_name);?>;
		var role = <?php	echo json_encode($user_role);?>;
		var mail = <?php	echo json_encode($user_mail);?>;
		
		</script>
		<script type="text/javascript" src="inc/ext/ext.js"></script>
		<script type="text/javascript" src="inc/ext/src/lib/pdf.js/pdf.js"></script>
		<script type="text/javascript" src="inc/ext/src/lib/pdf.js/compatibility.js"></script>
		<script type="text/javascript" src="inc/ext/src/ux/panel/PDF.js"></script>
		<script type="text/javascript" src="inc/ext/src/ux/util/PDF/TextLayerBuilder.js"></script>

		<script type="text/javascript" src="inc/ext/src/ux/grid/Printer.js"></script>
		<script type="text/javascript" src="tinymce/TinyMCETextArea.js"></script>
        <script type="text/javascript" src="tinymce/tiny_mce_src.js"></script>

		<!-- </x-bootstrap> -->
		<script type="text/javascript">Ext.Loader.setPath({
				'Ext.ux.desktop': 'js',
				MyDesktop: ''
			});

			Ext.require('MyDesktop.App');

			var myDesktopApp;
			Ext.onReady( function () {
				myDesktopApp = new MyDesktop.App();
			});</script>
		<!-- </x-compile> -->
	</head>

	<body>

		<a href="http://www.proyojana.com" target="_blank" alt="Powered by Ext JS"
		id="poweredby">
		<div>
		</div>
		</a>
		<a href="http://www.oohpublishing.co.uk" target="_blank" alt="Proyojana" id="poweredby1">
		<div>
		</div>
		</a>

	</body>
	<div id="loading-mask">
	</div>
	<div id="loading">
		<div class="loading-indicator">
			Loading PMT...
		</div>
	</div>
</html>
