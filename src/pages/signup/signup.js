import { FormAuth } from "../../components/authForm/form";
// title fields endpoint buttonName
export const Signup = () => {
    return <FormAuth title="Register" fields={["userName" , "email" , "password" , "passwordC"]} endPoint="signup" buttonName="Register"/>
}