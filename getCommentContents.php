<?php
   sleep(1);
   include './config.php';

   // Retrieve data from Query String
   $photo = $_GET['photo'];
   
   // Escape User Input to help prevent SQL Injection
   $photo = mysqli_real_escape_string($link, $photo);

   //build query
   $textQuery = "SELECT * FROM Comments WHERE photo ='" . $photo ."'";

   
   //Execute query
   $textResult = mysqli_query($link, $textQuery) or die(mysqli_error($link));
   
   // Insert a new row in the table for each person returned
   $text="";
   while($row = mysqli_fetch_array($textResult)) {
      echo $row[name];
      echo ", ";
      echo $row[date];
      echo ", ";
      echo $row[content];
      echo "CLEARCLEAR";
   }
   
   

   echo $text;
?>