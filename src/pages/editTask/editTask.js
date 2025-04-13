import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask, getTasks, getTodayTasksByUser } from "../../redux/taskSlice";
import { toast } from "react-toastify";
import "./editTask.css";

export const EditTaskScreen = () => {
    const {networkError , serverError} = useSelector((state) => state.tasks);
    const { taskId } = useParams(); 
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);
    const nav = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (serverError) toast.error(serverError);
        if (networkError) toast.error(networkError);
      }, [serverError, networkError]);

    useEffect(() => {
        const fetchTask = async () => {
            if (!tasks || tasks.length === 0) {
                await dispatch(getTasks());
            }
        };
        fetchTask();
    }, [dispatch, tasks]);

    useEffect(() => {
        const foundTask = tasks.find((t) => t._id === taskId);
        if (foundTask) {
            setTask(foundTask);
            setLoading(false);
        }
    }, [tasks, taskId]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateTask({ taskId, updatedTask: task }));
        if (updateTask.fulfilled.match(resultAction)) {
            await dispatch(getTodayTasksByUser());
            nav("/home" , { replace: true });
            toast.success("Task updated successfully");
        }
    };

    if (loading || !task) return <p>Loading...</p>;

    return (
        <div className="editTask-div">
            <form className="editTask-form" onSubmit={handleSubmit}>
                <h2 className="editTask-title">Edit Task</h2>

                <input
                    className="editTask-input"
                    name="title"
                    placeholder="Title"
                    value={task.title}
                    onChange={handleChange}
                />
                <input
                    className="editTask-input"
                    name="description"
                    placeholder="Description"
                    value={task.description}
                    onChange={handleChange}
                />
                <select
                    className="editTask-select"
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select
                    className="editTask-select"
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                >
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input
                    className="editTask-input"
                    type="date"
                    name="dueDate"
                    value={task.dueDate?.slice(0, 10)}
                    onChange={handleChange}
                />
                <div className="editTask-div-button">
                    <button type="submit" className="editTask-button">Edit Task</button>
                </div>
            </form>
        </div>
    );
};

