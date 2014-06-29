<?php
/*
* PAGE ID		: PHP
* CREATED ON	: 08-11-2010
* MODIFIED ON	: 14-12-2010
* AUTHOR ID		: 003573
* PROJECT URL	: 
* CLIENT NAME	: Laserwords
* DEVELOPED BY	: Laserwords [www.laserwords.com]
* DESCRIPTION	: 
*/

class myPrideInc
{

	function listQuestions(){

	$qry="SELECT * FROM questions";
	echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
		<option value="<?php echo $rs['questions'];?>"><?php echo $rs['questions'];?></option>
	<?php }//while end
	}//if end
	}//function end

	//Get Role Name
	function getRoleName($roleid){
	$qry="SELECT * FROM roles WHERE rid='$roleid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){
		echo $rs['role'];
	}//while end
	}//if end
	}//function end

	//Get Question Name
	function getQuestionsName($questionid){
	$qry="SELECT * FROM questions WHERE qid='$questionid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){
		echo $rs['question'];
	}//while end
	}//if end
	}//function end

	//Get Section Name
	function getSectionName($sectionid){
	$qry="SELECT * FROM sections WHERE sid='$sectionid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){
		echo $rs['section'];
	}//while end
	}//if end
	}//function end

	//Get Section ID
	function getSectionID($sectionid){
	$qry="SELECT * FROM sections WHERE sid='$sectionid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){
		echo $rs['sid'];
	}//while end
	}//if end
	}//function end

	//List Roles
	function listRoles($qrole){

	$qrole1=$qrole;
	$qrole1= explode(',',$qrole1);
	$cnt=count($qrole1);

	$qry="SELECT * FROM roles ORDER BY role ASC";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){?>
				<option value="<?php echo $rs['rid'];?>" <?php for($i=0;$i<$cnt;$i++){if($qrole1[$i]==$rs['rid']){echo "selected";}}?>><?php echo $rs['role'];?></option>
				<?php }//while end
		}//if end
	}//function end

	//List Questions
	function listQuestionsForMulBox($squestion){

	$squestion1=$squestion;
	$squestion1= explode(',',$squestion1);
	$cnt=count($squestion1);

	$qry="SELECT * FROM questions ORDER BY question ASC";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){?>
				<option value="<?php echo $rs['qid'];?>" <?php for($i=0;$i<$cnt;$i++){if($squestion1[$i]==$rs['qid']){echo "selected";}}?>><?php echo $rs['question'];?></option>
				<?php }//while end
		}//if end
	}//function end

	//List Sections
	function listSectionsForMulBox($tsection){

	$tsection1=$tsection;
	$tsection1= explode(',',$tsection1);
	$cnt=count($tsection1);

	$qry="SELECT * FROM sections ORDER BY section ASC";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){?>
				<option value="<?php echo $rs['sid'];?>" <?php for($i=0;$i<$cnt;$i++){if($tsection1[$i]==$rs['sid']){echo "selected";}}?>><?php echo $rs['section'];?></option>
				<?php }//while end
		}//if end
	}//function end

	//List Roles in Details
	function viewRolesDetail($qrole){

	$qrole1=$qrole;
	$qrole1= explode(',',$qrole1);
	$cnt=count($qrole1);

	$qry="SELECT * FROM roles ORDER BY role ASC";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				for($i=0;$i<$cnt;$i++){
					if($qrole1[$i]==$rs['rid']){
						echo $rs['role']."<br>";
					}//if end
				}//for end
				}//while end
		}//if end
	}//function end

	//List Sections  in Details
	function listSectionsDetails($tsection){

	$tsection1=$tsection;
	$tsection1= explode(',',$tsection1);
	$cnt=count($tsection1);

	$qry="SELECT * FROM sections ORDER BY section ASC";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				for($i=0;$i<$cnt;$i++){
					if($tsection1[$i]==$rs['sid']){
					echo $rs['section']."<br>";
					}//if end
				}//for end
				}//while end
		}//if end
	}//function end

	//List Questions in Details
	function listQuestionsDetails($squestion){

	$squestion1=$squestion;
	$squestion1= explode(',',$squestion1);
	$cnt=count($squestion1);

	$qry="SELECT * FROM questions ORDER BY question ASC";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				for($i=0;$i<$cnt;$i++){
					if($squestion1[$i]==$rs['qid']){
						echo $rs['question']."<br>";
					}//if end
				}//for end
				}//while end
		}//if end
	}//function end


	//Get Section and Question
	function getSectionQuestion($tsection){
	$tsection1=$tsection;
	$tsection1= explode(',',$tsection1);
	$cnt=count($tsection1);
	$qry="SELECT * FROM sections";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){ $j=1;
				while($rs=mysql_fetch_array($result)){
				for($i=0;$i<$cnt;$i++){
					if($tsection1[$i]==$rs['sid']){
						echo "<tr><td colspan='2' style='background:#F7F7F7;'><b>".$rs['section']."</b></td></tr><tr><td colspan='2' style='background:#fff;'>"."<b>Questions: </b>"."<br>";
						echo myPrideInc::listQuestionsDetails($rs['squestion'])."<br></td></tr>";
					}//if end
					
				}//for end
				$j++;
				}//while end

		}//if end
	}//function end

	//List Templates
	function listTemplates(){

	$qry="SELECT * FROM templates ORDER BY tcode ASC";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){?>
				<option value="<?php echo $rs['tid'];?>"><?php echo $rs['tcode'];?> - <?php echo $rs['templatedesc'];?></option>
				<?php }//while end
		}//if end
	}//function end

	//Get Template ID From users_template table and pass into templates table
	function getTemplateName($reportee_id){

	$qry="SELECT * FROM users_template WHERE reportee_id='$reportee_id'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo myPrideInc::getTemplate($rs['template_id']);
				}//while end
		}//if end
	}//function end

	//Get Template Name
	function getTemplate($template_id){

	$qry="SELECT * FROM templates WHERE tid='$template_id'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo $rs['tcode'];
				}//while end
		}//if end
	}//function end

	//Roles as List Box
	function roleAsListBox(){

	$qry="SELECT * FROM roles ORDER BY role ASC";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){?>
				<option value="<?php echo $rs['rid'];?>"><?php echo $rs['role'];?></option>
				<?php }//while end
		}//if end
	}//function end


	function displayRoleName($userid){

	$qry="SELECT * FROM employee_master WHERE userid='$userid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo myPrideInc::getRoleName($rs['emp_role']);
				}//while end
		}//if end
	}//function end

	function getFinanceQ($tcode,$sectionid,$tFinancialQ,$dis,$pag){
	$qry="SELECT DISTINCT sectionid FROM questions WHERE sectionid=".$sectionid;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
						$tFinanciaQArray=explode(",",$tFinancialQ);
						for($i=0;$i<count($tFinanciaQArray);$i++){
						myPrideInc::questionAsCheckBox1($tcode,$sectionid,$tFinanciaQArray[$i],$dis,$pag);
						}//for end
				}//while end
		}//if end
		else{?>
		<tr class="trb">
		<td class="tq kra brdl" style="width:50px;" align="center" colspan="4">There is no <?php myPrideInc::getSectionName($sectionid); ?> KRA's Found.</td>
		</tr>
		<?php }
	}//function end

	function questionAsCheckBox1($tcode,$sectionid,$tFinanciaQArray,$dis,$pag){
		$qry="SELECT * FROM questions WHERE qid='$tFinanciaQArray'";
		$result=mysql_query($qry);
		$num_rows=mysql_num_rows($result);
		if($num_rows > 0){
		while($rs=mysql_fetch_array($result)){
			if($dis==false){?> 
			<tr class="trb">
				<td class="tq kra brdl" style="width:50px;" align="center"><?php echo $rs['qcode'];?></td>
				<td class="tq kra brdl"><?php echo $rs['question'];?></td>
				<td class="kra tdw"><input id="<?php echo $rs['qcode'];?>" onblur="chkWeight(<?php echo $rs['sectionid'];?>);" type="text" name="sec1_weightage[]" maxlength="4" value="<?php myPrideInc::getKRAWeigthage($rs['qid'],$sectionid,$_GET['tplcode']);?>" style="width:50px;background-color:#fff;" class="fin"/></td>
				<td class="kra tdw"><a <?php if($pag!=1){?>href="removeKRA.php?qusid=<?php echo $rs['qid'];?>&secid=<?php echo $rs['sectionid'];?>"<?php }else{?>href="removeKRA1.php?qusid=<?php echo $rs['qid'];?>&secid=<?php echo $rs['sectionid'];?>&tcode=<?php echo $tcode;?>&tid=<?php echo $_GET['tid'];?>"<?php }?> onclick="return confirmRemoveKRA('<?php echo $rs['qcode'];?>');"><img src="../images/delete.png" width="18" height="18" border="0" alt="edit" style="margin-left:6px;"></a></td>
				<input type="hidden" name="tFinancialQ[]" maxlength="4" value="<?php echo $rs['qid'];?>" style="width:50px"/><!-- kra ids -->
				<input type="hidden" name="kracodes[]" maxlength="4" value="<?php echo $rs['qcode'];?>" style="width:50px"/><!-- kra codes -->
				<input type="hidden" name="finKRAID[]" maxlength="4" value="<?php myPrideInc::getKRAkeyID($rs['qid'],$sectionid,$_GET['tplcode']);?>" style="width:50px"/></td><!--KRA unique id from templates_details -->
			</tr>
			<?php }elseif($dis==true){?>
			<tr class="trb" style="background:#fafafa;">
				<td class="tq kra brdl" width="10%" align="center" style="padding:5px 0 5px 0;"><?php echo $rs['qcode'];?></td>
				<td colspan="4" class="tq kra brdl" width="80%"><?php echo $rs['question'];?></td>
				<td class="kra tdw" width="10%" align="center"><?php myPrideInc::getKRAWeigthage($rs['qid'],$sectionid,$_GET['tplcode']);?> %</td>
				<input type="hidden" name="tFinancialQ[]" maxlength="4" value="<?php echo $rs['qid'];?>" style="width:50px"/><!-- kra ids -->
			</tr>
			<?php }
			}//while end
			}//if end
			if($num_rows==0){?>
			<tr class="trb">
			<!-- <td class="tq kra brdl" style="width:50px;" align="center" colspan="4">There is no <?php myPrideInc::getSectionName($sectionid); ?> KRA's Found.</td> -->
			</tr>
			<?php }
	}//function end


	function getCustomerQ($tcode,$sectionid,$tCustomerQ,$dis,$pag){
	$qry="SELECT DISTINCT sectionid FROM questions WHERE sectionid=".$sectionid;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
					$tCustomerQArray=explode(",",$tCustomerQ);
						for($i=0;$i<count($tCustomerQArray);$i++){
						myPrideInc::questionAsCheckBox2($tcode,$sectionid,$tCustomerQArray[$i],$dis,$pag);
						}//for end
				}//while end
		}//if end
		else{?>
		<tr class="trb">
		<td class="tq kra brdl" style="width:50px;" align="center" colspan="4">There is no <?php myPrideInc::getSectionName($sectionid); ?> KRA's Found.</td>
		</tr>
		<?php }
	}//function end

	function questionAsCheckBox2($tcode,$sectionid,$tCustomerQArray,$dis,$pag){
		$qry="SELECT * FROM questions WHERE qid='$tCustomerQArray'";
		$result=mysql_query($qry);
		$num_rows=mysql_num_rows($result);
		if($num_rows > 0){$i=0;
		while($rs=mysql_fetch_array($result)){
			if($dis==false){?>
			<tr class="trb">
				<td class="tq kra brdl" style="width:50px;" align="center" style="padding:5px 0 5px 0;"><?php echo $rs['qcode'];?></td>
				<td class="tq kra brdl"><?php echo $rs['question'];?></td>
				<td class="kra tdw"><input id="<?php echo $rs['qcode'];?>" onblur="chkWeight(<?php echo $rs['sectionid'];?>);"  type="text" name="sec2_weightage[]" maxlength="4" value="<?php myPrideInc::getKRAWeigthage($rs['qid'],$sectionid,$_GET['tplcode']);?>" style="width:50px;background-color:#fff;" class="cust"/></td>
				<td class="kra tdw"><a <?php if($pag!=1){?>href="removeKRA.php?qusid=<?php echo $rs['qid'];?>&secid=<?php echo $rs['sectionid'];?>"<?php }else{?>href="removeKRA1.php?qusid=<?php echo $rs['qid'];?>&secid=<?php echo $rs['sectionid'];?>&tcode=<?php echo $tcode;?>&tid=<?php echo $_GET['tid'];?>"<?php }?> onclick="return confirmRemoveKRA('<?php echo $rs['qcode'];?>');"><img src="../images/delete.png" width="18" height="18" border="0" alt="edit" style="margin-left:6px;"></a></td>
				<input type="hidden" name="tCustomerQ[]" maxlength="4" value="<?php echo $rs['qid'];?>" style="width:50px"/><!-- kra ids -->
				<input type="hidden" name="cusKRAID[]" maxlength="4" value="<?php myPrideInc::getKRAkeyID($rs['qid'],$sectionid,$_GET['tplcode']);?>" style="width:50px"/></td><!--KRA unique id from templates_details -->
			</tr>
			<?php }elseif($dis==true){?>
			<tr class="trb" style="background:#fafafa;">
				<td class="tq kra brdl" width="10%" align="center" style="padding:5px 0 5px 0;"><?php echo $rs['qcode'];?></td>
				<td colspan="4" class="tq kra brdl" width="80%"><?php echo $rs['question'];?></td>
				<td class="kra tdw" width="10%" align="center"><?php myPrideInc::getKRAWeigthage($rs['qid'],$sectionid,$_GET['tplcode']);?> %</td>
				<input type="hidden" name="tCustomerQ[]" maxlength="4" value="<?php echo $rs['qid'];?>" style="width:50px"/><!-- kra ids -->
			</tr>
			<?php }
			}//while end
			}//if end
			if($num_rows==0){?>
			<tr class="trb">
			<!-- <td class="tq kra brdl" style="width:50px;" align="center" colspan="4">There is no <?php myPrideInc::getSectionName($sectionid); ?> KRA's Found.</td> -->
			</tr>
			<?php }
	}//function end

	function getInternalQ($tcode,$sectionid,$tInternalQ,$dis,$pag){
	$qry="SELECT DISTINCT sectionid FROM questions WHERE sectionid=".$sectionid;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
					$tInternalQArray=explode(",",$tInternalQ);
						for($i=0;$i<count($tInternalQArray);$i++){
						myPrideInc::questionAsCheckBox3($tcode,$sectionid,$tInternalQArray[$i],$dis,$pag);
						}//for end
				}//while end
		}//if end
		else{?>
		<tr class="trb">
		<td class="tq kra brdl" style="width:50px;" align="center" colspan="4">There is no <?php myPrideInc::getSectionName($sectionid); ?> KRA's Found.</td>
		</tr>
		<?php }
	}//function end

	function questionAsCheckBox3($tcode,$sectionid,$tInternalQArray,$dis,$pag){
		$qry="SELECT * FROM questions WHERE qid='$tInternalQArray'";
		$result=mysql_query($qry);
		$num_rows=mysql_num_rows($result);
		if($num_rows > 0){$i=0;
		while($rs=mysql_fetch_array($result)){
			if($dis==false){?>
			<tr class="trb">
				<td class="tq kra brdl" style="width:50px;" align="center"><?php echo $rs['qcode'];?></td>
				<td class="tq kra brdl"><?php echo $rs['question'];?></td>
				<td class="kra tdw"><input id="<?php echo $rs['qcode'];?>" onblur="chkWeight(<?php echo $rs['sectionid'];?>);" type="text" name="sec3_weightage[]"  maxlength="4" value="<?php myPrideInc::getKRAWeigthage($rs['qid'],$sectionid,$_GET['tplcode']);?>" style="width:50px;background-color:#fff;" class="int"/></td>
				<td class="kra tdw"><a <?php if($pag!=1){?>href="removeKRA.php?qusid=<?php echo $rs['qid'];?>&secid=<?php echo $rs['sectionid'];?>"<?php }else{?>href="removeKRA1.php?qusid=<?php echo $rs['qid'];?>&secid=<?php echo $rs['sectionid'];?>&tcode=<?php echo $tcode;?>&tid=<?php echo $_GET['tid'];?>"<?php }?> onclick="return confirmRemoveKRA('<?php echo $rs['qcode'];?>');"><img src="../images/delete.png" width="18" height="18" border="0" alt="edit" style="margin-left:6px;"></a></td>
				<input type="hidden" name="tInternalQ[]" maxlength="4" value="<?php echo $rs['qid'];?>" style="width:50px"/><!-- kra ids -->
				<input type="hidden" name="intKRAID[]" maxlength="4" value="<?php myPrideInc::getKRAkeyID($rs['qid'],$sectionid,$_GET['tplcode']);?>" style="width:50px"/></td><!--KRA unique id from templates_details -->
			</tr>
			<?php }elseif($dis==true){?>
			<tr class="trb"  style="background:#fafafa;">
				<td class="tq kra brdl" width="10%" align="center" style="padding:5px 0 5px 0;"><?php echo $rs['qcode'];?></td>
				<td colspan="4" class="tq kra brdl" width="80%"><?php echo $rs['question'];?></td>
				<td class="kra tdw" width="10%" align="center"><?php myPrideInc::getKRAWeigthage($rs['qid'],$sectionid,$_GET['tplcode']);?> %</td>
				<input type="hidden" name="tInternalQ[]" maxlength="4" value="<?php echo $rs['qid'];?>" style="width:50px"/><!-- kra ids -->
			</tr>
			<?php }
			}//while end
			}//if end
			if($num_rows==0){?>
			<tr class="trb">
			<!-- <td class="tq kra brdl" style="width:50px;" align="center" colspan="4">There is no <?php myPrideInc::getSectionName($sectionid); ?> KRA's Found.</td> -->
			</tr>
			<?php }
	}//function end

	function getLeadingQ($tcode,$sectionid,$tLeadingQ,$dis,$pag){
	$qry="SELECT DISTINCT sectionid FROM questions WHERE sectionid=".$sectionid;
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
					$tLeadingQArray=explode(",",$tLeadingQ);
						for($i=0;$i<count($tLeadingQArray);$i++){
						myPrideInc::questionAsCheckBox4($tcode,$sectionid,$tLeadingQArray[$i],$dis,$pag);
						}//for end
				}//while end
		}//if end
	}//function end

	function questionAsCheckBox4($tcode,$sectionid,$tLeadingQArray,$dis,$pag){
		$qry="SELECT * FROM questions WHERE qid='$tLeadingQArray'";
		$result=mysql_query($qry);
		$num_rows=mysql_num_rows($result);
		if($num_rows > 0){$i=1;
		while($rs=mysql_fetch_array($result)){
			if($dis==false){?>
			<tr class="trb">
				<td class="tq kra brdl" style="width:50px;" align="center"><?php echo $rs['qcode'];?></td>
				<td class="tq kra brdl"><?php echo $rs['question'];?></td>
				<td class="kra tdw"><input id="<?php echo $rs['qcode'];?>" onblur="chkWeight(<?php echo $rs['sectionid'];?>);" type="text" name="sec4_weightage[]" maxlength="4" value="<?php myPrideInc::getKRAWeigthage($rs['qid'],$sectionid,$_GET['tplcode']);?>" style="width:50px;background-color:#fff;" class="learn"/></td>
				<td class="kra tdw"><a <?php if($pag!=1){?>href="removeKRA.php?qusid=<?php echo $rs['qid'];?>&secid=<?php echo $rs['sectionid'];?>"<?php }else{?>href="removeKRA1.php?qusid=<?php echo $rs['qid'];?>&secid=<?php echo $rs['sectionid'];?>&tcode=<?php echo $tcode;?>&tid=<?php echo $_GET['tid'];?>"<?php }?> onclick="return confirmRemoveKRA('<?php echo $rs['qcode'];?>');"><img src="../images/delete.png" width="18" height="18" border="0" alt="edit" style="margin-left:6px;"></a></td>
				<input type="hidden" name="tLeadingQ[]" maxlength="4" value="<?php echo $rs['qid'];?>" style="width:50px"/><!-- kra ids -->
				<input type="hidden" name="leadKRAID[]" maxlength="4" value="<?php myPrideInc::getKRAkeyID($rs['qid'],$sectionid,$_GET['tplcode']);?>" style="width:50px"/></td><!--KRA unique id from templates_details -->
			</tr>
			<?php }elseif($dis==true){?>
			<tr class="trb" style="background:#fafafa;">
				<td class="tq kra brdl" width="10%" align="center" style="padding:5px 0 5px 0;"><?php echo $rs['qcode'];?></td>
				<td colspan="4" class="tq kra brdl" width="80%"><?php echo $rs['question'];?></td>
				<td class="kra tdw" width="10%" align="center"><?php myPrideInc::getKRAWeigthage($rs['qid'],$sectionid,$_GET['tplcode']);?> %</td>
				<input type="hidden" name="tLeadingQ[]" maxlength="4" value="<?php echo $rs['qid'];?>" style="width:50px"/><!-- kra ids -->
			</tr>
			<?php }
			}//while end
			}//if end
			if($num_rows==0){?>
			<tr class="trb">
			<!-- <td class="tq kra brdl" style="width:50px;" align="center" colspan="4">There is no <?php myPrideInc::getSectionName($sectionid); ?> KRA's Found.</td> -->
			</tr>
			<?php }
	}//function end

	//List Questions As CheckBox
	function listQuestionsAsCheckBox($squestion){

	$squestion1=$squestion;
	$squestion1= explode(',',$squestion1);
	$cnt=count($squestion1);

	$qry="SELECT * FROM questions ORDER BY question ASC";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){?>
				<div style="width:450px;float:left;margin:10px 0 0 20px;">
				<input type="checkbox" style="margin-right:5px;margin-top:5px;float:left;" name="squestion[]" value="<?php echo $rs['qid'];?>" <?php for($i=0;$i<$cnt;$i++){if($squestion1[$i]==$rs['qid']){?>checked<?php }}?>>
				<label style="float:left;margin-top:1px;"><?php echo $rs['question'];?></label></div>
			<?php }//while end
		}//if end
	}//function end


	function myTruncate($string, $limit, $break=" ", $pad="...") { 
	// return with no change if string is shorter than $limit
	if(strlen($string) <= $limit) return $string; $string = substr($string, 0, $limit); if(false !== ($breakpoint = strrpos($string, $break))) { $string = substr($string, 0, $breakpoint); } return $string . $pad; }

	//Get Template ID From users_template table and pass into templates table
	function getTemplateID($reportee_id){

	$qry="SELECT * FROM users_template WHERE reportee_id='$reportee_id'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo myPrideInc::toGetTemplate($rs['template_id']);
				}//while end
		}//if end
	}//function end

	//Get Template ID
	function toGetTemplate($template_id){

	$qry="SELECT * FROM templates WHERE tid='$template_id'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo $rs['tid'];
				}//while end
		}//if end
	}//function end

	//Get Template Code From users_template table and pass into templates table
	function getTemplateCode($reportee_id){

	$qry="SELECT * FROM users_template WHERE reportee_id='$reportee_id'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo myPrideInc::toGetTemplateCode($rs['template_id']);
				}//while end
		}//if end
	}//function end

	//Get Template Code
	function toGetTemplateCode($template_id){

	$qry="SELECT * FROM templates WHERE tid='$template_id'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo $rs['tcode'];
				}//while end
		}//if end
	}//function end

	//Get Employee Group Name
	function getEmployeeGroupName($emp_mas_cmpygroup_id){

	$qry="SELECT * FROM employee_groups WHERE eg_id='$emp_mas_cmpygroup_id'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo $rs['eg_name'];
				}//while end
		}//if end
	}//function end

	//Get Employee Group ID
	function getEmployeeGroupID($userid){
	$qry="SELECT * FROM employee_master WHERE userid='$userid'";
	$result=mysql_query($qry);
	$num_rows=@mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
					myPrideInc::getEmployeeGroupName($rs['emp_mas_cmpygroup_id']);
				}//while end
		}//if end
	}//function end

	//Get Appraisal Type
	function getAppraisalType($userid){
	$qry="SELECT * FROM appraisal WHERE userid='$userid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo $rs['type_of_appraisal'];
				}//while end
		}//if end
	}//function end

	//Get Number of Appraisal per Code
	function getNumberOfAppraisalPerCode($ia_code){
	$qry="SELECT userid FROM appraisal WHERE ia_code='$ia_code' AND year_of_appraisal=YEAR(now())";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				echo $num_rows;
		}//if end
	}//function end

	//Get Number of Appraisal per Code
	function getKRAWeigthage($qid,$sectionid,$tplcode){
	$qry="SELECT * FROM templates_details WHERE kraid='$qid' AND sectionid='$sectionid' AND tempcode='$tplcode'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo $rs['weightage'];
				}//while end
		}//if end
	}//function end

	//Get Template KRA Row ID from templates_details
	function getKRAkeyID($qid,$sectionid,$tplcode){
	$qry="SELECT * FROM templates_details WHERE kraid='$qid' AND sectionid='$sectionid' AND tempcode='$tplcode'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
				while($rs=mysql_fetch_array($result)){
				echo $rs['td_id'];
				}//while end
		}//if end
	}//function end

	//Function for delete KRA from templates_details table
	function deleteKRAkeyID($kraid,$secid,$tplcode){
		if($kraid!='' && $secid!='' && $tplcode!=''){
		$qry="DELETE FROM templates_details WHERE kraid='$kraid' AND sectionid='$secid' AND tempcode='$tplcode'";
		mysql_query($qry);
		}//end if
	}//end function

	//Get Designation Name
	function getEmpDesignation($desigID){
	$qry="SELECT * FROM designations WHERE id='$desigID'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){
		echo ucwords(strtolower($rs['designation']));
	}//while end
	}//if end
	}//function end

	//Get Reporting Person Name
	function getReportingPersonName($rpid){
	$qry="SELECT * FROM employee_master WHERE userid='$rpid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){
		echo $rs['emp_mas_name'];
	}//while end
	}//if end
	}//function end

	//Get Reporting Person ID
	function getReportingPersonID($rpid){
	$qry="SELECT * FROM employee_master WHERE userid='$rpid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){
		myPrideInc::getReportingPersonName($rs['emp_mas_belongs_id']);
	}//while end
	}//if end
	}//function end

	//Get Company name
	function getCompanyName($cmpyid){
	$qry="SELECT * FROM company_master WHERE com_mas_id='$cmpyid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){
		echo $rs['com_mas_name'];
	}//while end
	}//if end
	}//function end

	//Get Employee Designation as List Box
	function listEmployeeDesignation($desigID){
	$qry="SELECT * FROM designations ORDER by designation ASC";
	echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
		<option value="<?php echo $rs['id'];?>" <?php if($desigID==$rs['id']){?>selected<?php }?>><?php echo ucwords(strtolower($rs['designation']));?></option>
	<?php }//while end
	}//if end
	}//function end
	
	//Get Employee jobtitles as List Box
	function listEmployeeJobTitle($titleID){
	$qry="SELECT * FROM job_titles ORDER by job_title ASC";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows > 0){
	while($rs=mysql_fetch_array($result)){?>
		<option value="<?php echo $rs['job_id'];?>" <?php if($titleID==$rs['job_id']){?>selected<?php }?>><?php echo ucwords(strtolower($rs['job_title']));?></option>
	<?php }//while end
	}//if end
	}//function end

	//Get Employee jobtitle
	function getEmployeeJobTitle($titleID){
	$qry="SELECT * FROM job_titles WHERE job_id='$titleID'";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	$rs=mysql_fetch_array($result);
		return $rs['job_title'];
	}//function end

	//Get Superior jobtitle
	function getSuperiorJobTitle($emp_mas_belongs_id){
	$qry="SELECT userid,emp_mas_job_title_id FROM employee_master WHERE userid='$emp_mas_belongs_id'";
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	$rs=mysql_fetch_array($result);
		return myPrideInc::getEmployeeJobTitle($rs['emp_mas_job_title_id']);
	}//function end

	//Convert Name Format as UC of First Char.
	function convertNameFormat($name){
	 echo ucwords(strtolower($name));
	}

	//Function for find users reportees
	function drillDown($uid,$level,$user){
		$qry="SELECT * FROM employee_master WHERE emp_mas_belongs_id='$uid'";
		$result=mysql_query($qry);
		$num_rows=mysql_num_rows($result);	
		if($num_rows!=0){
			if($user=="sup"){?>
			<a href="viewReportees.php?userid=<?php echo encrypt($uid,'key');?>&level=<?php echo encrypt($level,'key');?>" title="<?php echo $num_rows;?> Reportees"><img src="images/drilldown.png" width="24" height="24" border="0" alt="Drill down"></a>
			<?php }
			if($user=="hr"){?>
			<a href="viewEmployeeMaster.php?userid=<?php echo $uid;?>&level=<?php echo $level;?>" title="<?php echo $num_rows;?> Reportees"><img src="../images/drilldown.png" width="24" height="24" border="0" alt="Drill down"></a>
			<?php }
		}
		if($num_rows==0){?>
		---
		<?php }
	}//function end

//Select Appraisal Code as a List Box
	function listboxAPPCODE(){
		$qry="SELECT ia_id,ia_code FROM appraisal GROUP BY ia_code";
		$result=mysql_query($qry);
		$num_rows=mysql_num_rows($result);	
		if($num_rows > 0){
		while($rs=mysql_fetch_array($result)){?>
		<option value="<?php echo $rs['ia_code'];?>"><?php echo $rs['ia_code'];?></option>
		<?php }//while end
		}//if end
	}//function end

//Rank Reportees Team
function RankReporteesTeam(){
		extract($_POST);
		for($i=0;$i<count($rankusers);$i++){
		$qry="UPDATE users_appraisal_details SET user_rank='$user_rank[$i]',rank_status='$submit' WHERE userid='$rankusers[$i]'";
		mysql_query($qry);
		//echo $qry.'<br>';
		}//for end
}//end function

	//Get Employee Name
	function getEmployeeName($rpid){
	$qry="SELECT * FROM employee_master WHERE userid='$rpid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows == 1){
	while($rs=mysql_fetch_array($result)){
		return $rs['emp_mas_name'];
	}//while end
	}//if end
	}//function end

	//Get Employee Number
	function getEmployeeNumber($rpid){
	$qry="SELECT * FROM employee_master WHERE userid='$rpid'";
	//echo $qry;
	$result=mysql_query($qry);
	$num_rows=mysql_num_rows($result);	
	if($num_rows == 1){
	while($rs=mysql_fetch_array($result)){
		return $rs['emp_mas_empno'];
	}//while end
	}//if end
	}//function end

	//Get Ranking Level Employees
	function getGradeEmployees($total,$grade){
		$outstanding=(10/100)*$total;
		$midSection=(70/100)*$total;
		$top=(20/100)*$midSection;
		$mid=(60/100)*$midSection;
		$bottom=(20/100)*$midSection;
		$low=(20/100)*$total;

		$actualTotal=round($outstanding)+round($top)+round($mid)+round($bottom)+round($low);
		$rem=strcmp($total,$actualTotal);

		if($total > $actualTotal){$mid=$mid-$rem;}
		if($total < $actualTotal){$mid=$mid+$rem;}

		//echo 'Total'.$total.'<br>';
		//echo 'Acttual Total'.$actualTotal.'<br>';
		//echo 'Diff'.$rem.'<br>';

		if($grade==1){return $outstanding;}
		if($grade==2){return $top;}
		if($grade==3){return $mid;}
		if($grade==4){return $bottom;}
		if($grade==5){return $low;}
	}//function end

	//Get Ranking Level Actual Employees
	function getActualGradeEmployees($users,$rank){
		$qry="SELECT * FROM users_appraisal_details WHERE userid IN ($users) AND user_rank=$rank";
		$result=mysql_query($qry);
		$num_rows=mysql_num_rows($result);	
		return $num_rows;
	}//function end

//Get Accessing Date
function accessDate($userid){
		$qry="SELECT * FROM appraisal WHERE userid=$userid";
		$result=mysql_query($qry);
		$num_rows=mysql_num_rows($result);	
		$rs=mysql_fetch_array($result);
		$emp_submit_date=$rs['emp_submit_date'];
		$emp_submit_date=explode('/',$emp_submit_date);
		$submitsate=$emp_submit_date[2].'-'.$emp_submit_date[1].'-'.$emp_submit_date[0];
		$todays_date = date("Y-m-d"); 

		if ($submitsate > $todays_date) {$valid = "yes"; } else { $valid = "no"; }
		return $valid;

}//function end

//Find CLsCL
function findCLsCL($sesLoginID,$role,$TLsTMs,$egID1){

	for($i=0;$i<sizeof($egID1);$i++){
	$egheadID = $egID1[$i].','.$egheadID;
	}$egheadIDs=substr($egheadID,0,-1);
	//echo 'EG Head ID'.$egheadIDs.'<br>';

	$qry1="SELECT userid FROM employee_master WHERE emp_mas_job_title_id=$role AND emp_mas_cmpygroup_id IN($egheadIDs) AND emp_mas_belongs_id=$sesLoginID";
	//echo $qry1.'<br>';
	$result1=mysql_query($qry1);
	$num_rows1=@mysql_num_rows($result1);	
	if($num_rows1 > 0){
		while($rs1=mysql_fetch_array($result1)){
		$userid=$rs1['userid'].','.$userid;
		}//while end
	}//if end
	$userids=substr($userid,0,-1);
	//echo 'CLs'.$userids.'<br>';

	$qry2="SELECT userid FROM employee_master WHERE emp_mas_job_title_id=3 AND emp_mas_cmpygroup_id IN($egheadIDs)";
	//echo $qry2.'<br>';
	$result2=mysql_query($qry2);
	$num_rows2=@mysql_num_rows($result2);	
	if($num_rows2 > 0){
		while($rs2=mysql_fetch_array($result2)){
		$userid1=$rs2['userid'].','.$userid1;
		}//while end
	}//if end
	$userids1=substr($userid1,0,-1);
	//echo 'CLsTLs'.$userids1.'<br>';

	$qry3="SELECT userid FROM employee_master WHERE emp_mas_job_title_id=5 AND emp_mas_belongs_id IN($userids1)";
	//echo $qry3.'<br>';
	$result3=mysql_query($qry3);
	$num_rows3=@mysql_num_rows($result3);	
	if($num_rows3 > 0){
		while($rs3=mysql_fetch_array($result3)){
		$userid2=$rs3['userid'].','.$userid2;
		}//while end
	}//if end
	$userids2=substr($userid2,0,-1);
	//echo 'TLsTMs'.$userids2.'<br>';

	if(!isset($TLsTMs)){return $userids;}
	if($TLsTMs==3){return $userids1;}
	if($TLsTMs==5){return $userids2;}
	

}//end function

