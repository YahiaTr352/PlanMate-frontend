import { FormAuth } from "../../components/authForm/form";
export const Login = () => {
    return <FormAuth title="Login" fields={["userName" , "email" , "password"]} endPoint="login" buttonName="Login"/>
}