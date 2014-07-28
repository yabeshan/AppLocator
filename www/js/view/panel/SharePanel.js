

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
                    if (node.id=="share-facebook") {
                        window.open('http://www.facebook.com/sharer.php?u=http%3A%2F%2Fcnglngstations.com%2F', '_system');
                    } else if (node.id=="share-twitter") {
                        window.open('http://twitter.com/home?status=Clean%20Energy%20Station%20Locator%20http%3A%2F%2Fcnglngstations.com%2F', '_system');
                    } else if (node.id=="share-google") {
                        window.open('https://plus.google.com/share?url=http%3A%2F%2Fcnglngstations.com%2F', '_system');
                    } else if (node.id=="share-mail" || node.id=="share-station-mail") {
                        window.open('mailto:?subject=Clean%20Energy%20Station&amp;body=http%3A%2F%2Fcnglngstations.com%2F', '_system');
                    }
                    Ext.getCmp('sharePanel').hideShare();
                },
                element: 'element'
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
