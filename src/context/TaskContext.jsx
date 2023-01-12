import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/tasks";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
    const [tasks, setTasks] = useState([]);

    function createTask(task) {
        setTasks([
            ...tasks,
            {
                id: uuidv4(),
                title: task.title,
                description: task.description,
            },
        ]);
    }

    function deleteTask(taskId) {
        setTasks(tasks.filter((task) => task.id !== taskId));
    }

    useEffect(() => {
        setTasks(data);
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                deleteTask,
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
}
