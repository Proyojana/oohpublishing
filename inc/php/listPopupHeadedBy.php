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
include("../inc/myprideInc.php");

	$obj=new myPrideInc();


	$qry="SELECT * FROM employee_master ORDER BY emp_mas_name ASC";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);


?>
<script type="text/javascript">
<!--
function post_value1(val1,id,numb){
var val1;
opener.document.frm.com_mas_headed.value = val1;
opener.document.frm.com_mas_headed_id.value = id;
opener.document.frm.emp_no.value = numb;
self.close();
}
//-->
</script>
<div style="width:300px;border-bottom:1px dashed #000;float:left;margin:15px 0 15px 0;">
<b>Select Headed By</b>
</div>
<?php if($num_rows <= 5){ ?>
<div style="width:350px;">
<?php } else { ?>
<div style="width:350px;float:left;height:400px;overflow:auto">
<?php
}
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
	<?php echo $rs['emp_mas_empno'];?> <a href="javascript://" onclick="fetchHeadedBy('<?php echo $rs['emp_mas_name'];?>','<?php echo $rs['userid'];?>','<?php echo $rs['emp_mas_empno'];?>');">
	<?php $obj->convertNameFormat($rs['emp_mas_name']);?></a><br>
	<?php }
	}else{?>
	<div style="width:300px;float:left;margin:15px 0 15px 0;color:#FF0000;font-weight:bold;">
	Currently there are no names found.
	</div>
	<?php }
?>
</div>