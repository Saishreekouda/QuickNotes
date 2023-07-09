import React from "react"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} style={{
                        fontSize: "20px",
                        color: note.id===props.currentNote.id?"white":"black"
                    }} />
                   
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
