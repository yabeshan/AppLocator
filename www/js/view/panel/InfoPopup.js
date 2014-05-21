
Ext.define('App.view.InfoPopup' ,{
    extend: 'Ext.Container',
    alias : 'widget.infoPopup',
    id:'infoPopup',

    config: {
        items:[
            {
                cls:'info-popup-zoom',
                style:'position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,.6);top:0px;left:0px;',
                html:'<div style="position:absolute;width:100%;height:100%;background-image: url(img/popup-station-info.png);background-size: 300px 490px;background-position: center center;background-repeat: no-repeat;">'
                    +'<div id="stationName" style="background-color: #FFF;overflow:hidden;height:24px;position:absolute;left:50%;margin-left:-140px;top:50%;margin-top:-60px;width:280px;color:#30b457"></div>'
                    +'<div id="stationAddress" style="background-color: #FFF;overflow:hidden;height:22px;position:absolute;left:50%;margin-left:-140px;top:50%;margin-top:-30px;width:280px;color:#67686a;font-weight:bold;"></div></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
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
        Ext.get("stationAddress").dom.innerHTML = model.get('address')+", "+model.get('city')+", "+model.get('state')+", "+model.get('zip');

        Ext.getCmp('infoPopup').show();
    },
    closePopup: function() {
        Ext.getCmp('infoPopup').hide();
    }

});