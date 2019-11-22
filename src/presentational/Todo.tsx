import React from 'react';
import { TodoModel } from '../Model/Todo';
import EditTodo from './EditTodo';
import ViewTodo from './ViewTodo';

interface Props {
    todo: TodoModel;
    index: number;
    editMode: boolean;
    complete: (i: number) => void;
    remove: (i: number) => void;
    setEditing: (i: number) => void;
    save: (i: number, text: string) => void;
}

const Todo: React.FC<Props> = ({ todo, index, editMode, setEditing, complete, remove, save }) => {
    return (
        <div className="todo-item">
            {!editMode && <ViewTodo completed={todo.completed} text={todo.text} setEditing={() => setEditing(index)} complete={() => complete(index)} remove={() => remove(index)} />}
            {editMode && <EditTodo text={todo.text} save={text => save(index, text)} /> }
        </div>
    );
}

export default Todo;