#!/bin/bash

# Get access token from Auth0
RESPONSE=$(curl --request POST \
  --url "https://${AUTH0_DOMAIN}/oauth/token" \
  --header 'content-type: application/json' \
  --data "{
    \"client_id\":\"${AUTH0_CLIENT_ID}\",
    \"client_secret\":\"${AUTH0_CLIENT_SECRET}\",
    \"audience\":\"${AUTH0_AUDIENCE}\",
    \"grant_type\":\"client_credentials\"
  }")

# Extract access token from response
# Note: This snippet uses jq to parse the JSON response
ACCESS_TOKEN=$(echo "$RESPONSE" | jq -r '.access_token')

if [ -z "$ACCESS_TOKEN" ] || [ "$ACCESS_TOKEN" = "null" ]; then
  echo "Error: Failed to get access token. Response: $RESPONSE" >&2
  exit 1
fi

# Use the access token in the API request
curl --request GET \
    --url %API_ENDPOINT% \
    --header "authorization: Bearer ${ACCESS_TOKEN}"
