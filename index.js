const cors = require("cors");
const express = require('express')
const app = express()
const twitterGetUrl = require("twitter-url-direct")
const getFBInfo = require("fb-downloader");
const instagramGetUrl = require("instagram-url-direct");
const axios = require("axios")
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { url } = req.query
    const get = `https://keepsaveit.com/api?api_key=7F81Ih4wvsZgCJLC9me8bEZBgIyhWVWT02wJezd1xuw8jLTcnd&url=${url}`
    axios.get(get).then((e) => {
        res.send(e.data)
    })
})

app.get("/twitter", async (req, res) => {
res.header("Access-Control-Allow-Origin", "*");
    const { url } = req.query
    let response = await twitterGetUrl(`${url}`)
    res.send(response)
})

app.get("/fb", async (req, res) => {
res.header("Access-Control-Allow-Origin", "*");
    const { url } = req.query;
    try {
        const response = await getFBInfo(url);
        res.json({ found: true, download: response });
    } catch (error) {
        res.json({ found: false, error: "Invalid URL" });
    }

})
app.get("/insta", async (req, res) => {
res.header("Access-Control-Allow-Origin", "*");
    const { url } = req.query;
    try {
        const response = await instagramGetUrl(url);
        if (response.results_number < 1) throw new Error("Invalid URL");
        res.json({ found: true, download: response });
    } catch (error) {
        res.json({ found: false, error: "Invalid URL" });
    }
});

const Port = process.env.PORT
app.listen(Port)
