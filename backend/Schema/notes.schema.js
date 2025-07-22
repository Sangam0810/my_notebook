const { default: mongoose } = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default:"general",
  },
  image:{
    type:String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc1Q2HWpFHc59bQZTa-G0B_T58g3aK8efKjw&s",
  },
  createdby:{
    type: mongoose.Schema.Types.ObjectId,                              // schema se relataionship kene ke liye ueh code use krte h
    ref:"Signup"                                                       // isss waale se reference provide kre hai
  }
},{timestamps:true});

const Note = mongoose.model("Note", notesSchema);


module.exports = Note;
