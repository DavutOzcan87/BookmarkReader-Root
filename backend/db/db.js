const MongoClient = require('mongodb').MongoClient;

module.exports={
    client:null,
    db:null,
    get:function(){
        return this.db;
    },
    close:function(){
        if(this.client != null)
        {
            this.client.close();
            this.db = null;
        }
    },
    connect: function(url,dbname , callback){
        const self = this;
        var cacheConnection = function(err, client) {
            if(!err)
            {
                self.db=  client.db(dbname);
                self.client = client;
            }
            callback(err);
          };
        
          try {
            MongoClient.connect(url, cacheConnection);
          } catch(ex) {
            callback(ex);
          }
    }
};