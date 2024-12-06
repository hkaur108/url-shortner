const express = require('express');
const app = express();
const ShortUrl= require('./models/shortUrl');
const mongoose=require('mongoose');
const port = 5000;
var QRCode = require('qrcode')



mongoose.connect('mongodb://127.0.0.1:27017/urlShortner',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.set('view engine',"ejs");
app.use(express.urlencoded({extended:false}));

app.get('/', async (req, res) => {
    const shortUrls=await ShortUrl.find()
    res.render('index',{shortUrls:shortUrls})
});

app.post('/shortUrls', async (req,res)=>{  

    await ShortUrl.create({
    full:req.body.fullUrl,
    
})
res.redirect('/')
        
})
app.get('/:shortUrl', async(req,res)=>{
    const shortUrl= await ShortUrl.findOne({short:req.params.shortUrl})
    if(shortUrl == null) return res.send(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
})

app.get('/edit/:shortUrl', async (req,res)=>{
    const shorturl= await ShortUrl.findOne({short:req.params.shortUrl});
    res.render('edit',{shorturl:shorturl})
})

app.post('/edit/:shortUrl',async (req,res)=>{
    await ShortUrl.findOneAndUpdate({short:req.params.shortUrl},{$set:{full:req.body.fullUrl}})
    res.redirect('/');
})

app.get('/del/:shortUrl', async(req,res)=>{
    await ShortUrl.findOneAndDelete({short:req.params.shortUrl});
    res.redirect("/")

})


app.listen(process.env.PORT || port)
