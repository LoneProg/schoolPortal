const mongoose = require('mongoose');

// Connect to MongoDB

    const DB = async () => {
        try {
            //Connect to the Mongodb database at the specified URI
          await mongoose.connect(process.env.MONGODB_STR);
          console.log('database connection establish');
            
        } catch (error) {
            console.log(error);
            
            //log an error if the connection fails
            console.log('error connecting to database');
            
        }
    }
    
    module.exports = DB;