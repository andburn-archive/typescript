import * as React from 'react';

import TodoItem, { Props as ItemProps } from '../../components/TodoItem/TodoItem';

export interface State {
    todos: ItemProps[];
}

export interface Props {
    title: string;
}

class Todo extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { todos: [] };
    }

    createKey = () => {
        return Math.round(Math.random() * 1000).toString(10);
    }

    itemComplete = (id: string) => {
        const todos = [...this.state.todos];
        const item = todos.filter(x => x.id === id);
        if (item.length === 1) {
            item[0].complete = true;
            this.setState({ todos: todos });
        }
    }

    textChanged = (e: React.FormEvent<HTMLInputElement>, id: string) => {
        const todos = [...this.state.todos];
        const item = todos.filter(x => x.id === id);
        if (item.length === 1) {
            item[0].text = e.currentTarget.value;
            this.setState({ todos: todos });
        }
    }

    buttonClick = () => {
        const todos = [...this.state.todos];
        todos.push({ 
            id: this.createKey(), 
            text: '',
            complete: false,
            onDone: this.itemComplete,
            onText: this.textChanged,
        });
        this.setState({ todos: todos });
    }

    render() {
        const todos = this.state.todos
            .filter(x => x.complete === false)
            .map(x => (
                <TodoItem 
                    id={x.id} 
                    text={x.text} 
                    complete={x.complete}
                    onDone={this.itemComplete}
                    onText={this.textChanged}
                />    
            ));
        return (
            <div className="todo">
                <h2>{this.props.title}</h2>
                {todos}
                <button onClick={this.buttonClick}>New</button>
            </div>
        );
    }
}

export default Todo;