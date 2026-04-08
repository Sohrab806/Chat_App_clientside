import { useState } from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth.context";

export default function Auth() {
  const {login}=useAuth()
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isLogin = mode === "login";

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    // wire up your auth logic here
    console.log(mode, form);

    

    try{

  const response= await axios.post(`http://localhost:3000/auth/${mode}`,form)
  console.log(response.data)
  
       const { token, user } = response.data;
       setForm({name:"",email:"",password:""})
  if(mode=="login"){
   login(token)

  }
  

    }catch (e) {
  const errorMessage =
    e.response?.data?.message || "Something went wrong";
    alert(errorMessage)
  console.log(errorMessage);
}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-blue-300 rounded-2xl shadow-2xl px-8 py-10 flex flex-col gap-6">

        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-white flex items-center justify-center shadow-inner">
            <MessageOutlined  style={{ fontSize: "20px", color: "#60a5fa" }} />
          </div>
          <h1 className="text-black text-xl font-semibold mt-1">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <h1 className="text-black text-5xl font-semibold tracking-tight -mt-">CHI-CHAT</h1>
          <p className="text-gray-500 text-xs text-center">
            {isLogin
              ? "Sign in to continue to your chats"
              : "Join and start chatting instantly"}
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 capitalize
                ${mode === tab
                  ? "bg-blue-300 text-gray-900 shadow"
                  : "text-gray-700 hover:text-blue-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-3">
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-700 pl-1">Full Name</label>
              <Input
                size="large"
                placeholder="John Doe"
                prefix={<UserOutlined className="text-gray-500 mr-1" />}
                value={form.name}
                onChange={handleChange("name")}
                className="bg-white border-gray-300 text-gray-900 rounded-xl hover:border-gray-500 focus-within:border-gray-400"
                
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-700 pl-1">Email</label>
            <Input
              size="large"
              placeholder="you@example.com"
              prefix={<MailOutlined className="text-gray-700 mr-1" />}
              value={form.email}
              onChange={handleChange("email")}
        
              className="rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-700 pl-1">Password</label>
            <Input.Password
              size="large"
              placeholder="••••••••"
              prefix={<LockOutlined className="text-gray-500 mr-1" />}
              value={form.password}
              onChange={handleChange("password")}
        
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Forgot password — login only */}
        {isLogin && (
          <div className="text-right -mt-2">
            <button className="text-xs text-gray-500 hover:text-gray-700 transition">
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit */}
        <Button
          type="primary"
          size="large"
          block
          onClick={handleSubmit}
       className="rounded-xl font-medium h-11 text-sm 
             !bg-white !text-black !border-white 
             hover:!bg-blue-300"

        >
          {isLogin ? "Sign in" : "Create account"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-xs text-gray-600">or</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        {/* Switch mode */}
        <p className="text-center text-xs text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(isLogin ? "register" : "login")}
            className="text-gray-300 hover:text-white font-medium transition"
          >
            {isLogin ? "Register" : "Sign in"}
          </button>
        </p>

      </div>
    </div>
  );
}