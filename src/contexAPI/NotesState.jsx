
import React, { useState } from 'react'
import noteContext from './notesContext'
import { toast } from 'react-toastify'
import baseUrls from '../baseUrls';


const NotesState = ({children}) => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("login") || false);

 

    //addnotes===================
    const [allNotes, setAllNotes] = useState([])

    const addNotes = async (note, image) => {
      const {title, description, tag } = note;
      let formData = new FormData();                  // new data ka mtlab new object ko create krna

      formData.append("title", title);              // data ko append krne ke liye key value ke form mein value bejte hai
      formData.append("description", description);
      formData.append("tag", tag);

       if (image) {
        formData.append("image", image);
       }

       try {
            const response = await fetch(`${baseUrls}/api/note/addnote`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
       } catch (error) {
         toast.error("Something went wrong", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
       }
    };

     //  jab hm log multer use nhi krege tb hm log yeh wala code use krege
     
  // const addNotes = async (note) => {
  //   try {
  //     const response = await fetch(`${baseUrls}/api/notes/addnote`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify(note),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     if (data.success) {
  //       toast.success(data.message, {
  //         position: "top-center",
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //     } else {
  //       toast.error(data.message, {
  //         position: "top-center",
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong", {
  //       position: "top-center",
  //       autoClose: 4000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // };


    //getnotes=========================
    const getNotes = async () => {
     try {
      const response = await fetch(`${baseUrls}/api/note/getnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();

       if(data.success){
        setAllNotes(data.notes)
       }
    }
      catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
     }

//delete notes===============================
    
const deleteNote = async (id) => {
  try {
    const response = await fetch(
      `${baseUrls}/api/note/deletenotes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
       
      }
    );
    const data = await response.json();
    if (data.success) {
      let copyNote = [...allNotes];
      let newNotes = copyNote.filter((note) => note._id !== id);
      setAllNotes(newNotes);
      toast.success(data.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error(data.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  } catch (error) {
    toast.error("Something went wrong", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

//getupdatenotes==============================

const updateNote = async (updatedNote, id) => {
    console.log(updatedNote, id);
    try {
      const response = await fetch(
        `${baseUrls}/api/note/updatenotes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedNote),
        }
      );
      const data = await response.json();
       
      if (data.success) {
        let newNote = [...allNotes];
        newNote.forEach((element) => {
          if (element._id === id) {
            (element.title = updatedNote.title),
              (element.description = updatedNote.description);
            element.tag = updatedNote.tag;
          }
        });
        setAllNotes(newNote);
        toast.success(data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <noteContext.Provider value={{isLogin,
     setIsLogin,
      addNotes,
      getNotes,
      allNotes,
      updateNote,
      deleteNote}}>
      {children}
    </noteContext.Provider>
  )
}

export default NotesState
