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
        };

        document.addEventListener("mousedown",handleClickOutside);
        return()=>{
            document.removeEventListener("mousedown",handleClickOutside);
        }
    },[]);

    return(
        <div className='relative' ref={dropdownRef}>
            <button onClick={()=>setOpen(!open)} className='text-white   hover:text-zinc-300'>
                {title}
            </button>

            {open && (
                <div className='absolute z-10 left-0 mt-2 bg-white text-black w-40 border border-zinc-200 rounded-lg'>
                    <ul className='py-2'>
                        {categories.map((category,index)=>(
                            <li key={index}>
                                <NavLink
                                to={category.link}
                                className="block px-4 py-2 text-zinc-500 text-lg hover:text-zinc-900"
                                onClick={()=>setOpen(false)}
                                >
                                    {category.name}

                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )

}

export default Dropdown;
