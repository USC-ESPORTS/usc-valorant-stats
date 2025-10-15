# USC ESPORTS - VALORANT DATA TRACKER
[IN DEVELOPMENT!]

## Introduction
This is a web app build with React and express for the University of Southern California Valorant teams to display their stats, including: 
- peak rank
- KDR & ADR
- best agents
- best weapons

The app uses [HenrikDev's Valorant API](https://docs.henrikdev.xyz/valorant/general) to get player and match data.

## Workflow / File Structure
### Client-Side
The front end is hosted on vercel, at https://usc-valorant-stats.vercel.app/.

`public/` - folder for the index.html, manifest, robots and favicon.

`src/img` - folder for all media, including player headshots, agents, weapons, and rank icons.

`src/App.css` - the main css file, which is pretty empty right now.

`src/App.js` - the main web app file, which calls data from the backend and renders each of the players.

`src/index.js` - the root file that calls App to be rendered.


### Server-Side
The back end is currently hosted on render, at https://usc-valorant-stats.onrender.com/players. This is likely to change, however, as the server will sleep when inactive and can have a long load time.

`.env` - local file only, must include `REACT_APP_API_KEY=[YOUR API KEY]`.

`data.csv` - where the player information is actually changed by admins.

`data.json` - automatically updates based on csv changes and API changes.

`index.js` - the server, ran locally with `node index.js`. comments in the file explain the various functions.


## To Do
### Back End:

1. Analyze and compute best/average data points
2. Better handle rate limit issues (or reach out to API developers to resolve this issue)

### Front End:

3. Rename all asset files (weapons & agents)
4. Recreate the header from the official USC esports website for cohesion
5. CSS. Yeah.

### Future:

6. Add API calls to user id instead of username and tag for security
7. Add competition match results
8. Integrate this smoothly into the official [USC esports website](https://www.usctrojanesports.com/)