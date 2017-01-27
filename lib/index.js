/**
 * lib/index.js - plado-secretary
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 PLADO Inc. All rights reserved.
 */

'use strict'

const app = require('express')()
    , io = require('socket.io')(require('../config')['socket.io'].port)
    , bodyParser = require('body-parser')
    , route = require('./route-wrapper')
    , handleMessage = require('./sms/outgoing')

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
 * Routes from Twilio.
 */
app.post('/sms', route(require('./sms')))
app.post('/call', route(require('./call')))

/**
 * Routes to Twilio.
 */
io.on('connection', sock => {
    sock.on('message', ({ token, data }) => {
        // TODO: token verification
        handleMessage(data)
    })
})

/**
 * Expose for testing & execution.
 */
module.exports = app