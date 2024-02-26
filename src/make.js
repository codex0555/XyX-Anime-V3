const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const PORT = 5000;

const make = express();
make.use(cors());

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

const csspath = path.join(__dirname,'../public/css');
const jspath = path.join(__dirname,'../public/js');

make.use('/css', express.static(csspath));
make.use('/js', express.static(jspath));
make.set('view engine', 'hbs');

make.get('/', async ( req, res )=>{
    try {
        const ani = `https://aniwatch-api-v1-0.onrender.com/api/parse`;
    const anireq = await axios.get(ani, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const anires = anireq.data;

    //console.log(anires);

    
    const page = req.params.id || 1;
    const sublink = `https://x-api-kt9y.onrender.com/api/ant/${page}`;
    const reqnew = await axios.get(sublink, {
        headers: {
            'User-Agent': USER_AGENT,
        }
    });
    const resnew = reqnew.data;

    res.status(200).render("index", { anires, resnew});
    } catch (error) {
        console.log('error',error);
    }
})

make.get('/view/:id/:s/:dub', async ( req, res )=>{
    try {
    const aniid = req.params.id;
    const anilink = `https://x-api-kt9y.onrender.com/api/view/${aniid}`;
    const imwbreq = await axios.get(anilink, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const imwbres = imwbreq.data;

    res.status(200).render("net", { imwbres});
    } catch (error) {
        console.log('errorr',error);
    }
})

make.get('/watc/:id/:r/:t', async ( req, res )=>{
    try {
        const watcid = req.params.id;
        const watcr = req.params.r;
        const watct = req.params.t;
        const gw = [];
        for( var i = 1; i <= watct; i++){
            var epnu = `${watcid}`;
            var epid = i;
            gw.push({ epnu, epid, watct});
        }
        res.status(200).render("watch", { gw, watcid, watcr});
    } catch (error) {
        console.log('error',error)
    }
})

make.get('/v1/search', async ( req, res )=>{
    try {
        const key = req.query.q;
    const selink = `https://x-api-kt9y.onrender.com/api/sit/${key}`;
    const sereq = await axios.get(selink, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const seres = sereq.data;

    res.status(200).render("search_query", { seres});
    } catch (error) {
        console.log('errorrrr',error);
    }
})


make.listen(PORT, ()=>{
    console.log('the live', PORT);
})
