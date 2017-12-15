$.index.open();
Alloy.Globals.tabgroup = $.index;

Alloy.Collections.prop.fetch();
Alloy.Collections.estates.fetch();

function transformFunction(model) { 
    var transform = model.toJSON(); 
    console.log(transform);
    if (transform.imageurl == null || transform.imageurl == "") 
        transform.imageurl = "http://gemstatepatriot.com/blog/wp-content/uploads/2015/11/default.jpg";     // a default picture

    return transform; 
}

function detailClick(e) {
	var detailController = Alloy.createController('detail',{ property_name: e.row.name});
	$.index.activeTab.open(detailController.getView());
}

function roomClick(e) {
    var roomController = Alloy.createController('room', {
        room_num : e.row.room_num, 
        rent : e.row.rent
    });
    
    $.index.activeTab.open(roomController.getView());
}

var previous = null;
function districtTrans(model) {
    var transform = model.toJSON();
    // Example of creating a custom attribute, reference in the view using {custom}
    if (previous != transform.District)
        transform.custom = transform.District;
    previous = transform.District;
    return transform;
}

function mapTrans(model){
    var transform = model.toJSON();
    transform.title = transform.Name;
    transform.subtitle = transform.ChineseName;
    transform.rightButton = Titanium.UI.iOS.SystemButton.DISCLOSURE;
    return transform;
}

function mapClick(e) {    
    if (e.clicksource == 'rightButton') {           
        // console.log(e.annotation.title + " is Clicked");
        // alert(e.annotation.title + " is Clicked");
        var enameController = Alloy.createController('ename', {
        ename : e.annotation.title
        });
        $.index.activeTab.open(enameController.getView());
    }   
}

// function distinctDistrict(collection) {
// 	// return collection.fetch({
// 	// 	query: 'SELECT DISTINCT District FROM ' + collection_name
// 	// }); 
// 	return Alloy.Collections.estates.where({District: "New Territories East"});
// }

function nameClick(e) {
    var enameController = Alloy.createController('ename', {
    district: e.row.district, 
    ename : e.row.ename
    });
     
    $.index.activeTab.open(enameController.getView());
}






function log(e) {
	var logController;
	//if (user!=null) {
		logController = Alloy.createController('login', {
			user: e.row.name
		});
		$.index.activeTab.open(logController.getView());
	//} 
	
}
