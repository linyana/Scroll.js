window.onload = () => {
    // 开启严格模式
    'use strict'
    // 取消浏览器对滚动条位置的记录
    history.scrollRestoration = 'manual'
    // 隐藏浏览器滚动条 
    document.documentElement.style.overflowY = 'hidden';
}

class Lin {
    /*
     * @function Read the information entered by the user and do some initialization
     * @function 读取用户输入的信息，并且进行一些初始化。
     * @param data {{}[]} the information entered by the user
     * @param data {{}[]} 用户输入的信息 
     * @return void
     */
    constructor(data) {
        this.linData = data;
        this.linNum = 0;
        this.linSetContainer();
        this.linSetBox();
        this.linSetScrollBar();
    }

    /*
     * @function Initialize the basic properties of lin-container
     * @function 初始化lin-container的基本属性
     * @return void
     */
    linSetContainer() {
        const HTMLelement = document.getElementsByTagName('lin-container');
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'relative';
            element.style.display = 'inline-block';
            element.style.height = window.screen.availHeight + 'px';
            element.style.width = '100%';
            element.style.overflow = 'hidden';
            /*
             * @function control the way with mouse scrolls
             * @function 捕获鼠标滚动事件并设置滚动速度
             */
            element.addEventListener('wheel', (event) => {
                event.preventDefault();
                // 设置滚动速度为Lin类里设置的linSpeed，如果未设置则默认为该设备的滚动速度。
                this.linSpeed = this.linData.linSpeed || Math.abs(event.deltaY);
                if (event.deltaY < 0) {
                    this.linNum -= this.linSpeed;
                } else {
                    this.linNum += this.linSpeed;
                }
                // 限制最高点
                if (this.linNum <= 0) {
                    this.linNum = 0;
                }
                // 限制最低点
                if (this.linNum >= window.screen.availHeight) {
                    this.linNum = window.screen.availHeight;
                }
                this.linScrollBox();
                if (document.getElementsByTagName('lin-scroll-bar')) {
                    this.linScrollBar();
                }
                this.linSetPage();
            })
        });
    }

    /*
     * @function Initialize the basic properties of lin-page
     * @function 初始化lin-page的基本属性
     * @return void
     */
    linSetPage() {
        const HTMLelement = document.getElementsByTagName('lin-page');
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'absolute';
            element.style.top = -this.linNum + 'px';
            element.style.width = '100%';
            element.style.height = '100%';
            element.style.transition = 'all 0.8s ease-out';
        });
    }


    /*
     * @function Initialize the basic properties of lin-box
     * @function 初始化lin-box的基本属性
     * @return void
     */
    linSetBox() {
        const HTMLelement = document.getElementsByTagName('lin-box');
        // 遍历linBox并给linBox设置一些基本属性
        Array.from(HTMLelement).forEach((element) => {
            if (this.linData.linBox) {
                for (let data of this.linData.linBox) {
                    if (element.getAttribute('name') === data.name) {
                        element.style.position = 'absolute';
                        element.style.transition = 'all 1s ease-out'
                        element.style.left = data.left + 'px' || 'auto';
                        element.style.top = data.top + 'px' || 'auto';
                        element.style.right = data.right + 'px' || 'auto';
                        element.style.bottom = data.bottom + 'px' || 'auto';
                    }
                    else if (element.getAttribute('name') === null) {
                        element.style.position = 'absolute';
                        element.style.transition = 'all 1s ease-out';
                        element.style.top = -this.linNum + 'px';
                    }
                }
            }
        })
    }

    /*
     * @function Determine what to do while the mouse is scrolling
     * @function 判断鼠标滚动时应该进行的操作
     * @return void
     */
    linScrollBox() {
        const HTMLelement = document.getElementsByTagName('lin-box');
        Array.from(HTMLelement).forEach((element) => {
            if (this.linData.linBox) {
                for (let data of this.linData.linBox) {
                    if (element.getAttribute('name') === data.name) {
                        let direction = data.direction || 'top';
                        // 如果start和end同时不为空
                        console.log(data.start)
                        if (data.start !== null && data.end !== null) {
                            // 判断开始和结尾
                            if (data.start <= data.end) {
                                if (this.linNum <= data.start) {
                                    element.style[direction] = data.from + 'px';
                                } else if (this.linNum >= data.end) {
                                    element.style[direction] = data.to + 'px';
                                }
                                if (this.linNum >= data.start && this.linNum <= data.end) {
                                    // 如果设置了起点和终点
                                    if (data.from !== null&& data.to !== null) {
                                        element.style[direction] = (((this.linNum - data.start) / (data.end - data.start)) * (data.to - data.from)) + data.from + 'px';
                                    } else {
                                        element.style[direction] = this.linNum + 'px';
                                    }
                                }
                                console.log(element.offsetTop)
                            }
                            // 判断开始和结尾
                            else if (data.start > data.end) {
                                console.error('请勿把end设置成大于start的值')
                            }
                        }
                    }
                    else if (element.getAttribute('name') === null) {
                        element.style.top = -this.linNum + 'px';
                    }
                }
            }
        });
    }

    /*
     * @function Initialize the basic properties of lin-scroll-bar
     * @function 初始化lin-scroll-bar的基本属性
     * @return void
    */
    linSetScrollBar() {
        const HTMLelement = document.getElementsByTagName('lin-scroll-bar');
        Array.from(HTMLelement).forEach((element) => {
            element.style.width = '10px';
            element.style.zIndex = '999999999';
            element.style.height = '100%';
            element.style.position = 'absolute';
            element.style.right = '0';
            element.style.top = '0';
            element.style.border = '1px solid #cacdd1';
            element.style.backgroundColor = '#fff';
            // 创建滚动条
            const e = document.createElement('lin-bar');
            element.appendChild(e);
            e.style.width = '8px';
            e.style.position = 'absolute';
            e.style.height = '300px';
            e.style.backgroundColor = '#3bbbbb';
            e.style.left = '1px';
            e.style.borderRadius = '4px';
            e.style.transition = 'all 0.8s ease-out'
            if (this.linData.linScrollBar) {
                let data = this.linData.linScrollBar;
                e.style.backgroundColor = data.bgColor || '#3bbbbb';
                e.style.height = data.height + 'px' || '300px';
                if (data.fatherShow) {
                    element.style.border = 'none';
                    element.style.backgroundColor = 'transparent';
                }
            }
        })
    }

    /*
     * @function Calculate how far the scroll bar should scroll while the mouse is scrolling
     * @function 计算鼠标滚动时滚动条应该滚动的距离
     * @return void
    */
    linScrollBar() {
        const HTMLelement = document.getElementsByTagName('lin-bar');
        Array.from(HTMLelement).forEach((element) => {
            const totalHeight = window.screen.availHeight;
            const clientHeight = document.documentElement.clientHeight;
            const top = (this.linNum / totalHeight) * (clientHeight - element.offsetHeight)
            element.style.top = top + 'px';
        })
    }
}