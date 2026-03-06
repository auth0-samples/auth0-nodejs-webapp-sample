<?php

// Request access token from Auth0
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://" . getenv("AUTH0_DOMAIN") . "/oauth/token",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode(array(
    "client_id" => getenv("AUTH0_CLIENT_ID"),
    "client_secret" => getenv("AUTH0_CLIENT_SECRET"),
    "audience" => getenv("AUTH0_AUDIENCE"),
    "grant_type" => "client_credentials"
  )),
  CURLOPT_HTTPHEADER => array(
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if ($err) {
  fwrite(STDERR, "cURL Error: " . $err . "\n");
} elseif ($httpCode !== 200) {
  fwrite(STDERR, "Error getting token: HTTP " . $httpCode . " - " . $response . "\n");
} else {
  $accessToken = json_decode($response, true)['access_token'];

  // Make API request using the access token
  $apiCurl = curl_init();
  curl_setopt_array($apiCurl, array(
    CURLOPT_URL => "%API_ENDPOINT%",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "authorization: Bearer " . $accessToken
    ),
  ));
  $apiResponse = curl_exec($apiCurl);
  $apiErr = curl_error($apiCurl);
  $apiHttpCode = curl_getinfo($apiCurl, CURLINFO_HTTP_CODE);
  curl_close($apiCurl);

  if ($apiErr) {
    fwrite(STDERR, "cURL Error: " . $apiErr . "\n");
  } elseif ($apiHttpCode !== 200) {
    fwrite(STDERR, "Error calling API: HTTP " . $apiHttpCode . " - " . $apiResponse . "\n");
  } else {
    echo "Response: " . $apiResponse;
  }
}
