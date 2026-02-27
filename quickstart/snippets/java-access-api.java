HttpResponse<String> response = Unirest.get("%API_ENDPOINT%")
  .header("authorization", "Bearer %ACCESS_TOKEN%")
  .asString();
