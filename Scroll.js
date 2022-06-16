window.onload = () => {
    // 开启严格模式
    'use strict'
    // 取消浏览器对滚动条位置的记录
    history.scrollRestoration = 'manual'

    // 隐藏浏览器滚动条 
    document.documentElement.style.overflowY = 'hidden';
}

// class Lin
class Lin {
    // 构造函数
    constructor(data = {}) {
        this.linData = data;
        this.linNum = 0;
        this.linGetBox(this.linData.linBox);
        this.linGetContainer('lin-container');
    }

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
                this.linGetBox(this.linData.linBox);
            })
        })
    }

    linGetBox(Data = []) {
        const HTMLelement = document.getElementsByTagName('lin-box');
        Array.from(HTMLelement).forEach((element) => {
            for (let data of Data) {
                if (element.getAttribute('lin-name') === data.name) {
                    element.style.position = 'absolute';
                    element.style.transition = 'top' + ' ' + '0.9s' + ' ' + 'ease-out';
                    element.style.left = data.left + 'px' || 'auto';
                    element.style.top = data.top + this.linNum + 'px' || 'auto';
                    element.style.right = data.right + 'px' || 'auto';
                    element.style.bottom = data.bottom + 'px' || 'auto';
                    console.log(data.top + this.linNum)
                }
            }
        })
    }

}
