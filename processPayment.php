<?php

 $nonce = $_GET['nonce'];
 $amount = $_GET['price'];

 require_once './mashape/unirest-php/src/Unirest.php';

 $accessToken = "sq0atp-InSyXXVWqjUZ6iaQPuiy9g";

 $headers = array('Accept' => 'application/json', 'Authorization' => 'Bearer '. $accessToken);

 $response = Unirest\Request::get('https://connect.squareup.com/v2/locations',$headers);

 echo $response->code;
 echo "\n";
 echo $response->headers;
 echo "\n";
 

 $locationId = $response->body->locations[0]->id;
 echo $locationId;


 $headers = array('Accept' => 'application/json', 'Authorization' => 'Bearer '. $accessToken, 'Content-Type' => 'application/json');

 $parameters = array(
 	'card_nonce' => $nonce,
 	'amount_money' => array(
 		'amount' => (int)$amount,
 		'currency' => 'USD'
 		),
 	'idempotency_key' => uniqid()
    );

 $body = Unirest\Request\Body::json($parameters);

 $response = Unirest\Request::post('https://connect.squareup.com/v2/locations/' . $locationId . '/transactions',$headers,$body);

 echo "<pre>";
 echo var_dump($response);
 echo "</pre>";

?>

