<?php
   sleep(1);
   include './config.php';
   
   // Retrieve data from Query String
   $cartId = $_GET['cartId'];
   
   // Escape User Input to help prevent SQL Injection
   $cartId = mysqli_real_escape_string($link, $cartId);
   
   //build query
   $query = "SELECT * FROM CartProducts WHERE cartId ='" . $cartId ."' order by date asc;";
   
   //Execute query
   $qry_result = mysqli_query($link, $query) or die(mysqli_error($link));
   
   //Build Result String
   
    // Insert a new row in the table for each person returned
   $text="";
   while($row = mysqli_fetch_array($qry_result)) {
      echo $row[productName];
      echo ", ";
      echo $row[attribute];
      echo ", ";
      echo $row[quantity];
      echo ", ";
      echo $row[thumbnail];
      echo ", ";
      echo $row[price];
      echo "CLEARCLEAR";
   }
   
   echo $text;
?>