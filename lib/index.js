/**
 * lib/index.js - plado-secretary
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 PLADO Inc. All rights reserved.
 */

'use strict'

const app = require('express')()
    , bodyParser = require('body-parser')
    , route = require('./route-wrapper')

/**
 * Basic config.
 */
app.set('etag', false)
app.set('x-powered-by', false)

/**
 * Middleware setup.
 */
app.use(require('./auth')(require('../auth.json')))
app.use(bodyParser.json())

/**
 * Routing.
 */
app.post('/sms', route(require('./sms')))
app.post('/call', route(require('./call')))

/**
 * Expose for testing & execution.
 */
module.exports = app