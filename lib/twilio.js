/**
 * lib/twilio.js - plado-secretary
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 PLADO Inc. All rights reserved.
 */

'use strict'

const { key, secret } = require('rc')('twilio')
module.exports = require('twilio')(key, secret)