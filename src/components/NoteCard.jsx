import { useContext, useState } from "react";
import noteContext from "../contexAPI/notesContext";
import EditNotesModel from "./EditNotesModel";

const NoteCard = (props) => {
    const { title, description, tag, image, createDate, id } = props;
  let date = new Date(createDate);
  
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {deleteNote} = useContext(noteContext)

  const deleteFun = ()=>{
    deleteNote(id)
  }

    return (
        <>
        <EditNotesModel  title={title} des={description} tag={tag} image={image} id={id}  open={open} handleClose={handleClose}/>
            <div className="overflow-hidden transition-shadow relative duration-300 bg-white rounded shadow-sm">
                <div className='flex absolute right-0 top-0 bg-white/75 rounded-bl-sm px-4 py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 cursor-pointer text-blue-800 mx-2"
                    onClick={handleOpen}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 cursor-pointer text-blue-800 mx-2"
                     onClick={deleteFun}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>


                </div>
                <img
                    src={image}
                    className="object-cover w-full h-64"
                    alt=""
                />
                <div className="p-5">
                    <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                        <span className="text-gray-600">{date.toLocaleString()}</span>
                    </p>
                    <h1 className="inline-block mb-3 text-md font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                    >
                      {title}
                    </h1>
                    <p className="mb-2 text-gray-700">
                       { description}
                    </p>
                    <p className="mb-2 text-gray-700">
                       { tag}
                    </p>
                    <a
                        href="/"
                        aria-label=""
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        Learn more
                    </a>
                </div>
            </div>
        </>
    )
}

export default NoteCard