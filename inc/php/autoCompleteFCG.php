<?php
/*
* PAGE ID		: PHP
* CREATED ON	: 29-10-2010
* MODIFIED ON	: 29-10-2010
* AUTHOR ID		: 003573
* PROJECT URL	: 
* CLIENT NAME	: Laserwords
* DEVELOPED BY	: Laserwords [www.laserwords.com]
* DESCRIPTION	: 
*/
include("../config.php");


	$qry="SELECT cg_name FROM company_groups";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);
	while($rs=mysql_fetch_array($result)){	
		$gname[]='"'.$rs['cg_name'].'"';
	}//End while

	$arr = array();
	if($num_rows > 0){
		foreach ($gname as  $gname1) {
		$val3=$val3.$gname1.',';
		}
	}

	$val3 = substr($val3,0,-1); 

?>
<script type="text/javascript">
function findValue(li) {
	if( li == null ) return alert("No match!");

	// if coming from an AJAX call, let's use the CityId as the value
	if( !!li.extra ) var sValue = li.extra[0];

	// otherwise, let's just display the value in the text box
	else var sValue = li.selectValue;

	//alert("The value you selected was: " + sValue);
}

function selectItem(li) {
	findValue(li);
}

function formatItem(row) {
	return row[0] + " (id: " + row[1] + ")";
}



$(document).ready(function() {

	var groupName = '<?php echo $val3;?>';

	$("#company_group_name").autocompleteArray(
		[
			<?php echo $val3;?>
		],
		{
			delay:10,
			minChars:1,
			matchSubset:1,
			onItemSelect:selectItem,
			onFindValue:findValue,
			autoFill:true,
			maxItemsToShow:10
		}
	);
});
</script>
