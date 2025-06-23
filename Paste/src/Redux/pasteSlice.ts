import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState: {
    pastes: localStorage.getItem("pastes")
      ? JSON.parse(localStorage.getItem("pastes") as string)
      : []
  },
  reducers: {
    addToPastes: (state,action) => {
        //add check for existing paste
        const paste = action.payload;
        state.pastes.push(paste);
        localStorage.setItem('pastes',
            JSON.stringify(state.pastes));
        toast("Paste Created Sucessfully!🎉")
    },
    updatePastes: (state,action) => {
        const paste=action.payload;
        const index=state.pastes.findIndex((item: {_id : string})=>
        item._id === paste._id);
        
        if(index>=0){
            state.pastes[index] = paste;
            localStorage.setItem("pastes", JSON.stringify(state.pastes));

            toast("Paste Updated Sucessfully!🎉");
        }
    },
    resetAllPastes: (state) => {
        state.pastes=[];
        localStorage.removeItem('pastes');
        toast("All Pastes Reset Sucessfully!🎉");

    },
    removeFromPastes:(state,action)=>{
        const paste=action.payload;
        const index=state.pastes.findIndex((item: {_id : string})=>
        item._id === paste);

        if(index>=0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));

            toast("Paste Removed Sucessfully!🎉");
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updatePastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer