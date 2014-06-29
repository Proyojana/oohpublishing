<?php
/*
* PAGE ID		: PHP
* CREATED ON	: 01-11-2010
* MODIFIED ON	: 
* AUTHOR ID		: 003573
* PROJECT URL	: 
* CLIENT NAME	: Laserwords
* DEVELOPED BY	: Laserwords [www.laserwords.com]
* DESCRIPTION	: 
*/

    function encrypt($ses,$key)
    {
        $sesencoded = $ses;
        $num = mt_rand(2,5);
        for($i=1;$i<=$num;$i++)
        {
        $sesencoded = base64_encode($sesencoded);
        }
        $alpha_array = array('W','X','S','I','H','N','T','V','D','J','P');
        $sesencoded = $sesencoded."+".$alpha_array[$num];
        $sesencoded = base64_encode($sesencoded);
        return $sesencoded;
    }//End Encrypt Function

    function decrypt($str,$key)
    {
        $alpha_array = array('W','X','S','I','H','N','T','V','D','J','P');
        $decoded = base64_decode($str);
        list($decoded,$letter) = preg_split("/\+/",$decoded);
        for($i=0;$i<count($alpha_array);$i++)
        {
        if($alpha_array[$i] == $letter)
        break;
        }
        for($j=1;$j<=$i;$j++)
        {
        $decoded = base64_decode($decoded);
        }
        return $decoded;
    }//End Decrypt Function
?>