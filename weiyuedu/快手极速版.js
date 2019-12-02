//导入模块
const common = require('common.js');
// const templates = require('template.js');

// 在用main运行时候把它关闭
auto.waitFor()
auto.setMode('normal')


toastLog("启动快手极速版...");

// //广告检测子线程
var thread = threads.start(function(){
    //在子线程执行的定时器
    setInterval(function(){
        Close_ads()
    }, 2000);
});

//等待广告监测子线程启动
thread.waitFor();


app.launch('com.kuaishou.nebula')
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

//app.launchApp('快手极速版');
//等待app最大标志 ‘首页’ 出现完毕
// id(Ui_ShouYe_id).waitFor();
sleep(random(6000,8000)) //改成随机时间
toastLog("开始执行任务");

// signIn()//签到
while(1){
    Video_Brower()
}

//************************************************
function Close_ads(){
    //检测与关闭广告代码
    //红包广告
    var widget = id("dialog_cancel_image_button").findOnce()
    if(widget != null){
        widget.click();
        toastLog('广告1关闭成功');
    }

    var widget = id("close").findOnce();
    if(widget != null){
        widget.click();
        toastLog('广告2关闭成功');
    }
}

// 看视频
function Video_Brower(){
    toastLog("页面更新");
    // common.Swip_Up()
    swipe(device.width / 2, device.height * 0.9 ,
        device.width / 2, device.height * 0.2, 500);

    // sleep(1000)
    time= random(6000,7000)

    seconds = parseInt(time/1000)
    toastLog("观看视频"+seconds+'秒');
    sleep(time) //改成随机时间


}


