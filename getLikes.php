<?php
   sleep(1);
   include './config.php';

   
   // Retrieve data from Query String
   $photo = $_GET['photo'];
   
   // Escape User Input to help prevent SQL Injection
   $photo = mysqli_real_escape_string($link,$photo);
   
   //build query
   $query = "SELECT COUNT(*) as Count FROM Likes WHERE photo ='" . $photo ."'";
   
   //Execute query
   $qry_result = mysqli_query($link,$query) or die(mysqli_error($link));
   
   //Build Result String
   
   // Insert a new row in the table for each person returned
   while($row = mysqli_fetch_array($qry_result)) {
      $display_string = "$row[Count]";
   }
   
   echo $display_string;
?>