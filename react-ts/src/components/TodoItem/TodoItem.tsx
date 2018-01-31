import * as React from 'react';

import './TodoItem.css';

export interface Props {
    id: string;
    text: string;
    complete: boolean;
    onDone: (id: string) => void;
    onText: (event: React.FormEvent<HTMLInputElement>, id: string) => void;
}

const TodoItem = (props: Props) => {
    return (
        <div className="todo-item" key={props.id}>
            <input 
                type="text"
                className="todo-text"
                value={props.text}
                onChange={(e: React.FormEvent<HTMLInputElement>) => props.onText(e, props.id)}
            />
            <button onClick={() => props.onDone(props.id)}>Done</button>
        </div>
    );
};

export default TodoItem;