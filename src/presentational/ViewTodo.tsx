import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
            <div className={completed ? 'todo-text line-through' : 'todo-text'} onClick={() => setEditing()}>
                {text}
            </div>
            <button className='todo-button' onClick={() => complete()} disabled={loading}>
                {completed ? 'Not completed' : 'Complete'}
            </button>
            <button className='todo-button' onClick={() => remove()} disabled={loading}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </>
    );
}

export default ViewTodo;