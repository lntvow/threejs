import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

fetch('https://echarts.apache.org/examples/data-gl/asset/pisa.hdr', {
  headers: {
    accept: '*/*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    priority: 'u=1, i',
    'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    cookie:
      'i18n_redirected=zh; Hm_lvt_54b918eee37cb8a7045f0fd0f0b24395=1729218287,1731031865; HMACCOUNT=CBDBC329C641C17A; _gid=GA1.2.1372132654.1731031866; _gat_gtag_UA_141228404_1=1; Hm_lpvt_54b918eee37cb8a7045f0fd0f0b24395=1731032300; _ga_RXSH4JWHT7=GS1.1.1731031865.10.1.1731032300.0.0.0; _ga=GA1.1.2087343388.1720668316',
    Referer: 'https://echarts.apache.org/examples/zh/editor.html?c=iron-globe&gl=1',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
  body: null,
  method: 'GET',
})
  .then(res => res.arrayBuffer())
  .then(arrayBuffer => {
    const buffer = Buffer.from(new Uint8Array(arrayBuffer))
    const filePath = path.join('./', 'pisa.hdr')
    fs.writeFile(filePath, buffer, err => {
      if (err) {
        console.error('Error saving the file:', err)
      } else {
        console.log('File saved successfully:', filePath)
      }
    })
  })
  .catch(err => {
    console.error('Error fetching the file:', err)
  })
