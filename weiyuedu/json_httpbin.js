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

function GetJsonData(){
    // 补充try cat
    toastLog("开始获取命令信息");
    var url = "http://httpbin.org/get";
    try{
        var response = getWebGet(url)
        if(response.statusCode != 200){
            toastLog("请求失败");
            return  0
        }
        else{
            toastLog("获取完成");
            str = JSON.parse(response.body.string()); //转化为json
            return str;
            // return response;
        }
    }
    catch(e){
        toastLog("请求失败");
    }
}

// 把网页转换为json获取具体数据
var command = GetJsonData();
var origin = command.origin;
log('origin: '+origin)
var Host = command.headers.Host
log('Host：'+Host)


// 获取网页源码
// var url = "http://httpbin.org/get";
// var response = getWebGet(url)
// log('获取到的网页源码：'+response.body.string())




