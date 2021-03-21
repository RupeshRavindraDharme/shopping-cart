const { render } = require('ejs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Item = require('./models/items')
app.use(express.urlencoded({extended:true}));
const mongodb = 'mongodb+srv://rupesh:India1234@cluster0.jbg4z.mongodb.net/item-database?retryWrites=true&w=majority'
app.set('view engine','ejs');

mongoose.connect(mongodb,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    console.log('connected')
    app.listen(3000)
    }).catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.redirect('/get-items')
})
app.get('/get-items',(req,res)=>{
    Item.find().then(result=>{
        res.render('index',{items:result})
    })
})
app.get('/items/:id',(req,res)=>{
    const id = req.params.id
    const item = Item.findById(id).then(result=>{
        res.render('item-details', {item:result})
    })
})
app.delete('/items/:id',(req,res)=>{
    const id = req.params.id
    const item = Item.findByIdAndDelete(id).then((result)=>{
        res.json({redirect:'/get-items'})
    })
})
app.put('/items/:id',(req,res)=>{
    const id = req.params.id
    const item = Item.findByIdAndUpdate(id,req.body).then((result)=>{
        res.json({msg:'Update Successful'})
    })
})
app.get('/add-item',(req,res)=>{
    res.render('add-item')
})
app.post('/items',(req,res)=>{
    const item = new Item(req.body)
    item.save().then(()=>{
        res.redirect('/get-items')
    })
})
app.use((req,res)=>{
    res.render('error')
})