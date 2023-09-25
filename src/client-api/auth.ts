import { axiosClient } from "@/lib/api"
import { setCookie } from "cookies-next"


export const login = async (email: string, password: string) => {
    try {
        const response = await axiosClient.post("/login", {email, password})
        setCookie("access", response.data.access)
        setCookie("account", response.data.user)
        return true
    } catch(e) {
        console.log(e)
        return false
    }

}