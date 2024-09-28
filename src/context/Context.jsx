import { createContext, useState } from "react";
import run from "../config/gemini"

export const Context = createContext
();

const ContextPravider = (props) => {

    const[input, setinput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompt, setprevPrompt] = useState([]);
    const [showResult, setshowResult] = useState (false);
    const [loading, setloading] = useState(false);
    const [resultData, setresultData] = useState("");


    const onSent = async (prompt) =>{

        setresultData("")
        setloading(true)
        setshowResult(true)
        

        const response =  await run(input)
        setresultData(response)
        setloading(false)
        setinput("");
    }

    // onSent("pakistan kasi country h")

    const contextValue = {
         prevPrompt,
         setprevPrompt,
         onSent,
         setrecentPrompt,
         recentPrompt,
         showResult,
         loading,
         resultData,
         input,
         setinput,
         
        
        

        
        

        

    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
            

    )

}
export default ContextPravider