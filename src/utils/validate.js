export const checkValidData = (email, password , username) =>{

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPassValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const isUserName = /^[0-9A-Za-z]{6,16}$/.test(username);

    if(!isUserName) return "Username is not valid"
    if(!isEmailValid) return "Email ID is not valid";
    if(!isPassValid) return "Password is not valid";

    return null;


}