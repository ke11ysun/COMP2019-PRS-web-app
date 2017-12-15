/**
 * UsrController
 *
 * @description :: Server-side logic for managing usrs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	login: function (req, res) {

        if (req.method == "GET")
            return res.view( 'usr/login', {title: 'User Login - PRS'});
        else {

            Usr.findOne({usrname:req.body.usrname})
            .exec( function (err, usr) {

                if (usr == null) 
                    //return res.send("No such user");
                    return res.serverError('No such user!');
                
                if (usr.password != req.body.password) 
                    //return res.send("Wrong Password");
                    return res.serverError('Wrong Password!');
                    //res.render('usr/login',{password:"Wrong password!"});
                    //document.getElementById('err').innerHTML("Wrong password!");
                    //return res.view('usr/login');
                    //return res.send({password: "Wrong Password"});

                req.session.usrname = req.body.usrname;
                return res.redirect('prop/index');
                
            });
            
        }
    },

    logout: function (req, res) {
    	req.session.usrname = null;
    	return res.redirect('prop/index');
    },

    // Create function
    register: function(req, res) {
        if (req.method == "POST") {
            Usr.create(req.body.Usr).exec( function(err, model) {
                return res.view('usr/login', {title: 'User Login - PRS'});
            });
        } else {
            return res.view('usr/register', {title: 'Register - PRS'});
        }
    },

    addInterest: function (req, res) {
        Usr.findOne({usrname: req.session.usrname}).exec( function (err, model) {
            model.interests.add(req.params.id);
            model.save();
            return res.redirect('prop/admin');
        })
    },


    removeInterest: function(req, res) {
        Usr.findOne({usrname: req.session.usrname}).exec( function (err, model) {
            model.interests.remove(req.params.id);
            model.save();
            return res.redirect('prop/admin');;
            
        });
    }

};

