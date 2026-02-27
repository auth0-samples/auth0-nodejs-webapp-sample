require 'uri'
require 'net/http'

url = URI("%AUTH0_DOMAIN%/oauth/token")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/json'
request.body = "{\"client_id\":\"%AUTH0_CLIENT_ID%\",\"client_secret\":\"%AUTH0_CLIENT_SECRET%\",\"audience\":\"%AUTH0_AUDIENCE%\",\"grant_type\":\"%AUTH0_GRANT_TYPE%\"}"

response = http.request(request)
puts response.read_body
