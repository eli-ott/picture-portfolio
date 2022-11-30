import { data } from './fetchData.js';

const linksContainer = document.getElementsByClassName('links-container')[0];
let timeoutDelay = 1500;

setTimeout(() => {
    document.dispatchEvent(new Event('click'));
}, timeoutDelay);

//creating the links
for (let i = 0; i < data.length; i++) {
    let newLink = document.createElement('a');

    newLink.setAttribute('index', i);
    newLink.classList.add('navigation-links');

    newLink.innerText = data[i].name;
    newLink.addEventListener('click', function() {
        description.style.cssText = 'opacity: 0;';

        timeoutDelay = 2000;
        window.scrollTo(0, 0);

        changePicture(i);
    });

    linksContainer.append(newLink);
}

let fullSizeBackground = document.getElementsByClassName('full-screen-image-background')[0];
let fullSizePic = document.getElementsByClassName('full-screen-image')[0];
let imageDescription = document.getElementsByClassName('image-description')[0];

fullSizePic.addEventListener('click', function(e) {
    e.stopPropagation();
});

//desactivating the click events for the fullSizeBackground children
fullSizeBackground.addEventListener('click', function() {
    fullSizeBackground.style.cssText = 'pointer-events: none; opacity: 0;';
});
let arrows = document.getElementsByClassName('arrow');
let fullScreenContainer = document.getElementsByClassName('full-screen-image-container')[0];
for(let i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener('click', function(e) {
        e.stopPropagation();

        fullScreenContainer.style.cssText = 'transition: opacity 0.125s ease; opacity: 0;';
        setTimeout(() => {
            let pictures = document.getElementsByClassName('picture');

            let splitSrc = fullSizePic.src.split('/');

            let picNativeSrc = splitSrc[splitSrc.length - 1];

            let picIndex = picNativeSrc.replace(/\D/g, "");

            let nextIndex;
            if(this.className.includes('left')) {
                nextIndex = --picIndex;
            } else if(this.className.includes('right')) {
                nextIndex = ++picIndex;
            }

            if(nextIndex == 1) {
                document.getElementsByClassName('left')[0].style.cssText = 'opacity: 0; pointer-events: none;';
            } else if(nextIndex == pictures.length - 1) {
                document.getElementsByClassName('right')[0].style.cssText = 'opacity: 0; pointer-events: none;';
            } else {
                document.getElementsByClassName('left')[0].style.cssText = 'opacity: 1; pointer-events: all;';
                document.getElementsByClassName('right')[0].style.cssText = 'opacity: 1; pointer-events: all;';
            }

            pictures[nextIndex - 1].className.includes('vertical') ? fullSizePic.setAttribute('class', 'full-screen-image vertical'): fullSizePic.setAttribute('class', 'full-screen-image horizontal');
            
            splitSrc[splitSrc.length - 1] = `photo_${nextIndex}.jpg`;
            
            fullSizePic.src = splitSrc.join('/');
            console.log(nextIndex);
            imageDescription.innerHTML = pictures[nextIndex - 1].getAttribute('description');
            fullScreenContainer.style.cssText = 'transition: opacity 0.125s ease; opacity: 1;'
        }, 125);
    });
}

const description = document.getElementsByClassName('description')[0];
const pictureContainer = document.getElementsByClassName('pictures-container')[0];


const changePicture = (categoryIndex) => {
    description.innerHTML = data[categoryIndex].description;

    //creating the pictures
    let picPath = `./assets/pictures/${data[categoryIndex].name}/`;
    document.getElementsByClassName('x')[0].dispatchEvent(new Event('click'));

    pictureContainer.innerHTML = "";
    for (let i = 0; i < data[categoryIndex].images.src.length; i++) {
        let newPic = document.createElement('img');

        newPic.src = picPath + data[categoryIndex].images.src[i];
        newPic.setAttribute('loading', 'lazy');
        newPic.setAttribute('index', i);
        newPic.setAttribute('description', data[categoryIndex].images.description[i]);
        newPic.classList.add('picture');

        newPic.onload = function() {
            if(newPic.getBoundingClientRect().width <= 690) {
                newPic.classList.add('vertical');
            } else {
                newPic.classList.add('horizontal');
            }
        }

        newPic.addEventListener('click', function() {
            fullSizePic.src = this.src;

            console.log(this.src.includes(1));
            if(this.src.includes('1', 20)) {
                document.getElementsByClassName('left')[0].style.cssText = 'opacity: 0; pointer-events: none;';
            } else if(this.src.includes(document.getElementsByClassName('picture').length - 1, 20)) {
                document.getElementsByClassName('right')[0].style.cssText = 'opacity: 0; pointer-events: none;';
            } else {
                document.getElementsByClassName('left')[0].style.cssText = 'opacity: 1; pointer-events: all;';
                document.getElementsByClassName('right')[0].style.cssText = 'opacity: 1; pointer-events: all;';
            }

            this.className.includes('vertical') ? fullSizePic.setAttribute('class', 'full-screen-image vertical'): fullSizePic.setAttribute('class', 'full-screen-image horizontal');
            fullSizeBackground.style.cssText = 'pointer-events: all; opacity: 1;';
            imageDescription.innerHTML = newPic.getAttribute('description');
        });
        
        pictureContainer.append(newPic);
    }

    setTimeout(() => {
        description.style.cssText = 'transition: opacity ease 0.5s; opacity: 1;';

        setTimeout(() => {
            const pictures = document.getElementsByClassName('picture');
            let delay = 0;
            for (let i = 0; i < pictures.length; i++) {
                pictures[i].style.cssText = `transition: 0.5s ease; transition-delay: ${delay}s; transform: rotateZ(0deg); opacity: 1;`
                delay += 0.25;
            }
        }, 500);

    }, timeoutDelay);
}
changePicture(0);

window.addEventListener('keydown', e => {
    if(e.key == "ArrowLeft") {
        document.getElementsByClassName('left')[0].dispatchEvent(new Event('click'));
    } else if(e.key == "ArrowRight") {
        document.getElementsByClassName('right')[0].dispatchEvent(new Event('click'));
    }
});