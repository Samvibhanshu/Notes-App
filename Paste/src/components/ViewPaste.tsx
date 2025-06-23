import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updatePastes } from '../Redux/pasteSlice';
import type { RootState } from '../store';

const viewPaste = () => {

    const {id}=useParams();
    const allPastes = useSelector((state : RootState)=> state.paste.pastes);
    const paste= allPastes.filter((p:{_id:string})=>p._id===id)[0];
    console.log(paste);

  return (
    <div>
      <div className='flex flex-row gap-7 '>
      <input disabled 
      className='border-radius:10px m-4'
        placeholder='enter title'
        value={paste.title}
      />

    </div>
    <div> 
        <textarea disabled
            value={paste.value}
            placeholder="likho kuch"
            />
    </div>
    </div>
  )
}

export default viewPaste
