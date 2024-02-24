const puppeteer = require('puppeteer');

async function getJWPlayerSrc(ttid) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the IMDb page for the given IMDb ID
    await page.goto(`https://www.imdb.com/title/${ttid}/?ref_=fn_al_tt_4`);

    // Wait for the JW Player element to be available
    await page.waitForSelector('.sc-491663c0-8.chDPzy', { timeout: 60000 });

    // Extract the source link of the JW Player video
    const src = await page.$eval('.sc-491663c0-8.chDPzy .jw-media video.jw-video', videoElement => {
      return videoElement.getAttribute('src');
    });

    await browser.close();

    return src;
  } catch (error) {
    console.error('Error fetching JW Player source:', error);
    return null; // Return null in case of error
  }
}

module.exports = getJWPlayerSrc;
