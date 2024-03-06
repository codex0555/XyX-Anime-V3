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
//     const anires = {
//         "anitrend": [
//         {
//         "name": "MASHLE: MAGIC AND MUSCLES Season 2",
//         "desc": "Second season of Mashle....",
//         "img": "https://static.anix.ac/s/7/78/7818417956ad49407be488d7b1699970.jpg",
//         "rating": "8.14",
//         "type": "TV",
//         "xid": "mashle-magic-and-muscles-season-2"
//         },
//         {
//         "name": "Shangri-La Frontier",
//         "desc": "High school student Rakurou Hizutome has a peculiar hobby of playing poorly made games—ones that are unbalanced or are filled with so many bugs that make them borderline unplayable. The few who share his hobby might recognize him by his in-game name,...",
//         "img": "https://static.anix.ac/s/6/65/65da57f59e5c3a3b48cde3bc82170388.jpg",
//         "rating": "8.01",
//         "type": "TV",
//         "xid": "shangri-la-frontier"
//         },
//         {
//         "name": "The Wrong Way to Use Healing Magic",
//         "desc": "Ken Usato is a normal high-schooler in every sense of the word—average grades, dreams, and a tendency to dislike extraordinary people. However, when he encounters the president and the vice president of the student council, both popular and extraordi...",
//         "img": "https://static.anix.ac/s/5/50/50ee31a12d84215c69469070bd195476.jpg",
//         "rating": "7.5",
//         "type": "TV",
//         "xid": "the-wrong-way-to-use-healing-magic"
//         },
//         {
//         "name": "Hokkaido Gals Are Super Adorable!",
//         "desc": "Having just moved from Tokyo to Hokkaido, high school student Tsubasa Shiki decides to explore the picturesque winter landscape he could never experience in the nation's capital. It only takes a moment for Tsubasa's idealized view of Japan's northern...",
//         "img": "https://static.anix.ac/s/8/8e/8efaa43b4a37273de564b693c1331c21.jpg",
//         "rating": "7.19",
//         "type": "TV",
//         "xid": "hokkaido-gals-are-super-adorable-"
//         },
//         {
//         "name": "Frieren: Beyond Journey’s End",
//         "desc": "During their decade-long quest to defeat the Demon King, the members of the hero's party—Himmel himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frieren—forge bonds through adventures and battles, creating unforgettable preciou...",
//         "img": "https://static.anix.ac/s/b/b5/b5503f3fd73f0390dfe14d902aeda96d.jpg",
//         "rating": "9.14",
//         "type": "TV",
//         "xid": "frieren-beyond-journey’s-end"
//         },
//         {
//         "name": "Classroom of the Elite Season 3",
//         "desc": "Third season of Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e....",
//         "img": "https://static.anix.ac/s/2/22/22af22941391198c20bee7bc0f444194.jpg",
//         "rating": "8.08",
//         "type": "TV",
//         "xid": "classroom-of-the-elite-season-3"
//         },
//         {
//         "name": "The Foolish Angel Dances with the Devil",
//         "desc": "Akutsu Masatora is a demon who has infiltrated a high school in the human world. His goal is to find candidates to aid Hell in the fight against their natural enemies, the angels of Heaven. Assigned a seat next to Lily Amane, another student who tran...",
//         "img": "https://static.anix.ac/s/4/4a/4a38b4bffa8bcc089c873c3f772dd44a.jpg",
//         "rating": "6.4",
//         "type": "TV",
//         "xid": "the-foolish-angel-dances-with-the-devil"
//         },
//         {
//         "name": "ONE PIECE",
//         "desc": "Barely surviving in a barrel after passing through a terrible whirlpool at sea, carefree Monkey D. Luffy ends up aboard a ship under attack by fearsome pirates. Despite being a naive-looking teenager, he is not to be underestimated. Unmatched in batt...",
//         "img": "https://static.anix.ac/s/1/1b/1bb2150e9529b52995336d38e74e94b6.jpg",
//         "rating": "8.72",
//         "type": "TV",
//         "xid": "one-piece"
//         },
//         {
//         "name": "Solo Leveling",
//         "desc": "Humanity was caught at a precipice a decade ago when the first gates—portals linked with other dimensions that harbor monsters immune to conventional weaponry—emerged around the world. Alongside the appearance of the gates, various humans were transf...",
//         "img": "https://static.anix.ac/s/b/ba/bad455c952ee9bfe757782077baf4114.jpg",
//         "rating": "8.44",
//         "type": "TV",
//         "xid": "solo-leveling"
//         },
//         {
//         "name": "The Apothecary Diaries",
//         "desc": "Maomao, an apothecary's daughter, has been plucked from her peaceful life and sold to the lowest echelons of the imperial court. Now merely a maid, Maomao settles into her new mundane life and hides her extensive knowledge of medicine in order to avo...",
//         "img": "https://static.anix.ac/s/0/01/0156e01bb4bbdd99ef223a8ba8e53483.jpg",
//         "rating": "8.83",
//         "type": "TV",
//         "xid": "the-apothecary-diaries"
//         }
//         ]
//         };

//     //console.log(anires);

    
//     const page = req.params.id || 1;
//     const sublink = `https://proxy.techzbots1.workers.dev/?u=https://x-api-kt9y.onrender.com/api/ant/${page}`;
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
    const anilink = `https://proxy.techzbots1.workers.dev/?u=https://x-api-kt9y.onrender.com/api/view/${aniid}`;
    const imwbreq = await axios.get(anilink, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const imwbres = imwbreq.data;
    const sub12 = req.params.s;
    const dub12 = req.params.dub;

    const servep = [];
    for( var i = 1; i <= sub12; i++){
        var thetotaep = aniid ;
        var cut = i;

        servep.push({ thetotaep, cut});
    }

    res.status(200).render("net", { imwbres, sub12, dub12, servep});
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
    const selink = `https://proxy.techzbots1.workers.dev/?u=https://x-api-kt9y.onrender.com/api/sit/${key}`;
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
