import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes") as string)
      : []
  },
  reducers: {
    addToNotes: (state,action) => {
        const note = action.payload;
        state.notes.push(note);
        localStorage.setItem('notes',
            JSON.stringify(state.notes));
        toast("Note Created Sucessfully!🎉")
    },
    updateNotes: (state,action) => {
        const note=action.payload;
        const index=state.notes.findIndex((item: {_id : string})=>
        item._id === note._id);
        
        if(index>=0){
            state.notes[index] = note;
            localStorage.setItem("notes", JSON.stringify(state.notes));

            toast("Note Updated Sucessfully!🎉");
        }
    },
    resetAllNotes: (state) => {
        state.notes=[];
        localStorage.removeItem('notes');
        toast("All Notes Reset Sucessfully!🎉");

    },
    removeFromNotes:(state,action)=>{
        const note=action.payload;
        const index=state.notes.findIndex((item: {_id : string})=>
        item._id === note);

        if(index>=0){
            state.notes.splice(index,1);
            localStorage.setItem("notes", JSON.stringify(state.notes));

            toast("Note Removed Sucessfully!🎉");
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToNotes, updateNotes, resetAllNotes, removeFromNotes } = noteSlice.actions

export default noteSlice.reducer