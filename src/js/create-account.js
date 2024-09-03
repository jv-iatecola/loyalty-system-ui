const localStorageContent = localStorage.getItem("Token")
if (localStorageContent) {
    location.assign("/user-voucher-list.html")
}

const titleElement = document.createElement("h3")
titleElement.textContent = "Create Account"

const emailInputElement = document.createElement("input")
emailInputElement.id = "Email"
emailInputElement.type = "email"
emailInputElement.required = "true"

const emailLabelElement = document.createElement("label")
emailLabelElement.htmlFor = "Email"
emailLabelElement.textContent = "Email"

const usernameInputElement = document.createElement("input")
usernameInputElement.id = "Username"
emailInputElement.required = "true"

const usernameLabelElement = document.createElement("label")
usernameLabelElement.htmlFor = "Username"
usernameLabelElement.textContent = "Username"

const passwordInputElement = document.createElement("input")
passwordInputElement.id = "Password"
passwordInputElement.type = "password"
passwordInputElement.required = "true"

const passwordLabelElement = document.createElement("label")
passwordLabelElement.htmlFor = "Password"
passwordLabelElement.textContent = "Password"

const signUpButtonElement = document.createElement("input")
signUpButtonElement.id = "SignUpButton"
signUpButtonElement.value = "SignUp"
signUpButtonElement.type = "submit"

const anchorLoginElement = document.createElement("a")
anchorLoginElement.textContent = "SignIn"
anchorLoginElement.href = "/login.html"

const groupElement = document.createElement("div")
groupElement.append(titleElement, emailLabelElement, emailInputElement, usernameLabelElement, usernameInputElement, passwordLabelElement, passwordInputElement, signUpButtonElement, anchorLoginElement)

document.body.prepend(groupElement)

signUpButtonElement.onclick = async (event) => {
    event.preventDefault()
    try {
        const fetchResponse = await fetch("https://loyalty-system.onrender.com/accounts/create", {
            method: "POST",
            body: JSON.stringify({
                "email": emailInputElement.value,
                "username": usernameInputElement.value,
                "password": passwordInputElement.value
            })
        })
        const response = await fetchResponse.json()

        if (fetchResponse.status !== 201){
            throw new Error("Oops, something went wrong. Please try again.")
        }

        localStorage.setItem("Token", response.message)
        location.assign("/user-voucher-list.html")
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Oops, something went wrong. Please try again."
        document.body.prepend(pErrorElement)
    }
}