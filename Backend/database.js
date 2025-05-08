const {createConnection} = require('mysql');

const connection = createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'zellexy',
})

// connection.query('select * from businesses;',(err, result, fields)=>{
//   if(err){
//     console.log(err)
//   }
//   return console.log(result);
// })

connection.query('select * from businesses;',(err, result, fields)=>{
  if(err){
    console.log(err)
  }
  return console.log(result);
})