<?php
 
    
    include("config.php");
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getCurrencyRate();
			break;
		case 2:
			insertgetCurrencyRate($_POST['currency_rate_gbp'],$_POST['currency_rate_from'],$_POST['currency_rate_to']);
			break;
		case 3:
			getCurrencyMasterById($_POST["id"]);	
			break;
		case 4:
			deletegetCurrencyRate($_POST["id"]);	
			break;
		case 5:
			updategetCurrencyRate($_POST["currency_rate_id"],$_POST['currency_rate_gbp'],$_POST['currency_rate_from'],$_POST['currency_rate_to']);	
			break;
		default: 
			break;
	}
	
	
	function getCurrencyRate()
	{
 		$num_result = mysql_query ("Select
  currency_rate.id as currency_rate_id,
  currency_rate.currency_rate_gbp as currency_rate_gbp,
  currency_rate.currency_rate_from as currency_rate_from,
  currency_rate.currency_rate_to as currency_rate_to
  From
  currency_rate Where currency_rate.flag=0")or die(mysql_error());
		
		$totaldata = mysql_num_rows($num_result);

		$result = mysql_query("Select
  currency_rate.id as currency_rate_id,
  currency_rate.currency_rate_gbp as currency_rate_gbp,
  currency_rate.currency_rate_from as currency_rate_from,
  currency_rate.currency_rate_to as currency_rate_to
  From
  currency_rate Where currency_rate.flag=0 LIMIT ".$_POST['start'].", ".$_POST['limit'])or die(mysql_error());
  
		while($row=mysql_fetch_object($result))
		{
			$data [] = $row;
		}
	   	echo'({"total":"'.$totaldata.'","results":'.json_encode($data).'})';
	}
	function getCurrencyMasterById($id)
 	{
	$result1 = mysql_query ("select currency_rate.id as currency_rate_id,
  currency_rate.currency_rate_gbp as currency_rate_gbp,
  currency_rate.currency_rate_from as currency_rate_from,
  currency_rate.currency_rate_to as currency_rate_to
  From
  currency_rate where
		  	currency_rate.id=".$id."");
			
		if(!$result1)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				
			}
       	while($row=mysql_fetch_object($result1))
	   	{
			$result ["data"] = $row;
	  	}
		
		
      	echo(json_encode($result));
    } 
     function updategetCurrencyRate($currency_rate_id,$currency_rate_gbp,$currency_rate_from,$currency_rate_to)
    {
		$checkquery="SELECT id FROM currency_rate WHERE currency_rate.id='".$currency_rate_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows==1){
			$result1= mysql_query("UPDATE currency_rate set currency_rate_gbp='".$currency_rate_gbp."', currency_rate_from='".$currency_rate_from."',currency_rate_to='".$currency_rate_to."',modified_by=' ',modified_on=now() WHERE id=".$currency_rate_id."");
				
		if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = 'Updated successfully';
			}
		}
		else
		{
			$result["failure"] = true;
			$result["message"] =  'Currency rate does not exist';
		}
		

		echo json_encode($result);
    }
    
    
	function deletegetCurrencyRate($currency_rate_id)
    {
		$checkquery="SELECT id FROM currency_rate WHERE id='".$currency_rate_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE currency_rate SET flag=1 WHERE id='".$currency_rate_id."'");
				
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  'Invalid query: ' . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = 'Deleted successfully';
				}
			}
			else
			{
				$result["failure"] = true;
				$result["message"] =  'Currency rate does not exist';
			}
		
		echo json_encode($result);
	}
	
	function insertgetCurrencyRate($currency_rate_gbp,$currency_rate_from,$currency_rate_to)
    {
		
		$result1 = mysql_query ("INSERT INTO currency_rate(id,currency_rate_gbp,currency_rate_from,currency_rate_to,created_by,created_on,modified_by,modified_on,flag) VALUES('','".$currency_rate_gbp."','".$currency_rate_from."','".$currency_rate_to."','',now(),'','','')");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Inserted successfully";
			}
		
		echo json_encode($result);
	}
	
?>