<?php
   
   include './config.php';
   
   // Retrieve data from Query String
   $name = $_GET['name'];
   $price = $_GET['price'];
   $email = $_GET['email'];
   $phone = $_GET['phone'];
   $uuid = $_GET['uuid'];
   $address = $_GET['address'];
     
   //build query
   $orderQuery = "INSERT INTO Orders (name,email,phone,price,address,orderId, date) values ('".$name . "','" . $email . "','" . $phone . "','" . $price . "','" . $address. "','" . $uuid . "',now()" . ")";
   
   //Execute query
   echo $orderQuery;
   $qry_result = mysqli_query($link,$orderQuery) or die(mysqli_error($link));


   //
   
?>
