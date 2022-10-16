window.onload = () => {
    // 开启严格模式
    'use strict'
    // 取消浏览器对滚动条位置的记录
    history.scrollRestoration = 'manual'
    // 隐藏浏览器滚动条 
    document.documentElement.style.overflowY = 'hidden';
}

class Lin {
    // 构造函数
    constructor(data = {}) {
        this.linData = data;
        this.linNum = 0;
        this.linSetContainer();
        this.linSetBox();
    }

    // 初始化
    linSetContainer() {
        const HTMLelement = document.getElementsByTagName('lin-container');
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'relative';
            element.style.display = 'inline-block';
            element.style.height = window.screen.availHeight + 'px';
            element.style.width = '100%';
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
                    console.log(window.screen.availHeight)
                }
                this.linScrollBox();
            })
        });
    }


    // 初始化linBox
    linSetBox() {
        const HTMLelement = document.getElementsByTagName('lin-box');
        // 遍历linBox并给linBox设置一些基本属性
        Array.from(HTMLelement).forEach((element) => {
            for (let data of this.linData.linBox) {
                if (element.getAttribute('lin-name') === data.name) {
                    element.style.position = 'absolute';
                    if (data.direction) {
                        element.style.transition = data.direction + ' 1s ease-out';
                    } else {
                        element.style.transition = 'top 1s ease-out'
                    }
                    element.style.left = data.left + 'px' || 'auto';
                    element.style.top = data.top + 'px' || 'auto';
                    element.style.right = data.right + 'px' || 'auto';
                    element.style.bottom = data.bottom + 'px' || 'auto';
                }
                else if (element.getAttribute('lin-name') === null) {
                    element.style.position = 'absolute';
                    element.style.transition = 'all 1s ease-out';
                    element.style.top = -this.linNum + 'px';
                }
            }
        })
    }

    // 滚动
    linScrollBox() {
        const HTMLelement = document.getElementsByTagName('lin-box');
        Array.from(HTMLelement).forEach((element) => {
            for (let data of this.linData.linBox) {
                if (element.getAttribute('lin-name') === data.name) {
                    let direction = data.direction || 'top';
                    // 如果start和end同时不为空
                    if (data.start && data.end) {
                        // 判断开始和结尾
                        if (data.start <= data.end) {
                            if (this.linNum <= data.start) {
                                element.style[direction] = data.from + 'px';
                            } else if (this.linNum >= data.end) {
                                element.style[direction] = data.to + 'px';
                            }
                            if (this.linNum >= data.start && this.linNum <= data.end) {
                                // 如果设置了起点和终点
                                if (data.from && data.to) {
                                    element.style[direction] = (((this.linNum - data.start) / (data.end - data.start)) * (data.to - data.from)) + data.from + 'px';
                                } else {
                                    element.style[direction] = this.linNum + 'px';
                                }
                            }
                        }
                        // 判断开始和结尾
                        else if (data.start > data.end) {
                            console.error('请勿把end设置成大于start的值')
                        }
                    }
                }
                else if (element.getAttribute('lin-name') === null) {
                    element.style.top = -this.linNum + 'px';
                }
            }
        })
    }
}