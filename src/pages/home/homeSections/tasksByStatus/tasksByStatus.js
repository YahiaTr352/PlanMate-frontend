import { useDispatch, useSelector } from "react-redux";
import { TaskSection } from "../../../../components/taskSection/taskSection";
import "./tasksByStatus.css";
import { useEffect } from "react";
import { getTasks } from "../../../../redux/taskSlice";
import { FaInfoCircle } from 'react-icons/fa';

export const TasksByStatus = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    return (
        <>
        <div className="tasksByStatus-header">
        <FaInfoCircle className="tasksByStatus-header-icon" />
        <h2 className="tasksByStatus-title">Status</h2>
        </div>
        <div className="tasksByStatus-div">
            <TaskSection
                title="Pending"
                filterBy="status"
                filterValue="Pending"
            />
            <TaskSection
                title="In-Progress"
                filterBy="status"
                filterValue="In-Progress"
            />
            <TaskSection
                title="Completed"
                filterBy="status"
                filterValue="Completed"
            />
        </div>
        </>
    );
};
