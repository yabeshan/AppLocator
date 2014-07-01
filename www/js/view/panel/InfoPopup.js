
Ext.define('App.view.InfoPopup' ,{
    extend: 'Ext.Container',
    alias : 'widget.infoPopup',
    id:'infoPopup',

    config: {
        items:[
            {
                cls:'info-popup-zoom',
                style:'position:absolute;width:100%;height:100%;background-color:rgba(255,255,255,1);top:0px;left:0px;',
                html:'<div style="position:absolute;width:100%;height:100%;background-image: url(img/popup-station-info.png);background-size: 300px 490px;background-position: center center;background-repeat: no-repeat;">'
                    +'<div id="stationName" style="overflow:hidden;height:24px;position:absolute;left:50%;margin-left:-140px;top:50%;margin-top:-60px;width:280px;color:#30b457"></div>'
                    +'<div id="stationStatus" style="position:absolute;left:50%;margin-left:-135px;top:50%;margin-top:-190px;color:#fff;font-style: italic;fony-size:30px;font-weight: normal;width:140px">Operational</div>'
                    +'<div id="stationAddress" style="overflow:hidden;height:84px;position:absolute;left:50%;margin-left:-140px;top:50%;margin-top:-35px;width:280px;color:#67686a;font-weight:bold;"></div>'
                    +'<div style="position: absolute;top:50%;margin-top: -195px;left: 50%;margin-left: 15px"><div id="goDirect"></div><div id="goPlanner"></div><div id="goShare"></div></div>'
                    +'<div id="fuel-type-cng-info" class=""></div><div id="fuel-type-lng-info"></div></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="goDirect") {
//                                document.getElementById('tp-end-point-1').value=Ext.get("stationAddress").dom.innerText;
                                Ext.getCmp('tripPlaner').openPopup({'type':'get', 'point':Ext.get("stationAddress").dom.innerText });
                            } else if (node.id=="goPlanner") {
//                                document.getElementById('tp-end-point-1').value=Ext.get("stationAddress").dom.innerText;
                                Ext.getCmp('tripPlaner').openPopup({'type':'add', 'point':Ext.get("stationAddress").dom.innerText });
                            } else if (node.id=="goShare") {
                                Ext.getCmp('searchPanel').showShare();
                            }
                            Ext.getCmp('infoPopup').closePopup();
                        },
                        element: 'element'
                    }
                }
            }
        ]
    },

    initialize: function() {
        Ext.getCmp('infoPopup').closePopup();
    },
    openPopup: function(model) {
        if (model==null) return;

        Ext.get("stationName").dom.innerHTML = model.get('name');
        var adress = '<font style="font-size:15px;line-height: 20px;">'+model.get('address')+", "+model.get('city')+", "+model.get('state')+", "+model.get('zip') +'</font><br>',
            hours = '<font style="font-size:12px;line-height: 24px;">Hours: <font style="font-weight:normal;font-style: italic">M-F 8:00am - 6:00pm</font></font><br>',
            accepts = '<font style="font-size:12px;line-height: 24px;">Accepts: <font style="font-weight:normal;font-style: italic">Visa, Clean Fuel Energy Card, Amex</font></font><br>';

        Ext.get("stationAddress").dom.innerHTML = adress + hours + accepts;
            Ext.getCmp('infoPopup').show();

        if (model.get('status')==2) {
            Ext.get("stationStatus").dom.innerHTML = "Under Maintenance";
        } else if (model.get('status')==1) {
            Ext.get("stationStatus").dom.innerHTML = "Coming Soon";
        } else {
            Ext.get("stationStatus").dom.innerHTML = "Operational";
        }

        var fuel = model.get('fuel');
        if (fuel == 0 || fuel == 2) {
            Ext.get("fuel-type-cng-info").addCls('select');
        } else {
            Ext.get("fuel-type-cng-info").removeCls('select');
        }

        if (fuel == 1 || fuel == 2) {
            Ext.get("fuel-type-lng-info").addCls('select');
        } else {
            Ext.get("fuel-type-lng-info").removeCls('select');
        }


    },
    closePopup: function() {
        Ext.getCmp('infoPopup').hide();
    }

});