const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const rgbEl = document.querySelector('.rgb');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then(localStream => {
            console.log(localStream);
            //window.URL.createObjectURL(localStream) ---- 已經被棄用
            video.srcObject = localStream;
            video.play();
            
        })
        .catch(error => {
            console.log('Error');
            console.log(error);
        });
}

function paintCanvas(){
    let { videoWidth:width, videoHeight:height} = video;
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = setCanvasRgbRang(pixels);
        //ctx.globalAlpha = 0.8;
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/png');
    let link = document.createElement('a');
    let img = document.createElement('img');
    link.href = data;
    link.setAttribute('download');
    img.src = data;
    img.alt = 'CanvasPicture';
    link.appendChild(img);
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+= 4) {
        pixels.data[i + 0] += 100; //r
        pixels.data[i + 1] -= 50; //g
        pixels.data[i + 2] *= 0.5; //b
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+= 4) {
        pixels.data[i + 150] = pixels.data[i + 0] +  100; //r
        pixels.data[i + 100] = pixels.data[i + 1] -  50; //g
        pixels.data[i + 550] = pixels.data[i + 2] *  0.5; //b
    }
    return pixels;
}

function setCanvasRgbRang(pixels) {
    const levels = {};
    let allInput = rgbEl.querySelectorAll('input[type="range"]');
    allInput.forEach(i => {
        levels[i.name] = i.value;
    });
    for (let i = 0; i < pixels.data.length; i += 4) {
        let red = pixels.data[i],
            green = pixels.data[i + 1],
            blue = pixels.data[i + 2];

        if (red <= levels.rmax && 
            red >= levels.rmin &&
            green <= levels.gmax && 
            green >= levels.gmin &&
            blue <= levels.bmax && 
            blue >= levels.bmin) {
                pixels.data[i + 3] = 0;
            }
    }
    return pixels;
}

// fix canvas width and height
video.addEventListener('playing', paintCanvas);

getVideo();