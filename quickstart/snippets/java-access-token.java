HttpResponse<String> response = Unirest.post("%AUTH0_DOMAIN%/oauth/token")
  .header("content-type", "application/json")
  .body("{\"client_id\":\"%AUTH0_CLIENT_ID%\",\"client_secret\":\"%AUTH0_CLIENT_SECRET%\",\"audience\":\"%AUTH0_AUDIENCE%\",\"grant_type\":\"%AUTH0_GRANT_TYPE%\"}")
  .asString();
