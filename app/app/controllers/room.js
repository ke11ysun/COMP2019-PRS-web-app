// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var room_num = args.room_num || {};
var rent = args.rent;

// $.room.title = rent;

Alloy.Collections.prop.fetch();

function filterFunction(collection) { 

    if (rent == "s" && room_num == "2-")
        return collection.filter(function(model){
            return (model.get("bedrooms")<=2 && model.get("rent")<150000);
        });
    if (rent == "s" && room_num == "3+")
        return collection.filter(function(model){
           return (model.get("bedrooms")>2 && model.get("rent")>=150000);
        }); 
    if (rent == "l" && room_num == "2-")
        return collection.filter(function(model){
            return (model.get("bedrooms")<=2 && model.get("rent")>=150000);
        });
    if (rent == "l" && room_num == "3+")
        return collection.filter(function(model){
            return (model.get("bedrooms")>2 && model.get("rent")>=150000);
        });
}

function detailClick(e) {
	var detailController = Alloy.createController('detail',{ property_name: e.row.name});
	Alloy.Globals.tabgroup.activeTab.open(detailController.getView());
}