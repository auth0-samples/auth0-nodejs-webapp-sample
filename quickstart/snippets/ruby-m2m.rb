require 'uri'
require 'net/http'
require 'json'

# Request access token from Auth0
url = URI("%AUTH0_DOMAIN%/oauth/token")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/json'
request.body = {
  client_id: "%AUTH0_CLIENT_ID%",
  client_secret: ENV['AUTH0_CLIENT_SECRET'],
  audience: "%AUTH0_AUDIENCE%",
  grant_type: "%AUTH0_GRANT_TYPE%"
}.to_json

response = http.request(request)
tokenResponse = JSON.parse(response.read_body)
accessToken = tokenResponse['access_token']

# Make API request using the access token
apiUrl = URI("%API_ENDPOINT%")
apiHttp = Net::HTTP.new(apiUrl.host, apiUrl.port)
apiRequest = Net::HTTP::Get.new(apiUrl)
apiRequest["authorization"] = "Bearer #{accessToken}"
apiResponse = apiHttp.request(apiRequest)
puts "Response: #{apiResponse.read_body}"
