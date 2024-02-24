const watchUrl = window.location.href;
const Url = new URL(watchUrl);
const AnimeId = Url.searchParams.get('id');

const ourAnimeId = AnimeId.split('-episode-')[0];

const CoreApi = `https://api.anime-dex.workers.dev/anime/${ourAnimeId}`;
const CoreApiEpisode = `https://api.anime-dex.workers.dev/episode/${AnimeId}`;

const AnimeDetails = document.querySelector('.anime_details');
const AnimeIframe = document.querySelector('.iframe-container');
const AnimeEpisode = document.querySelector('.episode-list');
const AnimeAudio = document.querySelector('.anime_newrunning');
const AnimeNextPrevious = document.querySelector('.ep_changerr');

const animeallpart = async function () {
   try {
      const WatchApi = await axios.get(CoreApi);
      const AnimeNeedEp = await axios.get(CoreApiEpisode);

      const AnimeAll = AnimeNeedEp.data.results;
      const OurApi = WatchApi.data.results;

      var animeName = OurApi.name || OurApi.other_name;
      const malApi = `https://xyxanime.rf.gd/enginev2.php?id=${animeName}`;

      AnimeDetails.innerHTML = `<div class="p-3 box-detail">
            <div class="image">
               <img src="${OurApi.image}" width="140" height="180" alt="">
            </div>
            <div>
               <div class="anime_name text-truncate">${OurApi.name}</div>
               <div class="clearfix"></div>
               <div class="synopsis px-2" data-bs-spy="scroll">${OurApi.plot_summary}</div>
               <div class="p-4 width">
                  <div class="anime_type py-2"><strong>Type:</strong> <span class="clr_episode"> ${OurApi.type}</span></div>
                  <div class="anime_status"><strong>Status:</strong> ${OurApi.status}</div>
                  <div class="anime_quality py-2"><strong>Duration:</strong> ?</div>
                  <div class="anime_quality py-"><strong>Genre:</strong> <span class="clr_episode">${OurApi.genre}</span></div>
                  <div class="anime_quality py-2"><strong>Aired: </strong>${OurApi.released}</div>
                  <div class="anime_quality py-"><strong>Episodes:</strong> ${AnimeAll.episodes}</div>
               </div>
            </div>
            <div class="clearfix"></div>
         </div>`;

      AnimeIframe.innerHTML = `<iframe src="https://xyxanime.rf.gd/ff?id=${AnimeId}" name="iframe"
         id="myIframe" frameborder="0" scrolling="no"
         allow="accelerometer; autoplay; encrypted-media;gyroscope; picture-in-picture"
         allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`;

      const eplistnew = OurApi.episodes;

      for (let i = 0; i < eplistnew.length; i++) {
         AnimeEpisode.innerHTML += ` <a class="episode-link" href="?id=${ourAnimeId}-episode-${i + 1}">${i + 1}</a>`;
      }

      console.log(document.title = `Watch ${AnimeAll.name} On XyX Anime.`);

   } catch (error) {
      console.error('The Error Is ', error);
   }
}

 const audioanime = async function () {
   try {
      const AnimeSubAudio = await axios.get(CoreApiEpisode);
      const corename = AnimeSubAudio.data.results;
      const coreSub = AnimeSubAudio.data.results.servers;

      AnimeAudio.innerHTML = `<div class=" text-center text-white flex-column p-2 info">
        <div class="current_streaming">
           You Are Watching
        </div>
        <strong><span class="clr_episode">${corename.name}</span></strong>
        <div>
           If Doesn't Work Just Switch The Server!
        </div>
     </div>
     <div class="clearfix"></div>
     <div class="provider-section text-center">
        <div class="text-white font-weight-bold animeprovider">
           <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="20"
              style="position: relative; top: -0.3rem;">
              <path
                 d="M300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720Zm0 400q-25 0-42.5 17.5T240-260q0 25 17.5 42.5T300-200q25 0 42.5-17.5T360-260q0-25-17.5-42.5T300-320ZM160-840h640q17 0 28.5 11.5T840-800v280q0 17-11.5 28.5T800-480H160q-17 0-28.5-11.5T120-520v-280q0-17 11.5-28.5T160-840Zm40 80v200h560v-200H200Zm-40 320h640q17 0 28.5 11.5T840-400v280q0 17-11.5 28.5T800-80H160q-17 0-28.5-11.5T120-120v-280q0-17 11.5-28.5T160-440Zm40 80v200h560v-200H200Zm0-400v200-200Zm0 400v200-200Z"
                 fill="#ffffff" />
           </svg>
           PROVIDERS:
           <a class="provider-button" href="https://xyxanime.rf.gd/playerx?id=${AnimeId}"
              target="iframe">JW PLAYER</a>
           <a class="provider-button" href="${coreSub.filelions}" target="iframe">FILELION</a>
           <a class="provider-button" href="${coreSub.doodstream}" target="iframe">Doodstream</a>
        </div>
     </div>`;

   } catch (error) {
      console.error('The Error Is ', error);
   }
}


const animeupcoming = async function () {
   try {

      console.log(voiceres);
      const animetotal = await axios.get(CoreApiEpisode);
      const animereturn = animetotal.data.results;

      const animewave = animereturn.name.split(' Episode ')[1];
      var animeindia = animewave.split(' English ')[0];
      const AnimeQuantity = animereturn.episodes;

      //next anime
      if (animeindia > 0 && animeindia <= AnimeQuantity) {
         var nextanimenow = animeindia + 1;
         nextanimenow = Math.min(nextanimenow, AnimeQuantity);
         console.log("Next anime index: " + nextanimenow);
      }
      else {

      }

      //previous anime
      if (animeindia > 0) {
         var previousanimenow = animeindia - 1;
      }
      else {
         var previousanimenow = 1;
      }

      AnimeNextPrevious.innerHTML = `    <a href="watch.html?id=${ourAnimeId}-episode-${previousanimenow}">
      <div class="rewind_epp">
         <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="white"
            width="16"
            viewBox="0 0 512 512">
            <path
               d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z" />
         </svg>
      </div>
   </a>
   <a href="watch.html?id=${ourAnimeId}-episode-${nextanimenow}">
      <div class="forward_epp">
         <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="white"
            width="16"
            viewBox="0 0 512 512">
            <path
               d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" />
         </svg>
      </div>
   </a>
   <div class="reload_epp" onclick="reloadIframe()">
      Reload 
      <svg xmlns="http://www.w3.org/2000/svg"
         height="15" fill="white" width="16" viewBox="0 0 512 512"
         style="top:-0.014rem; position:relative;">
         <path
            d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-
8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
      </svg>
   </div>`;

   const voice = document.querySelector('.scroll_voice');

   const voicereq = await axios.get(`https://xyx-xu9n.onrender.com/${ourAnimeId}`)

   const voiceres = voicereq.data.resmal[0].num;

  

      console.log(animewave);
      console.log(animeindia);//running
      console.log(AnimeQuantity);//total
   } catch (error) {
      console.log('The Error Is', error);
   }
}

audioanime();
animeallpart();
animeupcoming();




