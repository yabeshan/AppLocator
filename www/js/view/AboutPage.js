

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
                html:'<img id="backBtn" src="img/icons_button-back.png" style="position:absolute;z-index:90000; top:0px; left:0px;height:47px;cursor:pointer">',
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
            },{
                style:'overflow: auto;height:80%;',
                scrollable: {
                    direction: 'vertical'
                },
                html:
                        '<p style="text-align: justify;padding: 30px 30px 0px 30px; padding-left: 10%"><span style="font-weight: 100;">4675 MacArthur Court, Suite 800</span><br>4675 MacArthur Court, Suite 800<br><span style="font-weight: 700;">4675 MacArthur Court, Suite 800</span><br>Newport Beach, California 92660</p>'+
                        '<p style="text-align: justify;padding: 0px 30px 0px 30px; padding-left: 10%"><br><b style="color:#07448B">Customer Service Hotline</b><br><a href="tel:8885551212">888-555-1212</a><br><a id="mailSpan" href="#">info@cleanenergyfuels.com</a><br>' +
                        '<br><img id="facebookLink" src="img/social-facebook.jpg"> <img id="twitterLink" src="img/social-twitter.jpg"> <img id="linkedinLink" src="img/social-linkedin.jpg"> <img id="googleLink" src="img/social-googleplus.png"></p><br><br>'+

                        '<p style="text-align: justify;padding: 0px 30px 0px 30px">Clean Energy is the largest provider of natural gas fuel for transportation in North America, fueling over 30,000 vehicles each day at approximately 500 fueling stations throughout North America.</p>'+

                '<h1 style="padding: 10px;color:#07448B;font-weight: bold;font-size: 120%">What is CNG?</h1><p style="text-align: justify;padding: 0px 30px 0px 30px">Compressed natural gas (CNG) is methane stored under high pressure in a gaseous form, making it lighter than air. CNG is typically used for light and medium-size natural gas vehicles (NGVs), and some heavy-duty trucks.</p>'+
                '<h1 style="padding: 10px;color:#07448B;font-weight: bold;font-size: 120%">What is LNG?</h1><p style="text-align: justify;padding: 0px 30px 0px 30px">Liquefied natural gas (LNG) s methane cryogenically cooled to a liquid form, reducing its volume for ease in storage and transport. LNG provides fleet managers with the ability to store more fuel with less tank weight, thus creating an efficient and cost-saving fueling solution for heavy-duty trucking, marine, and rail fleets regulated by strict weight & range requirements.</p>'+
                '<h1 style="padding: 10px;color:#07448B;font-weight: bold;font-size: 120%">What is Redeem (RNG)?</h1><p style="text-align: justify;padding: 0px 30px 0px 30px">Redeem is biomethane and America’s first transportation fuel made entirely from organic waste and is available for distribution as either CNG or LNG. Redeem is up to 90% cleaner than gasoline and diesel, cost-efficient, and domestically available, making it a smart choice for natural gas vehicle fleets including heavy-duty trucks.</p>',

                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="facebookLink") {
                                window.open("http://facebook.com/cleanenergyfuels", "_system");
                            } else if (node.id=="twitterLink") {
                                window.open("http://twitter.com/CE_natgas", "_system");
                            } else if (node.id=="linkedinLink") {
                                window.open("http://www.linkedin.com/company/350942?trk=NUS_CMPY_TWIT", "_system");
                            } else if (node.id=="googleLink") {
                                window.open("http://plus.google.com/", "_system");
                            } else if (node.id=="mailSpan") {
                                window.open("mailto:info@cleanenergyfuels.com", "_system");
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