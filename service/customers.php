<?php
include ("config.php");
session_start();
$user_no = $_SESSION["user_no"];
switch($_POST["action"]) /*Read action sent from front-end */ {
	case 1 :
		getCustomers();
		break;
	case 2 :
		getCustomersById($_POST["id"]);
		break;
	case 3 :
		deleteCustomersById($_POST["id"]);
		break;
	case 4 :
		updateBasicInfoCustomer($_POST['basicid'], $_POST['basiccode'], $_POST['basicname'], $_POST['basicdescription'], $_POST['basicaddress1'], $_POST['basicaddress2'], $_POST['sevicesven'], $_POST['basiccity'], $_POST['basicstate'], $_POST['basiccountry'], $_POST['basicpin'], $_POST['basicphone'], $_POST['basicfax'], $_POST['basicemail'], $_POST['basicwebsite']);
		break;
	case 5 :
		insertBasicInfoCustomer($_POST['basiccode'], $_POST['basicname'], $_POST['basicdescription'], $_POST['basicaddress1'], $_POST['basicaddress2'], $_POST['sevicesven'], $_POST['basiccity'], $_POST['basicstate'], $_POST['basiccountry'], $_POST['basicpin'], $_POST['basicphone'], $_POST['basicfax'], $_POST['basicemail'], $_POST['basicwebsite']);
		break;
	case 6 :
		getClient($_POST['workflow_code']);
		break;
	case 7: 
		autoRequestCode($id);
		break;
	default :
		break;
}

