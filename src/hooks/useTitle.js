import { useEffect } from "react"

const useTitle = title => {
    useEffect(()=>{
        document.title = `${title} | Chat'sApp`
    },[title])
}


export default useTitle;