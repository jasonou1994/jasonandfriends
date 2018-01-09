<?php

   $dbhost = "104.198.154.72";
   $dbuser = "jasonou122894";
   $dbpass = "jasonou1";
   $dbname = "jasonandfriends";
   
   //Connect to mysqli Server
   $link = mysqli_connect($dbhost, $dbuser, $dbpass);
   
   //Select Database
   mysqli_select_db($link, $dbname) or die(mysqli_error());
?>