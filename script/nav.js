let links = document.getElementsByClassName('navigation-links');

//making the nav appears
document.getElementsByClassName('burger')[0].addEventListener('click', () => {
    document.getElementsByTagName('nav')[0].style.cssText = "transform: scaleX(1);";

    let delay = 0;
    setTimeout(() => {
        for (let i = 0; i < links.length; i++) {
            links[i].style.cssText = `transition-delay: ${delay}s; transform: skewY(0deg); opacity: 1;`;
            delay += 0.15;
        }
    }, 1250);
});

document.getElementsByClassName('x')[0].addEventListener('click', () => {
    let delay = 0;
    for (let i = 0; i < links.length; i++) {
        links[i].style.cssText = `transition-delay: ${delay}s; transform: skewY(10deg); opacity: 0;`;
        delay += 0.15;
    }

    setTimeout(function () {
        document.getElementsByTagName('nav')[0].style.cssText = "transform: scaleX(0);";
        console.log((0.15 * links.length) * 10, links.length);
    }, (150 * links.length) + 150);
});

//creating the picture chang animation
for(let i = 0; i < links.length; i++) {
    links[i].addEventListener('mouseover', function() {
        let catergoryIndex = this.index;
    });
}

//making the pictures follow the cursor
//https://www.superhi.com/video/smooth-movements-with-javascript

const image = document.getElementsByClassName("link-image-container")[0];

let mouseX = 0;
let mouseY = 0;

let imageX = 0;
let imageY = 0;

let speed = 0.25;


function movePicture() {

    let distX = mouseX - imageX;
    let distY = mouseY - imageY;


    imageX = imageX + (distX * speed);
    imageY = imageY + (distY * speed);

    let centerX = Math.max(Math.min(imageX - (image.offsetWidth / 2), window.innerWidth - image.offsetWidth), 0);
    let centerY = Math.max(Math.min(imageY - (image.offsetHeight / 2), window.innerHeight - image.offsetHeight), 0);

    image.style.left = `${centerX}px`;
    image.style.top = `${centerY}px`;

    requestAnimationFrame(movePicture);
}
movePicture();

document.addEventListener("mousemove", function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
});