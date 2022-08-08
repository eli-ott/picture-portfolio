import { data } from './fetchData.js';

const linksContainer = document.getElementsByClassName('links-container')[0];
let timeoutDelay = 1500;

//creating the links
for (let i = 0; i < data.length; i++) {
    let newLink = document.createElement('a');

    newLink.setAttribute('index', i);
    newLink.classList.add('navigation-links');

    newLink.innerText = data[i].name;

    linksContainer.append(newLink);
}

const links = document.getElementsByClassName('navigation-links');
const description = document.getElementsByClassName('description')[0];

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {

        description.style.cssText = 'opacity: 0;';

        timeoutDelay = 2000;
        let categoryIndex = this.getAttribute('index');

        changePicture(categoryIndex);
    });
}
const pictureContainer = document.getElementsByClassName('pictures-container')[0];

const changePicture = (categoryIndex) => {
    description.innerHTML = data[categoryIndex].description;

    //creating the pictures
    let picPath = `./assets/pictures/${data[categoryIndex].name}/`;
    document.getElementsByClassName('x')[0].dispatchEvent(new Event('click'));

    for (let i = 0; i < data[categoryIndex].images.src.length; i++) {
        pictureContainer.innerHTML = "";

        let newPic = document.createElement('img');

        newPic.src = picPath + data[categoryIndex].images.src[i];
        newPic.classList.add('picture');

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