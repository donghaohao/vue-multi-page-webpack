<!DOCTYPE html>
<html>
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1>HELLO WORLD!</h1>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script defer>!function(a,b){function c(){var b=f.getBoundingClientRect().width;var c=b/10;f.style.fontSize=c+"px",m.rem=a.rem=c}var d,e=a.document,f=e.documentElement,g=e.querySelector('meta[name="viewport"]'),h=e.querySelector('meta[name="flexible"]'),i=e.querySelector('meta[name="flexible-in-x5"]'),j=!0,k=0,l=0,m=b.flexible||(b.flexible={});if(g){console.warn("将根据已有的meta标签来设置缩放比例");var n=g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);n&&(l=parseFloat(n[1]),k=parseInt(1/l))}else if(h){var o=h.getAttribute("content");if(o){var p=o.match(/initial\-dpr=([\d\.]+)/),q=o.match(/maximum\-dpr=([\d\.]+)/);p&&(k=parseFloat(p[1]),l=parseFloat((1/k).toFixed(2))),q&&(k=parseFloat(q[1]),l=parseFloat((1/k).toFixed(2)))}}if(i&&(j="false"!==i.getAttribute("content")),!k&&!l){var r=(a.navigator.appVersion.match(/android/gi),a.chrome),s=a.navigator.appVersion.match(/iphone/gi),t=a.devicePixelRatio,u=/TBS\/\d+/.test(a.navigator.userAgent),v=!1;try{v="true"===localStorage.getItem("IN_FLEXIBLE_WHITE_LIST")}catch(w){v=!1}k=s||r||u&&j&&v?t>=3&&(!k||k>=3)?3:t>=2&&(!k||k>=2)?2:1:1,l=1/k}if(f.setAttribute("data-dpr",k),!g)if(g=e.createElement("meta"),g.setAttribute("name","viewport"),g.setAttribute("content","initial-scale="+l+", maximum-scale="+l+", minimum-scale="+l+", user-scalable=no"),f.firstElementChild)f.firstElementChild.appendChild(g);else{var x=e.createElement("div");x.appendChild(g),e.write(x.innerHTML)}a.addEventListener("resize",function(){clearTimeout(d),d=setTimeout(c,300)},!1),a.addEventListener("pageshow",function(a){a.persisted&&(clearTimeout(d),d=setTimeout(c,300))},!1),"complete"===e.readyState?e.body.style.fontSize=12*k+"px":e.addEventListener("DOMContentLoaded",function(a){e.body.style.fontSize=12*k+"px"},!1),c(),m.dpr=a.dpr=k,m.refreshRem=c,m.rem2px=function(a){var b=parseFloat(a)*this.rem;return"string"==typeof a&&a.match(/rem$/)&&(b+="px"),b},m.px2rem=function(a){var b=parseFloat(a)/this.rem;return"string"==typeof a&&a.match(/px$/)&&(b+="rem"),b}}(window,window.lib||(window.lib={}));</script>

    <% for (var i = 0; i < htmlWebpackPlugin.options.scripts.length; i++) { %>
    <script src=<%= htmlWebpackPlugin.options.scripts[i] %>></script>
    <% } %>
  </body>
</html>
