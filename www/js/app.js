

/*


var initflag = false;
var onDeviceReady = function() {
    if (initflag) return;

    initflag = true;
    alert("init");


    Ext.application({
        launch: function() {
            Ext.create('Ext.Panel', {
                items: [
                    {html:'<div style="position: absolute;width: 100px;height: 100px; top: 100px; left: 100px; background-color: #900">11111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>'}
                ]
            });

        }
    });
};

document.addEventListener('deviceready', onDeviceReady, false);
window.onload=function(){
    setTimeout( onDeviceReady, 3000 );
};


 */


var appInit = function() {
    if (initflag==true) return;

    Ext.application({
        name: 'App',

        controllers: [
            'PageController', 'StationController'
        ],

        views: [
            'StartPage', 'MainPage', 'AboutPage', 'SettingsPage'
        ],

        launch: function() {

            Ext.create('Ext.Panel', {
                id:'panelHolder',
                fullscreen: true,
                layout: 'card',
                activeItem: 0,
                cls:'scaleApp',
                items: [
                    {xtype:'startPage'}, {xtype:'mainPage'}, {xtype:'aboutPage'}, {xtype:'settingsPage'}
                ]
            });
        }

    });
};

var initflag = false;
var verDB = "1399359600000";
var urlConfig = "http://dev.cnglngstations.com/Home/GetStationsForMobile?parameters={%27Guid%27:%27bee87ce1-aa3e-4191-83e3-69135311088b%27}";
var urlDATA = "http://dev.cnglngstations.com/Data/stations.json";
var onDeviceReady = function() {
    if (navigator && navigator.splashscreen) {
        navigator.splashscreen.show();
    }

    appInit();
    initflag = true;
    window.onload = function(){};
};


var xmlhttp;

if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 ) {
        if(xmlhttp.status == 200){
            alert("_______"+ xmlhttp.responseText);
//            document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
        }
        else if(xmlhttp.status == 400) {
            alert('There was an error 400')
        }
        else {
            alert('something else other than 200 was returned')
        }
    }
}

xmlhttp.open("GET", urlConfig, true);
xmlhttp.send();


document.addEventListener('deviceready', onDeviceReady, false);
window.onload=function(){
    if( document.URL.indexOf('file:///D:/Nick_work/') == 0) {
        setTimeout( onDeviceReady, 1000 );
    }
};

function viewInfoPopup(title, msg) {
        if (navigator && navigator.notification) {
            navigator.notification.alert(msg, null, title);
        } else {
            alert(title +"                    "+ msg);
        }
}
