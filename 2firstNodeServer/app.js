const http =  require('http');

function requestListener(req, res){
  console.log(req);
}


const server = http.createServer(requestListener);


const port=3000; // variable port name

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});


/*

http.createServer((req, res)=>{
console.log(req);
})

*/


