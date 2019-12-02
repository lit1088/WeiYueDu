function getWebGet(url){
    var headers = {
        // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        // "Accept-Encoding": "gzip, deflate", 
        // 'Accept-Language': 'zh-CN,zh;q=0.9',
        // 下面是电脑的 User-Agent
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36",
    }
    var response = http.get(
        url, {
          headers: headers
        })
    return  response
}

function getConfig(){
    // 补充try cat
    toastLog("开始获取命令信息");

    // var url = "http://httpbin.org/get";
    var url = "https://raw.githubusercontent.com/lit1088/control-center/master/ControlCenter.json";
   
    try{
        var response = getWebGet(url)
        if(response.statusCode != 200){
            toastLog("请求失败");
            return 0
        }
        else{
            toastLog("获取完成");
            str = JSON.parse(response.body.string()); //转化为json
            return str;
        }
    }
    catch(e){
        toastLog("网络通讯失败");
    }
}

var CommandInfo = getConfig();
// //APP信息
var AppInfo = CommandInfo.AppInfo;
log('AppInfo: '+AppInfo.name)
log('AppInfo: '+AppInfo.version)
if(AppInfo.version == 1)
{
    log('检测到AppInfo.version为1')
}
else{
    log('检测到数据不对！')
}

var TaskInfo = CommandInfo.Task;
// log('TaskInfo: '+TaskInfo) 要一条条信息具体获取
log('AppInfo: '+TaskInfo[0])

// 获取快手技术版信息
log('AppInfo: '+TaskInfo[1].name)
log('AppInfo: '+TaskInfo[1].version)
log('总脚本数目：'+TaskInfo.length)
