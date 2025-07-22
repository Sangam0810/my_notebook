const { default: mongoose } = require("mongoose");

const SignupSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
      }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String, 
        required:true,
        minLength:[8, "Password should be greater than 8"], 
       
      },
});

const Signup = mongoose.model("Signup", SignupSchema);
module.exports = Signup;