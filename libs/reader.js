const Parser = require('rss-parser');
const htmlParse = require('node-html-parser');
const AWS = require('aws-sdk');
const fs = require('fs');
const Promise = require('bluebird');

let parser = new Parser();
const result_url = 'https://pollyaudio.sfo2.digitaloceanspaces.com';
const parse = htmlParse.parse;
// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
});

// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'LZKHCGZCLUZDAE4FDSIZ',
  secretAccessKey: 'o796Lc6+Wt2+LkXEYhjXnfOTMqtBLNJQEYGkmEXPhOk'
});


const pollyPromise = (params) => {
  return new Promise((resolve, reject) => {
    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        reject(err)
      } else if (data) {
        if (data.AudioStream instanceof Buffer) {
          resolve(data.AudioStream);
        }
      }
    })
  })
};

const saveFilePromise = (audioStream, filename) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, audioStream, (err) => {
      if (err) {
        reject(err)
      }
      resolve(filename)
    })
  })
}

const mergeFilesPromise = (files, filename) => {
  return new Promise((resolve, reject) => {
    fs.writeFileSync(filename);
    files.forEach((file) => {
      let readfile = fs.readFileSync(file.filename);
      fs.appendFileSync(filename, readfile);
    });
    resolve(filename);
  })
}

const getBuckets = (text) => {
  // 3,000 characters limit
  // default k = 100 words per bucket
  let document = parse(text).text.toString();
  let words = document.split(' ');
  var buckets = [];
  var _bucket = [];
  for(var i = 0; i < words.length; i++) {
    if(i % 100 === 0 && i > 0) {
      let paragraph = _bucket.join(' ');
      buckets.push(paragraph);
    }        
    if(i % 100 === 0) {
      _bucket = [];
    }
    _bucket.push(words[i]);
  }  
  buckets.push(_bucket.join(' '));
  return buckets;
}

const getBucketFiles = (text, title, baseParams) => {
  const document = getBuckets(text);
  const randomNum = Math.floor(Math.random() * 100) + 2;

  var files = [];
  for(var i = 0; i < document.length; i++) {
    const fileText = document[i];
    let params = {
      'Text': fileText,
      'OutputFormat': baseParams.OutputFormat,
      'VoiceId': baseParams.VoiceId
    }
    let filename = `./tmp/${title}${randomNum}${i+1}.mp3`
    let file = {params: params, filename: filename};
    files.push(file);
  }

  return files;
}

const getArticlesPromise = (url) => {
  return new Promise((resolve, reject) => {
    parser.parseURL(url, (err, feed) => {
      if (err) {
        reject(err);
      }
      resolve(feed);
    })
  })
}

const removeFilesPromise = (files) => {
  return Promise.map(files, (file) => {
    fs.unlinkSync(file);
  }, {
    concurrency: 4
  }).then(() => {
    return true
  })
}

const removeFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) {
        reject(err);
      }
      resolve(`${file} was deleted`);
    })
  })
}

const readFilePromise = (file, filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if(err) {
        reject(err);
      }
      var base64data = Buffer.from(data, 'binary');
      var params = {
        Body: base64data,
        Bucket: 'pollyaudio',
        Key: filename,
        ACL: 'public-read'
      }      
      resolve(params);
    })
  })
}

const uploadFileToDOPromise = (file, filename) => {
  return readFilePromise(file, filename).then((params) => {
    const putObjectPromise = s3.putObject(params).promise();
    return putObjectPromise.then((data) => {
      return  `${result_url}/${filename}`;
    }).catch((err) => {
      return err;
    })
  })
  .catch((err) => {
    return err;
  })
}

module.exports = {
  pollyPromise: pollyPromise,
  saveFilePromise: saveFilePromise,
  mergeFilesPromise: mergeFilesPromise,
  getArticlesPromise: getArticlesPromise,
  removeFilesPromise: removeFilesPromise,
  uploadFileToDOPromise: uploadFileToDOPromise,
  removeFilePromise: removeFilePromise,
  getBucketFiles: getBucketFiles
};
