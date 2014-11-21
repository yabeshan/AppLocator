

var appInit = function() {
    console.log ("appInit");
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


    var xmlhttp;
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 ) {
            if(xmlhttp.status == 200){
                var json = JSON.parse(xmlhttp.responseText);
                if (json.UtcDateTime) {
                    var lng = json.UtcDateTime.length-2,
                        ver = json.UtcDateTime.substr(6, 13);
                    verDB_new = Number( ver );
                }
                if (json.Url) {
                    urlDATA = json.Url + "?"+Date.now();
                }

                if (verDB_new != verDB && (Ext.getCmp('mapPanel') != null) && (Ext.getCmp('mapPanel').updateDataStations != null) ) {
                    Ext.getCmp('mapPanel').updateDataStations( urlDATA );
                }
            }
        }
    }

    function getUpdateStatus() {
        xmlhttp.open("GET", urlConfig, true);
        xmlhttp.send();
    }
    setInterval(getUpdateStatus,600000);
    getUpdateStatus();
};

var initflag = false;
var verDB = 1413854998653;
var verDB_new = 0;
var urlConfig = "http://dev.cnglngstations.com/Home/GetStationsForMobile?parameters={%27Guid%27:%27bee87ce1-aa3e-4191-83e3-69135311088b%27}";
var urlDATA = "http://dev.cnglngstations.com/Data/stations.json";
var networkStatus = false;
var onDeviceReady = function() {
    if (navigator && navigator.splashscreen) {
        navigator.splashscreen.show();
    }

    appInit();
    initflag = true;
    window.onload = function(){};

    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onLine, false);
    checkConnection();
};

function checkConnection() {
    if (navigator && navigator.connection && navigator.connection.type) {
        networkStatus = (navigator.connection.type=="none") ? false : true;
    } else if( document && document.URL && document.URL.indexOf('file:///D:/Nick_work/') == 0) {
        networkStatus = true;
    }
}

function onLine() {
    networkStatus = true;
}

function onOffline() {
    networkStatus = false;
    viewInfoPopup("Error", "Please check your internet connection or try again later");
    if (App && App.app) {
        App.app.dispatch({
            controller:'PageController',
            action:'goPage',
            args:[{nextPage:0, direction:'right'}]
        });
    }
    checkConnection();
}

document.addEventListener('deviceready', onDeviceReady, false);
window.onload=function(){
    if( document.URL.indexOf('file:///D:/Nick_work/') == 0) {
        setTimeout( onDeviceReady, 1000 );
    }
};

function viewInfoPopup(title, msg) {
        if (navigator && navigator.notification) {
            navigator.notification.alert(msg, function(a,b,c,d,e){
                console.log ("++++++++++++++++++++++++++++++++++++++++++++++++++++++", a,b,c,d,e );
            }, title, ['OK', 'Cancel']);
        } else {
            alert(title +"                    "+ msg);
        }
}
