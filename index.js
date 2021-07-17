import axios from 'axios';
import fs from 'fs';
import urls from './config.js';

urls.map((apiURL) => {
  const { pathname, search } = new URL(apiURL);
  return axios(apiURL).then((res) => {
    if (!fs.existsSync(pathname)) fs.mkdirSync(`./mock/${pathname}/`, { recursive: true })

    const responseJSON = JSON.stringify(res.data, null, 2);
    fs.writeFileSync(`./mock/${pathname}/${search}.json`, responseJSON, 'utf8', function(err) {
      console.error(err);
    })
  })
})

