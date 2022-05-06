// Prevents the browser from remembering the scroll position.
history.scrollRestoration = 'manual';

// Hide the browse scroll bar
document.documentElement.style.overflowY = 'hidden';

// main
class Lin {
    /*
    * @function initialize 
    * @param 
    * @return void
    */
    constructor() {
        this.linNum = 0;
    }

    /*
    * @function control this page,set come essential data
    * @param element{string} tag name ('lin-container')
    * @return void
    */
    linGetContainer(element) {
        const HTMLelement = document.getElementsByTagName(element);
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'relative';
            element.style.display = 'inline-block';
            element.style.height = window.screen.availHeight + 'px';
            element.style.width = 100 + '%';

            /*
            * @function control the way with mouse scrolls
            */
            element.addEventListener('wheel', (event) => {
                event.preventDefault();
                this.linNum -= event.deltaY;
                if (this.linNum >= 0) {
                    this.linNum = 0;
                }
                if (this.linNum <= -window.screen.availHeight) {
                    this.linNum = -window.screen.availHeight;
                }
                this.linGetBox('lin-box');
            })
        })
    }

    /*
    * @function read the attribution  for lin-box and set them with these attributions.
    * @param element{string} tag name ('lin-box')
    * @return void
    */
    linGetBox(element) {
        const HTMLelement = document.getElementsByTagName(element);
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'absolute';
            element.style.transition = 'top' + ' ' + '0.9s' + ' ' + 'ease-out';
            if (element.getAttribute('l')) {
                element.style.left = element.getAttribute('l') + 'px';
            } else if (element.getAttribute('r')) {
                element.style.right = element.getAttribute('r') + 'px';
            }
            if (element.getAttribute('t')) {
                element.style.top = Number(element.getAttribute('t')) + this.linNum + 'px';
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

    linGetScrollBar() {
        const scrollBar = document.getElementsByTagName('lin-scroll-bar');
    }
}

let lin = new Lin()

window.addEventListener('load', function () {
    if (document.getElementsByTagName('lin-container')) {
        lin.linGetContainer('lin-container');
    }
    if (document.getElementsByTagName('lin-box')) {
        lin.linGetBox('lin-box');
    }
    if (document.getElementsByTagName('lin-scroll-bar')) {
        lin.linGetScrollBar()
    }
})


