#!/usr/bin/env node

/**
 * scripts/auth.js - secretary
 * 
 * Licensed under MIT.
 * Copyright (C) 2017 PLADO Inc. All rights reserved.
 */

'use strict'

const fs = require('fs')
    , path = require('path')
    , crypto = require('crypto')

fs.writeFile(path.resolve(__dirname, '..', 'auth.json'), JSON.stringify({
  username: crypto.randomBytes(16).toString('hex'),
  password: crypto.randomBytes(32).toString('hex')
}, null, 2), err => {
  if (err) console.log(err)
})