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


	$qry="SELECT * FROM questions ORDER BY question ASC";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);


?>
<script language="javascript" type="text/javascript">
<!--
function post_value(val,id){
var val;
var id;
opener.document.frm.question.value = val;
opener.document.frm.questionid.value = id;
 self.close();
}
//-->
</script>
<div style="width:300px;border-bottom:1px dashed #000;float:left;margin:15px 0 15px 0;">
<b>Select Questions</b>
</div>
<?php

	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
	<div style="width:300px;">
	<a href="javascript://" onclick="fetchQuestion('<?php echo $rs['question'];?>','<?php echo $rs['qid'];?>');"><?php echo $rs['question'];?></a> <br>
	</div>
	<?php }
	}else{?>
	<div style="width:300px;float:left;margin:15px 0 15px 0;color:#FF0000;font-weight:bold;">
	Currently there are no Questions found.
	</div>
	<?php }

?>
