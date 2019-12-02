importClass(android.content.Context);
importClass(android.provider.Settings);


 //检测是否打开root权限
 var result = shell("", true);
 if(result.code == 0){
     //   toastLog("获取root权限成功");
     log("获取root权限成功");
 }else{
     // toastLog("请获取root权限，重新运行");
     alert("请获取root权限，重新运行");
     engines.stopAll()
 }

// 打包app时的包名,最后打包给客户时设置
AppPackage = 'c10.com'
try {
    var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
    // log('当前已启用的辅助服务\n', enabledServices);
    // var Services = enabledServices + ":org.autojs.autojspro/com.stardust.autojs.core.accessibility.AccessibilityService";

    var Services = enabledServices + ':'+ AppPackage  + "/com.stardust.autojs.core.accessibility.AccessibilityService";
    Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
    Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
    toastLog("成功开启辅助服务");
} catch (error) {
    //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
    toastLog("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
    setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
}
sleep(2000)

//检测是否启动无障碍模式
auto.waitFor()
auto.setMode('normal')
sleep(2000)//这个时间用于打开无障碍返回的。
//toastLog("程序开始运行！");

//要运行的app
NewsAppList = [
    //1
    {
        'name' : '微鲤看看',
        'version' : 1,
         'packageName' : 'cn.weli.story'
     },

    //2
    {
        'name' : '快手极速版',
        'version' : 1,
        'packageName' : 'com.kuaishou.nebula'

     },

    //3
    {
        'name' : '抖音极速版',
        'version' : 1,
        'packageName' : 'com.ss.android.ugc.aweme.lite'

     }
]
// toastLog(NewsAppList[0].name)
// toastLog(NewsAppList[0].version)
// toastLog('长度：'+NewsAppList.length)// 获取元素个数,重要

var RumTime_Minute = 0;  //运行时间 分钟


init();
function init(){
    // storages.remove("version");
    //每次阅读的时间
    // exec('微鲤看看',normalRumTime);

    while(true){
        var appNum = NewsAppList.length;
        for(var i = 0;i< appNum;i++){
            exec(NewsAppList[i].name, RumTime_Minute, NewsAppList[i].packageName);
        }

    //     var config = getConfig();
    //     //新闻类的列表
    //     var newsList = config.newsAppList;
    //     //视频类的列表
    //     var videoList = config.videoAppList;

    //     /**
    //      * 0-7点阅读视频
    //      * 其他时间阅读新闻
    //      */
        // if(new Date().getHours() >= 7){
        //     var appNum = newsList.length;
        //     for(var i = 0;i< appNum;i++){
        //         exec(newsList[i].name,normalRumTime);
        //     }
        // }else{
        //     //TODO
        //     sleep(1000*60*30);//睡眠半个小时
        // }
    }
}

//获取主配置
// function getConfig(){
//     toast("开始获取配置");
//     var url = "https://raw.githubusercontent.com/maxwellyue/autojs_script/master/config.json";
//     var str = http.get(url)
//     str = JSON.parse(str.body.string());
//     toast("配置获取完成");
//     return str;
// }

//执行脚本
function exec(scriptName,Minutes,packageName){
    //自动获取脚本更新
    // UpdateScript(scriptName);

    //开始执行
    var startDate = new Date();//开始时间
    // var exectuion = engines.execScriptFile("/sdcard/脚本/"+scriptName+".js");
    var exectuion = engines.execScriptFile(scriptName+".js"); //打开当前路径

    //计时器，检测时间
    var isIExec = true;
    while(isIExec){

        sleep(20*1000);//每一分钟检测一次 ，放在前面方式一开机机提示

        //计时
        var runSeconds = ((new Date().getTime()) - startDate.getTime())/1000;
        Run_Minutes = parseInt(runSeconds/60) //取整数
        toastLog(scriptName+"已执行"+Run_Minutes +"分钟");
        if(Run_Minutes >  Minutes){
            isIExec = false; 
        }


        //检测当前执行的任务是否已经完成
        //如果发现只有一个进程，则跳转到下一个
        if(engines.all().length < 2){
            isIExec = false; 
            stopCurrent(exectuion,packageName);
            // exectuion.getEngine().forceStop()

        }
    }
    //停止脚本
    stopCurrent(exectuion,packageName);
    // exectuion.getEngine().forceStop()
}

//停止当前脚本
function stopCurrent(exectuion,packageName){
    toast("执行停止");
    exectuion.getEngine().forceStop();

    var result = shell("am force-stop "+packageName, true);
    if(result.code == 0){
    toastLog("app关闭成功");
    }else{
        toastLog("app关闭失败");
    }

    // 小米4c 清缓存
    sleep(2000);
    KeyCode("KEYCODE_MENU")
    sleep(2000);
    w = id("clearAnimView").findOne(5000)
    if(w != null){
        w.click();
        toastLog('清缓存成功');
    }else{
        //否则提示没有找到
        toastLog('清缓存失败');
    }
    sleep(3000);

    // back();
    // sleep(1000);
    // back();
    // sleep(1000);
    // home();
    // sleep(5000);
}

//更新脚本
function UpdateScript(scriptName){
    toast("检测脚本更新");
    var storage = storages.create("WeiYueDu_version"); //微阅读版本控制
    var scriptVersion = storage.get(scriptName);

    var config = getConfig();
    var AppList = config.AppList;
    for(var i = 0; i< AppList.length;i++){
        var thisScript = AppList[i];
        var name = thisScript.name;
        var version = thisScript.version;
        
        if(scriptName == name && version != scriptVersion){
            toast("检测开始更新");
            // var path = "/sdcard/脚本/"+scriptName+".js";
            var path = "./"+scriptName+".js"; //打包app需要相对路径

            var scriptContent = http.get("https://raw.githubusercontent.com/lit1088/control-center/master/"+scriptName+".js").body.string();
            files.write(path,scriptContent);
            storage.put(scriptName,version);
            toast("检测更新完成");
            return true;
        }
        toast("检测无需更新");
        return false;
    }
}

