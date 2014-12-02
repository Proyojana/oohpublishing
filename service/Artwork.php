<?php
  //  session_start();
include("config.php");
include("../inc/php/encryptDecrypt.php");
//$id=$_SESSION['user_no'];
	switch($_POST["action"]) /*Read action sent from front-end */
	{
		case 1:
			getArtworkDetails($_POST['job_code']);
			break;	
		case 2:
			insertArtwork($_POST['artwork_id'],$_POST['project_id'],$_POST['figurenumber'],$_POST['inputformat'],$_POST['resolution'],$_POST['colourmode'],$_POST['vendorassessment'],$_POST['cnvrt'],$_POST['redrawsimple'],$_POST['redrawcomplex'],$_POST['relabel'],$_POST['finalartwrk'],$_POST['cost'],$_POST['comments']);
			break;
		case 3 :
		    selectArtwork($_POST['project_id']);
		    break;
	    case 4:
		    deleteArtwork($_POST['id']);
		    break;
	   	case 5:
			getAddArtworkDetails($_POST['job_code']);
			break;
		case 6:
			insertArtworkTotal($_POST['project_id'],$_POST['total_cost'],$_POST['total_redraws'],$_POST['total_relabel'],$_POST['total_final']);
			break;
		case 7 :
		    selectArtworkTotal($_POST['project_id']);
		    break;
	    	
		 default:  
			break;
	}
