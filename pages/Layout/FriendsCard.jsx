import axios from "axios"
import { useEffect,useState } from "react"
import { UserOutlined ,MessageOutlined} from "@ant-design/icons"
import { useAuth } from "../Context/auth.context"

export default function FriendsCard(){
    const {receiver} = useAuth()
    const [friends,setFriends] = useState([])
    const [alluser,setAlluser] = useState([])
    const friend=[{
        name:"sohrab hossain",
        image:""
    },
    {
        name:"rahat hossain",
        image:""
    }
]
    useEffect(()=>{
        console.log(localStorage.getItem("token"))
        axios.get("http://localhost:3000/user/friends",{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}})
        .then((res)=>setFriends(res.data.friends))

        axios.get("http://localhost:3000/user/alluser",{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}}).then((res)=>setAlluser(res.data.users)).catch((err)=>console.log(err))
    },[])

    useEffect(()=>{
        console.log(alluser)
    },[alluser])
    return(
        <>
        <div>
            <section>
                {/* friends card */}
                {
                    friend?.length>0?(
                          <div>
                    {friend.map((friend)=>(
                        <div className=" flex  p-2 gap-2" key={friend._id}>
                            <div>
                                {friend.image?(
                                    <div className="w-10 h-10 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                    <img src={friend.image} alt="" className="w-full h-full object-cover rounded-full" />
                                    </div>
                                ):(  
                                    <div className="w-10 h-10 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <UserOutlined className="text-xl text-gray-400" />
                      </div>
                                )}

                             
                             
                            </div>
                            <div className="flex items-center">
                            <p className="text leading-tight">{friend.name}</p>
                            </div>
                            <div className="flex items- ml-auto"><button className=" text-gray-500 text-xs py-1 rounded-full">+Add</button></div>
                           
                        </div>
                    ))}
                </div>
                    ):(
                        <div className="flex justify-center items-center text-gray-400">no Friend yet</div>
                    )
                }
              
            </section>

            <section>
                <div>
                    <h1>People you may know</h1>
                </div>
                <div>
                    {
                         alluser?.length>0?(
                             <div>
                                    {alluser.map((alluser)=>(
                                        <div className=" flex  p-2 gap-2" key={alluser._id}>
                                            <div>
                                                {alluser.image?(
                                                    <div className="w-10 h-10 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                    <img src={alluser.image} alt="" className="w-full h-full object-cover rounded-full" />
                                                    </div>
                                                ):(  
                                                    <div className="w-10 h-10 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                        <UserOutlined className="text-xl text-gray-400" />
                                      </div>
                                                )}
                
                                             
                                             
                                            </div>
                                            <div className="flex items-center">
                                            <p className="text leading-tight">{alluser.name}</p>
                                            </div>
                                            <div className="flex items- ml-auto"><button className=" text-gray-500 text-xs py-1 rounded-full"><MessageOutlined onClick={()=>receiver(alluser) } /></button></div>
                                           
                                        </div>
                                    ))}
                                </div>
                                    ):(
                                        <div className="flex justify-center items-center text-gray-400">no Friend yet</div>
                                    )
                                }
                </div>
            </section>
        </div>
        </>
    )
}  