import { TodoModel } from './../Model/Todo';

const API_URL = 'https://demo8737519.mockable.io/todos';

const request = async (url: string, _params: object, method: string, fallbackErr: string) => {
    const response = await fetch(url, { method });
    if (response.ok) return await response.json();
    throw Error(response.statusText && response.statusText.length ? response.statusText : fallbackErr);
}

export async function fetchTodos(): Promise<TodoModel[]> {
    return request(API_URL, {}, 'GET', `Could not load todos from ${API_URL}`);
}

export async function deleteTodo(id: number): Promise<void> {
    return request(API_URL + '/delete', { id }, 'DELETE', `Could not delete todo #${id}`);
}

export async function updateTodo(id: number, todo: TodoModel): Promise<void> {
    return request(API_URL + '/update', todo, 'POST', `Could not update todo #${id}`);
}

export async function addTodo(text: string): Promise<{ id: number }> {
    return request(API_URL + '/add', { text },  'PUT', `Could not add todo.`);
}