//Find TLs
function findTL($userids,$role){

	$qry="SELECT userid FROM employee_master WHERE emp_mas_job_title_id=$role AND emp_mas_belongs_id=$userids";
	//echo $qry.'<br>';
	$result=mysql_query($qry);
	$num_rows=@mysql_num_rows($result);
	if($num_rows > 0){
		while($rs=mysql_fetch_array($result)){
		$userid=$rs['userid'].','.$userid;
		}//while end
	}//if end
	$userids=substr($userid,0,-1);
	return $userids;

}//end function

//Find TLsTM
function findTM($userids,$role){

	$qry="SELECT userid FROM employee_master WHERE emp_mas_job_title_id=$role AND emp_mas_belongs_id IN($userids)";
	//echo $qry.'<br>';
	$result=mysql_query($qry);
	$num_rows=@mysql_num_rows($result);
	if($num_rows > 0){
		while($rs=mysql_fetch_array($result)){
		$userid=$rs['userid'].','.$userid;
		}//while end
	}//if end
	$userids=substr($userid,0,-1);
	return $userids;

}//end function

//Find CLTLPMTM
function findCLTLPMTMGROUP($sesLoginID,$role){

	$qry="SELECT userid FROM employee_master WHERE emp_mas_job_title_id=$role AND emp_mas_belongs_id=$sesLoginID";
	//echo $qry.'<br>';
	$result=mysql_query($qry);
	$num_rows=@mysql_num_rows($result);
	if($num_rows > 0){
		while($rs=mysql_fetch_array($result)){
		$userid=$rs['userid'].','.$userid;
		}//while end
	}//if end
	$userids=substr($userid,0,-1);
	return $userids;

}//end function

