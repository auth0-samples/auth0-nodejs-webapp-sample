// Request access token from Auth0
var client = new RestClient($"https://%AUTH0_DOMAIN%/oauth/token");
var request = new RestRequest(Method.POST);
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", $"{{\"client_id\":\"%AUTH0_CLIENT_ID%\",\"client_secret\":\"{Environment.GetEnvironmentVariable("AUTH0_CLIENT_SECRET")}\",\"audience\":\"%AUTH0_AUDIENCE%\",\"grant_type\":\"%AUTH0_GRANT_TYPE%\"}}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
var tokenResponse = JsonConvert.DeserializeObject<dynamic>(response.Content);
string accessToken = tokenResponse.access_token;

// Make API request using the access token
var apiClient = new RestClient("%API_ENDPOINT%");
var apiRequest = new RestRequest(Method.GET);
apiRequest.AddHeader("authorization", $"Bearer {accessToken}");
IRestResponse apiResponse = apiClient.Execute(apiRequest);

Console.WriteLine("Response: " + apiResponse.Content);
