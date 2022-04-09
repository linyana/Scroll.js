// Prevents the browser from remembering the scroll position.
history.scrollRestoration = 'manual';

class Lin {
    /*
    * @function initialize 
    * @param 
    * @return void
    */
    constructor(){
        
    }

    linGetContainer(element){
        const HTMLelement = document.getElementsByTagName(element)
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'relative'; 
        })
    }

    linGetBox(element) { 
        const HTMLelement = document.getElementsByTagName(element)
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'absolute';
            if (element.getAttribute('l')) {
                element.style.left = element.getAttribute('l') + 'px';
            } else if (element.getAttribute('r')) {
                element.style.right = element.getAttribute('r') + 'px';
            }
            if (element.getAttribute('t')) {
                element.style.top = element.getAttribute('t') + 'px';
            } else if (element.getAttribute('b')) {
                element.style.bottom = element.getAttribute('b') + 'px';
            }
            if (element.getAttribute('w')) { 
                element.style.width = element.getAttribute('w') + 'px';
            }
            if (element.getAttribute('h')) { 
                element.style.height = element.getAttribute('h') + 'px';
            }
        })
    }
}

let lin = new Lin()

window.addEventListener('load',function(){
    if(document.getElementsByTagName('lin-container')){
        lin.linGetContainer('lin-container')
    }
    if(document.getElementsByTagName('lin-box')){
        lin.linGetBox('lin-box')
    }
})


