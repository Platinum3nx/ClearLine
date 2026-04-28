# API Versioning

Customer-facing notes on v1, v2, and deprecation headers.

`GET /public/versions` now returns a richer version catalog with both the default and recommended API versions, plus lifecycle metadata for each published route line.

Clients that only want active integrations can call `/public/versions?includeDeprecated=false` to exclude deprecated versions from setup flows and upgrade prompts.
