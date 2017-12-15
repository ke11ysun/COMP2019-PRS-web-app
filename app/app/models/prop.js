exports.definition = {
	config : {
	    "columns": {
	        "id":"INTEGER PRIMARY KEY",
	        "name":"text", 
	        "imageurl":"text",
	        "estate":"text",
			"garea":"INTEGER",
			"rent":"INTEGER",
			"bedrooms":"INTEGER",
			"tenants":"INTEGER",
			"createdAt":"text",
			"updatedAt":"text"
	    },
    
	    "URL": "https://api.myjson.com/bins/bd08t", 

	    "adapter" : {
	        "type" : "sqlrest",
	        "collection_name" : "prop", 
	        "idAttribute" : "id",
	    },
    
	    // delete all models on fetch
	   "deleteAllOnFetch": true
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});

		return Collection;
	}
};