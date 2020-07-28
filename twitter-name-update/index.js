// install express with `npm install express` 
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

const PORT = 3000

if(!process.env.DETA_RUNTIME){
    app.listen(PORT,()=>{
        console.log('Listening to local port')
    })
}
// export 'app'
module.exports = app