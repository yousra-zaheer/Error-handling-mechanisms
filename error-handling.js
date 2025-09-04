import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

//handler for uncaught exceptions and unhandled promise rejections
process.on("uncaughtException",(err)=>{
    console.log(err)
    process.exit(1)
})

//unhandled promise rejections
process.on("unhandledRejection",(reason,promise)=>{
    console.log(reason)
})

app.get('/',(req,res)=>{
  res.send('Hello Express')
})

//synchronours error
app.get('/sync-error',(req,res,next)=>{
    try{
        throw new Error('Something went wrong')
    }
    catch(error){
        next(error)
    }
})

//asynchronous error
app.get('/async-error',async(req,res,next)=>{
    try{
        await Promise.reject(new Error('async error occured'))
    }
    catch(error){
        next(error)
    }
})

//middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.message)
    console.log(err.stack)
    res.status(500).json({message:err.message})
});

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });