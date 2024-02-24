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

make.get('/', async ( req, res )=>{
    try {
        const ani = `https://anix.ac/home`;
    const anireq = await axios.get(ani, {
        headers:{
            'User-Agent': USER_AGENT,
        },
        timeout: 5000,
    });
    const anires = anireq.data;

    //console.log(anires);

    const $ = cheerio.load(anires);

    const anitrend = [];

    $('.swiper-wrapper').find('.swiper-slide').each(( index, element )=>{
        const name = $(element).find('.ani-name').text() || null;
        const desc = $(element).find('.ani-desc').text() || null;
        const img = $(element).find('.poster img').attr('src') || null;
        const rating = $(element).find('.rating-score').text().trim() || null;
        const type = $(element).find('.type').text().trim() || null;

        anitrend.push({ name, desc, img, rating, type});
    })

    //let page = 1;
    const page = req.query.id || 1;
    const sublink = `https://ajax.gogo-load.com/ajax/page-recent-release.html?page=${page}&type=1`;
    const reqnew = await axios.get(sublink, {
        headers: {
            'User-Agent': USER_AGENT,
        }
    });
    const resnew = reqnew.data;

    const $1 = cheerio.load(resnew);

    const subnew = [];

    $1('.last_episodes.loaddub').find('li').each(( index, element )=>{
        const name = $1(element).find('a').attr('title') || null;
        const id = name.toLocaleLowerCase().replace(/[~!@#$%^&*()_+={}[\];:  '"\|<>.,]+/g,'-') || null;
        const epnum = $1(element).find('.episode').text().split('Episode ')[1] || null;
        const image = $1(element).find('a img').attr('src') || null;

        subnew.push({ name, id, epnum, image});
    })

    const dublink = `https://ajax.gogo-load.com/ajax/page-recent-release.html?page=${page}&type=2`;
    const reqos = await axios.get(dublink, {
        headers: {
            'User-Agent': USER_AGENT,
        }
    });
    const resos = reqos.data;

    const $2 = cheerio.load(resos);

    const dubos = [];

    $2('.last_episodes.loaddub').find('li').each(( index, element )=>{
        const name = $2(element).find('a').attr('title') || null;
        const id = name.toLocaleLowerCase().replace(/[~!@#$%^&*()_+={}[\];:  '"\|<>.,]+/g,'-') || null;
        const epnum = $2(element).find('.episode').text().split('Episode ')[1] || null;
        const image = $2(element).find('a img').attr('src') || null;

        dubos.push({ name, id, epnum, image});
    })

    //console.log(anitrend);
    //console.log(subnew);
    //console.log(dubos);
    res.status(200).render("index", { anitrend, subnew, dubos});
    } catch (error) {
        console.log('error',error);
    }
})

make.get('/net/:id', async ( req, res )=>{
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

    
    const aniview = `https://m.imdb.com/title/${wbid}/?ref_=fn_al_tt_1`;
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

    const genre = $4('.sc-69e49b85-4.ktjuZl').find('.ipc-chip-list__scroller').text().split(/(?=[A-Z])/).join(', ') || null;

    const vido = $4('.ipc-poster.ipc-poster--baseAlt.ipc-poster--dynamic-width.ipc-sub-grid-item.ipc-sub-grid-item--span-2').find('img').attr('src') || null;

    const vidox = null;

    //viewm.push({ });

    const gmlink = `https://ww3.gogoanimes.fi/category/${aniid}`;
    const gmreq = await axios.get(gmlink, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const gmres = gmreq.data;

    const $8 = cheerio.load(gmres);

    const eptoat = [];

    const total = $8('.anime_video_body').find('a').attr('ep_end') || null;

    var totalnum;
    for(var i = 1; i <= total; i++){
        console.log(i);
        totalnum = `${aniid}`;
        idnum = i;
        eptoat.push({ totalnum, idnum, total});
    }

   

    //console.log(vido);
    //console.log(total);
    //console.log(eptoat);

    res.status(200).render("net", { name, jname, rating, type, year, runt, storyline, genre, vido, vidox, eptoat, total});
    console.log(viewm);
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

make.get('/search', async ( req, res )=>{
    try {
        const key = req.query.q;
    const selink = `https://ww3.gogoanimes.fi/search.html?keyword=${key}`;
    const sereq = await axios.get(selink, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const seres = sereq.data;

    console.log(seres);

    const $9 = cheerio.load(seres);

    const seresul = [];

    $9('.items li').each(( index, element )=>{
        const name = $9(element).find('.name a').text() || null;
        const img = $9(element).find('.img img').attr('src') || null;

        
        var img1 = null;
        if(img.includes('https://gogocdn.net/images/')){
          img1 = img;
        }
        else{
          img1 = 'https://gogocdn.net/' + img;
        }

        var sub = null;
        if(name.includes('(Dub)')){
            sub = `M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z`;
        }
        else{
            sub = `M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z`;
        }

        const seid = $9(element).find('.img a').attr('href').split('/category/')[1] || null;

        seresul.push({ name, img1, sub, seid});
    })

    console.log(seresul);
    res.status(200).render("search_query", { seresul});
    } catch (error) {
        console.log('errorrrr',error);
    }
})


make.listen(PORT, ()=>{
    console.log('the live', PORT);
})