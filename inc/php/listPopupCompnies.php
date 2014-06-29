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

	$qry="SELECT * FROM company_master ORDER BY com_mas_name ASC";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);

?>

<script type="text/javascript">
<!--
function getCompanyName(com_mas_name){
var com_mas_name;
opener.document.frm.emp_mas_company.value = com_mas_name;
opener.document.frm.com_mas_id.value = com_mas_id;
self.close();
}
//-->
</script>
<div style="width:300px;border-bottom:1px dashed #000;float:left;margin:15px 0 15px 0;">
<b>Select Company</b>
</div>
<?php if($num_rows <= 5){ ?>
<div style="width:350px;">
<?php } else { ?>
<div style="width:350px;float:left;height:400px;overflow:auto">
<?php
}
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
	<a href="javascript://" onclick="fetchCompanyName('<?php echo $rs['com_mas_name'];?>','<?php echo $rs['com_mas_id'];?>');"><?php echo $rs['com_mas_name'];?></a> <br>
	<?php }
	}else{?>
	<div style="width:300px;float:left;margin:15px 0 15px 0;color:#FF0000;font-weight:bold;">
	Currently there are no Companies found.
	</div>
	<?php }

?>
</div>
