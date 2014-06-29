<?php
/*
* PAGE ID		: PHP
* CREATED ON	: 11-11-2010
* MODIFIED ON	: 
* AUTHOR ID		: 003573
* PROJECT URL	: 
* CLIENT NAME	: Laserwords
* DEVELOPED BY	: Laserwords [www.laserwords.com]
* DESCRIPTION	: 
*/
include("../config.php");


	$qry="SELECT emp_mas_name,emp_role FROM employee_master WHERE emp_role='SUB'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);
	while($rs=mysql_fetch_array($result)){	
		$empmasname[]='"'.$rs['emp_mas_name'].'"';
	}//End while

	$arr = array();
	if($num_rows > 0){
		foreach ($empmasname as  $empmasname1) {
		$empmasname2=$empmasname2.$empmasname1.',';
		}
	}
	$empmasname2 = substr($empmasname2,0,-1); 
	//echo $empmasname2;

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

	$("#emp_mas_belongs").autocompleteArray(
		[
			<?php echo $empmasname2;?>
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
