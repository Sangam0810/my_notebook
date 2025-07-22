const express = require('express');
const router = express.Router();
const verifyUser = require("../middleware/userverfication")
const nodesmodel = require("../Schema/notes.schema")
const upload = require('../middleware/multer')

router.post('/addnote', verifyUser, upload.single("image"), async(req, res)=>{
  
      console.log(req.body);
  console.log(req.file);
  const { title, description, tag } = req.body;


     const notesData = {
    title: title,
    description: description,
    createdby: req.user,
    };
    if(tag){
      notesData.tag = tag
     }
    if(req.file){
        notesData.image = req.file.filename
    }

    try {
        let notes = await nodesmodel.create(notesData);
        res.status(200).send({
            success:true,
            message:"note added successfully",
            note: notes,
           })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"internal server error"
        })
            
        }  
})

router.get('/getnotes', verifyUser ,async(req, res)=>{
 
  try {
    let allNotes = await nodesmodel.find({createdby: req.user}).populate("createdby");
    res.send({
        success:true,
        results: allNotes.length,
        message:"all notes",
        notes:allNotes,
})
  } catch (error) {
     res.status(500).send({
        success : false,
        message :"internal server error",
     });
  }
});

//update====================================
router.put('/updatenotes/:notesID', verifyUser, async(req, res)=>{
    const {notesID} = req.params
   try {
    let updateNotes = await nodesmodel.findByIdAndUpdate(notesID, {$set:req.body,
    });
    res.status(200).send({
        success: true,
        message: "note updated successfully",
        notes: updateNotes,
    });
   } catch (error) {
       res.status(500).send({
        success: false,
        message: "internal server error"
       });
   }
});


// delete======================================                            // aak bar delete hone ke baad postman mein https waale mein id beh change krege

router.delete('/deletenotes/:notesID', verifyUser, async(req, res)=>{
    try {
        let deleteNotes = await nodesmodel.findByIdAndDelete(req.params.notesID)
        res.send({
            success : true,
            message : "note deleted successfully",
            notes: deleteNotes,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "internal server error"
        })
    }
})



module.exports = router;