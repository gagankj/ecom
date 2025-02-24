import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductDetails = () => {
  const[thumbsSwiper,setThumbsSwiper]=useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(res.data);
        setImageUrl(res.data.variants[0].variants[0].images)
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchProduct();
  }, [id]);

  console.log(product)

  const [imageUrl,setImageUrl]=useState([]);
  console.log(imageUrl)


  if (!product) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  return (
    <>
    <div className="py-10 px-20">
      <div className="flex ">

      <div className="w-3xl  flex flex-col">

    <Swiper
        spaceBetween={10}
        
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className=" w-xl h-96"
      >
        {imageUrl.map((img, index) => (
          <SwiperSlide  key={index}>
            <img
              src={img}
              alt={`Slide ${index}`}
              className=" object-contain  w-full h-full rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        modules={[Thumbs]}
        className=" mt-4 w-xl  flex justify-center cursor-pointer"
        >
        {imageUrl.map((img, index) => (
          <SwiperSlide  key={index}>
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-64 h-32 object-cover rounded-lg border border-zinc-300 hover:border-zinc-500"
              />
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
        
      
      
      <div className=" w-1/2">

      <h1 className="font-bold tracking-tight text-3xl mb-1">{product.brand}</h1>
      <h1 className="my-1">{product.name}</h1>
      <h1 className="text-zinc-400 my-2"> {product.ratings}({product.reviews.length} Reviews)</h1>
      <h1 className="inline">Rs. {product.variants[0].variants[0].discountPrice}</h1>
      <h1 className="inline line-through text-zinc-400 mx-2">Rs. {product.variants[0].variants[0].price}</h1>
      <h1 className="my-1 mt-6">{product.description}</h1>
      <h1 className="font-bold text-xl my-4 tracking-tight">Color</h1>
      {product.vairants[0].variants[0]map((color,index)=>(
        <div key={index}>
          <button>colo</button>
        </div>
      ))}
      <h1 className="font-bold text-xl my-4 tracking-tight">Size</h1>
      <div className="flex gap-4">

      <button className="w-1/3 h-12 bg-zinc-800 rounded-md text-zinc-200">Add to Cart</button>
      <button className="w-14 h-12 border rounded-md">💗</button>
      </div>
      </div>
        </div>
    </div>
    </>

  )
};

export default ProductDetails;
