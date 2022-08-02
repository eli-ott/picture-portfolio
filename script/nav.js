//making the nav appears
document.getElementsByClassName('burger')[0].addEventListener('click', () => {
    document.getElementsByTagName('nav')[0].style.cssText = "transform: scaleX(1);";
    //making the links appear (TO DO)
});
document.getElementsByClassName('x')[0].addEventListener('click', () => {
    document.getElementsByTagName('nav')[0].style.cssText = "transform: scaleX(0);";
});