

var appInit = function() {
    if (initflag==true) return;

    var iOS7 = window.device
        && window.device.platform
        && window.device.platform.toLowerCase() == "ios"
        && parseFloat(window.device.version) >= 7.0;
    if (iOS7) {
        document.body.style.marginTop = "20px";
    }

    Ext.application({
        name: 'App',

        controllers: [
            'PageController', 'StationController'
        ],

        views: [
            'StartPage', 'MainPage', 'AboutPage', 'SettingsPage', 'SharePage'
        ],

        launch: function() {

            Ext.create('Ext.Panel', {
                id:'panelHolder',
                fullscreen: true,
                layout: 'card',
                activeItem: 0,
                cls:'scaleApp',
                items: [
                    {xtype:'startPage'}, {xtype:'mainPage'},
                    {xtype:'aboutPage'}, {xtype:'settingsPage'}, {xtype:'sharePage'}
                ]
            });

        }
    });
};

var initflag = false;
var onDeviceReady = function() {
    if (navigator && navigator.splashscreen) navigator.splashscreen.show();

    appInit();
    initflag = true;
    window.onload = function(){};
};

document.addEventListener('deviceready', onDeviceReady, false);
window.onload=function(){
    setTimeout( onDeviceReady, 1000 );
};


