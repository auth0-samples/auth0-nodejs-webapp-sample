var client = new RestClient("%API_ENDPOINT%");
var request = new RestRequest(Method.GET);
request.AddHeader("authorization", "Bearer %ACCESS_TOKEN%");
IRestResponse response = client.Execute(request);
