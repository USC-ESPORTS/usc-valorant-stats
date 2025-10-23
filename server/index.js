const express = require("express");
const fs = require("fs")
require('dotenv').config();
const parse = require('csv-parse');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3001;

const cors = require("cors");
const app = express();
app.use(cors());

// load in the initial csv file (for easily updating or adding new players when necessary)
// parse the players as objects and create a json data file
// and finally call update on it so it populates with all of the API data
let data = []

fs.readFile(
    "data.csv",
    (err, csvfile) => {
        if (err) {
            console.error('error reading initial csv file:', err);
            return;
        }
        fs.readFile(
            "data.json",
            (err, jsonfile) => {
                if (err) {
                    console.error('error reading initial json file:', err);
                    jsonfile = { players: [] };
                }
                else {
                    try {
                        jsonfile = JSON.parse(jsonfile);
                    } catch {
                        jsonfile = { players: [] };
                    }
                }
                //checking if changes in csv file, if not then don't update the data file
                var changes = false;
                parse.parse(
                    csvfile, { columns: true }, (err, jsondata) => {
                        if (err) {
                            console.error('Error parsing CSV:', err);
                            return;
                        }
                        // new player was added to the csv, changes required to data.json
                        if (jsondata.length != jsonfile.players.length) { changes = true; }
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
                            //first check if potentially out of bounds, then if changes
                            if (jsonfile.players.length < jsondata.length
                                || player.name != jsonfile.players[i].name
                                || player.team != jsonfile.players[i].team
                                || player.region != jsonfile.players[i].region
                                || player.username != jsonfile.players[i].username
                                || player.tag != jsonfile.players[i].tag
                            ) { changes = true; }
                            players.push(player)
                        }
                        if (changes) {
                            console.log("changes made to csv file, saving new data.json");
                            const asString = "{\"players\":" + JSON.stringify(players) + "}";
                            data = JSON.parse(asString);
                            fs.writeFile(
                                "data.json",
                                JSON.stringify(data, null, 2),
                                (err) => { console.log("error with data.json file creation: " + err) });
                        } else {
                            console.log("no recent changes made to csv file");
                            data = jsonfile;
                        }
                        update();
                    }
                );
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
        console.log("running update at:", new Date());

        var changes = false;

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
                if (data.players[i].peakrank != account_data.data.highest_rank.patched_tier) { changes = true; }
                data.players[i].peakrank = account_data.data.highest_rank.patched_tier
                console.log(data.players[i].peakrank + " " + data.players[i].username)
                await delay(5000); //wait 5 seconds per pull to not get rate-limited
            } catch (error) {
                console.error('[ERROR]: ', error);
                return;
                // TODO properly handle potential errors (429 rate limit)
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
        //only push to github if changes to the data file
        if (changes) {
            console.log("changes were made to data.json from API calls");
            fs.writeFile(
                "data.json",
                JSON.stringify(data, null, 2),
                (err) => { console.log("error with data.json file creation: " + err) }
            );
            /*const commitMessage = `[AUTOCOMMIT] updates to data.json at ${ new Date() }`;
            const commands = [
                'git add data.json',
                `git commit -m "${commitMessage}"`,
                'git push origin main'
            ];
            exec(commands.join(' && '), (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return res.status(500).send(`Error pushing to Git: ${stderr}`);
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                console.log('Successfully pushed to Git!');
            });*/ // TODO fix github push permissiond
        } else {
            console.log("no changes were made to data.json from API calls");
        }
        console.log("update complete");
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