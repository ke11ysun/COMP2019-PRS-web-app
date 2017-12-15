var args = $.args;
var user = args.user;


function loginFunction(e) {
    
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function(e) {
        alert(this.responseText);
    };
    xhr.open('POST','http://simplelogin.cs7141.comp.hkbu.edu.hk/User/signin');
    xhr.send({
        "userid": $.textField.value,
    	"password": $.textField2.value
    });
}