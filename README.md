# USC ESPORTS - VALORANT DATA TRACKER
[IN DEVELOPMENT!]

## Introduction
This is a web app built with React and Express.js for the University of Southern California Valorant teams to display their stats, including: 
- peak rank
- KDR & ADR
- best agents
- best weapons

The app uses [HenrikDev's Valorant API](https://docs.henrikdev.xyz/valorant/general) to get player and match data.

## Workflow / File Structure
### Server
The back end is currently hosted on Render, at https://usc-valorant-stats.onrender.com/players. This is likely to change, however, as the server will sleep when inactive and can have a long load time.

`.env` - local file only, must include `REACT_APP_API_KEY=[YOUR API KEY]`.

`data.csv` - the only place the player information is changed by admins/team managers. makes changing/adding/removing players very easy.

`data.json` - automatically updates based on CSV changes and API changes.

`index.js` - the server. comments in the file explain the various functions.

### Client
The front end is hosted on Vercel, at https://usc-valorant-stats.vercel.app/.

`public/` - folder for the index.html, manifest, robots, and favicon.

`src/img` - folder for all media, including player headshots, agents, weapons, and rank icons.

`src/App.css` - the main CSS file, which is pretty empty right now.

`src/App.js` - the main web app file, which calls data from the backend and renders each of the players.

`src/index.js` - the root file that calls App to be rendered.

## Running Locally
### Server
1. run `npm install` in the root directory
2. run `node index.js` in `server/`

### Client
1. run `npm install` in `client/`
2. run `npm start` in `client/`

## To Do
### Server
1. Compute and analyze the rest of the data points (agents/weapons/kdr/adr)
2. Better handle rate limit issues (or reach out to API developers to resolve this issue)
3. Make API calls using PUUID instead of username and tag for security

### Client
4. Recreate the header/footer from the official USC esports website for cohesion
5. CSS. Yeah.

### Future Plans:
6. Add competition match results
7. Integrate this project into the official [USC esports website](https://www.usctrojanesports.com/)
8. Format for mobile viewing
