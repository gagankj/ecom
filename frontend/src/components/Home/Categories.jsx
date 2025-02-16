import { Link, NavLink } from "react-router-dom"
import men from "../../assets/men_category.png"
import women from "../../assets/women_category.jpg"
import kids from "../../assets/kids_category.jpg"

const Categories = () => {
  return (
    <div className='py-20'>

        <h1 className="text-5xl font-bold tracking-tight text-center">Shop By Category</h1>

        <div className="flex justify-evenly mt-6">
            <div className="flex flex-col p-4">
                <img className="rounded-md w-72 h-96" src={men} alt="" />
                <Link to="/men" className="bg-zinc-900 text-center font-bold text-lg text-zinc-300  rounded-md py-2 px-4 my-2">Shop for Men</Link>
            </div>
            <div className="flex flex-col p-4">
                <img className="rounded-md w-72 h-96" src={women} alt="" />
                <Link to="/women" className="bg-zinc-900 text-center font-bold text-lg text-zinc-300  rounded-md py-2 px-4 my-2">Shop for Women</Link>
            </div>
            <div className="flex flex-col p-4">
                <img className="rounded-md w-72 h-96" src={kids} alt="" />
                <Link to="/men" className="bg-zinc-900 text-center font-bold text-lg text-zinc-300  rounded-md py-2 px-4 my-2">Shop for kids</Link>
            </div>
            <div className="flex flex-col p-4">
                <img className="rounded-md" src={men} alt="" />
                <Link to="/men" className="bg-zinc-900 text-center font-bold text-lg text-zinc-300  rounded-md py-2 px-4 my-2">Shop for Men</Link>
            </div>
            
        </div>

        
        </div>
  )
}

export default Categories