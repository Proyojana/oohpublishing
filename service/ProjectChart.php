<?php
include ("config.php");
switch($_POST["action"]) {
	case 1 :
		BudgetVsActuals();	
	default :
		break;
}
function BudgetVsActuals() {

	$result1 = mysql_query("Select
  oohpublishing.budget_total_detail.total_pay_usd as Estimated,
  oohpublishing.budget_total_detail.total_pay_gdp as Actuals,
  oohpublishing.project_title.job_code as project
From
  oohpublishing.budget_total_detail Inner Join
  oohpublishing.project_title On oohpublishing.project_title.id =
    oohpublishing.budget_total_detail.project_id");
  
  if(!$result1)
		{
			$result["failure"] = true;
			$result["message"] =  'Invalid query:'. mysql_error();
		}
		else
		{
			$result["success"] = true;
			$result["message"] =  'reportto:'. mysql_error();
		}
       	while($row=mysql_fetch_object($result1))
	   	{
			$data [] = $row;
	  	}
      	echo'({"results":'.json_encode($data).'})';
		
}





?>