<?php
   sleep(1);
   include './config.php';

   // Retrieve data from Query String
   $photo = $_GET['photo'];
   
   // Escape User Input to help prevent SQL Injection
   $photo = mysqli_real_escape_string($link,$photo);
   
   //build query
   $countQuery = "SELECT COUNT(*) as Count FROM Comments WHERE photo ='" . $photo ."'";
   
   //Execute query
   $countResult = mysqli_query($link, $countQuery) or die(mysqli_error($link));
   
   // Insert a new row in the table for each person returned
   while($row = mysqli_fetch_array($countResult)) {
      $count = "$row[Count]";
   }
   echo $count;

?>