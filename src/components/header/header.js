import logo from "../../assets/images/logo.png";
import "./header.css";

export const Header = () => {
    return (
                <div className="header-div">
                    <div className="header-logo-div">
                    <img src={logo} alt="logo"/>
                    <h2>PlanMate</h2>
                </div>
        
                <div className="home-spacer-div"></div>
                </div>
    )
}