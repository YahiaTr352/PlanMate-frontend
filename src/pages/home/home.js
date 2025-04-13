import { TodayTasks } from "./homeSections/todayTasks/todayTasks";
import { AddTask } from "./homeSections/addTask/addTask";
import { TasksByStatus } from "./homeSections/tasksByStatus/tasksByStatus";
import { TasksByPriority } from "./homeSections/tasksByPriority/tasksByPriority";
import "./home.css";

export const Home = () => {

    return (
        <div className="home-body">
            <AddTask/>
            <TodayTasks/>
            <div className="home-hr-div">
                <hr></hr>
            </div>
            <TasksByStatus/>
            <TasksByPriority/>
        </div>
    )
}