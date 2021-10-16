var express = require('express');
var http = require('http');
var cors = require('cors');
var path = require('path');
var fs = require('fs');
var axios = require('axios');

const port = process.env.PORT || 4001;
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.static('./build'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build','index.html'));
})
app.get('/:query',(req,res)=>{
    axios.get(`https://api.unsplash.com/search/collections?query=${req.params.query}&orientation=landscape&per_page=15&client_id=77pYTx8fpgsrzMPzQ_X_2ZhZt3nnoHTJjcVmOE6a-6U`)
    .then((response)=>{
        console.log(response.data.results.length);
        res.send(JSON.stringify(response.data.results.map(sendback)));
    })
    var sendback= (element)=>{
        console.log(element.cover_photo.urls)
        return {full : element.cover_photo.urls.full,
            small : element.cover_photo.urls.small}
    }
    
    //
})

server.listen(port, ()=>{
    console.log(`server listening ${port}`);
})