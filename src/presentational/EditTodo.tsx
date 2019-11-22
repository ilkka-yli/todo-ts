import React, { useState, useEffect } from 'react';

interface Props {
   text?: string | null,
   save: (text: string) => void;
   loading: boolean;
}

const EditTodo: React.FC<Props> = ({ text, save, loading }) => {
    const [content, setContent] = useState<string>('');
    
    useEffect(() => {
        setContent(text ? text : '');
    }, [text])

    return (
        <>
            <input type='text' value={content} onChange={e => setContent(e.target.value)} />
            <button className='todo-button' onClick={() => save(content)} disabled={loading}>
                Save
            </button>
        </>
    );
}

export default EditTodo;