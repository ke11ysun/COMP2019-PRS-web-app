var args = $.args;
var property_name = args.property_name || {};
// var latitude = args.latitude || {};
// var longtitude = args.longtitude || {};

$.map.title = property_name;

Alloy.Collections.estates.fetch();

function filterFunction(collection) { 
    return collection.where({Name:ename});
}

function mapTrans(model) {
	transform = model.toJSON();
    // transform.title = transform.Name;
    // transform.subtitle = transform.ChineseName;
    $.anno.latitude = transform.Latitude;
	$.anno.longitude = transform.Longitude;
	$.anno.title = transform.Name;
	$.anno.subtitle = transform.ChineseName;
	$.anno.rightButton = Titanium.UI.iOS.SystemButton.DISCLOSURE;
    return transform;
}


$.map.addEventListener("close", function(){ 
    $.destroy();
});

