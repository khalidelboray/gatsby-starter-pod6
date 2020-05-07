

const log = (i) => console.log(JSON.stringify(i, null,2))
const fs = require('fs')
const glob = require('glob')
let allItems = glob.sync('./pub.all/*config.json').map(f=>{
    console.log('process ' + f)
    const desc = fs.readFileSync(f)
    const attrs = JSON.parse(desc.toString())
    console.log('process ' + f + ' done')
    return {f, attrs}
}).sort( (a ,b) => new Date(a.attrs.PUBDATE) - new Date(b.attrs.PUBDATE) )

// get not pages documents
let notPages = allItems.filter( a => !a.attrs.publishUrl)

let Pages = allItems.filter( a => a.attrs.publishUrl).map(i=>i.attrs)
// now we add base60 letters
const translit = require('iso_9')
const base60 = require('newbase60')
const addUrl = (items) => {
  
  const withSxd =  items.map(i =>{
    const {attrs, f } = i
    const pubDate = new Date(attrs.PUBDATE)
    const sxd = base60.DateToSxg(pubDate)
    const type = attrs.type === 'note' ? 'n':'a'
    // make short name from title
    console.error(`process ${f}`)
    let words = attrs.TITLE.split(/\s/)
    let res = []
    while( [...res, words[0]].join(" ").length < 120 ) {
      res.push(words.shift())
    }
    let shortTitle = res.join(" ")
    // translit only cyrillic 
    const translit2 = /[а-яА-ЯЁё]/.test(shortTitle) ?  translit(shortTitle, 5) : shortTitle
    // console.log({title:attrs.TITLE, shortTitle, translit2})
    // make url clean
    const slug = (
             ( translit2.replace(/`/,'') || '')
              .replace(/\W+/g, '-') || '' 
                   ).replace(/(^[-]+|[-]+$)/g, '').toLowerCase()
        
    return { ...attrs, type, sxd, slug, file:f}
  })

// get count of each type on corresponding date
  withSxd.reduce((acc, item) => {
    const {sxd, type } = item
    acc[sxd] = acc[sxd] || {}
    acc[sxd][type] = acc[sxd][type] || 0
    acc[sxd][type]++
    item.number = acc[sxd][type]
    return acc
  }, {})
  // sequence -  index of record at all in that day
  withSxd.reduce((acc, item) => {
    const {sxd } = item
    acc[sxd] = acc[sxd] || 0
    acc[sxd]++
    item.sequence = acc[sxd]
    return acc
  }, {})

 
 return  withSxd.map(item =>{
    const { type, number, sxd , slug, PUBDATE, sequence} = item
    const shortUrl = `/${type}${sxd}${number}`
    // /2019/12/34/a1/WriteAt-my-opensource-startup-on-Perl-6-Pod
    const date = new Date(PUBDATE)
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const day = date.getDate()
    const publishUrl = `/${year}/${month}/${day}/${sequence}/${slug}`
    const sources = [shortUrl, `/${year}/${month}/${day}/${sequence}`, `/${year}/${month}/${day}/${sequence}/(.*)` ]
    return {...item, shortUrl, publishUrl, sources}
  })

}
const fullInfo = addUrl(notPages)
// write all metainfo into now.js
let redirects = []
fullInfo.map(item=>{
    const {publishUrl, sources } = item
    sources.forEach( src => {
      redirects.push({source: src, destination: publishUrl, "statusCode": 301})
    })
})
// !!! fs.writeFileSync('now.json', JSON.stringify({redirects}, null,2))
fs.writeFileSync('pub.all/index.json', JSON.stringify({all : [...fullInfo,...Pages]}, null,2))

/**
  
  {
  "redirects": [
    { "source": "/contact", "destination": "/pages/contact" },
    { "source": "/pages/contact", "destination": "/help", "statusCode": 301 }, 
    { "source": "/product/(.*)", "destination": "/products/$1", "statusCode": 301 },
    { "source": "/product-category/ultrasound-machines/(.*)", "destination": "/collections/stationary-ultrasound-machines", "statusCode": 301 },
    { "source": "/product-category/portable-ultrasound-machines/(.*)", "destination": "/collections/portable-ultrasound-machines", "statusCode": 301 },
    { "source": "/portable-ultrasound-by-brand/", "destination": "/collections/portable-ultrasound-machines", "statusCode": 301 },
    { "source": "/product-category/(.*)", "destination": "/collections/ultrasounds", "statusCode": 301 }
  ]
    }
  
 */