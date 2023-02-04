import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';

// Types
type PostType = {
    body: string
    id: string
    title: string
    userId: string
}


// Api
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const postsAPI = {
    getPosts() {
        return instance.get<PostType[]>('posts')
    },
    deletePost(id: string) {
        return axios.delete<{ message: string }>(`posts/${id}`)
    }
}


// App
export const App = () => {

    const [posts, setPosts] = useState<PostType[]>([])

    useEffect(() => {
        postsAPI.getPosts()
            .then((res) => {
                setPosts(res.data)
            })
    }, [])

    const deletePostHandler = (id: string) => {
        postsAPI.deletePost(id)
            .then((res) => {
                const newPostsArr = posts.filter(p => p.id !== id)
                setPosts(newPostsArr)
            })
    };

    return (
        <>
            <h1>📜 Список постов</h1>
            {posts.map(p => {
                return (
                    <div key={p.id}>
                        <b>title</b>: {p.title}
                        <button style={{marginLeft: '15px'}}
                                onClick={() => deletePostHandler(p.id)}>
                            x
                        </button>
                    </div>
                )
            })}
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>)

// 📜 Описание:
// Почему не удаляется post при нажатии на кнопку удаления (х) ?
// Найдите ошибку и вставьте исправленную строку кода в качестве ответа
//
// 🖥 Пример ответа: return axios.delete
