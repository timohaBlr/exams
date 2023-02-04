import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';

// Types
type TodoType = {
    id: string;
    title: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    completed: boolean;
}


// Api
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const todosAPI = {
    getTodo(todoId: string) {
        return instance.get<TodoType>(`todos/${todoId}`)
    }
}


// App
export const App = () => {

    const [todo, setTodo] = useState<TodoType | null>(null)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const todoId = "637cb9342f24ad82bcb07d8d"
        todosAPI.getTodo(todoId)
            .then((res: any) => setTodo(res.data))
            .catch(e => {
                setError('Ошибка 😰. Анализируй network 😉')
            })
    }, [])


    return (
        <>
            <h2>✅ Тудулист</h2>
            {
                !!todo
                    ? <div>
                        <div style={todo?.completed ? {color: 'grey'} : {}} key={todo?.id}>
                            <input type="checkbox" checked={todo?.completed}/>
                            <b>Описание</b>: {todo?.title}
                        </div>
                        <h2>Так держать. Ты справился 🚀</h2>
                    </div>
                    : <h2 style={{ color: 'red' }}>{error}</h2>
            }
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>)

// 📜 Описание:
// Студент по неопытности допустил одну маленькую ошибку, но из-за нее он не может вывести на экран тудулист.
// Найдите ошибку и вставьте исправленную версию строки кода в качестве ответа
// P.S. Эта ошибка из реальной жизни, студенты часто ошибаются подобным образом и не могут понять в чем дело.

// 🖥 Пример ответа:  .then((res: any) => setTodo(res.data.data))