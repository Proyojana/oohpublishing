<?php
/*
* PAGE ID		: PHP
* CREATED ON	: 12-11-2010
* MODIFIED ON	: 
* AUTHOR ID		: 003573
* PROJECT URL	: 
* CLIENT NAME	: Laserwords
* DEVELOPED BY	: Laserwords [www.laserwords.com]
* DESCRIPTION	: 
*/
include("../config.php");


	$qry="SELECT * FROM sections ORDER BY section ASC";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);


?>
<script language="javascript" type="text/javascript">
<!--
function post_value(val,id){
var val;
var id;
opener.document.frm.section.value = val;
opener.document.frm.sectionid.value = id;
self.close();
}
//-->
</script>
<div style="width:300px;border-bottom:1px dashed #000;float:left;margin:15px 0 15px 0;">
<b>Select Sections</b>
</div>
<?php

	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
	<div style="width:300px;">
	<a href="javascript://" onclick="fetchSection('<?php echo $rs['section'];?>','<?php echo $rs['sid'];?>');"><?php echo $rs['section'];?></a> <br>
	<?php }
	}else{?>
	<div style="width:300px;float:left;margin:15px 0 15px 0;color:#FF0000;font-weight:bold;">
	Currently there are no Sections found.
	</div>
	<?php }

?>
