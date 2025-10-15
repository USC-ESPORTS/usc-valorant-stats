import React from "react";
import './App.css';

// TODO rename all files to match character/weapon names
// TODO update readme with more information
// TODO update favicon

const Player = (props) => {
    // TODO make pretty later...
    if(props.data.peakrank === "") props.data.peakrank = "Radiant"
    return (
        <div className="cell" key={props.id}>
            
            <img src="https://images.squarespace-cdn.com/content/v1/5f4562a9064e4d05292cb158/7db24f5a-87b0-4196-b2c4-c3d1ad81f2e0/placeholder-updated.png?format=2500w" width={"100%"} alt="placeholder"/>
            {props.data.name} <br />
            AKA {props.data.username} <br />
            peak rank: {props.data.peakrank} <br />
            <img src={require(`./img/rank/${props.data.peakrank.replace(" ", "_")}.png`)} alt = {props.data.peakrank}/> <br />
            agents: {props.data.agents} <br />
            weapons: {props.data.weapons} <br />
            kdr: {props.data.kdr} <br />
            adr: {props.data.adr} <br />
        </div>
    )
}

const Header = (props) => {
    //TODO recreate the website's header with all official links and icons
    return (
        <div class="header-display-desktop" data-content-field="site-title">
            <div class="header-title-nav-wrapper">
                <div class="header-title" data-animation-role="header-element">
                    <div class="header-title-logo">
                        <a href="/" data-animation-role="header-element">
                            <img elementtiming="nbf-header-logo-desktop" src="//images.squarespace-cdn.com/content/v1/5f4562a9064e4d05292cb158/689aca29-3e74-4b8a-a271-f8eb11ce60b9/USC_Esports_Transparent.png?format=1500w" alt="USC Esports" style = {{display: 'block'}} fetchpriority="high" loading="eager" decoding="async" data-loader="raw"/>
                        </a>
                    </div>
                </div>
                <div class="header-nav">
                    <div class="header-nav-wrapper">
                        <nav class="header-nav-list">
                            <div class="header-nav-item header-nav-item--collection header-nav-item--active header-nav-item--homepage">
                                <a href="https://www.usctrojanesports.com/" data-animation-role="header-element" aria-current="page">
                                    Home
                                </a>
                            </div>
                            <div class="header-nav-item header-nav-item--collection">
                                <a href="https://www.usctrojanesports.com/about" data-animation-role="header-element">
                                    About
                                </a>
                            </div>
                            <div class="header-nav-item header-nav-item--collection">
                                <a href="https://www.usctrojanesports.com/schedule" data-animation-role="header-element">
                                    Schedule
                                </a>
                            </div>
                            <div class="header-nav-item header-nav-item--folder">
                                <a class="header-nav-folder-title" href="/teams-1" data-animation-role="header-element" aria-expanded="false" aria-label="folder dropdown" aria-controls="teams">
                                    <span class="header-nav-folder-title-text">
                                        Teams
                                    </span>
                                </a>
                                <div class="header-nav-folder-content" id="teams">
                                    <div class="header-nav-folder-item">
                                        <a href="https://www.usctrojanesports.com/teams/lol">
                                            <span class="header-nav-folder-item-content">
                                                League of Legends
                                            </span>
                                        </a>
                                    </div>
                                    <div class="header-nav-folder-item">
                                        <a href="https://www.usctrojanesports.com/teams/overwatch">
                                            <span class="header-nav-folder-item-content">
                                                Overwatch
                                            </span>
                                        </a>
                                    </div>
                                    <div class="header-nav-folder-item">
                                        <a href="https://www.usctrojanesports.com/valorant">
                                            <span class="header-nav-folder-item-content">
                                                Valorant
                                            </span>
                                        </a>
                                    </div>
                                    <div class="header-nav-folder-item">
                                        <a href="https://www.usctrojanesports.com/teams/marvel-rivals">
                                            <span class="header-nav-folder-item-content">
                                                Marvel Rivals
                                            </span>
                                        </a>
                                    </div>
                                    <div class="header-nav-folder-item">
                                        <a href="https://www.usctrojanesports.com/teams/ssbu">
                                            <span class="header-nav-folder-item-content">
                                                Smash Ultimate
                                            </span>
                                        </a>
                                    </div>
                                    <div class="header-nav-folder-item">
                                        <a href="https://www.usctrojanesports.com/teams/rl">
                                            <span class="header-nav-folder-item-content">
                                                Rocket League
                                            </span>
                                        </a>
                                    </div>
                                    <div class="header-nav-folder-item">
                                        <a href="https://www.usctrojanesports.com/teams/tetris">
                                            <span class="header-nav-folder-item-content">
                                                Tetris
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="header-nav-item header-nav-item--collection">
                                <a href="https://www.usctrojanesports.com/tryouts" data-animation-role="header-element">
                                    Tryouts
                                </a>
                            </div>
                            <div class="header-nav-item header-nav-item--collection">
                                <a href="https://www.usctrojanesports.com/staff" data-animation-role="header-element">
                                    Staff
                                </a>
                            </div>
                            <div class="header-nav-item header-nav-item--collection">
                                <a href="https://www.usctrojanesports.com/media" data-animation-role="header-element">
                                    Media
                                </a>
                            </div>
                            <div class="header-nav-item header-nav-item--collection">
                                <a href="https://www.usctrojanesports.com/sponsors" data-animation-role="header-element">
                                    Sponsors
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="header-actions header-actions--right">
                <div class="header-actions-action header-actions-action--social">
                    <a class="icon icon--fill  header-icon header-icon-border-shape-none header-icon-border-style-outline" href="https://twitter.com/uscesports" aria-label="Twitter">
                        <svg viewBox="23 23 64 64">
                            <use href="#twitter-unauth-icon" width="110" height="110"></use>
                        </svg>
                    </a>
                    <a class="icon icon--fill  header-icon header-icon-border-shape-none header-icon-border-style-outline" href="https://www.instagram.com/uscesports/" aria-label="Instagram">
                        <svg viewBox="23 23 64 64">
                            <use href="#instagram-unauth-icon" width="110" height="110"></use>
                        </svg>
                    </a>
                    <a class="icon icon--fill  header-icon header-icon-border-shape-none header-icon-border-style-outline" href="https://www.twitch.tv/uscesports" aria-label="Twitch">
                        <svg viewBox="23 23 64 64">
                            <use href="#twitch-icon" width="110" height="110"></use>
                        </svg>
                    </a>
                </div>
                <div class="header-actions-action header-actions-action--cta" data-animation-role="header-element">
                    <a class="btn btn--border theme-btn--primary-inverse sqs-button-element--primary" href="https://discord.gg/Fn8S9sEUcm">
                        Discord
                    </a>
                </div>
            </div>
            <div class="header-burger menu-overlay-has-visible-non-navigation-items" data-animation-role="header-element">
                <button class="header-burger-btn burger" data-test="header-burger">
                    <span class="js-header-burger-open-title visually-hidden">Open Menu</span>
                    <span hidden="" class="js-header-burger-close-title visually-hidden">Close Menu</span>
                    <div class="burger-box">
                        <div class="burger-inner header-menu-icon-doubleLineHamburger">
                            <div class="top-bun"></div>
                            <div class="patty"></div>
                            <div class="bottom-bun"></div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

const App = () => {
    const [data, setData] = React.useState([]);
    // pull data from server on page load
    React.useEffect(() => {
        fetch("https://usc-valorant-stats.onrender.com/players") // http://localhost:3001/players
            .then(res => res.json())
            .then(json => setData(json.players));
    }, []);

    // TODO make pretty
    return (
        <div className="container">
            <div style={{display: "none"}}>
                <Header/>
            </div>
            Varsity
            <div className="grid">
                {
                    data.map((dat, i) => { if(dat.team === "c-v") { 
                        return (<Player key={i} id={i} data={dat} />) 
                    } else { 
                        return("") 
                    }})
                }
            </div>
            Junior Varsity
            <div className="grid">
                {
                    data.map((dat, i) => { if(dat.team === "g-jv") { 
                        return (<Player key={i} id={i} data={dat} />) 
                    } else { 
                        return("") 
                    }})
                }
            </div>
            Academy
            <div className="grid">
                {
                    data.map((dat, i) => { if(dat.team === "w-a") { 
                        return (<Player key={i} id={i} data={dat} />) 
                    } else { 
                        return("") 
                    }})
                }
            </div>
        </div>
    );
}

export default App;
