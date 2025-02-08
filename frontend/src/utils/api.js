import axios from "axios";

const API=axios.create({baseURL:import.meta.env.VITE_SERVER_API})

export const forgotPassword=(email)=> API.post("/api/auth/forgot-password",{email});
export const resetPassword=(token,newPassword)=>API.post(`/api/auth/reset-password/${token}`,{newPassword});
