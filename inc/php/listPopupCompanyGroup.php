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
	$qry="SELECT cg_name,cg_id FROM company_groups ORDER BY cg_name ASC";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);


?>
<script type="text/javascript">
<!--
function post_value(val,id){
var val;
var id;
opener.document.frm.compGroupName.value = val;
opener.document.frm.compGroupID.value = id;
self.close();
}
//-->
</script>
<div style="width:300px;border-bottom:1px dashed #000;float:left;margin:15px 0 15px 0;">
<b>Select Comany Group</b>
</div>
<?php if($num_rows <= 5){ ?>
<div style="width:350px;">
<?php } else { ?>
<div style="width:350px;float:left;height:400px;overflow:auto">
<?php
}
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
	<a href="javascript://" onclick="fetchCompanyGroup('<?php echo $rs['cg_name'];?>','<?php echo $rs['cg_id'];?>');"><?php echo $rs['cg_name'];?></a> <br>
	<?php }
	}else{?>
	<div style="width:300px;float:left;margin:15px 0 15px 0;color:#FF0000;font-weight:bold;">
	Currently there are no Comany Group found.
	</div>
	<?php }
?>
</div>