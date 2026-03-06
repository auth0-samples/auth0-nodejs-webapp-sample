require 'uri'
require 'net/http'
require 'json'

# Request access token from Auth0
url = URI("https://#{ENV['AUTH0_DOMAIN']}/oauth/token")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/json'
request.body = {
  client_id: ENV['AUTH0_CLIENT_ID'],
  client_secret: ENV['AUTH0_CLIENT_SECRET'],
  audience: ENV['AUTH0_AUDIENCE'],
  grant_type: "client_credentials"
}.to_json

response = http.request(request)

unless response.is_a?(Net::HTTPSuccess)
  $stderr.puts "Error getting token: #{response.body}"
  exit 1
end

access_token = JSON.parse(response.read_body)['access_token']

# Make API request using the access token
api_url = URI("%API_ENDPOINT%")
api_http = Net::HTTP.new(api_url.host, api_url.port)
api_request = Net::HTTP::Get.new(api_url)
api_request["authorization"] = "Bearer #{access_token}"
api_response = api_http.request(api_request)

unless api_response.is_a?(Net::HTTPSuccess)
  $stderr.puts "Error calling API: #{api_response.body}"
  exit 1
end

puts "Response: #{api_response.read_body}"
