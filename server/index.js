const express = require("express");
const fs = require("fs")
require('dotenv').config();
const parse = require('csv-parse');

const PORT = process.env.PORT || 3001;
const app = express();

// load in the initial csv file (for easily updating or adding new players when necessary)
// parse the players as objects and create a json data file
// and finally call update on it so it populates with all of the API data
let data = []
fs.readFile(
    "data.csv",
    (err, csvdata) => {
        if (err) {
            console.error('error reading initial csv file:', err);
            return;
        }
        parse.parse(
            csvdata, { columns: true }, (err, jsondata) => {
                if (err) {
                    console.error('Error parsing CSV:', err);
                    return;
                }
                var players = [];
                for (var i = 0; i < jsondata.length; i++) {
                    const player = {
                        "name": jsondata[i].name,
                        "team": jsondata[i].team,
                        "region": jsondata[i].region,
                        "username": jsondata[i].username,
                        "tag": jsondata[i].tag,
                        "peakrank": "",
                        "agents": [],
                        "kdr": 0,
                        "adr": 0
                    }
                    players.push(player)
                }
                const asString = "{\"players\":" + JSON.stringify(players) + "}";
                data = JSON.parse(asString);
                update();
            }
        );
    }
);

// to avoid getting rate-limited
const delay = ms => new Promise(res => setTimeout(res, ms));

// get time to midnight so it always runs then
const now = new Date();
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
const timeToMidnight = midnight.getTime() - now.getTime();
setTimeout(() => {
    update();
    setInterval(update, 24 * 60 * 60 * 1000); // 24 hr interval
}, timeToMidnight); // start first run at midnight

// the function that runs once a day, pulling from official APIs to update stats for the players
const update = async () => {
    if (data.players) {
        console.log("running daily update at:", new Date());
        // for each player, try to fetch all urls and compute updated data
        for (var i = 0; i < data.players.length; i++) {
            const region = data.players[i].region
            var username = encodeURIComponent(data.players[i].username);
            const tag = encodeURIComponent(data.players[i].tag);

            // 1. account information for peak rank & rank icon
            try {
                const response = await fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${username}/${tag}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `${process.env.REACT_APP_API_KEY}`,
                        "Accept": "*/*"
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const account_data = await response.json();

                data.players[i].peakrank = account_data.data.highest_rank.patched_tier
                console.log(data.players[i].peakrank + " " + data.players[i].username)
                await delay(5000); //wait 5 seconds to not get rate-limited
            } catch (error) {
                console.error('[ERROR]: ', error);
                return;
            }

            // TODO 2. basic match info for agents, kdr, and adr (& maybe weapons too?)
            // try {
            //     const response = await fetch(`https://api.henrikdev.xyz/valorant/v1/stored-matches/${region}/${username}/${tag}`, {
            //         method: 'GET',
            //         headers: {
            //             "Authorization": `${process.env.REACT_APP_API_KEY}`,
            //             "Accept": "*/*"
            //         }
            //     });
            //     if (!response.ok) {
            //         throw new Error(`HTTP error! status: ${response.status}`);
            //     }
            //     const stored_match_data = await response.json();
            //     console.log(stored_match_data)
            //     await delay(5000);
            // } catch (error) {
            //     console.error('[ERROR]: ', error);
            //     return;
            // }
        }
        console.log("complete");
    }
}

// TODO delete localhost before deployment
const allowedOrigins = [
    'http://localhost:3000',
    'https://usc-valorant-stats.vercel.app/'
];

// restrict use of this server data to only known sites
app.use((req, res, next) => {

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// how the react site (or any approved site) communicates with the server
app.get("/players", (req, res) => {
    const players = data.players;
    res.send({ players });
});

// run the server so it can listen for requests
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});