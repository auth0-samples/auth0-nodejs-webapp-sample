import http.client
import json
import os

# Request access token from Auth0
conn = http.client.HTTPSConnection("%AUTH0_DOMAIN%")

payload = json.dumps({
    "client_id": "%AUTH0_CLIENT_ID%",
    "client_secret": os.getenv("AUTH0_CLIENT_SECRET"),
    "audience": "%AUTH0_AUDIENCE%",
    "grant_type": "client_credentials"
})

headers = { 'content-type': "application/json" }

conn.request("POST", "/oauth/token", payload, headers)

res = conn.getresponse()
data = res.read()

tokenResponse = json.loads(data.decode("utf-8"))
accessToken = tokenResponse['access_token']

# Make API request using the access token
apiConn = http.client.HTTPConnection("%API_ENDPOINT%")
apiHeaders = { 'authorization': "Bearer " + accessToken }
apiConn.request("GET", "/", headers=apiHeaders)
apiRes = apiConn.getresponse()
apiData = apiRes.read()
print("Response:", apiData.decode("utf-8"))
