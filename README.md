# Scroll.js
## 简介
改变页面滚动方式的插件，同时也可以自定义元素的移入移出，滚动条的样式等。

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
滚动条配置项的设置demo:
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
页面滚动速度配置demo:
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

## 自定义盒子
这里我们将介绍如何将一个盒子自由切入切出，我们将用到lin-box双标签，

自定义盒子配置demo:
```
<body>
  <lin-container>
    <lin-page>
      <div>
        其他无关的div
      </div>
      <lin-box name="test">
        <div class="box">
          内容
        </div>
      </lin-box>
    </lin-page>
  </lin-container>
</body>

<script>
  new Lin({
      linBox: [
        {
          name: "test",
          left: 100,
          top: 100,
          start: 0,
          end: 500,
          direction: 'left',
          from: 100,
          to: 500,
        }
      ]
  })
</script>
```

再配置一些样式我们就能看到这个盒子可以在滚动页面的同时跟随鼠标在特定区域中从左到右或者从右到左滚动了。

| 配置项 | 说明 | 默认 | 
| --- | -- | -- |
| name | 元素的名称，用于对应lin-box的name | null |
| left | 绝对定位的left | 0 |
| right | 绝对定位的right | 0 | 
| top | 绝对定位的top | 0 | 
| bottom | 绝对定位的bottom | 0 |
| direction | 需要滚动的方向 | top |
| start | 从什么时间开始滚动,对应linSpeed | null |
| end | 从说明时间结束滚动,对于linSpeed | null |
| from | 从哪个位置开始滚动,应与direction中方向的值相对应 | null |
| to | 滚动的结束位置 | null |

我们推荐将上方除了绝对定位的配置项以外都配置好，以免出现一些意料之外的错误。需要注意的是绝对定位的定位方向只能配置两个。