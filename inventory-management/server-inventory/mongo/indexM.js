const mongoose=require('mongoose');

const mongoURI="mongodb+srv://inventory:inventory@cluster0.7tx93.mongodb.net/comments?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(mongoURI,{
  useNewUrlParses:true,
  useUnifiedTopology:true
})
.then(()=>{console.log("Connected Successfully")})
.catch((err)=>{console.log("MongoDB connection failed"),err})