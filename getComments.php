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
   $countResult = mysqli_query($link,$countQuery) or die(mysqli_error($link));
   
   // Insert a new row in the table for each person returned
   while($row = mysqli_fetch_array($countResult)) {
      $count = "$row[Count]";
   }
   echo $count;

   //build query
   $textQuery = "SELECT * FROM Comments WHERE photo ='" . $photo ."'";

   
   //Execute query
   $textResult = mysqli_query($link,$textQuery) or die(mysqli_error($link));
   
   // Insert a new row in the table for each person returned
   $text="";
   while($row = mysqli_fetch_array($textResult)) {
      $text.="<div class='comment'>";
      $text.="<div style='height: 26px;'>";
      $text.="<div class='commentName'>" + $row[name] + "</div>";
      $text.="<div class='commentDate'>" + $row[date] +"</div>";
      $text.="</div>";
      $text.="<div class='commentText'>" + $row[content]+"</div>";
      $text.="</div>";
   }
   
   

   echo $text;
?>