const mongoose=require('mongoose')

const connection=mongoose.connect('mongodb://127.0.0.1:27017/instaloginchrome').then(()=>{
    console.log('connected to database')

})

module.exports=connection