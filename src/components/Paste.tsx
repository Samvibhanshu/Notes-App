import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { removeFromPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  Pencil,
  Eye,
  Trash2,
  Copy
} from 'lucide-react';

type Paste = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

const Paste = () => {
  const pastes = useSelector((state: RootState) => state.paste.pastes) as Paste[];
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId: string) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="p-6 mx-auto">
      <input
        type="search"
        placeholder="Search pastes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      <div className="w-full flex flex-col items-center gap-5 rounded-xl border-1 p-5 mt-4">
       <div className='text-xl font-bold'>All Pastes </div> 
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div
  key={paste._id}
  className="w-full border border-[#535bf2] border-2 rounded-xl shadow-md p-3 flex flex-col"
>
  {/* Top section: content + buttons side-by-side */}
  <div className="flex flex-row justify-between items-start">
    {/* Left content: 80% */}
    <div className="w-[80%] pr-4">
      <div className="text-lg font-semibold mb-2">
        Title: <span className="font-normal">{paste.title}</span>
      </div>
      <div className="mb-3">
        <span className="font-medium">Content:</span> {paste.content}
      </div>
    </div>

    <div className="w-[20%] flex flex-col items-end gap-0">
      <Link to={`/?pasteId=${paste._id}`}>
        <button className="p-2 rounded hover:bg-[#eef2ff] text-[#535bf2] transition" title="Edit">
          <Pencil size={20} />
        </button>
      </Link>
      <Link to={`/pastes/${paste._id}`}>
        <button className="p-2 rounded hover:bg-[#eef2ff] text-[#535bf2] transition" title="View">
          <Eye size={20} />
        </button>
      </Link>
      <button
        onClick={() => handleDelete(paste._id)}
        className="p-0 rounded hover:bg-[#eef2ff] text-[#535bf2] transition"
        title="Delete"
      >
        <Trash2 size={20} />
      </button>
      <button
        onClick={() => {
          navigator.clipboard.writeText(paste.content);
          toast.success('Copied to Clipboard');
        }}
        className="p-2 rounded hover:bg-[#eef2ff] text-[#535bf2] transition"
        title="Copy"
      >
        <Copy size={20} />
      </button>
    </div>
  </div>

  {/* Bottom: centered date */}
  <div className="text-xs text-gray-500 mt-4 text-center">
    Created at: {new Date(paste.createdAt).toLocaleString()}
  </div>
</div>
          ))}
      </div>
      </div>
  );
};

export default Paste;
