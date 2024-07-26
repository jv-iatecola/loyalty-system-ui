const titleElement = document.createElement("h3")

const emailInputElement = document.createElement("input")
emailInputElement.id = "Email"
emailInputElement.type = "email"

const usernameInputElement = document.createElement("input")
usernameInputElement.id = "Username"

const passwordInputElement = document.createElement("input")
passwordInputElement.id = "Password"
passwordInputElement.type = "password"

const signUpButtonElement = document.createElement("button")

const emailLabelElement = document.createElement("label")
emailLabelElement.htmlFor = "Email"
emailLabelElement.textContent = "Email"

const usernameLabelElement = document.createElement("label")
usernameLabelElement.htmlFor = "Username"
usernameLabelElement.textContent = "Username"

const passwordLabelElement = document.createElement("label")
passwordLabelElement.htmlFor = "Password"
passwordLabelElement.textContent = "Password"

titleElement.textContent = "Create Account"
signUpButtonElement.textContent = "SignUp"

document.body.prepend(titleElement, emailInputElement, usernameInputElement, passwordInputElement, emailLabelElement, usernameLabelElement, passwordLabelElement, signUpButtonElement)

signUpButtonElement.onclick = ()=>{
    console.log("CREATE ACCOUNT!!")
    try {
        throw new Error("Soda")
        // This search line will be commented while the application is under development
        // fetch("http://localhost:8000/accounts/create", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         "email": (emailInputElement.value),
        //         "username": (usernameInputElement.value),
        //         "password": (passwordInputElement.value)
        //     })
        // })
    } catch (error) {
        pErrorElement.textContent = "Error: Invalid credentials."
        document.body.prepend(pErrorElement)
    }
}