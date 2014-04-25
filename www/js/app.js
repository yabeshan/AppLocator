

var appInit = function() {
    if (initflag==true) return;

    Ext.application({
        name: 'App',

        controllers: [
            'PageController'
        ],

        views: [
            'StartPage', 'MainPage', 'PlanTripPage', 'AboutPage', 'SettingsPage', 'SharePage'
        ],

        launch: function() {

            Ext.create('Ext.Panel', {
                id:'panelHolder',
                fullscreen: true,
                layout: 'card',
                activeItem: 1,
                cls:'scaleApp',
                items: [ {xtype:'startPage'}, {xtype:'mainPage'}, {xtype:'planTripPage'},
                    {xtype:'aboutPage'}, {xtype:'settingsPage'}, {xtype:'sharePage'} ]
            });

        }
    });
};

var initflag = false;
var onDeviceReady = function() {
    appInit();
    initflag = true;
    window.onload = function(){};
};

document.addEventListener('deviceready', onDeviceReady, false);
window.onload=function(){
    setTimeout( onDeviceReady, 1000 );
};
