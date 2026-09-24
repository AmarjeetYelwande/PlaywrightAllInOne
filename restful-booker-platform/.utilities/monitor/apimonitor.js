const http = require('http');
const https = require('https');

makeHttpRequest = (endpoint) => {
  http.get(endpoint, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
        data += chunk;
    });
    
    response.on('end', () => {
      if(response.statusCode !== 200){
        process.stdout.write('.');

        setTimeout(() => {
          makeHttpRequest(endpoint);
        }, 5000);
      } else {
        process.stdout.write('\n' + endpoint + ' ready ');
      }
    });

  }).on('error', () => {
      process.stdout.write('.')
      setTimeout(() => {
        makeHttpRequest(endpoint);
      }, 5000);
  });
}

makeHttpsRequest = (endpoint) => {
  https.get(endpoint, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
        data += chunk;
    });
    
    response.on('end', () => {
      if(response.statusCode !== 200){
        process.stdout.write('.');
        
        setTimeout(() => {
          makeHttpsRequest(endpoint);
        }, 5000);
      } else {
        process.stdout.write('\n' + endpoint + ' ready ');
      }
    });

  }).on('error', () => {
      process.stdout.write('.')
      setTimeout(() => {
        makeHttpsRequest(endpoint);
      }, 5000);
  });
}

exports.checkForLife = (protocol, endpoint) => {
  if(protocol === 'https'){
    makeHttpsRequest(endpoint);
  } else if (protocol === 'http'){
    makeHttpRequest(endpoint, (requestResult) => {
      if(requestResult !== 200){
        setTimeout(() => {
          makeHttpRequest(endpoint)
        }, 5000);
      }
    });
  } else {
    console.log("Protocol not recognised. I can only handle 'http' or 'https'")
  }
}
