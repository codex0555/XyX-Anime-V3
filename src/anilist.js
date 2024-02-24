const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');
const getJWPlayerSrc = require('./recommendation-app.js');

const PORT = 3001;

const anilist = express();
anilist.use(cors());

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

anilist.get('/net/:id', async ( req, res )=>{
    try {
        const aniid = req.params.id;
    const anilink = `https://www.imdb.com/find/?q=${aniid}&ref_=nv_sr_sm`;
    const imwbreq = await axios.get(anilink, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const imwbres = imwbreq.data;

    //console.log(imwbres);

    const $3 = cheerio.load(imwbres);

    
    const wbid = "tt"+$3('.find-result-item').find('a').attr('href').match(/\d+/) || null;

    
    const aniview = `https://m.imdb.com/title/tt3105452/?ref_=fn_al_tt_1`;
    const viewreq = await axios.get(aniview, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const viewres = viewreq.data;

    //console.log(viewres);

    const $4 = cheerio.load(viewres);

    const viewm = [];

    const name = $4('.sc-d8941411-0.dxeMrU').find('.hero__primary-text').text() || null;
    const jname = $4('.sc-491663c0-3.bdjVSf').find('h1').text() || null;
    const rating = $4('.sc-acdbf0f3-0.haeNPA.rating-bar__base-button').find('.sc-bde20123-1.cMEQkK').text()[0] || null;
    const type = $4('.ipc-inline-list--show-dividers.sc-d8941411-2').find('.ipc-inline-list__item:first').text() || null;
    const year = $4('.ipc-inline-list--show-dividers.sc-d8941411-2').find('.ipc-inline-list__item:eq(1)').text() || null;
    const runt = $4('.ipc-inline-list--show-dividers.sc-d8941411-2').find('.ipc-inline-list__item:eq(3)').text() || null;
    const storyline = $4('.sc-69e49b85-4.ktjuZl').find('.sc-466bb6c-2.chnFO').text() || null;

    const genre = $4('.sc-69e49b85-4.ktjuZl').find('.ipc-chip-list__scroller').text() || null;

    const vido = $4('.sc-491663c0-9.cQKXCG').find('a:first').attr('href') || null;

    const vidox = null;

    viewm.push({ name, jname, rating, type, year, runt, storyline, genre, vido, vidox});

    console.log(viewm);
    } catch (error) {
        console.log('errorr',error);
    }
})

anilist.listen(PORT, ()=>{
    console.log('the live', PORT);
})