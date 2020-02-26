<?php

if (!isset($_POST['SUBMIT']))
{
  echo "error; you need to submit the form!";
  exit;
}

$visitor_email = $_POST['EMAIL'];

//Validate first
if(empty($visitor_email)) 
{
    echo "Don't forget to enter your email";
    exit;
}

if(IsInjected($visitor_email))
{
    echo "What do you think you're doing?";
    exit;
}


// Start of Mailchimp Stuff

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://us16.api.mailchimp.com/3.0/');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

curl_setopt($ch, CURLOPT_USERPWD, 'key' . ':' . '<ae9f0447b8f744b44528d2bc798b2cd9-us16>');

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);

// End of Mailchimp Stuff


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 