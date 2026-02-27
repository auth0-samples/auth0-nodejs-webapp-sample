var client = new RestClient($"https://%AUTH0_DOMAIN%/oauth/token");
var request = new RestRequest(Method.POST);
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", $"{{\"client_id\":\"%AUTH0_CLIENT_ID%\",\"client_secret\":\"%AUTH0_CLIENT_SECRET%\",\"audience\":\"%AUTH0_AUDIENCE%\",\"grant_type\":\"%AUTH0_GRANT_TYPE%\"}}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
