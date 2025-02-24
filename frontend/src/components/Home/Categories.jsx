import { Link } from "react-router-dom";
import casual from "../../assets/frame 130.png";
import ethnic from "../../assets/frame 132.png";
import western from "../../assets/frame 131.png";
import kids from "../../assets/frame 133.png";

const Categories = () => {
  return (
    <div className="py-20 px-4">
      <h1 className="text-5xl font-bold tracking-tight text-center">Shop By Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[
          { img: casual, text: "Casual Wear", link: "/men" },
          { img: western, text: "Western Wear", link: "/women" },
          { img: ethnic, text: "Ethnic Wear", link: "/men" },
          { img: kids, text: "Kids Wear", link: "/men" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center p-4">
            <img className="rounded-md w-full max-w-xs h-auto" src={item.img} alt={item.text} />
            <Link
              to={item.link}
              className="bg-zinc-900 w-full max-w-xs text-center font-bold text-lg text-zinc-300 rounded-md py-2 px-4 my-2"
            >
              {item.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
