const express = require('express')
const twitter = require('twitter')
require('dotenv').config()

const { App } = require("deta");
const app = App(express());

const client = new twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key ,
    access_token_secret: process.env.access_token_secret
})  

const digits = {
    0 : '0️⃣',
    1 : '1️⃣',
    2 : '2️⃣',
    3 : '3️⃣', 
    4 : '4️⃣',
    5 : '5️⃣',
    6 : '6️⃣',
    7 : '7️⃣',
    8 : '8️⃣',
    9 : '9️⃣',
}

function emojify(number){
    let result = ''
    number = number.toString()
    for (var i = 0, len = number.length; i < len; i += 1) {
        result += (digits[+number.charAt(i)])
    }
    return result
}

function twitterUpdate(){
    client.get('account/verify_credentials',(error,response)=>{
        if(!error){
            const followerCount = response.followers_count
            const params = { name: `Sreeram @ ${emojify(followerCount)}`}
            client.post('account/update_profile',params,(error,response)=>{
                if(error) throw error
                console.log(error)
                console.log('Updated')
            })
        }
    })
}

//app.get('/', (req, res) => res.send('Hello World!'))

app.lib.cron(event => {
    twitterUpdate()      
});

// For testing locally
// const PORT = 3000

// if(!process.env.DETA_RUNTIME){
//     app.listen(PORT,()=>{
//         console.log('Listening to local port')
//     })
// }    
module.exports = app