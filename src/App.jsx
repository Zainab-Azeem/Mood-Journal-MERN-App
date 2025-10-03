import "./App.css";
import { useState ,useEffect } from "react";
//import { v4 as uuidv4 } from "uuid";

function App() {
  
const [mood, setmood] = useState("");
const Mood=["Happy" , "Sad" , "Excited" ,"Stressed"];
const [text, settext] = useState("");
const [list, setlist] = useState([]);

useEffect(() => {
  fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => {
        setlist(data); 
      })
      .catch((err) => console.error("Error fetching moods:", err));
}, [text])


const handlechange = (e)=>{
    settext(e.target.value);
}

const handleSave = async()=>{
    if (text.trim()==="" || !mood){ 
      alert("Select mood and enter text"); return}

    await fetch("http://localhost:3000/" , {method: "POST",  headers: {
      "Content-Type": "application/json", 
    }, body: JSON.stringify({text,mood})})
   // const saved = await d.json();

    //setlist([saved,...list]);
    settext("");
    setmood("");
  //  console.log(list)
}






  return (
    <>
      <div>
        <h1>Mood Journal</h1>
        <p style={{textAlign:"center"}}>Track your feelings daily</p>
       </div>

    
      <div className="container">
      <p style={{ display: "block", marginBottom: "8px" ,fontSize:"20px" }}>Add New Entry:</p>
      
      {Mood.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => setmood(m)}
          className={`mood-button ${mood === m ? "selected" : ""}`}
        >
          {m === "Happy" ? "😀" :
           m === "Sad" ? "😢" :
           m === "Stressed" ? "😟" :
           "🤩"} {m}
        </button>
      ))}

      <textarea style={{ display: "block" , margin:"10px"}} type="text" value={text} onChange={handlechange} placeholder="Write a short note..."
          required/>
      <button className="savebutton" style={{ display: "block"}} onClick={handleSave}>Save</button>
    </div>


    <div className="card">
      <h2>Timeline</h2>
      {list.map((item) =>{
        return (<div key={item._id} className={`entry-card ${item.MOOD.toLowerCase()} mood`}>
          <p >{item.MOOD}</p>
          <div style={{display:"flex" , justifyContent:"space-between"}}>
          <p style={{fontSize:"15px"}}>{item.NOTE}</p>
        <p style={{fontSize:"15px"}} >
          {new Date(item.DATE).toLocaleDateString()}
        </p> </div>

        </div>
        )

      })}
    </div>

       
    </>
  )
}

export default App
