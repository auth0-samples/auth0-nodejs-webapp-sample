async function fetchData() {
  try {
    const response = await fetch("%API_ENDPOINT%", {
      method: "GET",
      headers: {
        authorization: "Bearer %ACCESS_TOKEN%",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
