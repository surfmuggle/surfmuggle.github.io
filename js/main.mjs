import { pixelmatch } from '../libs/pixelmatch.mjs';
import { shout } from '../libs/shout.mjs';


function callFromModule(){
 

    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    // const canvas = document.getElementById("cnv3");
    // const ctx = canvas.getContext('2d');
    // ctx.rect(10, 10, 100, 100);
    // ctx.fill();
    // let imageData = ctx.getImageData(60, 60, 200, 100);
    // ctx.putImageData(imageData, 150, 10);

    
    var diffImage = document.createElement("img");
    diffImage.height = img1.height
    diffImage.width = img1.width

    

    pixelmatch(img1.data, img2.data, diffImage.data, img1.width, img1.height, {threshold: 0.1});

    const resultBox = document.getElementById("resultBox");
    resultBox.appendChild(diffImage);

    // ctx3.putImageData(diff, 0, 0);

     
    // var numDiffPixels = pixelmatch(img1, img2, diff, 800, 600, {threshold: 0.1});


    // pixelmatch(img1, img2, output, width, height[, options])
    // img1, img2 — Image data of the images to compare (Buffer or Uint8Array). Note: image dimensions must be equal.
    // output — Image data to write the diff to, or null if don't need a diff image.
    // width, height — Width and height of the images. Note that all three images need to have the same dimensions.


}

document.querySelector('button.js-shout').addEventListener('click', callFromModule);