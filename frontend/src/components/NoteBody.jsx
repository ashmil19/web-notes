import axios from '../axios.js'
import { useEffect, useState } from 'react'
import './notebody.css'

const NoteBody = ()=>{
    const [datas, setDatas] = useState([]);
    const [value, setValue] = useState('')

    const fetchNotes = async ()=>{
        try {
            const response = await axios.get('/notes')
            console.log(response.data.notes);
            setDatas(response?.data?.notes)
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateNotes = async () =>{
        if(value.trim() === ""){
            return alert("please fill something!")
        }

        if(value.trim().length > 400){
            return alert("only allow 400 characters")
        }

        try {   
            await axios.post("/create",{note: value.trim()})
            setValue('')
            fetchNotes()
        } catch (error) {
            console.log(error)
        }

    }

    const handleNoteDelete = async(id) =>{
        try {
            await axios.delete(`/delete/${id}`)
            fetchNotes()
        } catch (error) {
            console.log(error)
        }
    }

    const handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            e.preventDefault();
            handleCreateNotes();
        }
    }

    useEffect(()=>{
        fetchNotes()
    },[])

    return (
        <>
            <div className="note-container">
                <div className="upper-body">
                    <input type="text" value={value} onChange={(e)=> setValue(e.target.value)} onKeyDown={handleKeyPress} />
                </div>
                <div className="main-body">
                    {datas?.map((dat)=>(
                        <div key={dat?.id} className='task'>
                            <div className='task-content'>
                                {dat?.content}
                                <button  className='btn-del' onClick={()=> handleNoteDelete(dat?.id)}>DEL</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default NoteBody;