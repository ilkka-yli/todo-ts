import React from 'react';

interface Props {
    completed: boolean,
    text: string
    complete: () => void;
    remove: () => void;
    setEditing: () => void;
}

const ViewTodo: React.FC<Props> = ({ completed, text, setEditing, complete, remove }) => {
    return (
        <>
            <div className={completed ? 'todo-text line-through' : 'todo-text'} onClick={() => setEditing()}>
                {text}
            </div>
            <button className='todo-button' onClick={() => complete()}>
                {completed ? 'Not completed' : 'Complete'}
            </button>
            <button className='todo-button' onClick={() => remove()}>
                X
            </button>
        </>
    );
}

export default ViewTodo;