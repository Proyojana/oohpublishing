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
  budget_total_detail.total_receive_usd as Estimated,
  budget_total_detail.total_pay_usd as Actuals,
  project_title.job_code as project
From
  budget_total_detail Inner Join
  project_title On project_title.id =
    budget_total_detail.project_id");
  
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