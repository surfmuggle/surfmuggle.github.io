#!/usr/bin/env node
/* eslint-disable no-process-exit */
/* 

  taken from https://github.com/mapbox/pixelmatch 
  
  License:  ISC License
    Copyright (c) 2019, Mapbox

    Permission to use, copy, modify, and/or distribute this software for any purpose
    with or without fee is hereby granted, provided that the above copyright notice
    and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
    FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
    OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
    TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
    THIS SOFTWARE.

*/

'use strict';

const PNG = require('pngjs').PNG;
const fs = require('fs');
const match = require('../.');

if (process.argv.length < 4) {
    console.log('Usage: imagematch image1.png image2.png [diff.png] [threshold=0.005] [includeAA=false]');
    process.exit(64);
}

const [,, img1Path, img2Path, diffPath, threshold, includeAA] = process.argv;
const options = {
    threshold: +threshold,
    includeAA: includeAA !== undefined && includeAA !== 'false'
};

const img1 = PNG.sync.read(fs.readFileSync(img1Path));
const img2 = PNG.sync.read(fs.readFileSync(img2Path));

const {width, height} = img1;

if (img2.width !== width || img2.height !== height) {
    console.log(`Image dimensions do not match: ${width}x${height} vs ${img2.width}x${img2.height}`);
    process.exit(65);
}

const diff = diffPath ? new PNG({width, height}) : null;

console.time('matched in');
const diffs = match(img1.data, img2.data, diff ? diff.data : null, width, height, options);
console.timeEnd('matched in');

console.log(`different pixels: ${diffs}`);
console.log(`error: ${Math.round(100 * 100 * diffs / (width * height)) / 100}%`);

if (diff) {
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
}
process.exit(diffs ? 66 : 0);
