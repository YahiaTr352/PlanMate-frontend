import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../redux/taskSlice";
import "./taskSection.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { toast } from "react-toastify";

export const TaskSection = ({ title, filterBy, filterValue }) => {
    const dispatch = useDispatch();
    const {tasks , loading } = useSelector((state) => state.tasks);
    const [isOpen, setIsOpen] = useState(false);

    const filteredTasks = tasks.filter(task => task[filterBy] === filterValue) || [];

            const handleDeleteTask = async(taskId) => {
               
                    try {
                      await dispatch(deleteTask(taskId)).unwrap();
                      toast.success("Task deleted successfully!");
                    } catch (error) {
                      toast.error("Failed to delete task.");
                    }
                  }
                

    return (
            <>
            <div className="taskSection-action" onClick={() => setIsOpen(prev => !prev)}>
            <p>{title}</p>
            {isOpen ? <FaArrowDown className="taskSection-action-icon"/> : <FaArrowUp className="taskSection-action-icon"/>}
            </div>
            <div className={`taskSection-div ${isOpen ? "open" : ""}`}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div className="taskSection-card" key={task._id}>
                            <h2 className="taskSection-card-title">{task.title}</h2>
                            <div className="taskSection-card-divClock">
                                <FontAwesomeIcon className="taskSection-card-clock" icon={faClock} />
                                {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                            <div className="taskSection-card-actions">
                                <Link className="taskSection-card-link" to={`/home/edit-task/${task._id}`}>
                                    <FontAwesomeIcon className="taskSection-card-icon" icon={faPen} />
                                </Link>
                                <FontAwesomeIcon
                                    className="taskSection-card-icon"
                                    icon={faTrash}
                                    onClick={() => handleDeleteTask(task._id)} />
                            </div>
                        </div>
                    ))
                    
                ) : (
                    <p className="taskSection-noTask">No tasks found.</p>
                )}
                {loading && <p>Loading...</p>}
            </div>
            </>
    );
};
