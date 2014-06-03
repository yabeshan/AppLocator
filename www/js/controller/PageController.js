

Ext.define('App.controller.PageController', {
    extend: 'Ext.app.Controller',

    nextPageCmp:null,
    goPage: function( data ) {
        switch(data.nextPage) {
            case 0:
                this.nextPageCmp = Ext.getCmp('StartPage');
                break;
            case 1:
                this.nextPageCmp = Ext.getCmp('MainPage');
                break;
            case 2:
                break;
            case 3:
                this.nextPageCmp = Ext.getCmp('AboutPage');
                break;
            case 4:
                this.nextPageCmp = Ext.getCmp('SettingsPage');
                break;
            case 5:
                this.nextPageCmp = Ext.getCmp('SharePage');
                break;
        }
        this.nextPageCmp.update();

        var panelHolder = Ext.getCmp('panelHolder');
        panelHolder.getLayout().setAnimation({
            type: 'slide', duration: 300, direction: data.direction
        });
        panelHolder.setActiveItem( this.nextPageCmp );
    }
});

