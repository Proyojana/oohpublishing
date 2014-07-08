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
	default :
		break;
}

function getCustomers() {
	$num_result = mysql_query("Select
  ooh_publishing.customers.code as code,
  ooh_publishing.customers.name as name,
  ooh_publishing.customers.id as id,
  ooh_publishing.customers.description as description,
  ooh_publishing.customers.phone as phone,
  ooh_publishing.customers.email as mail,
  Group_Concat(ooh_publishing.services.name) as services
From
  ooh_publishing.customers Inner Join
  ooh_publishing.customers_services On ooh_publishing.customers.code =
    ooh_publishing.customers_services.customer_code Inner Join
  ooh_publishing.services On ooh_publishing.customers_services.service_id =
    ooh_publishing.services.id
Where
  ooh_publishing.customers.flag = 0 Group By
  ooh_publishing.customers.code") or die(mysql_error());

	$totaldata = mysql_num_rows($num_result);

	$result = mysql_query("Select
  ooh_publishing.customers.code as code,
  ooh_publishing.customers.name as name,
  ooh_publishing.customers.id as id,
  ooh_publishing.customers.description as description,
  ooh_publishing.customers.phone as phone,
  ooh_publishing.customers.email as mail,
  Group_Concat(ooh_publishing.services.name) as services
From
  ooh_publishing.customers Inner Join
  ooh_publishing.customers_services On ooh_publishing.customers.code =
    ooh_publishing.customers_services.customer_code Inner Join
  ooh_publishing.services On ooh_publishing.customers_services.service_id =
    ooh_publishing.services.id
Where
  ooh_publishing.customers.flag = 0 Group By
  ooh_publishing.customers.code LIMIT " . $_POST['start'] . ", " . $_POST['limit']) or die(mysql_error());

	while($row = mysql_fetch_object($result)) {
		$data[] = $row;
	}
	echo '({"total":"' . $totaldata . '","results":' . json_encode($data) . '})';
}

function getCustomersById($id) {
	$result1 = mysql_query("Select
		  ooh_publishing.customers.code as custbasiccode,
		  ooh_publishing.customers.name as custbasicname,
		  ooh_publishing.customers.email as custbasicemail ,
		  ooh_publishing.customers.phone as custbasicphone,
		  ooh_publishing.customers.id as basic_customerid,
		  ooh_publishing.customers.description as custbasicdescription,
		  ooh_publishing.customers.address1 as custbasicaddress1,
		  ooh_publishing.customers.address2 as custbasicaddress2,
		  ooh_publishing.customers.city as custbasiccity,
		  ooh_publishing.customers.state as custbasicstate,
		  ooh_publishing.customers.country as custbasiccountry,
		  ooh_publishing.customers.pin as custbasicpin,
		  ooh_publishing.customers.fax as custbasicfax, 
		  ooh_publishing.customers.website As custbasicwebsite,
		  Group_Concat(ooh_publishing.services.name) as custsevicesven
		From
  ooh_publishing.customers Inner Join
  ooh_publishing.customers_services On ooh_publishing.customers.code =
    ooh_publishing.customers_services.customer_code Inner Join
  ooh_publishing.services On ooh_publishing.customers_services.service_id =
    ooh_publishing.services.id
Where
  ooh_publishing.customers.flag = 0 and ooh_publishing.customers.id = '" . $id . "' Group By
  ooh_publishing.customers.code
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
	
  ooh_publishing.customers.code as code,
  ooh_publishing.customers.name as name
From
  ooh_publishing.clients_choosen Inner Join
  ooh_publishing.customers On ooh_publishing.customers.id =
    ooh_publishing.clients_choosen.clients
Where
  ooh_publishing.clients_choosen.code_workflow ='" . $workflow_code . "'") or die(mysql_error());

	$totaldata = mysql_num_rows($num_result);

	$result = mysql_query("Select
	
  ooh_publishing.customers.code as code,
  ooh_publishing.customers.name as name
From
  ooh_publishing.clients_choosen Inner Join
  ooh_publishing.customers On ooh_publishing.customers.id =
    ooh_publishing.clients_choosen.clients
Where
  ooh_publishing.clients_choosen.code_workflow ='" . $workflow_code . "' LIMIT " . $_POST['start'] . ", " . $_POST['limit']) or die(mysql_error());

	while($row = mysql_fetch_object($result)) {
		$data[] = $row;
	}
	echo '({"total":"' . $totaldata . '","results":' . json_encode($data) . '})';
}
?>