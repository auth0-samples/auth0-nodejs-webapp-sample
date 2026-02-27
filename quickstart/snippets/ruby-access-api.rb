require 'uri'
require 'net/http'
url = URI("%API_ENDPOINT%")
http = Net::HTTP.new(url.host, url.port)
request = Net::HTTP::Get.new(url)
request["authorization"] = 'Bearer %ACCESS_TOKEN%'
response = http.request(request)
puts response.read_body
