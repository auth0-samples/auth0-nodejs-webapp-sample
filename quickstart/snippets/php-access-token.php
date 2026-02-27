$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "%AUTH0_DOMAIN%/oauth/token",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"client_id\":\"%AUTH0_CLIENT_ID%\",\"client_secret\":\"%AUTH0_CLIENT_SECRET%\",\"audience\":\"%AUTH0_AUDIENCE%\",\"grant_type\":\"%AUTH0_GRANT_TYPE%\"}",
  CURLOPT_HTTPHEADER => array(
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