//Find CLs
function findCLs($sesLoginID,$role){

	$qry="SELECT userid FROM employee_master WHERE emp_mas_belongs_id=$sesLoginID AND emp_mas_job_title_id=$role";
	//echo $qry.'<br>';
	$result=mysql_query($qry);
	$num_rows=@mysql_num_rows($result);
	if($num_rows > 0){
		while($rs=mysql_fetch_array($result)){
		$userid=$rs['userid'].','.$userid;
		}//while end
	}//if end
	$userids=substr($userid,0,-1);
	return $userids;

}//end function

//Find TLs
function findTls($sesLoginID,$role,$egID3){

	for($i=0;$i<sizeof($egID3);$i++){
	$empGID = $egID3[$i].','.$empGID;
	}$empGIDs=substr($empGID,0,-1);
	//echo 'EMP. Griup ID'.$empGIDs.'<br>';

	$qry="SELECT userid FROM employee_master WHERE emp_mas_belongs_id=$sesLoginID AND emp_mas_job_title_id=$role AND emp_mas_cmpygroup_id IN($empGIDs)";
	//echo $qry.'<br>';
	$result=mysql_query($qry);
	$num_rows=@mysql_num_rows($result);
	if($num_rows > 0){
		while($rs=mysql_fetch_array($result)){
		$userid=$rs['userid'].','.$userid;
		}//while end
	}//if end
	$userids=substr($userid,0,-1);
	return $userids;

}//end function

