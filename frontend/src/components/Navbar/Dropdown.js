import React,{useState,useRef,useEffect} from 'react';
import { NavLink } from 'react-router-dom';

const Dropdown=({title,categories})=>{
    const [open,setOpen]=useState(false);
    const dropdownRef=useRef(null);

    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setOpen(false);
            }
        }
    })

}
