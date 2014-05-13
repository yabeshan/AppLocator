

var appInit = function() {
    if (initflag==true) return;

    Ext.application({
        name: 'App',

        controllers: [
            'PageController', 'StationController'
        ],

        views: [
            'StartPage', 'MainPage', 'PlanTripPage', 'AboutPage', 'SettingsPage', 'SharePage'
        ],

        launch: function() {

            Ext.create('Ext.Panel', {
                id:'panelHolder',
                fullscreen: true,
                layout: 'card',
                activeItem: 2,
                cls:'scaleApp',
                items: [
                    {xtype:'startPage'}, {xtype:'mainPage'}, {xtype:'planTripPage'},
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

    if (navigator && navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position){
            var lat=position.coords.latitude;
            var longi=position.coords.longitude;
            alert("latitude is: "+ lat+ " longitude is: "+ longi);

        }, function(error){
            alert("Getting the error"+error.code + "\nerror mesg :" +error.message);
            
        }, { enableHighAccuracy:true });
        alert("support");
    } else{
        alert("navigator.geolocation not supported");
    }
};

document.addEventListener('deviceready', onDeviceReady, false);
window.onload=function(){
    setTimeout( onDeviceReady, 1000 );
};


