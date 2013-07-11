---
layout: post
category : css
tagline: 
abstract : hasLayout是IE下的一个专有概念（属性），它决定一个元素是否拥有一个布局。它并不是一个CSS属性，所以不能显示的对它设置true或false。一个拥有布局的元素负责它自己及其子元素的尺寸和定位，没有布局的元素由其拥有布局的祖先元素负责。当一个元素拥有布局时，就称它has layout（hasLayout为true）。hasLayout在IE8标准模式中被移除。

---
{% include JB/setup %}

IE6、7下的布局bug多数是由于hasLayout引起的。MSIE对hasLayout的解释：
>"Gets a value that indicates whether the object has layout."

##一、hasLayout是什么？

hasLayout是IE下的一个专有概念（属性），它决定一个元素是否拥有一个布局。它并不是一个CSS属性，所以不能显示的对它设置true或false。一个拥有布局的元素负责它自己及其子元素的尺寸和定位，没有布局的元素由其拥有布局的祖先元素负责。当一个元素拥有布局时，就称它has layout（hasLayout为true）。hasLayout在IE8标准模式中被移除。

hasLayout的作用可以减少IE显示引擎的处理开销。在理想情况下，所有的元素都可以负责自己的尺寸和定位，但这在早期版本的IE中会产生很大的性能问题，所以IE只对一部分元素设置hasLayout。

默认拥有布局的元素有：

html，body，table，tr，th，td，iframe，object, applet，img，hr，input，button，select，textarea，fieldset，legend等。

##二、如何激活hasLayout？

设置以下属性会使一个元素拥有布局：
* position:absolute
* float:left or right
* display:inline-block
* width:any value other than auto
* height:any value other than auto
* zoom:any value other than normal
* writing-mode:tb-rl

IE7还可以通过一下属性设置hasLayout：
* overflow:hidden or scroll or auto
* overflow-x:hidden or scroll or auto
* overflow-y:hidden or scroll or auto
* min-width:any value other than auto
* max-width:any value other than auto
* min-height:any value other than auto
* max-height:any value other than auto

##三、hasLayout的作用

如：文本偏移3px bug

当文本与一个浮动元素相邻时，默认文本环绕浮动元素，如果不想文本环绕浮动元素，比如将文本的margin-left设置为浮动元素的宽度。这时就会在文本与浮动元素产生一个3px的间隙。

<pre class="prettyprint linenums">
  .myFlout{
    float:left;
    width:50px;
    height:50px;
    background:red;
  }
  p{
    margin-left:50px;
    border:1px solid blue;
  }
</pre>

这3px的间隙实际上是文本与包含文本的段落之间产生的。这时，让包含文本的段落拥有一个布局，设置_height:1%。之所以用_height是因为只有IE6可以识别，并且IE6下height与min-height的效果相同，自然设置1%的高度不会影响现有高度。

<pre class="prettyprint linenums">
  .myFlout{
    float:left;
    width:50px;
    height:50px;
    background:red;
  }
  p{
    margin-left:50px;
    border:1px solid blue;
    overflow:hidden;
    _height:1%;
  }
</pre>

文本段落拥有布局后产生了新的bug，即文本段落与浮动元素之间产生了3px的间隙，为了解决这个问题，需要作出以下改变：

<pre class="prettyprint linenums">
  .myFlout{
    float:left;
    width:50px;
    height:50px;
    background:red;
    _margin-right:-3px;
  }
  p{
    margin-left:50px;
    border:1px solid blue;
    overflow:hidden;
    _height:1%;
    _margin:0;
  }
</pre>

之所以在文本段落上面设置overflow:hidden，是为了触发BFC（Block Formatting Context）。

类似的例子还有很多，比如IE6的躲猫猫bug、相对容器中绝对定位的bug、块级元素设置成inline-block的bug等等，都可以通过激活hasLayout来修复。