import http.client

conn = http.client.HTTPSConnection("%AUTH0_DOMAIN%")

payload = "{\"client_id\":\"%AUTH0_CLIENT_ID%\",\"client_secret\":\"%AUTH0_CLIENT_SECRET%\",\"audience\":\"%AUTH0_AUDIENCE%\",\"grant_type\":\"%AUTH0_GRANT_TYPE%\"}"

headers = { 'content-type': "application/json" }

conn.request("POST", "/oauth/token", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
