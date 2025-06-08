const sum = (req, res) => {

  console.log("Inside sum function");

  if(req.url.toLocaleLowerCase() === '/calculate' && req.method === 'POST') {
    const body=[];

    req.on('data', chunk => {
      body.push(chunk);
    });

    req.on('end', () => {
      const fullBody=Buffer.concat(body).toString();
      const params = new URLSearchParams(fullBody);

      // const bodyObject = Object.fromEntries(params.entries());
      // const result = Number(bodyObject.first) + Number(bodyObject.second); Can do this or the below

      const num1 = parseInt(params.get('num1'));
      const num2 = parseInt(params.get('num2'));

      const sum = num1+num2;

      res.write(`<html>
      <head><title>Result</title></head>
      <body>
      <h1>The Sum of ${num1} and ${num2} is ${sum}</h1>
      <a href="/">Go back</a>
      </body>
      </html>`);
      return res.end();
    });
  }

}

exports.sum = sum;