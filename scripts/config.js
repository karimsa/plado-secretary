#!/usr/bin/env node

/**
 * scripts/config.js - secretary
 * 
 * Licensed under MIT.
 * Copyright (C) 2017 PLADO Inc. All rights reserved.
 */

'use strict'

const fs = require('fs')
    , path = require('path')
    , rl = require('readline').createInterface({
        input: process.stdin
      , output: process.stdout
      })

/**
 * Creates appropriate indent for a given level.
 */
const ws = level => {
  return [... new Array(level).keys()]
    .map(_ => '  ')
    .join('')
}

/**
 * Recursively prompt for property replacement.
 */
const promptFor = function(object, done, level = 0) {
  let i = -1
  const keys = Object.keys(object)
      , next = () => {
        i += 1

        if (i < keys.length) {
          // if it's an array, do recursive walk
          // but don't show indices
          if (object[keys[i]] instanceof Array) {
            let j = -1
            const subnext = () => {
              ++ j

              if (j < object[keys[i]].length) {
                promptFor(object[keys[i]][j], value => {
                  object[keys[i]][j] = value
                  if ((j + 1) < object[keys[i]].length) console.log('')
                  subnext()
                }, level + 1)
              } else next()
            }

            subnext()
          }

          // if value is an object, do recursive walk
          else if (typeof object[keys[i]] === 'object') {
            console.log(`${ws(level)}${keys[i]}:`)
            promptFor(object[keys[i]], value => {
              object[keys[i]] = value
              next()
            }, level + 1)
          }

          // otherwise grab from readline
          else rl.question(`${ws(level)}${keys[i]} [${object[keys[i]]}]: `, answer => {
            // default to existing value
            object[keys[i]] = answer.trim() || object[keys[i]]
            next()
          })
        } else done(object)
      }

  next()
}

// grab json using native require
const config = require('../config.json')

// start run through entire config
promptFor(config, config => {
  rl.close()
  fs.writeFile(path.resolve(__dirname, '..', 'config.json'), JSON.stringify(config, null, 2), err => {
    if (err) throw err
  })
})