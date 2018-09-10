const MongoClient = require('mongodb').MongoClient;

module.exports={
    connection:null,
    get:function(){
        return this.connection;
    },
    close:function(){
        if(this.connection != null)
            this.connection.close();
        this.connection = null;
    },
    connect: function(dbname , callback){
        const self = this;
        var cacheConnection = function(err, db) {
            self.connection= db;
            callback(err);
          };
        
          try {
            MongoClient.connect(dbname, cacheConnection);
          } catch(ex) {
            callback(ex);
          }
    }
};