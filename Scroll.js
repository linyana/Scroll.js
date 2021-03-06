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
        this.linSetBox(this.linData.linBox);
        this.linSetContainer('lin-container');
    }

    //初始化linContainer
    linSetContainer(element) {
        const HTMLelement = document.getElementsByTagName(element);
        // 遍历linContainer并给linContainer设置一些基本属性
        Array.from(HTMLelement).forEach((element) => {
            element.style.position = 'relative';
            element.style.display = 'inline-block';
            element.style.height = window.screen.availHeight + 'px';
            element.style.width = 100 + '%';
            /*
            * @function control the way with mouse scrolls
            * 捕获鼠标滚动事件并设置滚动速度
            */
            element.addEventListener('wheel', (event) => {
                event.preventDefault();
                // 设置滚动速度为Lin类里设置的linSpeed，如果未设置则默认为该设备的滚动速度。
                this.linSpeed = this.linData.linSpeed || Math.abs(event.deltaY)
                if (event.deltaY > 0) {
                    this.linNum -= this.linSpeed;
                } else {
                    this.linNum += this.linSpeed;
                }
                if (this.linNum >= 0) {
                    this.linNum = 0;
                }
                if (this.linNum <= -window.screen.availHeight) {
                    this.linNum = -window.screen.availHeight;
                }
                this.linScrollBox(this.linData.linBox);
            })
        })
    }

    // 初始化linBox
    linSetBox(Data = []) {
        const HTMLelement = document.getElementsByTagName('lin-box');
        // 遍历linBox并给linBox设置一些基本属性
        Array.from(HTMLelement).forEach((element) => {
            for (let data of Data) {
                if (element.getAttribute('lin-name') === data.name) {
                    element.style.position = 'absolute';
                    if (data.direction) {
                        element.style.transition = data.direction + ' 0.9s ease-out';
                    } else {
                        element.style.transition = 'top 0.9s ease-out'
                    }
                    element.style.left = -data.left + 'px' || 'auto';
                    element.style.top = -data.top + 'px' || 'auto';
                    element.style.right = -data.right + 'px' || 'auto';
                    element.style.bottom = -data.bottom + 'px' || 'auto';
                }
            }
        })
    }

    linScrollBox(Data = []) {
        const HTMLelement = document.getElementsByTagName('lin-box');
        Array.from(HTMLelement).forEach((element) => {
            for (let data of Data) {
                if (element.getAttribute('lin-name') === data.name) {
                    let direction = data.direction || 'top';
                    // 如果start和end同时不为空
                    if (data.start !== null && data.end !== null) {
                        if (data.start <= data.end) {
                            if (this.linNum <= data.start) {
                                element.style[direction] = -data.start + 'px';
                            } else if (this.linNum >= data.end) {
                                element.style[direction] = -data.end + 'px';
                            }
                        }
                        if (this.linNum >= data.start) {
                            element.style[direction] = -data.start + 'px';
                        } else if (this.Num <= data.end) {
                            element.style[direction] = -data.end + 'px';
                        }
                        // 判断linNum在start和end之间的情况
                        else if ((this.linNum >= data.start && this.linNum <= data.end) || (this.linNum <= data.start && this.linNum >= data.end)) {
                            element.style[direction] = this.linNum + 'px';
                        }
                    }
                    console.log('data.start:' + data.start);
                    console.log('linNum:' + this.linNum);
                    console.log('top:' + element.style.top);
                }
            }
        })
    }
}
