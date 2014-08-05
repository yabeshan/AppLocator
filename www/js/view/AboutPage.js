

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
                style:'overflow: auto;height:90%;background-color:#FFF;color:#5a5947;',
                scrollable: {
                    direction: 'vertical'
                },
                html:
                    '<img src="img/about-logo.png" style="width: 250px;padding: 20px 0px 0px 20px;">'+
                    '<div style="color:#28549c;padding: 10px 10px 20px 20px;max-width: 900px">Clean Energy is the largest provider of natural gas fuel for transportation in North America, fueling over 30,000 vehicles each day at approximately 500 fueling stations throughout North America.</div>'+
                    '<div style="background-color:#f8f8f8;border-top: 1px solid #c1c0c0;width: 100%;height:80px"><img src="img/about-icon-city.png" style="float:left;width: 80px;"><span style="position:relative;top:16px;font-size: 17px">4675 McArthur Court, Suite 800<br>Newport Beach, CA 92606</span></div>'+
                    '<div style="background-color:#f8f8f8;border-top: 1px solid #c1c0c0;width: 100%;height:62px"><img src="img/about-icon-mobile.png" style="float:left;width: 80px"><span style="position:relative;top:20px;"><a href="tel:9494371000" style="color:#5a5947;text-decoration: none">949.437.1000</a></span></div>'+
                    '<div style="background-color:#f8f8f8;border-top: 1px solid #c1c0c0;width: 100%;height:62px"><img src="img/about-icon-web.png" style="float:left;width: 80px"><span style="position:relative;top:20px;" id="siteSpan">www.CleanEnergyFuels.com</span></div>'+
                    '<div style="background-color:#f8f8f8;border-top: 1px solid #c1c0c0;width: 100%;height:62px"><img src="img/about-icon-mail.png" style="float:left;width: 80px"><span style="position:relative;top:20px;" id="mailSpan">Info@CleanEnergyFuels.com</span></div>'+

                    '<div style="background-color:#f8f8f8;border-top: 1px solid #c1c0c0;border-bottom: 1px solid #c1c0c0;width: 100%;height:65px"><img id="facebookLink" src="img/social-facebook.png" style="height:50px;padding: 10px 30px 0 40px;">'+
                    '<img id="twitterLink" src="img/social-twitter.png" style="height:50px;padding: 10px 30px 0 0;"><img id="linkedinLink" src="img/social-linkedin.png" style="height:50px;padding: 10px 30px 0 0;"><img id="googleLink" src="img/social-googleplus.png" style="height:50px;padding: 10px 0 0 0;"></div>'+

                    '<div style="width: 100%;height: 80px;background-image: url(img/main-page-moreinfo-bottom-arrow.png);background-position: center center;background-repeat: no-repeat;background-size: 161px 115px;"></div>'+
                    '<div style="color:#30b457;font-weight: bold;font-size: 22px;padding: 20px 10px 20px 20px;">About Natural Gas</div>'+
                    '<div id="menuCNG" class="about-submenu about-submenu-open">What is CNG?</div>'+
                    '<div id="submenuCNG" style="background-color:#f8f8f8;padding: 10px 10px 30px 20px;">Compressed natural gas (CNG) is methane stored under high pressure in a gaseous form, making it lighter than air. CNG is typically used for light and medium-size natural gas vehicles (NGVs), and some heavy-duty trucks.</div>'+
                    '<div id="menuLNG" class="about-submenu about-submenu-open">What is LNG?</div>'+
                    '<div id="submenuLNG" style="background-color:#f8f8f8;padding: 10px 10px 30px 20px;">Liquefied natural gas (LNG) s methane cryogenically cooled to a liquid form, reducing its volume for ease in storage and transport. LNG provides fleet managers with the ability to store more fuel with less tank weight, thus creating an efficient and cost-saving fueling solution for heavy-duty trucking, marine, and rail fleets regulated by strict weight & range requirements.</div>'+
                    '<div id="menuRNG" class="about-submenu about-submenu-open">What is Redeem (RNG)?</div>'+
                    '<div id="submenuRNG" style="background-color:#f8f8f8;padding: 10px 10px 30px 20px;">Redeem is biomethane and America’s first transportation fuel made entirely from organic waste and is available for distribution as either CNG or LNG. Redeem is up to 90% cleaner than gasoline and diesel, cost-efficient, and domestically available, making it a smart choice for natural gas vehicle fleets including heavy-duty trucks.</div>',

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
                                window.open("mailto:Info@CleanEnergyFuels.com", "_system");
                            } else if (node.id=="siteSpan") {
                                window.open("http://www.CleanEnergyFuels.com", "_system");
                            } else  if (node.id=="menuCNG") {
                                if ( Ext.get('menuCNG').hasCls('about-submenu-open') ) {
                                    Ext.get('submenuCNG').setVisible(false);
                                    Ext.get('menuCNG').removeCls('about-submenu-open');
                                    Ext.get('menuCNG').addCls('about-submenu-close');
                                } else {
                                    Ext.get('submenuCNG').setVisible(true);
                                    Ext.get('menuCNG').removeCls('about-submenu-close');
                                    Ext.get('menuCNG').addCls('about-submenu-open');
                                }
                            } else  if (node.id=="menuLNG") {
                                if ( Ext.get('menuLNG').hasCls('about-submenu-open') ) {
                                    Ext.get('submenuLNG').setVisible(false);
                                    Ext.get('menuLNG').removeCls('about-submenu-open');
                                    Ext.get('menuLNG').addCls('about-submenu-close');
                                } else {
                                    Ext.get('submenuLNG').setVisible(true);
                                    Ext.get('menuLNG').removeCls('about-submenu-close');
                                    Ext.get('menuLNG').addCls('about-submenu-open');
                                }
                            } else  if (node.id=="menuRNG") {
                                if (Ext.get('menuRNG').hasCls('about-submenu-open')) {
                                    Ext.get('submenuRNG').setVisible(false);
                                    Ext.get('menuRNG').removeCls('about-submenu-open');
                                    Ext.get('menuRNG').addCls('about-submenu-close');
                                } else {
                                    Ext.get('submenuRNG').setVisible(true);
                                    Ext.get('menuRNG').removeCls('about-submenu-close');
                                    Ext.get('menuRNG').addCls('about-submenu-open');
                                }
                            }
                        },
                        element: 'element'
                    }
                }



            }
        ]
    },

    initialize: function() {

    },
    update:function(){

    }

});