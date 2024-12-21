import corn from 'cron';
import https from 'https';

const URL = "https://expence-traker.onrender.com";

const job = new corn.CronJob('*/14 * * * *', function(){
  https.get(URL, (res)=>{
    if(res.statusCode === 200){
      console.log("GET request sent successfuly!");
    }else{
      console.log("GET request failed", res.statusCode);
    }
  }).on('error', (e)=>{
    console.log("Error while sending request",e);
  })
})

export default job;