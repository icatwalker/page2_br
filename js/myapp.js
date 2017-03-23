mui.init({
    swipeBack: true //启用右滑关闭功能
});

mui('body').on('shown', '.mui-popover', function (e) {
    //console.log('shown', e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function (e) {
    //console.log('hidden', e.detail.id);//detail为当前popover元素
});
var info = document.getElementById("info");
mui('body').on('tap', '.mui-popover-action li>a', function () {
    var a = this,
        parent;
    var type01 = document.getElementById("type01");
    var type02 = document.getElementById("type02");
    //初始界面

    //根据点击按钮，反推当前是哪个actionsheet
    for (parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
        if (parent.classList.contains('mui-popover-action')) {
            if (a.innerHTML == "日志" || a.innerHTML == "迟到") {
                type01.style.display = "block";
                type02.style.display = "none";
                console.log("1");
            } else {
                type01.style.display = "none";
                type02.style.display = "block";
                console.log("2");
            }
            break;
        }
    }
    //关闭actionsheet
    mui('#' + parent.id).popover('toggle');

//	更新任务名称
    var userName = "孟祥吉";
//	var n=a.innerHTML;
    var nType = "[" + (a.innerHTML == "<b>取消</b>" ? a.innerHTML = "" : a.innerHTML) + "]";

//	日期
    function wantedDateTime(n) {
        var date = new Date(new Date().getTime() + n * (24 * 60 * 60 * 1000));
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var strHours = date.getHours();
        var strMinutes = date.getMinutes();
        var strSeconds = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (strHours >= 0 && strHours <= 9) {
            strHours = "0" + strHours;
        }
        if (strMinutes >= 0 && strMinutes <= 9) {
            strMinutes = "0" + strMinutes;
        }

        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + "T" + strHours + seperator2 + strMinutes;
        return currentdate;
    }
    var date = wantedDateTime(0);
    var taskName = nType + userName + date;
    console.log(date);
    console.log(taskName);
//	点击后更新到页面
//	info.placeholder=;
    info.innerHTML = taskName;
    //taskType.value=nType;

    //       昨天、今天改时间
    mui("#yesterday0").on("tap", "a", function () {
        info.innerHTML = nType + userName + wantedDateTime(-1);
    });
    mui("#today0").on("tap", "a", function () {
        info.innerHTML = nType + userName + wantedDateTime(0);
    });
//时间差
    var beginTime = document.getElementById("beginTime");
    var endTime = document.getElementById("endTime");
    beginTime.value = wantedDateTime(0);
    endTime.value = wantedDateTime(0);

    function useTime() {
        var d1 = parseFloat(new Date(beginTime.value).getTime());
        var d2 = parseFloat(new Date(endTime.value).getTime());
        console.log(d1);
        console.log(d2);
        var d3 = (d2 - d1) / (60 * 60 * 1000);
        if (d3 < 8 && d3 > 0) {
            d3 = ((d2 - d1) / (60 * 60 * 1000)).toFixed(2) + "小时";
        } else if (d3 >=8 && d3<=24 ) {
            d3 = "1天";
        } else if(d3>24&& d3<48){
            d3=((d2-d1)/(24*60*60*1000)).toFixed(0)+"天";
        }else if(d3>=48){
            d3=((d2-d1)/(24*60*60*1000)).toFixed(0)+"天";
        }else if(d3<0){
            d3="你回不到过去";
        }
        console.log(d3);
        document.getElementById("totalTime").value = d3;
    }

    beginTime.onchange = function () {
        useTime();
    };
    endTime.onchange = function () {
        useTime();
    };

//	结束
});

//选择类型页面会切换
