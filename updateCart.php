<?php
   
   include './config.php';
   
   // Retrieve data from Query String
   $cartId = $_GET['cartId'];
   $productName = $_GET['productName'];
   $photo = $_GET['photo'];
   $folder = $_GET['folder'];
   $type = $_GET['type'];
   $attribute = $_GET['attribute'];
   $quantity = $_GET['quantity'];
   $thumbnail = $_GET['thumbnail'];
   $price = $_GET['price'];
   $modify = $_GET['modify'];
   
   // Escape User Input to help prevent SQL Injection
   $cartId = mysqli_real_escape_string($link,$cartId);
   $attribute = mysqli_real_escape_string($link,$attribute);
   $quantity = mysqli_real_escape_string($link,$quantity);

   //FIRST CHECK TO REMOVE ITEM
   if($quantity == 0)
   {
      $removeQuery = "delete from CartProducts where  cartId =" . $cartId ." and productName='" . $productName . "' and attribute = '" . $attribute ."';" ;
      $removeResult = mysqli_query($link,$removeQuery) or die(mysqli_error($link));

      echo "deleted";
      return;
   }

   //BELOW IS CHECK MODIFY
   if ($modify == true)
   {
      $modifyQuery = "update CartProducts set date = now(), quantity = " . $quantity . " where cartId =" . $cartId . " and productName='" . $productName . "' and attribute='" . $attribute . "';";

      $modifyResult = mysqli_query($link,$modifyQuery) or die(mysqli_error($link));

      echo "modified";
      return;
   }


   //BELOW IS ADD NEW ITEMS
   $countQuery = "select count(*) as count from CartProducts where cartId =" . $cartId ." and productName='" . $productName . "' and attribute = '" . $attribute ."';" ;

   $countResult = mysqli_query($link,$countQuery) or die(mysqli_error($link));

   while($row = mysqli_fetch_array($countResult)) {
      $finalCount = "$row[count]";
   }

   if($finalCount == 0){
      $followUp = "INSERT into CartProducts (cartId,date,productName,photo,folder,type,attribute,quantity,thumbnail,price) values (" . $cartId . ",now(), '" . $productName . "','" . $photo. "','" .$folder . "','" . $type."','" . $attribute . "'," . $quantity . ",'" .$thumbnail . "'," . $price .   ");";

      echo "new item added";
   }  
   else{
      $followUp = "update CartProducts set date = now(), quantity = quantity + " . $quantity . " where cartId =" . $cartId . " and productName='" . $productName . "' and attribute='" . $attribute . "';";
      echo "item count incremented";
   }

   //Execute query
   $insert_result = mysqli_query($link,$followUp) or die(mysqli_error($link));
   
?>