

Ext.define('App.view.SharePanel', {
    extend: 'Ext.Container',
    alias : 'widget.sharePanel',
    id:'sharePanel',

    config: {

        items: [
            {
                style:'position:absolute;top:50%;margin-top:-72px;left:50%;margin-left:-72px;zoom:130%;',
                html:'<img src="img/icons-share.png"><div id="share-facebook"></div>'+
                     '<div id="share-twitter"></div><div id="share-google"></div><div id="share-mail"></div>'+
                     '<img id="share-station-mail" src="img/icons-share-info.png" style="position: absolute;top:132px;left:0px;" >'
            }
        ],
        listeners: {
            tap: {
                fn: function( e, node ) {

                    var subj = 'Email from Station Locator';
                    var body = '';
                    var mapHref = 'https://www.google.com/maps/place/';
                    var signature = '<br><br><br>Sincerely, <br><br> Clean Energy Station Locator <br> http://www.cnglngstations.com';

                    if (node.id=="share-facebook") {
                        Ext.getCmp('sharePanel').openFacebook();
                    } else if (node.id=="share-twitter") {
                        Ext.getCmp('sharePanel').openTwitter();
                    } else if (node.id=="share-google") {
                        Ext.getCmp('sharePanel').openGoogle();
                    } else if (node.id=="share-mail") {

                        var stAddress = 'Station Address';

                        body += 'Trip Info <br><br>';

                        if (document.getElementById('tp-end-point-0').value.length>0 || document.getElementById('tp-end-point-1').value.length>0) {
                            stAddress = document.getElementById('tp-end-point-0').value;
                            body += '<br>Start: ' + '<a href="' + mapHref + stAddress + '">' + stAddress + '</a>';

                            var lastID = Ext.get('trip-palent-starter').dom.children.length-1;
                            if (lastID>1) {
                                for (var k=1; k<lastID; k++) {
                                    stAddress = document.getElementById('tp-end-point-'+k).value;
                                    body += '<br>Destination: ' + '<a href="' + mapHref + stAddress + '">' + stAddress + '</a>';
                                }
                            }

                            stAddress = document.getElementById('tp-end-point-'+lastID).value;
                            body += '<br>End: ' + '<a href="' + mapHref + stAddress + '">' + stAddress + '</a>';
                        }
                        window.open('mailto:?subject='+subj+'&body='+body+signature, '_system');

                    } else if (node.id=="share-station-mail") {

                        var stName = Ext.getCmp('infoPopup').stationName;
                        var stAddress = Ext.getCmp('infoPopup').stationAddress;
                        var stHours = Ext.getCmp('infoPopup').stationHours;
                        var stAccepts = Ext.getCmp('infoPopup').stationAccepts;

                        body += 'Station Info <br><br>';
                        body += '<br>Station: ' + stName;
                        body += '<br>Address: ' + '<a href="' + mapHref + stAddress + '">' + stAddress + '</a>';
                        body += '<br>Open Hours: ' + stHours;
                        body += '<br>Accepts: ' + stAccepts;
                        body += '<br>';


                        this.sendMail( subj, (body+signature) );
                        
                        window.plugins.EmailComposer.showEmailComposerWithCallback(
                            null,
                            "Look at this photo",
                            "Take <br/>a look<br> at <b>this<b/>:",
                            ["example@email.com", "johndoe@email.org"],
                            [],[],true,[]);


//                        window.open('mailto:?subject='+subj+'&body='+body+signature, '_system');
                    }
                    Ext.getCmp('sharePanel').hideShare();
                },
                element: 'element'
            }
        }

    },

    openFacebook: function() {
        if (window && window.plugins && window.plugins.socialsharing && window.plugins.socialsharing.shareVia) {
            window.plugins.socialsharing.shareVia(
                ( (navigator.userAgent.match(/Android/i) == "Android") ? 'com.facebook.katana' : 'com.apple.social.facebook'),
                // message // subject // photo // link
                'Clean Energy Station Locator ', null,
                ( (navigator.userAgent.match(/Android/i) == "Android") ? null : 'http://cnglngstations.com/Images/logo_colored.png'),
                'http://cnglngstations.com/',
                function(){/* Success callback */},
                function(msg) {
                    window.open('http://www.facebook.com/sharer.php?u=http%3A%2F%2Fcnglngstations.com%2F', '_system');
                })
        } else {
            window.open('http://www.facebook.com/sharer.php?u=http%3A%2F%2Fcnglngstations.com%2F', '_system');
        }
    },

    openTwitter: function() {
        if (window && window.plugins && window.plugins.socialsharing && window.plugins.socialsharing.shareVia) {
            window.plugins.socialsharing.shareVia(
                ( (navigator.userAgent.match(/Android/i) == "Android") ? 'com.twitter.android' : 'com.apple.social.twitter'),
                'Clean Energy Station Locator @CE_Natgas', null, null, 'http://cnglngstations.com/',
                function(){/* Success callback */},
                function(msg) {
                    window.open('http://twitter.com/home?status=Clean%20Energy%20Station%20Locator%20http%3A%2F%2Fcnglngstations.com%2F @CE_Natgas', '_system');
                })
        } else {
            window.open('http://twitter.com/home?status=Clean%20Energy%20Station%20Locator%20http%3A%2F%2Fcnglngstations.com%2F @CE_Natgas', '_system');
        }
    },

    openGoogle: function() {
        if (navigator.userAgent.match(/Android/i) == "Android") {
            if (window && window.plugins && window.plugins.socialsharing && window.plugins.socialsharing.shareVia) {
                window.plugins.socialsharing.shareVia(
                    'com.google.android.apps.plus',
                    // message // subject // photo // link
                    'Clean Energy Station Locator ', null,
                    ( (navigator.userAgent.match(/Android/i) == "Android") ? null : 'http://cnglngstations.com/Images/logo_colored.png'),
                    'http://cnglngstations.com/',
                    function(){/* Success callback */},
                    function(msg) {
                        window.open('https://plus.google.com/share?url=http%3A%2F%2Fcnglngstations.com%2F', '_system');
                    })
            } else {
                window.open('https://plus.google.com/share?url=http%3A%2F%2Fcnglngstations.com%2F', '_system');
            }
        } else {
            if (navigator && appAvailability) {
                appAvailability.check(
                    'gplus://', // URI Scheme
                    function() {  // Success callback
                        window.open('gplus://plus.google.com/share?url=http%3A%2F%2Fcnglngstations.com%2F', '_system');
                    },
                    function() {  // Error callback
                        window.open('https://plus.google.com/share?url=http%3A%2F%2Fcnglngstations.com%2F', '_system');
                    }
                );
            } else {
                window.open('https://plus.google.com/share?url=http%3A%2F%2Fcnglngstations.com%2F', '_system');
            }
        }
    },

    initialize: function(me, eOpts) {
        this.hideShare();
    },
    showShare: function( flag ) {
        Ext.get("share-station-mail").setVisible( flag );
        Ext.getCmp('sharePanel').show();
    },
    hideShare: function() {
        Ext.getCmp('sharePanel').hide();
    }

});
