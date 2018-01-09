<?php
   include './config.php';
   
   // Retrieve data from Query String
   $cartId = $_GET['productName'];
   
   // Escape User Input to help prevent SQL Injection
   $cartId = mysqli_real_escape_string($link, $cartId);
   
   //build query
   $query = "SELECT count(*) as count FROM Reviews WHERE productName ='" . $cartId ."'";
   
   //Execute query
   $qry_result = mysqli_query($link, $query) or die(mysqli_error($link));
   
   //Build Result String
   
   // Insert a new row in the table for each person returned
   while($row = mysqli_fetch_array($qry_result)) {
      $display_string = "$row[count]";
   }
   
   echo $display_string;
?>