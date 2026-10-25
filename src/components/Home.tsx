import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToNotes, updateNotes } from '../Redux/noteSlice';
import type { RootState } from '../store';
import toast from 'react-hot-toast';

const Home = () => {
    const[title, setTitle]=useState('');
    const[value,setValue]=useState('');
    const [searchP,setSearchP]= useSearchParams();
    const noteId = searchP.get("noteId");
    const dispatch = useDispatch();
    const allNotes = useSelector((state: RootState) => state.note.notes)

   
    

        useEffect(()=>{
            if(!noteId) return;
            const note = allNotes.find((p) => p._id === noteId);
            if(note){
                setTitle(note.title);
                setValue(note.content);
            } else {
                // stale edit link (note deleted): fall back to creating a new note instead of crashing
                toast.error("That note no longer exists");
                setSearchP('');
            }
        },[noteId, allNotes, setSearchP])

     function CreateP(){
        const note={
            title:title,
            content:value,
            _id:noteId || Date.now().toString(10),
            createdAt: new Date().toString(),
        }    
        if(noteId){
            //update
            dispatch(updateNotes(note));
            toast("Note updated");
        }else{
            //create
            dispatch(addToNotes(note));
            toast("Note created");
        }

        //after creation or updation
        setTitle('');
        setValue('');
        setSearchP('');
    }

  return (
    <div>
    <div className='flex flex-row gap-7 '>
      <input 
      className='border-radius:10px m-4'
        placeholder='enter title'
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
      />

      <button onClick={CreateP} className='height:1r'>
        {
            noteId? 'Update Note' : 'Create Note'
        }

      </button>
    </div>
    <div className='w-full'> 
        <textarea 
            value={value}
            placeholder="likho kuch"
            onChange={(e)=> setValue(e.target.value)}
            />
    </div>
    </div>
  )
}

export default Home
