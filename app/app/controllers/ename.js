var args = $.args;
var ename = args.ename || {};
// var district = args.district;

$.ename.title = ename;

Alloy.Collections.prop.fetch();

function filterFunction(collection) { 
    return collection.where({estate: ename}); 

}

function detailClick(e) {
	var detailController = Alloy.createController('detail',{ property_name: e.row.name});
	Alloy.Globals.tabgroup.activeTab.open(detailController.getView());
}