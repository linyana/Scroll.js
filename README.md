# Scroll.js
## 为什么用Scroll.js
浏览器的默认滑动方式是一格一格的，使用Scroll.js后能让你网页的滑动方式变成地像手机滑动浏览器一样丝滑。
## 基础demo
最简单的使用方法是在body里面的所有内容外面，分别嵌套一个<lin-container>双标签和<lin-page>双标签,然后在script中new一个Lin(),比如像下面这样：
```
  <body>
    <lin-container>
      <lin-page>
          <div>我是内容</div>
      </lin-page>
    </lin-container>

    <script>
      new Lin();
    </script>
  </body>zz
```
这样就能最基础地改变你页面的滑动方式了,但是我们注意到右侧的滚动条消失了，这是因为我们禁用了浏览器的默认滚动，以前的滚动条自然就不再生效了，所以我们将他隐藏了，如果你希望你的网页可以有滚动条，那么我们已经封装好了一个可以自定义的滚动条，只需要你在body里面加入<lin-scroll-bar>双标签即可，例如：
```
  <body>
    <lin-scroll-bar>
    </lin-scroll-bar>
    <lin-container>
      <lin-page>
          <div>我是内容</div>
      </lin-page>
    </lin-container>

    <script>
      new Lin();
    </script>
  </body>
```
## 滚动条样式设置
滚动条配置项的设置方法例子:
```
  <script>
    new Lin({
      linScrollBar: [
        {
          bgColor: "black"
          height: 100
        }
      ]
    });
  </script>
```
目前我们在滚动条中仅给出了两种配置项：
| 配置项 | 说明 | 默认 |
| --- | -- | -- |
| bgColor | 背景颜色 | #3bbbbb |
| height | 长度 | 300 |


## 页面滚动速度
我们可以通过linSpeed配置项来更改页面滚动的速度。
页面滚动速度配置方法例子:
```
  <script>
    new Lin({
      linSpeed: 100(推荐),
    });
  </script>
```
| 配置项 | 说明 | 默认 |
| --- | -- | -- |
| linSpeed | 更改页面的滚动速度 | 鼠标的滚动速度 |