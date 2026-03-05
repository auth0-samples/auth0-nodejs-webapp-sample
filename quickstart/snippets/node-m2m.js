async function getTokenAndFetchData() {
  try {
    // Request access token from Auth0
    const response = await fetch("%AUTH0_DOMAIN%/oauth/token", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: "%AUTH0_CLIENT_ID%",
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: "%AUTH0_AUDIENCE%",
        grant_type: "client_credentials",
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const tokenData = await response.json();
    const accessToken = tokenData.access_token;

    // Make API request using the access token
    const apiResponse = await fetch("%API_ENDPOINT%", {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (!apiResponse.ok) {
      throw new Error("API request failed");
    }

    const apiData = await apiResponse.json();
    console.log("Response:", apiData);
  } catch (error) {
    console.error("Error:", error);
  }
}
