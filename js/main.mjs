import { pixelmatch } from '../libs/pixelmatch.mjs';
import { shout } from '../libs/shout.mjs';


function callFromModule(){
 
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    const canvas = document.getElementById("cnv3");
    const ctx = canvas.getContext('2d');
    ctx.rect(10, 10, 100, 100);
    ctx.fill();
    let imageData = ctx.getImageData(60, 60, 200, 100);
    ctx.putImageData(imageData, 150, 10);
           
    // pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
    // ctx3.putImageData(diff, 0, 0);

    // var numDiffPixels = pixelmatch(img1, img2, diff, 800, 600, {threshold: 0.1});

}

document.querySelector('button.js-shout').addEventListener('click', callFromModule);