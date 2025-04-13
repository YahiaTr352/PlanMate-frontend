export const validateAuthForm = (form) => {
    const errors = {};

    if (!form.name.trim()) errors.name = "Username is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Invalid email format";

    if (!form.password.trim()) errors.password = "Password is required";
    else if (form.password.length < 8) errors.password = "Password must be at least 8 characters";

    if (form.passwordC) {
        if (!form.passwordC.trim()) errors.passwordC = "Confirm password is required";
        else if (form.password !== form.passwordC) errors.passwordC = "Passwords don't match";
    }

    return errors;
};

export const validateTaskForm = (form) => {
    let errors = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.description.trim()) errors.description = "Description is required";
    if (!form.dueDate) errors.dueDate = "Description is required";
    return errors;
};