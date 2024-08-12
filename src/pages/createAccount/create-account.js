const localStorageContent = localStorage.getItem("Token")
if (localStorageContent) {
    location.assign("/user-voucher-list.html")
}
const anchorLoginElement = document.createElement("a")
anchorLoginElement.textContent = "SignIn"
anchorLoginElement.href = "http://localhost:5173/login.html"

const titleElement = document.createElement("h3")
titleElement.textContent = "Create Account"

const emailInputElement = document.createElement("input")
emailInputElement.id = "Email"
emailInputElement.type = "email"
emailInputElement.required = "true"

const usernameInputElement = document.createElement("input")
usernameInputElement.id = "Username"
emailInputElement.required = "true"

const passwordInputElement = document.createElement("input")
passwordInputElement.id = "Password"
passwordInputElement.type = "password"
passwordInputElement.required = "true"

const signUpButtonElement = document.createElement("input")
signUpButtonElement.value = "SignUp"
signUpButtonElement.type = "submit"

const emailLabelElement = document.createElement("label")
emailLabelElement.htmlFor = "Email"
emailLabelElement.textContent = "Email"

const usernameLabelElement = document.createElement("label")
usernameLabelElement.htmlFor = "Username"
usernameLabelElement.textContent = "Username"

const passwordLabelElement = document.createElement("label")
passwordLabelElement.htmlFor = "Password"
passwordLabelElement.textContent = "Password"

const groupElement = document.createElement("div")
groupElement.append(titleElement, emailInputElement, usernameInputElement, passwordInputElement, emailLabelElement, usernameLabelElement, passwordLabelElement, signUpButtonElement, anchorLoginElement)

document.body.prepend(groupElement)

signUpButtonElement.onclick = async (event) => {
    event.preventDefault()
    try {
        const fetchResponse = await fetch("http://localhost:8000/accounts/create", {
            method: "POST",
            body: JSON.stringify({
                "email": emailInputElement.value,
                "username": usernameInputElement.value,
                "password": passwordInputElement.value
            })
        })
        const response = await fetchResponse.json()

        if (fetchResponse.status !== 201){
            throw new Error("Error: Invalid Credentials")
        }

        localStorage.setItem("Token", response.message)
        location.assign("/user-voucher-list.html")
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Error: Invalid credentials."
        document.body.prepend(pErrorElement)
    }
}