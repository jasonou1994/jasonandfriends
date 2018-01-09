<?php

require_once __DIR__.'/vendor/autoload.php';

$contents = $_GET['contents'];
$email = $_GET['email'];
$name = $_GET['name'];
$subject = $_GET['subject'];

putenv('GOOGLE_APPLICATION_CREDENTIALS=./keys/jasonandfriends-88cd60770572.json');


$client = new Google_Client();
$client->useApplicationDefaultCredentials();
$client->addScope("https://mail.google.com/");
$client->setSubject('jason@jasonandfriends.net');


$service = new Google_Service_Gmail($client);

$user = 'jason@jasonandfriends.net';
$strRawMessage = "From: jasonandfriends<jason@jasonandfriends.net>\r\n";
$strRawMessage .= "To: " . $name . "<" . $email . ">\r\n";
$strRawMessage .= 'Subject: =?utf-8?B?' . base64_encode($subject) . "?=\r\n";
$strRawMessage .= "MIME-Version: 1.0\r\n";
$strRawMessage .= "Content-Type: text/html; charset=utf-8\r\n";
$strRawMessage .= 'Content-Transfer-Encoding: quoted-printable' . "\r\n\r\n";
$strRawMessage .= $contents . "\r\n";
// The message needs to be encoded in Base64URL
$mime = rtrim(strtr(base64_encode($strRawMessage), '+/', '-_'), '=');
$msg = new Google_Service_Gmail_Message();
$msg->setRaw($mime);
//The special value **me** can be used to indicate the authenticated user.
$service->users_messages->send($user, $msg);