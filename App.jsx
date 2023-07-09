import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {onSnapshot, addDoc, doc, deleteDoc, setDoc} from "firebase/firestore"
import {notesCollection,db,} from "./firebase"

export default function App() {
    
    const [notes, setNotes] = React.useState( []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState("")

    const [tempNoteText,setTempNoteText]=React.useState("")
    const currentNote=notes.find(note => {
        return note.id === currentNoteId
    }) || notes[0]
    
        
    // React.useEffect(() => {
    //     localStorage.setItem("notes", JSON.stringify(notes))
    // }, [notes])

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])


    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    })
   

    React.useEffect(() =>
    {
        if (currentNote) {
            setTempNoteText(currentNote.body)
        }
    },[currentNote])


    //debouncing-delay every request by specified amt of time say 500 ms
    //and if within those 500 ms another request i made then cancel the previous request and set up new delay for new //request



    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote.body)
            {
                updateNote(tempNoteText)  //we wait 500ms before doing this action
                }
            
        }, 500)
    return ()=>clearTimeout(timeoutId)
    })


    //setdoc add doc and delete doc return promises and hence we use await keyword with it to wait for the function until the //promise is returned. await can only be used within an async function thus we use async functions.

    async function deleteNote(noteId)
    {
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef= await addDoc(notesCollection,newNote)
        setCurrentNoteId(newNoteRef.id)
    }
    // updates in such a way that updated note comes on top due to unshift
    async function updateNote(text) {
        
        const docRef = doc(db, "notes", currentNoteId);
        await setDoc(docRef,{body: text, updatedAt: Date.now()},{merge: true})
    }
    
    const sortedNotes=notes.sort((a,b)=>b.updatedAt-a.updatedAt)
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    
                    <Editor 
                        tempNoteText={tempNoteText}
                        setTempNoteText={setTempNoteText}        
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
