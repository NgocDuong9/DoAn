// const { log } = require('console')
// const puppeteer = require('puppeteer')
// const fs = require('fs')
// const GARAS = require('./data.ts')

// const extractItems = async page => {
//   let maps_data = await page.evaluate(() => {
//     return Array.from(document.querySelectorAll('.Nv2PK')).map(el => {
//       const link = el.querySelector('a.hfpxzc').getAttribute('href')
//       const [description, timeAndPhone] = (
//         el
//           .querySelector('.W4Efsd:last-child > .W4Efsd:nth-of-type(2)')
//           ?.textContent.trim() ?? ''
//       ).split(' ⋅ ')

//       const [times, phone] = timeAndPhone?.split(' · ') ?? ['', '']

//       return {
//         title: el.querySelector('.qBF1Pd')?.textContent.trim(),
//         avg_rating: el.querySelector('.MW4etd')?.textContent.trim(),
//         reviews: el
//           .querySelector('.UY7F9')
//           ?.textContent.replace('(', '')
//           .replace(')', '')
//           .trim(),
//         address: el
//           .querySelector(
//             '.W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child'
//           )
//           ?.textContent.replaceAll('·', '')
//           .trim(),
//         description: description,
//         phone: phone,
//         times: times,
//         website: el.querySelector('a.lcr4fd')?.getAttribute('href'),
//         category: el
//           .querySelector(
//             '.W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:first-child'
//           )
//           ?.textContent.replaceAll('·', '')
//           .trim(),
//         timings: el
//           .querySelector(
//             '.W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:first-child'
//           )
//           ?.textContent.replaceAll('·', '')
//           .trim(),
//         phone_num: el
//           .querySelector(
//             '.W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:last-child'
//           )
//           ?.textContent.replaceAll('·', '')
//           .trim(),
//         extra_services: el
//           .querySelector('.qty3Ue')
//           ?.textContent.replaceAll('·', '')
//           .replaceAll('  ', ' ')
//           .trim(),
//         latitude: link.split('!8m2!3d')[1].split('!4d')[0],
//         longitude: link.split('!4d')[1].split('!16s')[0],
//         link,
//         dataId: link.split('1s')[1].split('!8m')[0]
//       }
//     })
//   })
//   return maps_data
// }

// const scrollPage = async (page, scrollContainer, itemTargetCount) => {
//   let items = []
//   let previousHeight = await page.evaluate(
//     `document.querySelector("${scrollContainer}").scrollHeight`
//   )
//   while (itemTargetCount > items.length) {
//     items = await extractItems(page)
//     await page.evaluate(
//       `document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`
//     )
//     await page.evaluate(
//       `document.querySelector("${scrollContainer}").scrollHeight > ${previousHeight}`
//     )
//     await new Promise(resolve => setTimeout(resolve, 2000))
//   }
//   return items
// }

// const getMapsData = async () => {
//   browser = await puppeteer.launch({
//     headless: false,
//     args: ['--disabled-setuid-sandbox', '--no-sandbox']
//   })
//   const [page] = await browser.pages()
//   await page.setExtraHTTPHeaders({
//     'User-Agent':
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4882.194 Safari/537.36'
//   })
//   const search = 'gara+gần+huyen+son+tay+ha+noi'

//   await page.goto(
//     // 'https://www.google.com/maps/search/gara+gần+quan+dong+da+ha+noi/@21.0117256,105.8087659,17z/data=!3m1!4b1',
//     `https://www.google.com/maps/search/${search}/@21.0117256,105.8087659,17z/data=!3m1!4b1?hl=vi`,
//     {
//       waitUntil: 'domcontentloaded',
//       timeout: 60000
//     }
//   )

//   await new Promise(resolve => setTimeout(resolve, 3000))

//   // Đọc dữ liệu hiện có từ file data.json
//   let existingData = []
//   if (fs.existsSync('data.json')) {
//     const rawData = fs.readFileSync('data.json')
//     existingData = JSON.parse(rawData)
//   }

//   // Thêm dữ liệu mới vào dữ liệu hiện có
//   let data = await scrollPage(page, '.m6QErb[aria-label]', 30)
//   existingData.push(...data)

//   fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2))
//   // console.log(data)
//   await browser.close()
// }

// // getMapsData()

// const getAddressFromCoordinates = async (latitude, longitude) => {
//   const apiKey = 'AIzaSyAKtvnBi5wTk_Mb5yFbl2sCxEvyDI87XMo'
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`

//   try {
//     const response = await fetch(url)
//     const data = await response.json()

//     if (data.results && data.results.length > 0) {
//       const address = data.results[0].formatted_address

//       return address
//     } else {
//       return ''
//     }
//   } catch (error) {
//     console.error('Lỗi khi gọi Google Maps Geocoding API:', error)
//     return ''
//   }
// }

// const mapAddress = async () => {
//   console.log('GARAS:::', GARAS)
//   const promise = GARAS.map(async item => {
//     const address = await getAddressFromCoordinates(
//       item.latitude,
//       item.longitude
//     )

//     console.log('address::', address)

//     return {
//       ...item,
//       address: address
//     }
//   })

//   const res = await Promise.all(promise)
//   fs.writeFileSync('data.json', JSON.stringify(res, null, 2))
// }

// // mapAddress()
