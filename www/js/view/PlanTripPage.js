

Ext.define('App.view.PlanTripPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.planTripPage',
    id:'PlanTripPage',

    config: {
        items:[
            {
                xtype:'toolbar',
                style:'background:#30b457',
                title:'Plan a Trip',
                items:[{
                    xtype:'button',
                    text:'Back',
                    ui:'back',
                    listeners: {
                        tap: function() {
                            App.app.dispatch({
                                controller:'PageController',
                                action:'goPage',
                                args:[{nextPage:1, direction:'right'}]
                            });
                        }
                    }
                }]
            },{
                html: '<div class="page"><br><br>Page content</div>'
            },{
                xtype:'button',
                cls:'SFB-logo1',
                listeners: {
                    tap: function() {
                        if (this.getCls()=='SFB-logo1') {
                            this.removeCls('SFB-logo1');
                            this.addCls('SFB-logo2');
                        } else {
                            this.removeCls('SFB-logo2');
                            this.addCls('SFB-logo1');
                        }

                    }
                }
            }
        ]
    },

    initialize: function() {},
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }

});