// 当前监测实体
var monitorCount_url='/portraite/monitorCount/';
public_ajax.call_request('get',monitorCount_url,monitorCount);
function monitorCount(data){
    if(data){
        $('.com-1').text(data.all)
        $('.com-2').text(data.today)
    }
}


var pageData=6;
if (screen.width <= 1440){
    $('#container .secondScreen .box').css({'max-height':'308px','min-height':'308px'})
    pageData=6;
}else {
    $('#container .secondScreen .box').css({'max-height':'510px','min-height':'510px'})
    pageData=10;
}
// 一屏 表格
var peoPicture_url='/portraite/portrait/';
public_ajax.call_request('get',peoPicture_url,peoPicture);

function peoPicture(data) {
    // console.log(data);
    $('#contentTable').bootstrapTable('load', data);
    $('#contentTable').bootstrapTable({
        data:data,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize:pageData ,//单页记录数
        pageList: [15,20,25],//分页步进值
        sidePagination: "client",//服务端分页
        searchAlign: "left",
        searchOnEnterKey: false,//回车搜索
        showRefresh: false,//刷新按钮
        showColumns: false,//列选择按钮
        buttonsAlign: "right",//按钮对齐方式
        locale: "zh-CN",//中文支持
        detailView: false,
        showToggle:false,
        sortName:'bci',
        sortOrder:"desc",
        columns: [
            {
                title: "监测对象",//标题
                field: "entity_name",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.entity_name==''||row.entity_name=='null'||row.entity_name=='unknown'||!row.entity_name){
                        return '未知';
                    }else {
                        return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.entity_name+
                            '\',\''+row.entity_type+'\',\''+row.id+'\')" title="进入画像">'+row.entity_name+'</span>';
                    };
                }
            },
            {
                title: "注册地",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    // var registAddress = row.regist_address;
                    var registAddress;
                    if(row.province == '北京' || row.province == '上海' || row.province == '天津' || row.province == '重庆'){
                        registAddress= row.city+row.district;
                    }else{
                        registAddress= row.province+row.city+row.district;
                    }
                    if (registAddress.length == 0){
                        return '未知';
                    }else {
                        // var i=registAddress.indexOf("市");
                        // registAddress = registAddress.substring(0,i+1);
                        return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.registAddress+'\')" title="注册地">'+registAddress+'</span>';
                    };
                }
            },
            {
                title: "时间",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.date==''||row.date=='null'||row.date=='unknown'||!row.date){
                        return '未知';
                    }else {
                        return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.date+'\')" title="时间">'+row.date+'</span>';
                    };
                }
            },

            {
                title: "预警类型",//标题
                field: "d",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return '模型预警'
                }
            },
            {
                title: "实体类型",//标题
                field: "entity_type",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.entity_type==''||row.entity_type=='null'||row.entity_type=='unknown'||!row.entity_type){
                        return '未知';
                    }else if(row.entity_type == 1){
                        return '平台';
                    }else if(row.entity_type == 2){
                        return '公司';
                    }else if(row.entity_type == 3){
                        return '项目';
                    }
                }
            },
            {
                title: "运营模式",//标题
                field: "e",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    // if (row.operation_mode==''||row.operation_mode=='null'||row.operation_mode=='unknown'||!row.operation_mode){
                    //     return '未知';
                    // }else if(row.operation_mode == 1){
                    //     return '互联网金融';
                    // }else if(row.operation_mode == 2){
                    //     return '2';
                    // }else if(row.operation_mode == 3){
                    //     return '3';
                    // }
                    return '互联网金融';
                }
            },
            {
                title: "监测详情",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.entity_name+
                            '\',\''+row.entity_type+'\',\''+row.id+'\')" title="查看详情"><i class="icon icon-file-alt"></i></span>';
                }
            },
        ],
    });
    $('#contentTable p.load').hide();
};
// 点击进入公司详情页
function jumpFrame_1(name,type,id) {
    var html='';
    name=escape(name);
    if (type=='1'||type=='2'){
        html='/index/company/?name='+name+'&flag='+type+'&pid='+id;
    }else {
        html='/index/project/?name='+name+'&flag='+type+'&pid='+id;
    }
    window.location.href=html;
}
// 监测详情
function jumpFrame_2(monitorFlag) {
    // window.localStorage.setItem('monitorFlag',monitorFlag);
    // window.location.href='../templates/monitorDetails.html';
    window.location.href='/index/monitor/';
}
// ====索引====
// var IndexesArr = $()
$('.words b').on('click',function(){
    var letter = $(this).text().toLowerCase();
    $(this).addClass('active').siblings().removeClass('active');
    var portrait_letter_url = '/portraite/portrait_letter/?letter='+letter;
    public_ajax.call_request('get',portrait_letter_url,portrait_letter);
})
function portrait_letter (data) {
    if(data){
        $('#contentTable').bootstrapTable('load', data);
    }
}