//Find TLs
function findPMs($sesLoginID,$role){

	$qry="SELECT userid FROM employee_master WHERE emp_mas_belongs_id=$sesLoginID AND emp_mas_job_title_id=$role";
	//echo $qry.'<br>';
	$result=mysql_query($qry);
	$num_rows=@mysql_num_rows($result);
	if($num_rows > 0){
		while($rs=mysql_fetch_array($result)){
		$userid=$rs['userid'].','.$userid;
		}//while end
	}//if end
	$userids=substr($userid,0,-1);
	return $userids;

}//end function

//Find TLs
function findTMs($egID,$egheadedID,$sesLoginID,$role){

	for($i=0;$i<sizeof($egID);$i++){
	$empGID = $egID[$i].','.$empGID;
	}$empGIDs=substr($empGID,0,-1);
	//echo 'EMP. Griup ID'.$empGIDs.'<br>';

	for($i=0;$i<sizeof($egheadedID);$i++){
	$egheadID = $egheadedID[$i].','.$egheadID;
	}$egheadIDs=substr($egheadID,0,-1);
	//echo 'EG Head ID'.$egheadIDs.'<br>';

	$qry1="SELECT DISTINCT userid FROM employee_master WHERE emp_mas_job_title_id=$role AND emp_mas_cmpygroup_id IN($empGIDs)";
	//echo $qry1.'<br>';
	$result1=mysql_query($qry1);
	$num_rows1=@mysql_num_rows($result1);	
	if($num_rows1 > 0){
		while($rs1=mysql_fetch_array($result1)){
		$userid=$rs1['userid'].','.$userid;
		}//while end
	}//if end
	$userids=substr($userid,0,-1);
	return $userids;

}//end function


//Find TLs
function findINDirectReportees($role){
	
	extract($_POST);
	for($i=0;$i<sizeof($checkbox);$i++){
	$headedIDs = $checkbox[$i].','.$headedIDs;
	}$allheadedIDs=substr($headedIDs,0,-1);
	//echo 'Head IDs'.$allheadedIDs.'<br>';

	$qry1="SELECT userid FROM employee_master WHERE emp_mas_job_title_id=$role AND emp_mas_belongs_id IN($allheadedIDs)";
	//echo $qry1.'<br>';
	$result1=mysql_query($qry1);
	$num_rows1=@mysql_num_rows($result1);	
	if($num_rows1 > 0){
		while($rs1=mysql_fetch_array($result1)){
		$userid=$rs1['userid'].','.$userid;
		}//while end
	}//if end
	$userids=substr($userid,0,-1);
	return $userids;

}//end function


}//class end
?>
