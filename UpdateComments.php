<?php
   
   include './config.php';

   // Retrieve data from Query String
   $photo = $_GET['photo'];
   $content = $_GET['content'];
   $name = $_GET['name'];

   // Escape User Input to help prevent SQL Injection
   $photo = mysqli_real_escape_string($link,$photo);
   $content = mysqli_real_escape_string($link,$content);
   $name = mysqli_real_escape_string($link,$name);

   //build query
   //$textQuery = "Insert into Comments WHERE photo ='" . $photo ."'";

   $textQuery = "INSERT INTO Comments (content,date,photo,name) VALUES ('" . $content . "',". "now()" .",'".  $photo . "','". $name ."')";
   
   //Execute query
   $textResult = mysqli_query($link,$textQuery) or die(mysqli_error($link));
   
   // Insert a new row in the table for each person returned
   
?>