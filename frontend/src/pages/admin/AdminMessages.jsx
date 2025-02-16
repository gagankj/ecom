import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_API } from '../../config';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${SERVER_API}/api/contacts`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const deleteMessage=async (id)=>{
    await axios.delete(`${SERVER_API}/api/contacts/${id}`)
    alert("message deleted");
    window.location.reload();
  }

  return (
    <div className="ml-48 flex flex-col gap-4 px-10 py-10">
      {messages.length > 0 ? (
        messages.map((msg) => (
            
          <div key={msg._id} className="p-4 bg-zinc-100 border w-1/2 border-zinc-300 text-zinc-700 rounded-lg  mb-4">
            <p className="font-bold">Name: {msg.name}</p>
            <p>Email: {msg.email}</p>
            <p>Message: {msg.message}</p>
            <p className="text-zinc-400 text-sm">Date: {new Date(msg.createdAt).toLocaleString()}</p>
            <button onClick={()=>deleteMessage(msg._id)} className='bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-1 mt-2'>Delete</button>
          </div>
        ))
      ) : (
        <p className="text-white">No messages found.</p>
      )}
    </div>
  );
};

export default AdminMessages;
