async function getToken() {
  try {
    const response = await fetch("%AUTH0_DOMAIN%/oauth/token", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: "%AUTH0_CLIENT_ID%",
        client_secret: "%AUTH0_CLIENT_SECRET%",
        audience: "%AUTH0_AUDIENCE%",
        grant_type: "%AUTH0_GRANT_TYPE%",
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}
