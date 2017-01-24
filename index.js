/**
 * index.js - plado-secretary
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 PLADO Inc. All rights reserved.
 */

'use strict'

const fs = require('fs')
    , path = require('path')
    , https = require('https')

https
  .createServer({
    key: fs.readFileSync(path.resolve(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, 'ssl', 'server.crt'))
  }, require('./lib'))
  .on('error', err => console.error(err))
  .listen(443, _ => console.log('listening'))