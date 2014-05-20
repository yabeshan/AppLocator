
Ext.define('App.controller.DataController', {
    extend : 'Ext.app.Controller',
    id:'DataController',

    search: function(key) {
//        console.log("search key = " + key );
        var store = Ext.getStore("StationStore");
        store.removeAll();
        store.sync();

        this.filterDB( this.db, key );
    },

    db:null,
    json:null,
    addCount:0,
    init: function() {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data/stationsTmp.json', true);
        xobj.onreadystatechange = function () {
            if ((xobj.readyState == 4 || xobj.status == "200") && xobj.responseText) {
                var controller = App.app.getController("App.controller.DataController");
//                controller.json = xobj.responseText;
                controller.json = JSON.parse(xobj.responseText);
                controller.initDB();
            }
        };
        xobj.send(null);
    },

    initDB: function () {
        this.db = window.openDatabase("DataBase", "1.0", "DataBase STATIONS", 5000000);
        this.db.transaction(function(tx) {
            var sql = 'SELECT * FROM DataBase';
            tx.executeSql( sql, [], function(tx, results){
                App.app.getController("App.controller.DataController").createDB();
//                App.app.getController("App.controller.DataController").updateDB(results.rows.length);
            } );
        }, function(err) {
            App.app.getController("App.controller.DataController").createDB();
        }, function(tx, results) {

        });
    },

    createDB: function() {
        this.db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS DataBase');
            tx.executeSql('CREATE TABLE IF NOT EXISTS DataBase (id INTEGER PRIMARY KEY AUTOINCREMENT,'
                +' address, city, zip, name, country, state)');
        }, function(err) {
            alert("Error processing CREATE SQL: "+err.message);
        }, function() {
            App.app.getController("App.controller.DataController").updateDB(0);
        });
    },

    updateDB: function(length) {
        if(length==0) {
            /*
            this.addDBItem( this.db, {
                "id":10002,"name":"Clean Energy - Boundary & Dominion","status":"1","address":"3030 Boundary Rd",
                "city":"Burnaby","state":"BC","zip":"V5M 4A1","country":"Canada","latitude":49.256472,"longitude":-123.023465,
                "type":"0","fuel":"0","open":"7:00","close":"19:00","monday":"Yes","tuesday":"Yes","wednesday":"Yes",
                "thursday":"Yes","friday":"Yes","saturday":"No","sunday":"","vehicle":0,"payment":"0","flow":0,"special":"nothing special"
            } );

            this.addDBItem( this.db, {
                "id":10004,"name":"Clean Energy - Cloverdale Chevron","status":"1","address":"17790 56th Ave",
                "city":"Surrey","state":"BC","zip":"V3S 1C7","country":"Canada","latitude":49.103785,"longitude":-122.729808,
                "type":"0","fuel":"0","open":"8:00","close":"20:00","monday":"Yes","tuesday":"Yes","wednesday":"Yes",
                "thursday":"Yes","friday":"Yes","saturday":"No","sunday":"","vehicle":0,"payment":"0","flow":0,"special":""
            } );
            */
            console.log("parse json" + this.json['stations'].length);
            var k=0, arr=this.json['stations'], lng=arr.length;
            for (k;k<lng;k++) {
//                console.log( arr[k] );
                this.addCount ++;
                this.addDBItem( this.db, arr[k] );
            }
        }

//        this.filterDB( this.db );
    },

    addDBItem: function( db, item ) {
        db.transaction(function(tx) {
            var sql = 'INSERT INTO DataBase (address, city, zip, name, country, state) VALUES ( ? , ? , ? , ? , ? , ? )';
            var data = [item['address'], item['city'], item['zip'], item['name'], item['country'], item['state']];
//            console.log( item['address']+"   "+ item['city']);
            tx.executeSql( sql, data );
        }, function(err) {
            alert("Error processing INSERT SQL: "+err.message);
        }, function(tx, results) {
            var controller = App.app.getController("App.controller.DataController");
            controller.addCount --;
            if (controller.addCount==0) alert("complete");
        });
    },

    filterDB: function(db, key) {
        db.transaction(function(tx) {
            if (key && key.length>0) {
                var sql = 'SELECT * FROM DataBase WHERE address LIKE ("%'+key+'%") OR zip LIKE ("%'+key+'%") OR city LIKE ("%'+key+'%")';
            } else {
                var sql = 'SELECT * FROM DataBase';
            }

            tx.executeSql( sql, [], function(tx, results){
                for (var k=0; k<results.rows.length; k++) {
                    var item = results.rows.item(k);
                    Ext.getStore("StationStore").add( item );
                }
            } );
        }, function(err) {
            alert("Error processing SELECT SQL: "+err.message);
        }, function(tx, results) {

        });
    }
});