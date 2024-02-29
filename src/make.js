const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const PORT = 3000;

const make = express();
make.use(cors());

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

const csspath = path.join(__dirname,'../public/css');
const jspath = path.join(__dirname,'../public/js');

make.use('/css', express.static(csspath));
make.use('/js', express.static(jspath));
make.set('view engine', 'hbs');

// make.get('/', async ( req, res )=>{
//     try {
//         const ani = `https://aniwatch-api-v1-0.onrender.com/api/parse`;
//     const anireq = await axios.get(ani, {
//         headers:{
//             'User-Agent': USER_AGENT,
//         }
//     });
//     const anires = anireq.data;

//     //console.log(anires);

    
//     const page = req.params.id || 1;
//     const sublink = `https://x-api-kt9y.onrender.com/api/ant/${page}`;
//     const reqnew = await axios.get(sublink, {
//         headers: {
//             'User-Agent': USER_AGENT,
//         }
//     });
//     const resnew = reqnew.data;

//     res.status(200).render("index", { anires, resnew});
//     } catch (error) {
//         console.log('error',error);
//     }
// })

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
    const sub12 = req.params.s;
    const dub12 = req.params.dub;

    res.status(200).render("net", { imwbres, sub12, dub12});
    } catch (error) {
        console.log('errorr',error);
    }
})

make.get('/watc/:id/:r/:t/:d/:dub', async ( req, res )=>{
    try {
        const watcid = req.params.id;
        const watcr = (req.params.r).split('current-')[1];
        const watct = (req.params.t).split('sub-')[1];
        const watcv = (req.params.d).split('dub-')[1];
        const gw = [];
        for( var i = 1; i <= watct; i++){
            var epnu = `${watcid}`;
            var epid = i;
            gw.push({ epnu, epid, watct});
        }
        res.status(200).render("watch", { gw, watcid, watcr, watct, watcv});
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


make.listen(PORT, '0.0.0.0', ()=>{
    console.log('the live', PORT);
})
