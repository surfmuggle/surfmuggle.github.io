import { pixelmatch } from '../libs/pixelmatch.mjs';
import { shout } from '../libs/shout.mjs';

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
