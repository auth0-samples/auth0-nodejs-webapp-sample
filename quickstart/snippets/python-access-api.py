import http.client
conn = http.client.HTTPConnection("%API_ENDPOINT%")
headers = { 'authorization': "Bearer %ACCESS_TOKEN%" }
conn.request("GET", "/", headers=headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))
