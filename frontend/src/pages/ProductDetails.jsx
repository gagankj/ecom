import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useDispatch} from "react-redux";
import { addToCart } from "../store/Slices/cartSlice";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductDetails = () => {
  const dispatch=useDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [description,setDescription]=useState(true);
  const [reviews,setReviews]=useState(false);
  const [information,setInformation]=useState(false);

  console.log(selectedVariant)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(res.data);
        setSelectedColor(res.data.variants[0].variants[0].color);
        setSelectedSize(res.data.variants[0].variants[0].size);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchProduct();
  }, [id]);

  // Extract unique colors and sizes
  const colors = [...new Set(product?.variants?.[0]?.variants?.map(v => v.color))];
  const sizes = [...new Set(product?.variants?.[0]?.variants?.filter(v => v.color === selectedColor).map(v => v.size))];

  // Get the selected variant based on selected color and size
  useEffect(() => {
    if (product) {
      const variant = product.variants[0].variants.find(v => v.color === selectedColor && v.size === selectedSize);
      setSelectedVariant(variant);
    }
  }, [selectedColor, selectedSize, product]);

  if (!product || !selectedVariant) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  const handleDescription=()=>{
    setDescription(true);
    setInformation(false);
    setReviews(false);
  }
  const handleInformation=()=>{
    setDescription(false);
    setInformation(true);
    setReviews(false);
  }
  const handleReviews=()=>{
    setDescription(false);
    setInformation(false);
    setReviews(true);
  }

  return (
    <div className="py-10 px-20">
      <div className="flex mb-20">
        {/* Left - Image Slider */}
        <div className="w-3xl flex flex-col">
          {/* Main Image Swiper */}
          <Swiper
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="w-xl h-96"
          >
            {selectedVariant.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Slide ${index}`} className="object-contain w-full h-full rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Swiper */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            modules={[Thumbs]}
            className="mt-4 w-xl flex justify-center cursor-pointer"
          >
            {selectedVariant.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Thumbnail ${index}`} className="w-24 h-24 object-cover rounded-lg border border-zinc-300 hover:border-zinc-500" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right - Product Info */}
        <div className="w-1/2 px-6">
          <h1 className="font-bold tracking-tight text-3xl mb-1">{product.brand}</h1>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <h3 className="text-zinc-400 my-2">
            ⭐ {product.ratings} ({product.reviews.length} Reviews)
          </h3>

          {/* Price */}
          <div className="my-2">
            <h1 className="inline text-2xl font-semibold">Rs. {selectedVariant.discountPrice}</h1>
            <h1 className="inline line-through text-zinc-400 mx-2">Rs. {selectedVariant.price}</h1>
          </div>

          {/* Stock */}
          <h3 className={`my-1 ${selectedVariant.stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {selectedVariant.stock > 0 ? `In Stock` : "Out of Stock"}
          </h3>

          {/* Description */}
          <p className="text-gray-600 my-4">{product.description}</p>

          {/* Select Color */}
          <h1 className="font-bold text-xl my-4 tracking-tight">Color</h1>
          <div className="flex gap-4">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border border-zinc-400 rounded-md ${
                  color === selectedColor ? "bg-zinc-800 text-white" : "bg-white text-black"
                }`}
              >
                {color}
              </button>
            ))}
          </div>

          {/* Select Size */}
          <h1 className="font-bold text-xl my-4 tracking-tight">Size</h1>
          <div className="flex gap-4">
            {sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border border-zinc-400 rounded-md ${
                  size === selectedSize ? "bg-zinc-800 text-white" : "bg-white text-zinc-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            {selectedVariant.stock > 0 ? (

              <button
              disabled={selectedVariant.stock <= 0}
              onClick={()=>dispatch(addToCart(product))}
              className={`w-1/3 h-12 rounded-md text-white bg-zinc-800 hover:bg-zinc-900"
                }`}
                >
                  Add to Cart
            </button>
            ):(
              ""
            ) }
            <button className="w-14 h-12 border rounded-md">💗</button>
          </div>

        </div>


      </div>

      <div className="flex gap-10">
        <h1 onClick={()=>handleDescription()} className={`${description ?"underline font-bold":"cursor-pointer"} `}>Description</h1>
        <h1 onClick={()=>handleReviews()} className={`${reviews ?"underline font-bold":"cursor-pointer"}`} >Reviews</h1>
        <h1 onClick={()=>handleInformation()} className={`${information ?"underline font-bold":"cursor-pointer"}`}>Additional Information</h1>
      </div>
      {description && (

        <div className="my-4 bg-zinc-100 p-6">
        {product.description}
      </div>
      )}
      {information && (

        <div className="my-4 bg-zinc-100 p-6">
       <h1> <span className="font-bold text-lg">Available Colors:</span> {colors.map((col,index)=>( <p key={index} >{col}</p> ))} </h1> 
       <h1 className="mt-6"> <span className="font-bold text-lg ">Available Sizes:</span> {sizes.map((size,index)=>( <p key={index} >{size}</p> ))} </h1> 

      </div>
      )}
      {reviews && (

        <div className="my-4 bg-zinc-100 p-6">
          <h1 className="font-bold text-xl">Reviews for {product.name}</h1>
          <p>for future: total reviews, rating, option to add review.</p>
        {product.reviews}
      </div>
      )}


      

    </div>
  );
};

export default ProductDetails;
