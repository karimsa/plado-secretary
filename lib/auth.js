/**
 * lib/auth.js - plado-secretary
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 PLADO Inc. All rights reserved.
 */

'use strict'

const basicAuth = require('basic-auth')

module.exports = ({ username, password }) => (req, res, next) => {
  let auth = basicAuth(req)

  if (!auth) {
    res.status(401)
       .set('WWW-Authenticate', 'Basic realm="magic"')
       .end('Error: Unauthorized')
  } else if (auth.name !== username || auth.pass !== password) {
    res.status(403).end('Error: Unauthorized')
  } else {
    next()
  }
}