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


	$qry="SELECT eg_name,eg_id FROM employee_groups ORDER BY eg_name ASC";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);


?>
<script type="text/javascript">
<!--
function post_value(val,id){
var val;
opener.document.frm.emp_group.value = val;
opener.document.frm.emp_mas_cmpygroup_id.value = id;
self.close();
}
//-->
</script>

<div style="width:300px;border-bottom:1px dashed #000;float:left;margin:15px 0 15px 0;">
<b>Select Employee Group</b>
</div>
<?php if($num_rows <= 5){ ?>
<div style="width:350px;">
<?php } else { ?>
<div style="width:350px;float:left;height:400px;overflow:auto">
<?php
}
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
	<a href="javascript://" onclick="fetchEmployeeGroup('<?php echo $rs['eg_name'];?>','<?php echo $rs['eg_id'];?>');"><?php echo $rs['eg_name'];?></a> <br>
	<?php }
	}else{?>
	<div style="width:300px;float:left;margin:15px 0 15px 0;color:#FF0000;font-weight:bold;">
	Currently there are no Employee Group found.
	</div>
	<?php }
?>
</div>