function getArtworkDetails($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as edit_ArtworkHeader_ClientName,
	  customers.code as edit_ArtworkHeader_ClientCode,
	  customers.id as edit_ArtworkHeader_clientId,
	  project_title.project_name as edit_ArtworkHeader_ProjectName,
	  project_title.workflow as edit_ArtworkHeader_workflow,
	  project_title.job_code as edit_ArtworkHeader_Job,
	  project_title.id as edit_ArtworkHeader_projectID,
	  author.name as edit_ArtworkHeader_AuthorName
	  
	From
	  project_title Inner Join
	  customers On project_title.client =
	    customers.id Inner Join
	  author On project_title.job_code=author.job_code
	Where
	  project_title.job_code = '".$job_code."' And (author.author = 'Author' Or
    author.author ='Main Contact' or author.author ='Editor' or author.author ='Others')");
			
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

	function insertArtwork($artwork_id,$project_id,$figurenumber,$inputformat,$resolution,$colourmode,$vendorassessment,$cnvrt,$redrawsimple,$redrawcomplex,$relabel,$finalartwrk,$cost,$comments)
	{
		//echo $author_name;
		$artwork_id1 = explode(',',$artwork_id);
		$figurenumber1 = explode(',',$figurenumber);
		$inputformat1 = explode(',',$inputformat);
		$resolution1 = explode(',',$resolution);
		$colourmode1 = explode(',',$colourmode);
		$vendorassessment1 = explode(',',$vendorassessment);
		$redrawsimple1 = explode(',',$redrawsimple);
		$redrawcomplex1 = explode(',',$redrawcomplex);
		$convert1 = explode(',',$cnvrt);
		$relabel1 = explode(',',$relabel);
		$finalartwrk1 = explode(',',$finalartwrk);
		$cost1 = explode(',',$cost);
		$comments1 = explode(',',$comments);
		
		
		
	//	echo $id[0];
		for($i = 0; $i < count($figurenumber1) - 1; $i++) {
				$checkquery = "SELECT id FROM artwork WHERE id='" . $artwork_id1[$i] . "'";
				$result2 = mysql_query($checkquery);
				$num_rows = mysql_num_rows($result2);
					
				//convert string to date
			
				
		//	echo $num_rows;
			if($num_rows ==1)
				{
				
					$result1 = mysql_query("UPDATE artwork SET figure_number = '".$figurenumber1[$i]."', input_format = '".$inputformat1[$i]."',resolution = '".$resolution1[$i]."',colour_mode = '".$colourmode1[$i]."',vendor_assessment	 = '".$vendorassessment1[$i]."',cnvrt = '".$convert1[$i]."',redraw_simple = '".$redrawsimple1[$i]."',redraw_complex = '".$redrawcomplex1[$i]."' ,relabel = '".$relabel1[$i]."',final = '".$finalartwrk1[$i]."',	cost = '".$cost1[$i]."',	comments = '".$comments1[$i]."'where id = '".$artwork_id1[$i]."'");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
					
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Artwork saved successfully";
				}
				
				}
		else
		{

			$result1 = mysql_query ("INSERT INTO `artwork` (`id`, `project_id`, `figure_number`, `input_format`, `resolution`, `colour_mode`, `vendor_assessment`, `cnvrt`, `redraw_simple`, `redraw_complex`, `relabel`, `final`, `cost`, `comments`, `flag`) 
			VALUES ('', '".$project_id."', '".$figurenumber1[$i]."','".$inputformat1[$i]."', '".$resolution1[$i]."', '".$colourmode1[$i]."', '".$vendorassessment1[$i]."', '".$convert1[$i]."', '".$redrawsimple1[$i]."', '".$redrawcomplex1[$i]."', '".$relabel1[$i]."', '".$finalartwrk1[$i]."', '".$cost1[$i]."', '".$comments1[$i]."', '')"); 
					
		
		if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Artwork Inserted successfully";
			}
			
		}
		}
			echo json_encode($result);
		
	}

	function selectArtwork($projectid) {
	
				$num_result = mysql_query("Select
				artwork.id as id,
  artwork.project_id as project_id,
   artwork.figure_number as figurenumber,
   artwork.input_format as inputformat,
   artwork.resolution as resolution,
   artwork.colour_mode as colourmode,
   artwork.cnvrt as convert1,
   artwork.vendor_assessment as vendorassessment,
   artwork.redraw_simple as redrawsimple,
   artwork.redraw_complex as redrawcomplex ,
   artwork.relabel as relabel,
   artwork.cost as cost,
   artwork.final as finalartwrk ,
   artwork.comments as comments
From
  artwork
			
			Where
			  artwork.flag = 0 And
			  artwork.project_id = '" . $projectid . "' ") or die(mysql_error());
			
				$totaldata = mysql_num_rows($num_result);
			
				$result = mysql_query("Select
				artwork.id as id,
  artwork.project_id as project_id,
   artwork.figure_number as figurenumber,
   artwork.input_format as inputformat,
   artwork.resolution as resolution,
   artwork.colour_mode as colourmode,
   artwork.cnvrt as convert1,
   artwork.vendor_assessment as vendorassessment,
   artwork.redraw_simple as redrawsimple,
   artwork.redraw_complex as redrawcomplex ,
   artwork.relabel as relabel,
   artwork.cost as cost,
   artwork.final as finalartwrk ,
   artwork.comments as comments
From
  artwork
			
			Where
			  artwork.flag = 0 And
			  artwork.project_id = '" . $projectid . "' LIMIT " . $_POST['start'] . ", " . $_POST['limit']) or die(mysql_error());
			
				while($row = mysql_fetch_object($result)) {
					$data[] = $row;
				}
				echo '({"total":"' . $totaldata . '","results":' . json_encode($data) . '})';
				}
				
function deleteArtwork($id)
    {
		$checkquery="SELECT id FROM artwork WHERE id='".$id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		if($num_rows==1){
				$result1= mysql_query("UPDATE artwork SET flag=1 WHERE id='".$id."'");
				
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
				$result["message"] =  'Deleted successfully';
			}
		
		echo json_encode($result);
	}
	
	
	function getAddArtworkDetails($job_code)
 	{
		$result1 = mysql_query ("Select
	  customers.name as add_ArtworkHeader_ClientName,
	  customers.code as add_ArtworkHeader_ClientCode,
	  customers.id as add_ArtworkHeader_clientId,
	  project_title.title as add_ArtworkHeader_ProjectName,
	  project_title.workflow as add_ArtworkHeader_workflow,
	  project_title.job_code as add_ArtworkHeader_Job,
	  project_title.id as add_ArtworkHeader_projectID
	From
	  project_title Inner Join
	  customers On project_title.client =
	    customers.id 
	Where
	  project_title.job_code = '".$job_code."' ");
			
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
	function insertArtworkTotal($project_id,$total_cost,$total_redraws,$total_relabel,$total_final)
    {
		$checkquery="SELECT id FROM artwork_total_detail WHERE project_id='".$project_id."'";
		$result1=mysql_query($checkquery);
		$num_rows=mysql_num_rows($result1);
		
		if($num_rows == 1)
			{
				
				$result1 = mysql_query("UPDATE artwork_total_detail SET  total_cost='".$total_cost."',total_redraws = '".$total_redraws."', total_relabel = '".$total_relabel."', total_final = '".$total_final."' WHERE project_id='".$project_id."'");
				if(!$result1)
				{
					$result["failure"] = true;
					$result["message"] =  "Invalid query: " . mysql_error();
				}
				else
				{
					$result["success"] = true;
					$result["message"] = "Artwork total saved successfully";
				}
		  }
		else
			
		{
			$result1 = mysql_query ("INSERT INTO artwork_total_detail(id,project_id,total_cost,total_redraws,total_relabel,total_final) VALUES('','".$project_id."','".$total_cost."','".$total_redraws."','".$total_relabel."','".$total_final."')");
			if(!$result1)
			{
				$result["failure"] = true;
				$result["message"] =  "Invalid query: " . mysql_error();
			}
			else
			{
				$result["success"] = true;
				$result["message"] = "Artwork Inserted successfully";
			}
		}
		
		echo json_encode($result);
	}

function selectArtworkTotal($projectid) 
{
	
		$result2 = mysql_query("
		Select
  artwork_total_detail.id,
  artwork_total_detail.project_id,
  artwork_total_detail.total_cost as total_cost,
  artwork_total_detail.total_redraws as total_redraws,
  artwork_total_detail.total_relabel as total_relabel,
  artwork_total_detail.total_final as total_final
From
  artwork_total_detail
Where
  
 
  artwork_total_detail.project_id = '".$projectid."'
")or die(mysql_error());
		if(!$result2)
			{
				$result[failure] = true;
				$result[message] =  'Invalid query: ' . mysql_error();
			}
			else
			{
				$result["success"] = true;				
			}
       	while($row=mysql_fetch_object($result2))
	   	{
			$result ["data"] = $row;
	  	}
      	echo(json_encode($result));		
	
}
	

				
			
		
	
	?>