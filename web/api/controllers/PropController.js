/**
 * PropController
 *
 * @description :: Server-side logic for managing props
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

// Create function
create: function(req, res) {
    if (req.method == "POST") {
        Prop.create(req.body.Prop).exec( function(err, model) {
            return res.view('prop/admin', {title: 'Admin - PRS'});
        });
    } else {
        return res.view('prop/create', {title: 'Create Property - PRS'});
    }
},
// json function
json: function(req, res) {
    Prop.find().exec( function(err, props) {
        return res.json(prop);
    });
},

// index function
index: function(req, res) {
    // Prop.find().exec( function(err, props) {
    //     return res.view('prop/index', {title: 'Home - PRS', 'props': props});
    // });

    var num;
    var listone;
    var listtwo;
    Prop.count().exec( function(err, value) {
        num = Math.ceil(value / 2 );
        Prop.find({id: {'<=': num}}).exec( function(err, props) {
            listone = props;
            Prop.find({id: {'>': num}}).exec( function(err, props) {
                listtwo = props;
                return res.view('prop/index', {title: 'Home - PRS', 'propsone': listone, 'propstwo': listtwo});
            });
        });
    });
},

view: function (req, res) {
    // if not login
    //     return res.view('usr/login');
    // else
    //get id from index.ejs
    var id = req.params.id;
    Prop.findOne(req.params.id).exec( function(err, model) {
        if (model != null)
            return res.view('prop/view/', {title: 'Property Detail - PRS', 'prop': model});
        else
            return res.serverError("No such property");
    }); 
},

//paginate function
search: function (req, res) {
    var allprops;
    var pages;
    //console.log(allprops);
    //.exec( function(err, allprops) {
        //res.render('prop/search', {'allprops': allprops});
    //});
    Prop.find().paginate({page: req.query.page, limit: 2})
        .exec( function(err, props) {
            Prop.find().exec( function(err, props) {
                allprops = props;
            });
            Prop.count().exec( function(err, value) {
                pages = Math.ceil(value / 2 );

            
                // Prop.find()
                //     .where({estate: {contains: req.body.Prop.estate}})
                //     .where({bedrooms: {contains: req.body.Prop.bedrooms}})
                //     .exec( function (err, props) {
                //             return res.view('prop/search', {title: 'Search Result - PRS', 'props': props});
                // }); 
            
                return res.view('prop/search', {title: 'Search Property - PRS', 'props': props, 'count':pages, 'allprops': allprops});
            }); 

    });
},
// , {title: 'Search Property - PRS', 'props': props, 'count':pages, 'allprops': allprops}

// search: function (req, res) {
//     Prop.find().exec( function(err, props) {
//         return res.view('prop/search', {'props': props});
//     });
// },

//search function
result: function (req, res) {
    if (req.method == "GET") {
        Prop.find()
        .where({estate: {contains: req.query.estate}})
        .where({bedrooms: {contains: req.query.bedrooms}})
        .paginate({page: req.query.page, limit: 2})
        .exec( function (err, props) {
            Prop.find().exec( function(err, props) {
                allprops = props;
            });
            Prop.count().exec( function(err, value) {
                var pages = Math.ceil(value / 2 );
                return res.view('prop/result', {title: 'Search Result - PRS', 'props': props, 'count':pages, 'allprops': allprops});
            }); 
        })
    }
    
},



// result: function(req, res){
//     Prop.find().paginate({page: req.query.page, limit: 2})
//     .exec( function (err, props) {
        
//         Prop.count().exec( function(err, value) {
//             var pages = Math.ceil(value / 2 );
//             return res.view('prop/result', {title: 'Search Result - PRS', 'props': props, 'count':pages});
//         }); 
//     });
// },

// update function
update: function(req, res) {
    if (req.method == "GET") {
        Prop.findOne(req.params.id).exec( function(err, model) {
            if (model == null)
                return res.serverError("No such property!");
            else
                return res.view('prop/update', {title: 'Update Property Info - PRS', 'prop': model});
        });
    } else {
        Prop.findOne(req.params.id).exec( function(err, model) {
            model.name = req.body.Prop.name;
            model.estate = req.body.Prop.estate;
            model.garea = req.body.Prop.garea;
            model.rent = req.body.Prop.rent;
            model.bedrooms = req.body.Prop.bedrooms;
            model.tenants = req.body.Prop.tenants;
            model.imageurl = req.body.Prop.imageurl;
            model.createdAt = req.body.Prop.createdAt;
            model.updatedAt = req.body.Prop.updatedAt;
            model.save();
            return res.redirect('prop/admin');
        }); 
    }
},

// delete function
delete: function(req, res){
    Prop.findOne(req.params.id).exec(function(err, model){
        if(model!=null){
            model.destroy();
            return res.redirect('prop/admin');
        } else {
            return res.serverError("Property not found!");
        }
    });
},

admin: function(req, res) {
    // Prop.find().exec( function(err, props) {
    //     return res.view('prop/admin', {title: 'Admin - PRS', 'props': props});
    // });
    Usr.findOne({usrname: req.session.usrname}).populateAll().exec( function(err, model) {
        // var interestProps = model.interests;
        // Prop.create(interestProps);
        return res.view('prop/admin', {title: 'Admin - PRS', 'usr': model});
    });
},

interestMember: function(req, res) {
    Prop.findOne(req.params.id).populateAll().exec( function (err, model) {
        // var members = model.interestedBy;
        // Usr.create(members);
        return res.view('prop/interestMember', {title: 'Interested Members - PRS', 'prop': model});
    });
}


 

	
};

