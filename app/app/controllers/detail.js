// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var property_name = args.property_name;
// var latitude = args.latitude || {};
// var longtitude = args.longtitude || {};
Alloy.Collections.prop.fetch();
$.detail.title = property_name;


function filterFunction(collection) { 
    return collection.where({name:property_name});
}

function mapClick(e) {
    var mapController = Alloy.createController('map', {
        ename: e.source.estate
    });
    // latitude : e.row.latitude, longtitude : e.row.longtitude, 

	Alloy.Globals.tabgroup.activeTab.open(mapController.getView());
}



$.detail.addEventListener("close", function(){ 
    $.destroy();
});