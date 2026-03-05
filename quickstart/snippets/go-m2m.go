package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
  "encoding/json"
  "os"
)

func main() {

  // Request access token from Auth0
  url := "%AUTH0_DOMAIN%/oauth/token"

  payloadData := map[string]string{
    "client_id":     "%AUTH0_CLIENT_ID%",
    "client_secret": os.Getenv("AUTH0_CLIENT_SECRET"),
    "audience":      "%AUTH0_AUDIENCE%",
    "grant_type":    "client_credentials",
  }
  payloadBytes, _ := json.Marshal(payloadData)
  payload := strings.NewReader(string(payloadBytes))

  req, _ := http.NewRequest("POST", url, payload)

  req.Header.Add("content-type", "application/json")

  res, _ := http.DefaultClient.Do(req)

  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  var result map[string]interface{}
  json.Unmarshal(body, &result)
  accessToken := result["access_token"].(string)

  // Make API request using the access token
  apiUrl := "%API_ENDPOINT%"
  apiReq, _ := http.NewRequest("GET", apiUrl, nil)
  apiReq.Header.Add("authorization", "Bearer " + accessToken)
  apiRes, _ := http.DefaultClient.Do(apiReq)
  defer apiRes.Body.Close()
  apiBody, _ := ioutil.ReadAll(apiRes.Body)
  fmt.Println("Response:", string(apiBody))
}
