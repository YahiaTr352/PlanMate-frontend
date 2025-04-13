import { useDispatch, useSelector } from "react-redux";
import { TaskSection } from "../../../../components/taskSection/taskSection";
import "./tasksByPriority.css";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getTasks } from "../../../../redux/taskSlice";
import { FaFlag } from "react-icons/fa";

export const TasksByPriority = () => {
    const dispatch = useDispatch();
    const { serverError , networkError } = useSelector((State) => State.tasks);

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    useEffect(() => {
        if (serverError) toast.error(serverError.message);
        if (networkError) toast.error(networkError);
      }, [serverError, networkError]);

    return (
        <>
        <div className="tasksByPriority-header">
        <FaFlag className="tasksByPriority-header-icon" />
        <h2 className="tasksByPriority-title">Priority</h2>
        </div>
        <div className="tasksByPriority-div">
            <TaskSection
                title="High"
                filterBy="priority"
                filterValue="High"
            />
            <TaskSection
                title="Medium"
                filterBy="priority"
                filterValue="Medium"
            />
            <TaskSection
                title="Low"
                filterBy="priority"
                filterValue="Low"
            />
        </div>
        </>
    );
};
