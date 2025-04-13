import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTodayTasksByUser } from "../../../../redux/taskSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "./todayTasks.css";

export const TodayTasks = () => {
    const dispatch = useDispatch();
    const { todayTasks, loading, serverError , networkError , unknownError } = useSelector((state) => state.tasks);

        useEffect(() => {
            if (serverError) toast.error(serverError.message);
            if (networkError) toast.error(networkError);
          }, [serverError, networkError]);

        useEffect(() => {
            dispatch(getTodayTasksByUser());
        }, [dispatch]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            <div className="todayTasks-div">
                {todayTasks && todayTasks.length > 0 ? (
                    todayTasks.map((task) => (
                        <div className="todayTasks-card" key={task._id}>
                            <h2 className="todayTasks-card-title">{task.title}</h2>
                            <div className="todayTasks-card-divClock"> 
                                <FontAwesomeIcon className="todayTasks-card-clock" icon={faClock}/>
                                {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                            <div className="todayTasks-card-actions">
                            <Link className="todayTasks-card-link" to={`/home/edit-task/${task._id}`}>
                                <FontAwesomeIcon className="todayTasks-card-icon" icon={faPen}/>
                            </Link>
                            <FontAwesomeIcon className="todayTasks-card-icon" icon={faTrash} onClick={() => dispatch(deleteTask(task._id))}/>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="todayTasks-noTasks">No tasks found.</p>
                )}
            </div>
        </div>
    );
};
