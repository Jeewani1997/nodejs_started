const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new schema({
    
    username:{type:String},
    name:{type:String},
    email:{type:String},
    password:{type:String}

});

const User = module.exports = mongoose.model("User",userSchema);

module.exports.saveUser = function (newUser,callback){
    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err,hash){
            newUser.password = hash;

            if(err) throw err;
            newUser.save(callback);
        });

    });

};

module.exports.findByEmail = function(email,callback){
  const query = {email:email};
  User.findOne(query,callback);
};

module.exports.passwordCheck = function(plainpassword,hash,callback){
    bcrypt.compare(plainpassword,hash,function(err,res){
        if(err) throw err;
        if(res){
            callback(null,res);
        }
    });
    
};

module.exports.findUserbyId = function(id,callback){
  User.findOne(id,callback);
}; 