import { useParams,  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const viewNote = () => {

    const {id}=useParams();
    const allNotes = useSelector((state : RootState)=> state.note.notes);
    const note= allNotes.filter((p:{_id:string})=>p._id===id)[0];
    console.log(note);

  return (
    <div>
      <div className='flex flex-row gap-7 '>
      <input disabled 
      className='border-radius:10px m-4'
        placeholder='enter title'
        value={note.title}
      />

    </div>
    <div> 
        <textarea disabled
            value={note.value}
            placeholder="likho kuch"
            />
    </div>
    </div>
  )
}

export default viewNote
