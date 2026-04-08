import Layout from "./Layout/Layout"
import { UserOutlined } from "@ant-design/icons"

export default function Welcome(){
    return(
        <>
        <Layout>
        <div className="flex flex-col items-center justify-center h-full text-gray-300 select-none gap-3">
            <h1 className="text-2xl font-bold">Welcome to Chat-App</h1>
            <p className="text-sm text-gray-400">Select a conversation to start chatting</p>
        </div>
        </Layout>
        </>
    )
}