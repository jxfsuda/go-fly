var GOFLY={
    GOFLY_URL:"https://gofly.sopans.com",
    GOFLY_KEFU_ID:"",
    GOFLY_BTN_TEXT:"Chat with me",
};
GOFLY.launchButtonFlag=false;
GOFLY.titleTimer=0;
GOFLY.titleNum=0;
GOFLY.originTitle=document.title;
GOFLY.init=function(config){
    if(typeof config=="undefined"){
        return;
    }
    if (typeof config.GOFLY_URL!="undefined"){
        this.GOFLY_URL=config.GOFLY_URL;
    }
    if (typeof config.GOFLY_KEFU_ID!="undefined"){
        this.GOFLY_KEFU_ID=config.GOFLY_KEFU_ID;
    }
    if (typeof config.GOFLY_BTN_TEXT!="undefined"){
        this.GOFLY_BTN_TEXT=config.GOFLY_BTN_TEXT;
    }
    this.dynamicLoadCss(this.GOFLY_URL+"/static/css/gofly-front.css?v=1");
    var _this=this;
    if (typeof $!="function"){
        this.dynamicLoadJs("https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js",function () {
            _this.dynamicLoadJs("https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/layer.min.js",function () {
                _this.clickBtn();
            });
        });
    }else{
        this.dynamicLoadJs("https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/layer.min.js",function () {
            _this.clickBtn();
        });
    }

    window.addEventListener('message',function(e){
        var msg=e.data;
        if(msg.type=="message"){
            _this.flashTitle();//标题闪烁
        }
    });
    window.onfocus = function () {
        clearTimeout(this.titleTimer);
        document.title = _this.originTitle;
    };
}
GOFLY.dynamicLoadCss=function(url){
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type='text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}
GOFLY.dynamicLoadJs=function(url, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if(typeof(callback)=='function'){
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}

GOFLY.clickBtn=function (){
    var _this=this;
    var html="<div class='launchButtonBox'>" +
        '<div id="launchButton" class="launchButton animateUpDown">' +
        '<div id="launchIcon" class="launchIcon">1</div> ' +
        '<div class="launchButtonText">'+_this.GOFLY_BTN_TEXT+'</div></div>' +
        '<div id="launchButtonNotice" class="launchButtonNotice">您好:<br/>极简强大的开源免费Go语言在线客服单页营销系统，来了解一下？</div>' +
        '</div>';
    $('body').append(html);
    $("#launchButton").on("click",function() {
        _this.showKefu();
    });
    $("#launchButtonNotice").on("click",function() {
        _this.showKefu();
    });
    setTimeout(function(){
        $("#launchButtonNotice").show();
        $("#launchIcon").show();
    },4000);
}
GOFLY.isIE=function(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}
GOFLY.showKefu=function (){
    if (this.launchButtonFlag) return;
    var width=$(window).width();
    if(width<768 || this.isIE()>0){
        this.windowOpen();
        return;
    }
    this.layerOpen();
    this.launchButtonFlag=true;
    $(".launchButton").hide();

    $("body").click(function () {
        clearTimeout(this.titleTimer);
        document.title = this.originTitle;
    });
}
GOFLY.layerOpen=function (){
    if (this.launchButtonFlag) return;
    layer.open({
        type: 2,
        title: this.GOFLY_BTN_TEXT,
        closeBtn: 1, //不显示关闭按钮
        shade: 0,
        area: ['520px', '530px'],
        offset: 'rb', //右下角弹出
        anim: 2,
        content: [this.GOFLY_URL+'/chatIndex?kefu_id='+this.GOFLY_KEFU_ID+'&refer='+window.document.title, 'yes'], //iframe的url，no代表不显示滚动条
        end: function(){
            this.launchButtonFlag=false;
            $(".launchButton").show();
        }
    });
}
GOFLY.windowOpen=function (){
   window.open(this.GOFLY_URL+'/chatIndex?kefu_id='+this.GOFLY_KEFU_ID+'&refer='+window.document.title);
}
GOFLY.flashTitle=function () {
    this.titleNum++;
    if (this.titleNum >=3) {
        this.titleNum = 1;
    }
    if (this.titleNum == 1) {
        document.title = '【】' + this.originTitle;
    }
    if (this.titleNum == 2) {
        document.title = '【你有一条消息】' + this.originTitle;
    }
    this.titleTimer = setTimeout("this.flashTitle()", 500);
}


