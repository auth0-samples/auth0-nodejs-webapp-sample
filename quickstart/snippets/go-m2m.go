package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "io"
  "log"
  "net/http"
  "os"
)

func main() {

  // Request access token from Auth0
  url := "https://" + os.Getenv("AUTH0_DOMAIN") + "/oauth/token"

  payloadData := map[string]string{
    "client_id":     os.Getenv("AUTH0_CLIENT_ID"),
    "client_secret": os.Getenv("AUTH0_CLIENT_SECRET"),
    "audience":      os.Getenv("AUTH0_AUDIENCE"),
    "grant_type":    "client_credentials",
  }
  payloadBytes, _ := json.Marshal(payloadData)
  req, _ := http.NewRequest("POST", url, bytes.NewReader(payloadBytes))
  req.Header.Add("content-type", "application/json")

  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := io.ReadAll(res.Body)

  var result map[string]interface{}
  json.Unmarshal(body, &result)
  accessToken, ok := result["access_token"].(string)
  if !ok {
    log.Fatalf("Error getting token: %s", string(body))
  }

  // Make API request using the access token
  apiReq, _ := http.NewRequest("GET", "%API_ENDPOINT%", nil)
  apiReq.Header.Add("authorization", "Bearer "+accessToken)
  apiRes, _ := http.DefaultClient.Do(apiReq)
  defer apiRes.Body.Close()
  apiBody, _ := io.ReadAll(apiRes.Body)

  if apiRes.StatusCode != http.StatusOK {
    log.Fatalf("Error calling API: %s", string(apiBody))
  }

  fmt.Println("Response:", string(apiBody))
}
