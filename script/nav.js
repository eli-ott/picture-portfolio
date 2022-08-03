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

    setTimeout(function() {
        document.getElementsByTagName('nav')[0].style.cssText = "transform: scaleX(0);";
        console.log((0.15 * links.length) * 10, links.length);
    }, (150 * links.length) + 150);
});