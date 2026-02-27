package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "%AUTH0_DOMAIN%/oauth/token"

  payload := strings.NewReader("{\"client_id\":\"%AUTH0_CLIENT_ID%\",\"client_secret\":\"%AUTH0_CLIENT_SECRET%\",\"audience\":\"%AUTH0_AUDIENCE%\",\"grant_type\":\"%AUTH0_GRANT_TYPE%\"}")

  req, _ := http.NewRequest("POST", url, payload)

  req.Header.Add("content-type", "application/json")

  res, _ := http.DefaultClient.Do(req)

  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
