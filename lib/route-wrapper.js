/**
 * lib/route-wrapper.js - plado-secretary
 * 
 * Licensed under MIT.
 * Copyright (C) 2017 PLADO Inc. All rights reserved.
 */

'use strict'

module.exports = route => (req, res) =>
  route(req.body)
    .then(data => res.end(data))
    .catch(err => res.status(500).end(String(err)))