// Request access token from Auth0
HttpResponse<String> response = Unirest.post("%AUTH0_DOMAIN%/oauth/token")
  .header("content-type", "application/json")
  .body("{\"client_id\":\"%AUTH0_CLIENT_ID%\",\"client_secret\":\"" + System.getenv("AUTH0_CLIENT_SECRET") + "\",\"audience\":\"%AUTH0_AUDIENCE%\",\"grant_type\":\"client_credentials\"}")
  .asString();

JSONObject tokenResponse = new JSONObject(response.getBody());
String accessToken = tokenResponse.getString("access_token");

// Make API request using the access token
HttpResponse<String> apiResponse = Unirest.get("%API_ENDPOINT%")
  .header("authorization", "Bearer " + accessToken)
  .asString();

System.out.println("Response: " + apiResponse.getBody());
