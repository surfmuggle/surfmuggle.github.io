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




function getCanvasContextFromImage(imageId)
{
    const img = document.getElementById(imageId);
    let cnv = document.createElement("canvas");
    let ctx = cnv.getContext("2d")
    ctx.drawImage(img,0,0);
    return ctx;
}


function callFromModule()
{

    const cnvResult = document.getElementById('cnvResult');
    const cnvResultCtx = cnvResult.getContext('2d');
    
    let ctx1 = getCanvasContextFromImage("imgBefore");
    let ctx2 = getCanvasContextFromImage("imgAfter");
    ctx1.height    
            
    pixelmatch(ctx1.data, ctx2.data, cnvResultCtx.data, ctx1.width, ctx1.height, {threshold: 0.1});

    const resultBox = document.getElementById("resultBox");
    resultBox.appendChild(diffImage);

    // ctx3.putImageData(diff, 0, 0);
     
    // var numDiffPixels = pixelmatch(img1, img2, diff, 800, 600, {threshold: 0.1});


    // pixelmatch(img1, img2, output, width, height[, options])
    // img1, img2 — Image data of the images to compare (Buffer or Uint8Array). 
    // Note: image dimensions must be equal.
    // output — Image data to write the diff to, or null if don't need a diff image.
    // width, height — Width and height of the images. Note that all three images need to have the same dimensions.


}
document.querySelector('button.js-shout').addEventListener('click', callFromModule);
