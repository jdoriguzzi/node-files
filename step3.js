const fs = require('fs');
const process = require('process');
const axios = require('axios');

// print data or write to file if --out specified 

function output(data, outFile) {
  if (outFile) {
    fs.writeFile(outFile, data, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${outFile}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

// read and print specified file 

function cat(path, outFile) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        } else {
            output(data, outFile);
        }
    });
}


// read and print a specified URL

async function webCat(url) {
    try {
        let response = await axios.get(url);
        output(response.data, outFile);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}
    

let arg = process.argv[2];
let outFile = false;

if (arg === '--out') {
    outFile = process.argv[3];
    arg = process.argv[4];
}
    
if (arg.slice(0, 4) === 'http') {
    webCat(arg, outFile);
} else {
    cat(arg, outFile);
}