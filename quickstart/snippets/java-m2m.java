import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import org.json.JSONObject;

public class M2M {
  public static void main(String[] args) {

    // Request access token from Auth0
    JSONObject tokenRequestBody = new JSONObject()
      .put("client_id", System.getenv("AUTH0_CLIENT_ID"))
      .put("client_secret", System.getenv("AUTH0_CLIENT_SECRET"))
      .put("audience", System.getenv("AUTH0_AUDIENCE"))
      .put("grant_type", "client_credentials");

    HttpResponse<String> response = Unirest.post("https://" + System.getenv("AUTH0_DOMAIN") + "/oauth/token")
      .header("content-type", "application/json")
      .body(tokenRequestBody.toString())
      .asString();

    if (response.getStatus() != 200) {
      System.err.println("Error getting token: " + response.getBody());
      return;
    }

    String accessToken = new JSONObject(response.getBody()).getString("access_token");

    // Make API request using the access token
    HttpResponse<String> apiResponse = Unirest.get("%API_ENDPOINT%")
      .header("authorization", "Bearer " + accessToken)
      .asString();

    if (apiResponse.getStatus() != 200) {
      System.err.println("Error calling API: " + apiResponse.getBody());
      return;
    }

    System.out.println("Response: " + apiResponse.getBody());
  }
}
