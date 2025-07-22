
import { Modal } from '@mui/material'
import React, { useContext, useState } from 'react'
import noteContext from '../contexAPI/notesContext';

function EditNotesModel(props) {

  const {title, des, tag,  id, open, handleClose } = props;
  const { updateNote } = useContext(noteContext);

   const [image, setImage] = useState({})
  const [newNote, setNewNote] = useState({title:title, description:des, tag:tag  });

  const handleChangeFun = (e)=>{
    setNewNote({...newNote, [e.target.name]:e.target.value });
  }

  //  const fileChange = (e)=>{
  //  setImage(e.target.files[0])
  // }

  const updateFun = (e)=>{
    e.preventDefault();
    if(newNote.title !== title || newNote.description !== des || newNote.tag !== tag){
      updateNote(newNote, id);
    }
    handleClose();
  }
  console.log(newNote)
  //console.log(newNote, image)
  
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="flex px-6 bg-transparent flex-col items-center pb-16">
      {" "}
      <form
        className="mt-6 w-1/2 max-lg:w-full mb-0 space-y-4 rounded-lg p-4 shadow-sm sm:p-6 lg:p-8 bg-gray-100"
       onSubmit={updateFun}
      >
        <div>
          <label htmlFor="title" className="">
            Title<span className="text-blue-500">*</span>
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              value={newNote.title}
              onChange={handleChangeFun}
              className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 pe-12 text-sm shadow-xs"
              placeholder="Enter notes title"
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="description" className="">
            Description <span className="text-blue-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={3}
              cols={100}
              type="description"
              value={newNote.description}
              onChange={handleChangeFun}
              className="w-full mt-2 border-2 outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
              placeholder="Enter notes description"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tag" className="">
            Tag <span className="text-blue-500">*</span>
          </label>
          <div className="relative">
            <input
              id="tag"
              name="tag"
              type="text"
              value={newNote.tag}
              onChange={handleChangeFun}
              className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 pe-12 text-sm shadow-xs"
              placeholder="Enter notes tag"
            />
          </div>
        </div>

        <fieldset className="w-full space-y-1 dark:text-gray-800">
          <label htmlFor="files" className="block text-sm font-medium">
            Attachments
          </label>
          <div className="flex">
            <input
              type="file"
              name="files"
              id="files"
              // onChange={fileChange}
              className="px-3 py-6 border-2 border-dashed rounded-md dark:border-blue-300 dark:text-gray-600 dark:bg-gray-100"
            />
          </div>
        </fieldset>

        <div className="flex mt-5 justify-between  gap-5">
          <button
          
            className="block max-sm:w-32 rounded-lg bg-blue-800 px-5 py-3 text-sm font-medium cursor-pointer text-white"
            onClick={handleClose}
          >
            Discard
          </button>
          <button
            to="/notes"
          
            className="block max-sm:w-32 cursor-pointer rounded-lg bg-blue-950 px-5 py-3 text-sm font-medium text-white"
          >
            Update Notes
          </button>
        </div>
      </form>
    </div>
  </Modal>
  )
}

export default EditNotesModel
