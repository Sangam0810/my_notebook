import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import noteContext from "../contexAPI/notesContext"
import NoteCard from "./NoteCard"


const Notes = () => {

  const {getNotes, allNotes} = useContext(noteContext)

 useEffect(()=>{
  if(localStorage.getItem('token')){
  getNotes()
  }
 },[])


    return (
      <>
     
        <div className="mx-auto pt-12 px-6 max-w-xl text-center">
          <h1 className="text-3xl capitalize pb-10 font-bold dark:text-gray-800 sm:text-5xl">
            Your Notes on cloud <br />
            <strong className="font-bold text-blue-800 p-3 sm:block"> - safe and secure </strong>
          </h1>
         {localStorage.getItem('token') ? <Link to="/createnote" className="px-6 py-3 text-lg font-semibold rounded  dark:bg-blue-950 dark:text-gray-50">Create Notes</Link> :  <Link to="/login" className="px-6 py-3 text-lg font-semibold rounded  dark:bg-blue-950 dark:text-gray-50">Create Notes</Link>}
        </div>
        <div className="px-6 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <h1 className='text-3xl pb-10 font-bold leading-none max-md:text-xl'>Your <span className='text-blue-900'>Notes </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
               
          </h1>
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
           {/* //All Notes */}
           {allNotes.map((elements, i) => <NoteCard key={i} title={elements.title}
            description={elements.description}
             tag={elements.tag} 
             image={elements.image} 
             createDate={elements.createdAt} 
             id={elements._id} 
             /> 
             )}
          </div> 
        </div>
      </>
    )
  }
  
  export default Notes