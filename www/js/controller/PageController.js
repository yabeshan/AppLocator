

Ext.define('App.controller.PageController', {
    extend: 'Ext.app.Controller',

    goPage: function( data ) {
        var nextPageCmp;
        switch(data.nextPage) {
            case 0:
                nextPageCmp = Ext.getCmp('StartPage');
                break;
            case 1:
                nextPageCmp = Ext.getCmp('MainPage');
                break;
            case 2:
                nextPageCmp = Ext.getCmp('PlanTripPage');
                break;
            case 3:
                nextPageCmp = Ext.getCmp('AboutPage');
                break;
            case 4:
                nextPageCmp = Ext.getCmp('SettingsPage');
                break;
        }
        nextPageCmp.update();

        var panelHolder = Ext.getCmp('panelHolder');
        panelHolder.getLayout().setAnimation({
            type: 'slide', duration: 300, direction: data.direction
        });
        panelHolder.setActiveItem( nextPageCmp );
    }
});

