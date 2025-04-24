import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateTaskForm } from "../../../../utils/vaildation";
import { addTask, getTodayTasksByUser } from "../../../../redux/taskSlice";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./addTask.css";


export const AddTask = () => {
    const dispatch = useDispatch();
    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "Low",
        status: "Pending",
        dueDate: ""
    });
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formErrors = validateTaskForm(task);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
    
        const resultAction = await dispatch(addTask(task));
        
        if (addTask.fulfilled.match(resultAction)) {
            dispatch(getTodayTasksByUser());
    
            setTask({
                title: "",
                description: "",
                priority: "Low",
                status: "Pending",
                dueDate: ""
            });
            setIsModalOpen(false);
        }
        
    };  

    return (
        <>

            <div className="addTask-header">
                <h2>Today Tasks</h2>
                <button className="addTask-header-button" onClick={() => setIsModalOpen((prev) => !prev)}>
                    <FontAwesomeIcon className="addTask-header-icon" icon={faPlusCircle}/>
                    Add Task
                </button>
            </div>
            
            {isModalOpen && (
                <div className="addTask-modal-overlay" onClick={() => setIsModalOpen((prev) => !prev)}>
                    <div className="addTask-modal-content" onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            <input 
                                className={`addTask-input ${errors.title ? "error" : ""}`}
                                name="title" 
                                placeholder="Enter a title ..." 
                                value={task.title}
                                onChange={handleChange}
                            />
                            
                            <input 
                                className={`addTask-input ${errors.title ? "error" : ""}`}
                                name="description" 
                                placeholder="Enter a description ..." 
                                value={task.description}
                                onChange={handleChange}
                            />
                            
                            <select 
                                className="addTask-select"
                                name="priority" 
                                value={task.priority} 
                                onChange={handleChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            
                            <select 
                                className="addTask-select"
                                name="status" 
                                value={task.status} 
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            
                            <input 
                                className={`addTask-input ${errors.dueDate ? "error" : ""}`}
                                name="dueDate" 
                                type="date" 
                                value={task.dueDate}
                                onChange={handleChange}
                            />
                            <div className="addTask-div-button">
                            <button type="submit" className="addTask-button">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
    </>
    );
};
