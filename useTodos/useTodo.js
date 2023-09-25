import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/TodoReducer";


const initialState = [];

const init = () => {
    return JSON.parse( localStorage.getItem( 'todos' ) || [] );
}

export const useTodo = () => {

    const [ todos, dispatch ] = useReducer( todoReducer , initialState, init ); // La funcion todoReducer solo se hace referencia a ella no se ejecuta

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));
    }, [todos]);
    
    const handleNewTodo = ( todo ) => {
       const action = {
        type: '[TODO] Add Todo',
        payload: todo
       }

       dispatch( action );
    };

    const handleDeleteTodo = (id) => {
        dispatch({
            type:'[TODO] delete Todo',
            payload: id,
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type:'[TODO] Toggle Todo',
            payload: id,
        })
    }

    const todoCount = () => {
        return todos.length;
    }

    const todoPending = () => {
        return todos.filter(todo => !todo.done ).length 
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todoCount,
        todoPending,
    }
}