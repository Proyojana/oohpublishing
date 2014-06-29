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


	$qry="SELECT * FROM employee_master WHERE userid!=1 ORDER BY emp_mas_name ASC";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);


?>
<script language="javascript" type="text/javascript">
<!--
function post_value(val,id){
var val;
var id;
opener.document.frm.emp_mas_belongs.value = val;
opener.document.frm.emp_mas_belongs_id.value = id;
self.close();
}
//-->
</script>
<div style="width:300px;border-bottom:1px dashed #000;float:left;margin:15px 0 15px 0;">
<b>Select Superior</b>
</div>
<?php if($num_rows <= 5){ ?>
<div style="width:350px;">
<?php } else { ?>
<div style="width:350px;float:left;height:400px;overflow:auto">
<?php
}
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
	<div style="width:300px;">
	<?php echo $rs['emp_mas_empno'];?> <a href="javascript://" onclick="fetch('<?php echo $rs['emp_mas_name'];?>','<?php echo $rs['userid'];?>');"><?php echo $rs['emp_mas_name'];?></a> <br>
	</div>
	<?php }
	}else{?>
	<div style="width:300px;float:left;margin:15px 0 15px 0;color:#FF0000;font-weight:bold;">
	Currently there are no names found.
	</div>
	<?php }
?>
</div>