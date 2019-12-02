//导入模块
const common = require('common.js');
// const templates = require('template.js');

// 在用main运行时候把它关闭
auto.waitFor()
auto.setMode('normal')


FindTimeOut = 3000 //毫秒

//控件UI元素
Ui_ShouYe_id = 'rl_bottom_0' // UI首页 id
Ui_ShiPin_id = 'rl_bottom_1' // UI 视频 id

toastLog("启动微鲤...");

// //广告检测子线程
var thread = threads.start(function(){
    //在子线程执行的定时器
    setInterval(function(){
        Close_ads()
    }, 2000);
});

//等待广告监测子线程启动
thread.waitFor();


app.launch('cn.weli.story')
// 小米4c 关闭第一次调用会弹出的允许控件
w = id("button1").findOne(5000)
//如果找到控件则点击
if(w != null){
    w.click();
    toastLog('点击了允许');
}else{
    //否则提示没有找到
    toastLog('非首次调用');
}

//app.launchApp('微鲤看看');
//等待app最大标志 ‘首页’ 出现完毕
id(Ui_ShouYe_id).waitFor();
sleep(1000);
toastLog("开始执行任务");

// signIn()//签到
while(1){
    News_Brower()
    Video_Brower()
}

//************************************************
function Close_ads(){
    //检测与关闭广告代码
    // log("定时检测广告与关闭区");
    // var widget = id("tv_chat_room_tag").findOne(FindTimeOut);
    // if(widget)
    // {
    //     click(widget.bounds().centerX(), widget.bounds().centerY());
    //     FindStatus = true
    //     toastLog("找到阅读文章");
    // }
}

//寻找阅读文章,有3个id可以用
function Find_News_Brower(){
    FindStatus = false
    while(FindStatus== false)
    {
        // FindStatus = common.Id_BoundsClick("tv_chat_room_tag")
        // if(FindStatus)
        // {
        //     FindStatus = true
        //     toastLog("找到阅读文章");
        //     break
        // }
        // else
        // {
        //     toastLog('捕捉tv_chat_room_tag 失败')
        // }

        var widget = id("tv_chat_room_tag").findOne(FindTimeOut);
        if(widget)
        {
            // toastLog(widget)
            click(widget.bounds().centerX(), widget.bounds().centerY());
            FindStatus = true
            toastLog("找到阅读文章");
            break
        }
        else
        {
            toastLog('捕捉tv_chat_room_tag 失败')
        }

        // widget = id("tv_from").findOne(FindTimeOut);
        // if(widget)
        // {
        //     click(widget.bounds().centerX(), widget.bounds().centerY());
        //     FindStatus = true
        //     toastLog("tv_from ok");
        //     break
        // }
        // else
        // {
        //     toastLog('捕捉tv_from 失败')
        // }

        // widget = id("tv_count").findOne(FindTimeOut);
        // if(widget)
        // {
        //     click(widget.bounds().centerX(), widget.bounds().centerY());
        //     FindStatus = true
        //     toastLog("tv_count ok");
        //     break
        // }
        // else
        // {
        //     toastLog('捕捉 tv_count失败')
        // }

        toastLog('更新页面')
        common.Swip_Down()
        sleep(random(4000,6000)) //改成随机时间
    }
}

// 阅读新闻
// Find_News_Brower()
function News_Brower(){
    id(Ui_ShouYe_id).findOne().click()//点击首页,会自动更新
    // toastLog("打开文章");
    sleep(random(4000,5000)) //改成随机时间

    counter =  random(3,4) //阅读文章次数
    toastLog('阅读文章'+counter+'次')
    for (i = 1; i < (counter+1); i++) {
        Find_News_Brower()
        sleep(random(4000,5000)) //等待系统稳定否则最外层位置会偏移
        toastLog('第'+i+'次阅读文章,共'+counter+'次')
        
        step = random(6,8)
        for(b=1; b<step; b++){
            // swipe(800, 1600, 800, 750, 503);
            common.Swip_Up()
            sleep(random(3500, 4000));
            toastLog("滑动");
            if (text("展开查看全文").visibleToUser(true).findOnce()) {
                var widget = id("tv_height_more").findOne();
                toastLog("展开全文")
                click(widget.bounds().centerX(), widget.bounds().centerY());
                sleep(random(600,1000)) //改成随机时间
            } 
        }
        toastLog("返回");
        back();
        sleep(random(1500,2000)) //改成随机时间
        toastLog("页面更新");
        common.Swip_Down()
        // sleep(1000)
        sleep(random(4000,5000)) //改成随机时间
    }
}

// 看视频
function Video_Brower(){
    counter = random(3,4)
    toastLog('观看视频'+counter+'次')
    for(i=1; i<(counter+1); i++){
        toastLog('第'+i+'次看视频,共'+counter+'次')
        id(Ui_ShiPin_id).findOne().click()//点击首页,会自动更新
        sleep(random(4000,5000)) //改成随机时间
        // 点看视频
        var widget = id("et_ad").findOne(FindTimeOut);
        if(widget)
        {
            click(widget.bounds().centerX(), widget.bounds().centerY());
            FindStatus = true
            // toastLog("看视频");
        }
        sleep(random(12000,20000)) //12~20秒观看视频
        back();
        sleep(random(1000,1200)) //10~15秒观看视频

    }
}

// 签到 
function signIn(){
    var widget = id("iv_gold_gif").findOne(FindTimeOut);
    if(widget)
    {
        click(widget.bounds().centerX(), widget.bounds().centerY());
        sleep(random(2000,3000)) //10~15秒观看视频
        toastLog("签到成功！");
        back();
    }else{
        toastLog("已签到");

    }
    sleep(random(2000,3000)) //10~15秒观看视频
}


// ******************************************************************

// templates.init({
//     appName:"微鲤看看",
//     indexFlagText:"发布",
//     timeAwardText:"领红包",
// });

// templates.run({
//     //获取首页按钮
//     getIndexBtnItem:function(){
//         return id("rl_bottom_1").findOnce();
//     },
//     //签到
//     signIn:function(){
//         commons.UIClick("rl_bottom_4");
//         sleep(1000);
//         commons.UIClick("ll_not_sign");
//         sleep(1000);
//         back();
//         sleep(1000);
//         commons.UIClick("rl_bottom_1");
//     },
//     //找出新闻的条目
//     findNewsItem:function(){

//         //领取宝藏
//         commons.UIClick("text_ok");
//         commons.UIClick("bt_ok");

//         var newsItem = id("tv_title").findOnce(1);
//         //判断是否是广告
//         if(newsItem){
//             newsItem = newsItem.parent();
//             var adFlag = newsItem.child(1);
//             if(adFlag && adFlag.text() == "广告"){
//                 newsItem = null;
//             }
//         }
//         return newsItem;
//     },
//     //时段奖励之后执行
//     doingAfterTimeAward:function(){
//         back();
//     },
//     //阅读页面是否应该返回
//     isShouldBack:function(){

//         //领取宝藏
//         commons.UIClick("text_ok");
//         commons.UIClick("bt_ok");

//         return false;
//     }
// });