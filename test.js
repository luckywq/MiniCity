const  axios  = require('axios');

const cheerio = require("cheerio");

const recentCount = 200
const url = `https://tubiao.zhcw.com/tubiao/ssqNew/ssqInc/ssqZongHeFengBuTuAscselect=200.html`

async function httpGet () {
  return new Promise((resolve, reject) => {
    const promise = axios.get(url)
    promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}


// 爬取历史开奖结果
async function getSsqResult ()  {
  const ssqArr = []
  const res = await httpGet(url)
  //res
  const $ = cheerio.load(res.toString())
  $('#table_ssq tr').each((index, tr) => {
    const redBallNum = []
    const time = $(tr).children().eq(0)
    const redBalls = $(tr).children('td.redqiu')
    const blueBall = $(tr).children('td.blueqiu3').eq(0)
    redBalls.each((ri, red) => {
      const redNum = $(red).text()
      redBallNum.push(Number(redNum))
    })
    const blueBallNum = blueBall.text()
    // blueBallNum
    // ssqArr.push({
    //   ssq_issue: Number(time.text()),
    //   red_balls: redBallNum.join(','),
    //   blue_ball: blueBallNum.length < 2 ? '0' + blueBallNum : blueBallNum,
    //   ssq_time: (time.children('a').eq(0).attr('title') ).replace('开奖日期：', '')
    // })
    ssqArr.push(
      [[...redBallNum],Number(blueBallNum)]
    )
  })
  ssqArr
  // return ssqArr
  console.log(ssqArr)
}

getSsqResult()