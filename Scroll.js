// Prevents the browser from remembering the scroll position.
history.scrollRestoration = 'manual';

// Hide the browse scroll bar
document.documentElement.style.overflowY = 'hidden'; 

class Lin {
    /*
    * @function initialize 
    * @param 
    * @return void
    */
    constructor(){
        this.linNum = 0
    }

    linGetContainer(element){
        const HTMLelement = document.getElementsByTagName(element)
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'relative';
            element.style.display = 'inline-block';
            element.style.height = window.screen.availWidth + 'px';
            element.style.width = 100 + '%';

            /*
            * @function control the way with mouse scrolls
            */
            element.addEventListener('wheel',(event)=>{
                event.preventDefault();
                this.linNum -= event.deltaY;
                this.linGetBox('lin-box')
            })
        })
    }

    linGetBox(element) { 
        const HTMLelement = document.getElementsByTagName(element)
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'absolute';
            element.style.transition = 'top' + ' ' + '0.9s' + ' ' + 'ease-out' 
            if (element.getAttribute('l')) {
                element.style.left = element.getAttribute('l') +'px';
            } else if (element.getAttribute('r')) {
                element.style.right = element.getAttribute('r') + 'px';
            }
            if (element.getAttribute('t')) {
                element.style.top = Number(element.getAttribute('t')) + this.linNum + 'px';
                console.log(element.getAttribute('t') + this.linNum + 'px');
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