function getCustomers() {
	$num_result = mysql_query("Select
  customers.code as code,
  customers.name as name,
  customers.id as id,
  customers.description as description,
  customers.phone as phone,
  customers.email as mail,
  Group_Concat(services.name) as services
From
  customers Inner Join
  customers_services On customers.code =
    customers_services.customer_code Inner Join
  services On customers_services.service_id =
    services.id
Where
  _publishing.customers.flag = 0 and customers_services.flag = 0 Group By
  customers.code") or die(mysql_error());

	$totaldata = mysql_num_rows($num_result);

	$result = mysql_query("Select
  customers.code as code,
  customers.name as name,
  customers.id as id,
  customers.description as description,
  customers.phone as phone,
  customers.email as mail,
  Group_Concat(services.name) as services
From
  customers Inner Join
  customers_services On customers.code =
    customers_services.customer_code Inner Join
  services On customers_services.service_id =
    services.id
Where
  customers.flag = 0 and customers_services.flag = 0 Group By
  customers.code LIMIT " . $_POST['start'] . ", " . $_POST['limit']) or die(mysql_error());

	while($row = mysql_fetch_object($result)) {
		$data[] = $row;
	}
	echo '({"total":"' . $totaldata . '","results":' . json_encode($data) . '})';
}

function getCustomersById($id) {
	$result1 = mysql_query("Select
		  customers.code as custbasiccode,
		  customers.name as custbasicname,
		  customers.email as custbasicemail ,
		  customers.phone as custbasicphone,
		  customers.id as basic_customerid,
		  customers.description as custbasicdescription,
		  customers.address1 as custbasicaddress1,
		  customers.address2 as custbasicaddress2,
		  customers.city as custbasiccity,
		  customers.state as custbasicstate,
		  customers.country as custbasiccountry,
		  customers.pin as custbasicpin,
		  customers.fax as custbasicfax, 
		  customers.website As custbasicwebsite,
		  Group_Concat(services.id) as custsevicesven
		From
  customers Inner Join
  customers_services On customers.code =
    customers_services.customer_code Inner Join
  services On customers_services.service_id =
    services.id
Where
  customers.flag = 0 and customers_services.flag = 0 and customers.id = '" . $id . "' Group By
  customers.code
		  ");

	if(!$result1) {
		$result[failure] = true;
		$result[message] = 'Invalid query: ' . mysql_error();
	} else {
		$result["success"] = true;

	}
	while($row = mysql_fetch_object($result1)) {
		$result["data"] = $row;
	}

	echo(json_encode($result));
}

function deleteCustomersById($id) {
	$checkquery = "SELECT id FROM customers WHERE id='" . $id . "'";
	$result1 = mysql_query($checkquery);
	$num_rows = mysql_num_rows($result1);
	if($num_rows == 1) {
		$result1 = mysql_query("UPDATE customers SET flag=1 WHERE id='" . $id . "'");

		if(!$result1) {
			$result["failure"] = true;
			$result["message"] = 'Invalid query: ' . mysql_error();
		} else {
			$result["success"] = true;
			$result["message"] = 'Deleted successfully';
		}
	} else {
		$result["failure"] = true;
		$result["message"] = 'Customer does not exist';
	}

	echo json_encode($result);
}

function updateBasicInfoCustomer($basicid, $basiccode, $basicname, $basicdescription, $basicaddress1, $basicaddress2, $sevicesven, $basiccity, $basicstate, $basiccountry, $basicpin, $basicphone, $basicfax, $basicemail, $basicwebsite) {
	$checkquery = "SELECT id as id FROM customers WHERE id='" . $basicid . "'";
	$result1 = mysql_query($checkquery);
	$num_rows = mysql_num_rows($result1);

	if($num_rows == 1) {
		$result1 = mysql_query("UPDATE customers set code='" . $basiccode . "',name='" . $basicname . "',description='" . $basicdescription . "',address1='" . $basicaddress1 . "',address2='" . $basicaddress2 . "',services='" . $sevicesven . "',city='" . $basiccity . "',state='" . $basicstate . "',country='" . $basiccountry . "',pin='" . $basicpin . "',phone='" . $basicphone . "',fax='" . $basicfax . "',email='" . $basicemail . "',website='" . $basicwebsite . "' WHERE id=" . $basicid . "");
		
		$delete = mysql_query("update customers_services set flag = 1 where customer_code = '" .$basiccode."'");
		echo $sevicesven;
		$services = explode(',', $sevicesven);
		for($i = 0; $i < count($services) - 1; $i++) {
			//echo $id;
			$result1 = mysql_query("INSERT INTO customers_services(id,customer_code,service_id,created_by,created_on,modified_by,modified_on,flag) VALUES('','" . $basiccode . "','" . $services[$i] . "','',now(),'','','')");
		}
		
		if(!$result1) {
			$result["failure"] = true;
			$result["message"] = 'Invalid query: ' . mysql_error();
		} else {
			$result["success"] = true;
			$result["message"] = 'Updated successfully';
		}
	} else {
		$result["failure"] = true;
		$result["message"] = 'customer does not exist';
	}

	echo json_encode($result);
}

function insertBasicInfoCustomer($basiccode, $basicname, $basicdescription, $basicaddress1, $basicaddress2, $sevicesven, $basiccity, $basicstate, $basiccountry, $basicpin, $basicphone, $basicfax, $basicemail, $basicwebsite) {
	$checkquery = "SELECT code FROM customers WHERE code='" . $basiccode . "'";
	$result1 = mysql_query($checkquery);
	$num_rows = mysql_num_rows($result1);

	if($num_rows == 0) {
		$result1 = mysql_query("INSERT INTO customers(id,code,name,description,address1,address2,services,city,state,country,pin,phone,fax,email,website,flag) VALUES('','" . $basiccode . "','" . $basicname . "','" . $basicdescription . "','" . $basicaddress1 . "','" . $basicaddress2 . "','" . $sevicesven . "','" . $basiccity . "','" . $basicstate . "','" . $basiccountry . "','" . $basicpin . "','" . $basicphone . "','" . $basicfax . "','" . $basicemail . "','" . $email . "','" . $basicwebsite . "')");
		$services = explode(',', $sevicesven);
		for($i = 0; $i < count($services) - 1; $i++) {
			//echo $id;
			$result1 = mysql_query("INSERT INTO customers_services(id,customer_code,service_id,created_by,created_on,modified_by,modified_on,flag) VALUES('','" . $basiccode . "','" . $services[$i] . "','',now(),'','','')");
		}
		if(!$result1) {
			$result["failure"] = true;
			$result["message"] = "Invalid query: " . mysql_error();
		} else {
			$result["success"] = true;
			$result["message"] = "Inserted successfully";
		}
	} else {
		$result["success"] = false;
		$result["message"] = "customer Code already exists in the same name";
	}

	echo json_encode($result);
}

function getClient($workflow_code) {

	$num_result = mysql_query("Select
	
  customers.code as code,
  customers.name as name
From
  clients_choosen Inner Join
  customers On customers.id =
    clients_choosen.clients
Where
  clients_choosen.code_workflow ='" . $workflow_code . "'") or die(mysql_error());

	$totaldata = mysql_num_rows($num_result);

	$result = mysql_query("Select
	
  customers.code as code,
  customers.name as name
From
  clients_choosen Inner Join
  customers On customers.id =
    clients_choosen.clients
Where
  clients_choosen.code_workflow ='" . $workflow_code . "' LIMIT " . $_POST['start'] . ", " . $_POST['limit']) or die(mysql_error());

	while($row = mysql_fetch_object($result)) {
		$data[] = $row;
	}
	echo '({"total":"' . $totaldata . '","results":' . json_encode($data) . '})';
}

	function autoRequestCode($id) {
	$autoRequest = mysql_query("select code from customers");
	$num_rows = mysql_num_rows($autoRequest);
	if($num_rows > 0) {
		while($row = mysql_fetch_array($autoRequest)) {
			$data1 = $row['code'];
		}
	//	echo $data1;
		$data = str_split($data1, 1);
		$remain = substr($data1,1,4);
	

		//$data1 = substr($data1, -4);
		$code = $remain + 1;
		//echo $code;
		$code = str_pad($code, 3, '0', STR_PAD_LEFT);
	//	echo $code;
		$new_code = $data[0] . $code;
		
		//echo $new_code;
	} else {
		
		$new_code = "C001";
	}

	if(!$autoRequest) {
		$result["failure"] = true;
		$result["message"] = 'Invalid query: ' . mysql_error();
	} else {
		$result["success"] = true;
		$result["message"] = $new_code;
	}

	echo json_encode($result);
}
?>