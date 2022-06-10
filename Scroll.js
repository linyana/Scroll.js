// 开启严格模式
'use strict'
// 取消浏览器对滚动条位置的记录
history.scrollRestoration = 'manual'

// 隐藏浏览器滚动条 
document.documentElement.style.overflowY = 'hidden';

// class Lin
class Lin {
    // 构造函数
    constructor(data = {}) {
        this.linData = data;
        this.linGetBox(this.linData.linBox);
    }

    linGetBox(Data = []) {
        const HTMLelement = document.getElementsByTagName('lin-box');
        Array.from(HTMLelement).forEach((element) => {
            for (let data of Data) {
                if (element.getAttribute('lin-name') === data.name) { 
                    element.style.position = 'absolute';
                    element.style.left = data.left + 'px' || 'auto';
                    element.style.top = data.top + 'px' || 'auto';
                    element.style.right = data.right + 'px' || 'auto';
                    element.style.bottom = data.bottom + 'px' || 'auto';
                }
            }
        })
    }
}