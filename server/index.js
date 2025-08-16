const express = require("express");
const { title } = require("process");

const app = express()
const port = 5500

app.use(require("cors")());

const games = require("./games.json");
const sections = require("./sections.json")


// log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// serve static files from the root directory
app.use(express.static(require('path').join(__dirname, '../')));

// all games
app.get("/server/games", (req, res) => {
    res.json(games)
})


// game by id
app.get("/server/game/:id", (req, res) => {
    const gameId = req.params.id;
    const game = games.find(g => g.id === gameId);

    res.json(game);
});

// games by tag
app.get("/server/tag/:tag", (req, res) => {
    const tagParam = req.params.tag.toLowerCase();
    const taggedGames = games.filter(game =>
        game.tags.some(tag => tag.toLowerCase() === tagParam)
    );

    res.json(taggedGames);
});

// popular games
app.get("/server/popular", (req, res) => {
    const popularGames = games.filter(game => sections.popular.includes(game.id));
    res.json(popularGames);
});

// new games
app.get("/server/new", (req, res) => {
    const newGames = games.filter(game => sections.new.includes(game.id));
    res.json(newGames);
});

// popular tags
app.get("/server/popularTags", (req, res) => {
    const tagCounts = {};

    // Count each tag
    games.forEach(game => {
        game.tags.forEach(tag => {
            const key = tag.toLowerCase();
            tagCounts[key] = (tagCounts[key] || 0) + 1;
        });
    });

    // Sort tags by frequency and return just the tag strings
    const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([tag]) => tag)
        .slice(0, 15);

    res.json(sortedTags);
});


// all game ids
app.get("/server/ids", (req, res) => {
    let ids = []
    for (let i = 0; i < games.length; i++) {
        ids.push(games[i].id)
    }
    res.json(ids)
})


// game search
app.get("/server/search/:query", (req, res) => {
    const query = req.params.query.toLowerCase();

    // Filter the games array
    const results = games.filter(game => {
        // Make sure tags is an array (just in case)
        const tags = Array.isArray(game.tags) ? game.tags.join(" ").toLowerCase() : "";

        return (
            game.title.toLowerCase().includes(query) ||
            game.description.toLowerCase().includes(query) ||
            tags.includes(query)
        );
    });

    res.json(results);
});


app.listen(port, () => {
  console.log(`Port ${port}`)
})