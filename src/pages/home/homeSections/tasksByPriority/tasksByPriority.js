import { useDispatch, useSelector } from "react-redux";
import { TaskSection } from "../../../../components/taskSection/taskSection";
import "./tasksByPriority.css";
import { useEffect } from "react";
import { getTasks } from "../../../../redux/taskSlice";
import { FaFlag } from "react-icons/fa";

export const TasksByPriority = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

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
