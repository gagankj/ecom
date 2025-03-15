import { createSlice } from "@reduxjs/toolkit";


const getCartFromStorage=()=>{
    const storedCart=JSON.parse(sessionStorage.getItem("cart"));
    if(!storedCart) return [];


    const expiryTime=storedCart.expiry;
    if(expiryTime && expiryTime < Date.now()){
        sessionStorage.removeItem("cart");
        return[]
    };

    return storedCart.items;
}

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:getCartFromStorage(),
    },
    reducers:{
        addToCart:(state,action)=>{
            state.items.push(action.payload);
            saveCartToStorage(state.items);
        },
        removeFromCart:(state,action)=>{
            state.items=state.items.filter((item)=>item._id !== action.payload);
            saveCartToStorage(state.items);
        },
        setCart:(state,action)=>{
            state.items=action.payload;
            saveCartToStorage(state.items);
        }
    }
});

const saveCartToStorage=(cart)=>{
    const expiryTime=Date.now()+60*60*1000;
    sessionStorage.setItem("cart",JSON.stringify({items:cart,expiry:expiryTime}));

};

export const {addToCart,removeFromCart,setCart}=cartSlice.actions;
export default cartSlice.reducer;

