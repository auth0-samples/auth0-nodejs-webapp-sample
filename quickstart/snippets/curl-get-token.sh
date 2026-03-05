curl --request POST \
  --url https://%AUTH0_DOMAIN%/oauth/token \
  --header 'content-type: application/json' \
  --data '{
    "client_id":"%AUTH0_CLIENT_ID%",
    "client_secret":"%AUTH0_CLIENT_SECRET%",
    "audience":"%AUTH0_AUDIENCE%",
    "grant_type":"client_credentials"
  }'
