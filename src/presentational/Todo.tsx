import React from 'react';
import { TodoModel } from '../Model/Todo';
import EditTodo from './EditTodo';
import ViewTodo from './ViewTodo';

interface Props {
    todo: TodoModel;
    index: number;
    editMode: boolean;
    loading: boolean;
    complete: (i: number) => void;
    remove: (i: number) => void;
    setEditing: (i: number) => void;
    save: (i: number, text: string) => void;
}

const Todo: React.FC<Props> = ({ todo, index, editMode, setEditing, complete, remove, save, loading }) => {
    return (
        <div className="todo-item">
            {!editMode && <ViewTodo completed={todo.completed} text={todo.text} setEditing={() => setEditing(index)} complete={() => complete(index)} remove={() => remove(index)} loading={loading} />}
            {editMode && <EditTodo text={todo.text} save={text => save(index, text)} loading={loading} /> }
        </div>
    );
}

export default Todo;