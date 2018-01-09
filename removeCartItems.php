<?php
   
   include './config.php';
   
   // Retrieve data from Query String
   $cartId = $_GET['cartid'];
     
   //build query
   $query = "DELETE FROM CartProducts where cartId = " . $cartId;
   
   //Execute query
   echo $query;
   $qry_result = mysqli_query($link,$query) or die(mysqli_error($link));   
?>
