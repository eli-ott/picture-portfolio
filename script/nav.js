import { data } from './fetchData.js';

const links = document.getElementsByClassName('navigation-links');

const linkPicContainer = document.getElementsByClassName('link-image-container')[0];
const linkPic = document.getElementsByClassName('link-image')[0];
const transitionPic = document.getElementsByClassName('transition-image')[0];

//creating the picture change animation
for(let i = 0; i < links.length; i++) {
    links[i].addEventListener('mouseover', function() {
        let categoryIndex = this.getAttribute('index');
        let picPath = `./assets/pictures/${data[categoryIndex].name}/`;

        transitionPic.src = picPath + data[categoryIndex].images.src[0];
        
        transitionPic.style.cssText = 'animation: slidePic 0.15s 0s ease-in-out infinite';
        setTimeout(() => {
            linkPic.src = transitionPic.src;
            transitionPic.style.cssText = 'animation: none;';
            linkPic.style.cssText = 'left: 0;';
        }, 150);
    });
    document.getElementsByClassName('links-container')[0].addEventListener('mouseenter', () => {
        linkPicContainer.style.opacity = 1;
    });
    document.getElementsByClassName('links-container')[0].addEventListener('mouseleave', () => {
        linkPicContainer.style.opacity = 0;
    });
}

//making the nav appears
document.getElementsByClassName('burger')[0].addEventListener('click', () => {
    document.getElementsByTagName('nav')[0].style.cssText = "transition: transform ease-in-out 1.25s; transform: scaleX(1);";

    let delay = 0;
    setTimeout(() => {
        for (let i = 0; i < links.length; i++) {
            links[i].style.cssText = `pointer-events: all; transition-delay: ${delay}s; transform: skewY(0deg); opacity: 1;`;
            delay += 0.15;
        }
    }, 1250);
});

document.getElementsByClassName('x')[0].addEventListener('click', () => {
    linkPicContainer.style.opacity = 0;

    let delay = 0;
    for (let i = 0; i < links.length; i++) {
        links[i].style.cssText = `pointer-events: none; transition-delay: ${delay}s; transform: skewY(10deg); opacity: 0;`;
        delay += 0.15;
    }

    setTimeout(function () {
        document.getElementsByTagName('nav')[0].style.cssText = "transition: transform ease-in-out 1.25s; transform: scaleX(0);";
    }, (150 * links.length) + 150);
});

//making the pictures follow the cursor
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