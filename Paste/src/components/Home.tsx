import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updatePastes } from '../Redux/pasteSlice';
import type { RootState } from '../store';

const Home = () => {
    const[title, setTitle]=useState('');
    const[value,setValue]=useState('');
    const [searchP,setSearchP]= useSearchParams();
    const pasteId = searchP.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state: RootState) => state.paste.pastes)

   
    

        useEffect(()=>{
            if(pasteId){
                const paste = allPastes.find((p: {_id:string})=>
                p._id === pasteId);
                setTitle(paste.title);
                setValue(paste.content);
            }
        },[pasteId])

     function CreateP(){
        const paste={
            title:title,
            content:value,
            _id:pasteId || Date.now().toString(10),
            createdAt: new Date().toString(),
        }    
        if(pasteId){
            //update
            dispatch(updatePastes(paste));
        }else{
            //create
            dispatch(addToPastes(paste))
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
            pasteId? 'Update Paste' : 'Create Paste'
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
