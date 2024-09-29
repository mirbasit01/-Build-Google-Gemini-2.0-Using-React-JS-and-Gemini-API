// import { createContext, useState } from "react";
// import run from "../config/gemini"

// export const Context = createContext
// ();

// const ContextPravider = (props) => {

//     const[input, setinput] = useState("");
//     const [recentPrompt, setrecentPrompt] = useState("");
//     const [prevPrompt, setprevPrompt] = useState([]);
//     const [showResult, setshowResult] = useState (false);
//     const [loading, setloading] = useState(false);
//     const [resultData, setresultData] = useState("");

//     const delayPare = (index,nextWord) => {
//         setTimeout(function (){
//             setresultData(prev=>prev+nextWord);

//         },75*index)

//     }
    
//     const newChat = () => {
//         setloading(false)
//         setshowResult(false)
//     }


//     const onSent = async (prompt) =>{

//         setresultData("")
//         setloading(true)
//         setshowResult(true)
//         let response;
//         if (prompt !== undefined){
//             response = await run(prompt)
//             setrecentPrompt(prompt)

//         }
//         else{
//             setprevPrompt(prev=>[...prev,input])
//             setrecentPrompt(input)
//             response = await run(input)
//         }
        
//         let responsseArray = response.split("**");
//         let newResponse=""; 
//         for(let i =0 ; i < responsseArray.length; i++)
//         {
//             if(i === 0 || i%2  !== 1){
//                 newResponse += responsseArray[i];
//             }
//             else{
//                 newResponse += "<br>"+responsseArray[1]+"</br>";
//             }

//         }
//         let newResponse2 = newResponse.split("**").join("</br>")
//         console.log(newResponse2)
//         // setprevPrompt([...prevPrompt, newResponse2])

//         let newResponseArray = newResponse2.split(" ");
//         for(let i=0; i<newResponseArray.length;i++)
//         {
//                const nextWord = newResponseArray[i];
//                delayPare(i,nextWord+" ");

//         }
//         setloading(false)
//         setinput("");
//     }

//     // onSent("pakistan kasi country h")

//     const contextValue = {
//          prevPrompt,
//          setprevPrompt,
//          onSent,
//          setrecentPrompt,
//          recentPrompt,
//          showResult,
//          loading,
//          resultData,
//          input,
//          setinput,
//          newChat
         
    
//     }
//     return(
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
            

//     )

// }
// export default ContextPravider





import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextPravider = (props) => {

    const[input, setinput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompt, setprevPrompt] = useState([]);
    const [showResult, setshowResult] = useState (false);
    const [loading, setloading] = useState(false);
    const [resultData, setresultData] = useState("");

    const delayPare = (index, nextWord) => {
        setTimeout(function (){
            setresultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setloading(false);
        setshowResult(false);
    };

    const onSent = async (prompt) => {

        setresultData("");
        setloading(true);
        setshowResult(true);
        let response;

        if (prompt !== undefined) {
            response = await run(prompt);
            setrecentPrompt(prompt);
        } else {
            setprevPrompt(prev => [...prev, input]);
            setrecentPrompt(input);
            response = await run(input);
        }

        // Remove unwanted symbols from the response
        let cleanResponse = response
            .replace(/\*\*/g, "")  // Remove '**' symbols
            .replace(/##/g, "")    // Remove '##' symbols
            .replace(/\*/g, "")    // Remove '*' symbols
            .replace(/:::/g, "")   // Remove ':::' symbols
            .trim();               // Remove extra whitespace

        // Split the clean response by periods to handle line breaks
        let responseArray = cleanResponse.split(". ");
        let newResponse = "";
        let sectionCounter = 1; // Counter for categories

        for (let i = 0; i < responseArray.length; i++) {
            newResponse += `${sectionCounter++}. ${responseArray[i]}<br>`;
        }

        console.log(newResponse);

        let newResponseArray = newResponse.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPare(i, nextWord + " ");
        }

        setloading(false);
        setinput("");
    };

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
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextPravider;
