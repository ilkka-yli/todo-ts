import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck, faTimes, faPen } from '@fortawesome/free-solid-svg-icons'

interface Props {
    completed: boolean;
    loading: boolean;
    text: string;
    complete: () => void;
    remove: () => void;
    setEditing: () => void;
}

const ViewTodo: React.FC<Props> = ({ completed, text, setEditing, complete, remove, loading }) => {
    return (
        <>
            <div className={completed ? 'todo-text line-through' : 'todo-text'}>
                {text}
            </div>
            <button className='todo-button' onClick={() => setEditing()} disabled={loading}>
                <FontAwesomeIcon icon={faPen} color="salmon" />
            </button>
            <button className='todo-button' onClick={() => complete()} disabled={loading}>
                {completed ? <FontAwesomeIcon icon={faTimes} color="red" /> : <FontAwesomeIcon icon={faCheck} color="green" />}
            </button>
            <button className='todo-button' onClick={() => remove()} disabled={loading}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </>
    );
}

export default ViewTodo;