//第二屏---滚动
// var allMonitor_url='/system_manage/show_users_account/';
var allMonitor_url='/portraite/platform/';
public_ajax.call_request('get',allMonitor_url,allMonitor);
var phonehtml=[];
function allMonitor(data) {
    // console.log(data)
    // var line=data.airlines;
    var line=data;
    var illegalType;
    for (var i=0;i<line.length;i++){
        if(data[i].illegal_type == 1){
            illegalType = '模型预警';
        }else if(data[i].illegal_type == 2){
            illegalType = '舆情预警';
        }else if(data[i].illegal_type == 3){
            illegalType = '指标预警';
        }

        phonehtml.push(
            '<p class="phone" type="button" data-toggle="modal" ' +
            'onclick="show(\''+line[i].entity_name+'\',\''+line[i].entity_type+'\',\''+line[i].id+'\')" onmousemove="chgecol(this)" onmouseout="back(this)">'+
            '<span class="iphone zjnum">'+line[i].entity_name+'</span>'+
            // '<span class="iphone bjnum">'+line[i]+'</span>'+
            '<span class="iphone bjnum">'+illegalType+'</span>'+
            '</p>'
        );
    };
    // $('.scroll-box').append(phonehtml.splice(0,5));
    $('.scroll-2').empty().append(phonehtml);
}
var $uList = $("#container .secondScreen .scroll-1");
var $uList2 = $("#container .secondScreen .scroll-2");
var timer = null;
var timer2 = null;
//触摸清空定时器
$uList.hover(function() {
        clearInterval(timer);
    },
    function() { //离开启动定时器
        timer = setInterval(function() {
                scrollList($uList);
            },
            // 1000);
            2500);
    }).trigger("mouseleave"); //自动触发触摸事件
//触摸清空定时器
$uList2.hover(function() {
        clearInterval(timer2);
    },
    function() { //离开启动定时器
        timer2 = setInterval(function() {
                scrollList($uList2);
            },
            // 1000);
            2500);
    }).trigger("mouseleave"); //自动触发触摸事件
//滚动动画
function scrollList(obj) {
    //获得当前<li>的高度
    var scrollHeight = $(".scroll-box p:first").height();
    //滚动出一个<li>的高度
    // $uList.stop().animate({
    obj.stop().animate({
            marginTop: -scrollHeight
        },
        600,
        function() {
            //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                   // $uList.css({
                   obj.css({
                       marginTop: 0
                   // }).find("p:first").appendTo($uList);
                   }).find("p:first").appendTo(obj);
            // $uList.css({
            //     marginTop: 0
            // }).find("p:first").remove();
            // $('.scroll-box .box').append(phonehtml.shift());
        });
};

function show(name,type,id) {
    var html='';
    name=escape(name);
    html='/index/company/?name='+name+'&flag='+type+'&pid='+id;
    window.location.href=html;
}
function chgecol(b) {

}
function back(c) {

}
