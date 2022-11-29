window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    function drawCanvas0() {
        const canvas = document.getElementById(`canvas-0`);
        const ctx = canvas.getContext(`2d`, {alpha:true, colorSpace:'srgb', desynchronized:false, willReadFrequently:true});
        const imageData = ctx.createImageData(100, 100);
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i + 0] = 190;  // R
            imageData.data[i + 1] = 0;    // G
            imageData.data[i + 2] = 210;  // B
            imageData.data[i + 3] = 255;  // A
        }
        ctx.putImageData(imageData, 20, 20);
    }
    function drawCanvas1() {
        const canvas = document.getElementById(`canvas-1`);
        const ctx = canvas.getContext(`2d`, {alpha:true, colorSpace:'srgb', desynchronized:false, willReadFrequently:true});
        const imageData = ctx.createImageData(100, 100);
        for (let i = 0; i < 100; i++) {
            dot(imageData, 0,i, 255,0,0,255)
            dot(imageData, 99,i, 255,0,0,255)
            dot(imageData, i,0, 255,0,0,255)
            dot(imageData, i,99, 255,0,0,255)
        }
        ctx.putImageData(imageData, 20, 20);
    }
    function drawCanvas2() {
        const canvas = document.getElementById(`canvas-2`);
        const ctx = canvas.getContext(`2d`, {alpha:true, colorSpace:'srgb', desynchronized:false, willReadFrequently:true});
        const imageData = ctx.createImageData(100, 100);
        for (let x = 0; x < 100; x+=2) {
            for (let y = 0; y < 100; y+=2) {
                if (0 == ((x+y) % 2)) {
                    dot(imageData, x,y, 0,0,255,255)
                }
            }
        }
        ctx.putImageData(imageData, 20, 20);
    }
    function dot(imageData, x, y, r, g, b, a) { // 点を打つ（指定した座標x,yに指定した色rgbaの）
        imageData.data[(x + y * imageData.width) * 4] = r
        imageData.data[(x + y * imageData.width) * 4 + 1] = g
        imageData.data[(x + y * imageData.width) * 4 + 2] = b
        imageData.data[(x + y * imageData.width) * 4 + 3] = a
    }
    function drawCanvas3() {
        const canvas = document.getElementById(`canvas-3`);
        const ctx = canvas.getContext(`2d`, {alpha:true, colorSpace:'srgb', desynchronized:false, willReadFrequently:true});
        const imageData = ctx.createImageData(100, 100);
        ctx.fillStyle = `rgb(0,255,0)`;
        for (let x = 0; x < 100; x+=2) {
            for (let y = 0; y < 100; y+=2) {
                if (0 == ((x+y) % 2)) {
                    ctx.fillRect(x,y,1,1);
                }
            }
        }
    }
    function performance(method) {
        const startTime = Date.now() // performance.now()
        method()
        const endTime = Date.now() // performance.now()
        console.log(method.name, endTime - startTime, 'ms')
    }
    /*
    drawCanvas0()
    drawCanvas1()
    drawCanvas2()
    drawCanvas3()
    */
    performance(drawCanvas0)
    performance(drawCanvas1)
    performance(drawCanvas2)
    performance(drawCanvas3)
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

