# Ingular Discord BOT

A discord moderation bot made for Discord Hack Week

## Features

- Basic Moderation Commands such as mute, kick, ban, etc
- Strikes sytem that allows you to strike members and set up different penalties
- Text Scanning for toxic words (NSFW channels are ignored)
- Image Scanning for Inappropriate images (NSFW channels are ignored)
- Completely configurable

## See it in Action

To see the bot in action, you can:

- Join the Ingular discord server: https://discord.gg/u544ewH
- Add Ingular to your own server: https://discordapp.com/oauth2/authorize?client_id=592961140439646218&permissions=268446726&scope=bot

## Getting Started

- After adding the bot in your server, use `-conf show` to view the list of configurable settings.
- Use `-conf set <key> <value>` to configure settings to your own preferences.
- Use `-help` command for a full list of available commands

## Hosting the bot on your own server

- Create a bot on https://discordapp.com/developers
- Sign up on mongodb atlas or any other mongodb provider
- Create a new project on GCP and enable "Perspective API"
- Create an API Key for your GCP project
- Sign up on Sightengine
- Clone this repo
- Make sure you have NodeJS installed
- Set up these environment variables:
  ```
  NODE_ENV='production'
  DISCORD_BOT_TOKEN='YOUR_DISCORD_BOT_TOKEN_HERE'
  MONGO_CONNECTION_STRING='CONNECTION_STRING_PROVIDED_BY_MONGO_PROVIDER'
  GOOGLE_API_KEY='GCP_PROJECT_API_KEY'
  SIGHT_ENGINE_USER='SIGHT_ENGINE_USER_ID_HERE'
  SIGHT_ENGINE_SECRET='SIGHT_ENGINE_USER_SECRET_HERE'
  ```
- run `npm start`
- If you still have any problems setting up the bot, then we would recommend that you join the Ingular Discord Server (Listed above) and get in touch with us. We'll be more than happy to help you out

## Contributing

Refer to [contributing.md](docs/contributing.md) for contributing details
