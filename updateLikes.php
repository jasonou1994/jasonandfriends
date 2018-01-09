<?php
   
   include './config.php';
   
   // Retrieve data from Query String
   $photo = $_GET['photo'];
   
   // Escape User Input to help prevent SQL Injection
   $photo = mysqli_real_escape_string($link,$photo);
   
  
   //build query
   $query = "INSERT INTO Likes (photo,date) values ('" . $photo . "', now())";
   
   //Execute query
   echo $query;
   $qry_result = mysqli_query($link,$query) or die(mysqli_error($link));
   
?>
