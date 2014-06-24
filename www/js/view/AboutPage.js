

Ext.define('App.view.AboutPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.aboutPage',
    id:'AboutPage',

    config: {
        items:[
            {
                xtype:'toolbar',
                style:'background:#30b457',
                title:'About'
            },{
                style:'overflow: auto;height:80%;',
                html: '<img id="backBtn" src="img/icons_button-back.png" style="position:absolute;z-index:90000; top:10px; left:20px;height: 30px;cursor:pointer">'
                    +'<h1 style="padding: 30px;color:#07448B;font-weight: bold;font-size: 150%">Clean Energy is the leader in natural gas fueling</h1><p style="text-align: justify;padding: 0px 30px 0px 30px">Clean Energy is the largest provider of natural gas fuel for transportation in North America, fueling over 35,000 vehicles each day at approximately 500 fueling stations throughout the United States and Canada. With a broad customer base in a variety of markets, including trucking, airport shuttles, taxis, refuse, and public transit, we build and operate compressed natural gas (CNG) and liquefied natural gas (LNG) fueling stations; manufacture CNG and LNG equipment and technologies for ourselves and other companies; and develop renewable natural gas (RNG) production facilities.</p>'
                        +'<p style="text-align: justify;padding: 0px 30px 0px 30px; padding-left: 20%"><br><b style="color:#07448B">Customer Service</b><br>866-809-4869<br><br><b style="color:#07448B">Corporate Headquarters</b><br>Clean Energy<br>4675 MacArthur Court, Suite 800, Newport Beach, CA 92660<br>Tel: (949) 437-1000<br>Fax: (949) 724-1397</p>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="backBtn") {
                                App.app.dispatch({
                                    controller:'PageController',
                                    action:'goPage',
                                    args:[{nextPage:1, direction:'right'}]
                                });
                            }
                        },
                        element: 'element'
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