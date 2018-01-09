<?php
   
   include './config.php';
   
   // Retrieve data from Query String
   $productName = $_GET['productName'];
   $productPrice = $_GET['productPrice'];
   $productAttribute = $_GET['productAttribute'];
   $productQuantity = $_GET['productQuantity'];
   $uuid = $_GET['uuid'];
     
   //build query
   $orderProductsQuery = "INSERT INTO OrderProducts (name,attribute,quantity,price,orderId, date) values ('".$productName . "','" . $productAttribute . "'," . $productQuantity . "," . $productPrice . ",'" . $uuid . "',now()" . ")";
   
   //Execute query
   echo $orderProductsQuery;
   $qry_result = mysqli_query($link,$orderProductsQuery) or die(mysqli_error($link));


   //
   
?>
