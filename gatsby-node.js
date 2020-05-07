/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const glob = require('glob')
//const files = glob.sync('./pub.all/*config.js')
//  const files = glob.sync('./pub.all/*config.json').map( item => {
//    return { ...require(item), item}
//   } )
const fs = require('fs')
const indexOfFiles = require('./pub.all')
const all = indexOfFiles.all

/**
 * 
 * @param {'2012-07-05 10:00:00'}
 * return 157
 */
// const getDayOfYear = (time) => {
//   const pubDate = new Date(time)
//   const firstDay =  new Date(pubDate.getFullYear(), 1, 0 )
//   return Math.round ( (pubDate.getTime() - firstDay.getTime() ) / 1000 / 60 /60 / 24 + .5, 0 )
// }
/**
 * Последовательность действий при публикации
 * 1. Считываем всю массу pod
 * 2. Конвертируем в json и заодно конверитруем в компоненты
 * 3. Фильтруем по дате публикации ( <= Now)
 * 4. Для документов с типом 'page' используем особый шаблон
 * 5. Если в DESCRIPTION документа есть publishUrl, используем его 
 */

//  //const pages = files.filter( item=>item.type && item.type === 'page')
//  // pages
// //  Добавим ключ с url публикации
// var pubIndex = {}

// // Do sorting
// files.sort( (a, b ) => getDayOfYear(b.PUBDATE) - getDayOfYear(a.PUBDATE) )
// // Add publishUrl
// files.map( item => { 
//    // пропускаем страницы с имеющимся publishUrl
//    if (!item.publishUrl) {
//     const day = getDayOfYear(item.PUBDATE);
//     const max = (pubIndex[day] || 0 ) + 1;
//     pubIndex[day] = max
//     const year = new Date(item.PUBDATE).getFullYear()
//     const publishUrl = `/${year}/${day}/b${max}/${item.Filename}`
//     item.publishUrl = publishUrl
//    }
   
   
//   })

const postsPerPage = 5;
const posts = all.reverse().filter(item=> (item.type || 'page') !== 'page')
let pages = []
for (let i=0, j= posts.length; i<j; i+=postsPerPage ) {
  let temparray = posts.slice(i,i+postsPerPage);
  pages.push(temparray)
}
  
// You can delete this file if you're not using it
exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions
    const getPublicUrl = async ( src,p1  ) => {
      const result = await graphql(`
      {
        file( absolutePath: {regex: "${p1}$/"}) {
          publicURL
        }
      }
    `);
      return `src="${result.data.file.publicURL}"`
    }
    // process descriptions
    async function replaceAsync(str, regex, asyncFn) {
      const promises = [];
      str.replace(regex, (match, ...args) => {
          const promise = asyncFn(match, ...args);
          promises.push(promise);
      });
      const data = await Promise.all(promises);
      return str.replace(regex, () => data.shift());
    }

    let pagesIdx = 0
    for (pagesIdx = 0; pagesIdx < pages.length; pagesIdx++) {
     let itemsIdx = 0
     for (itemsIdx = 0; itemsIdx < pages[pagesIdx].length; itemsIdx++) {
      pages[pagesIdx][itemsIdx].DESCR = await replaceAsync(
        pages[pagesIdx][itemsIdx].DESCR,
        /src=['"]([^"']+)['"]/g,
        getPublicUrl
      )
      // console.log(pages[pagesIdx][itemsIdx].DESCR )
     }
    }
    // pages = pages.map(page => {
    //   return page.map(item=>{
    //     //console.log({item})
    //     // replace images by public url
    //     item.DESCR = item.DESCR.replace(/src=['"]([^"']+)['"]/g,(str,p1)=>{
    //       const url = Promise.all([getPublicUrl(p1)])
    //       return `src="${url}"`
    //     })
    //     console.log(item.DESCR)
    //     return item
    //   })
    // })

    // fill index page
    const numPages = pages.length
    for (let i = 0; i < numPages; i += 1) {
      const pageNumber = numPages-i
    createPage({
      path: i === 0 ? '/' : `/page/${pageNumber}`,
      component: require.resolve(`./src/templates/index-template.js`),
      context: { 
        items:pages[i] ,
        currentPage: pageNumber,
        numPages,
        postsLimit: postsPerPage,
        postsOffset: i * postsPerPage,
        prevPagePath: `/page/${pageNumber-1}`,
        nextPagePath:  i <= 1 ? '/' : `/page/${pageNumber + 1}`,
        hasPrevPage: i !== numPages - 1,
        hasNextPage: i !== 0
      }
    })
  }
    all.forEach(item => {
      console.log(item.publishUrl)
      const template = (item.type || 'page') !== 'page_STATIC' ? item.jsreact : `./src/templates/page-template.js`
      createPage({
        path: item.publishUrl,
        component: require.resolve(template),
        context: {item},
      })
    })
  
    fs.writeFileSync('./pub.all/rss.src.json', JSON.stringify(pages,null,2))

  

  }

  // exports.onCreateNode = ({ node }) => {
    // if (node.internal.type === `MarkdownRemark`) {
      // console.log(node.internal.type)
    // }
  // }