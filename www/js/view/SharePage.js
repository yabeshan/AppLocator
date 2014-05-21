

Ext.define('App.view.SharePage' ,{
    extend: 'Ext.Container',
    alias : 'widget.sharePage',
    id:'SharePage',

    config: {
        items:[
            {
                xtype:'toolbar',
                style:'background:#30b457',
                title:'Share',
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
                html: '<div class="page"><br><br>'
                    +'<button style="width: 200px;height: 80px;"><a href="http://www.facebook.com/sharer.php?u=http%3A%2F%2Fcnglngstations.com%2F" target="_blank" class="fb">Facebook</a></button>'
                    +'<br><br><button style="width: 200px;height: 80px;"><a href="http://twitter.com/home?status=Clean%20Energy%20Station%20Locator%20http%3A%2F%2Fcnglngstations.com%2F" target="_blank" class="tw">Twitter</a></button>'
                    +'<br><br><button style="width: 200px;height: 80px;"><a href="https://plus.google.com/share?url=http%3A%2F%2Fcnglngstations.com%2F" target="_blank" class="gp">Google+</a></button>'
                    +'<br><br><button style="width: 200px;height: 80px;"><a href="#1" target="_blank" class="email">Email</a></button>'
                    +'</div>'
            }
        ]
    },

    initialize: function() {},
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }

});