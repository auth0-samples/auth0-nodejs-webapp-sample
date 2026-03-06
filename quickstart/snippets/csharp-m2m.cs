using Newtonsoft.Json;
using RestSharp;

// Request access token from Auth0
var auth0Domain = Environment.GetEnvironmentVariable("AUTH0_DOMAIN");
var clientId = Environment.GetEnvironmentVariable("AUTH0_CLIENT_ID");
var clientSecret = Environment.GetEnvironmentVariable("AUTH0_CLIENT_SECRET");
var audience = Environment.GetEnvironmentVariable("AUTH0_AUDIENCE");

var client = new RestClient($"https://{auth0Domain}/oauth/token");
var request = new RestRequest(Method.Post);
var tokenRequest = new
{
    client_id = clientId,
    client_secret = clientSecret,
    audience = audience,
    grant_type = "client_credentials"
};

request.AddJsonBody(tokenRequest);
RestResponse response = client.Execute(request);

if (!response.IsSuccessful)
{
    Console.Error.WriteLine("Error getting token: " + response.Content);
    return;
}

var tokenResponse = JsonConvert.DeserializeObject<dynamic>(response.Content);
string accessToken = tokenResponse.access_token;

// Make API request using the access token
var apiClient = new RestClient("%API_ENDPOINT%");
var apiRequest = new RestRequest(Method.Get);
apiRequest.AddHeader("authorization", $"Bearer {accessToken}");
RestResponse apiResponse = apiClient.Execute(apiRequest);

if (!apiResponse.IsSuccessful)
{
    Console.Error.WriteLine("Error calling API: " + apiResponse.Content);
    return;
}

Console.WriteLine("Response: " + apiResponse.Content);
