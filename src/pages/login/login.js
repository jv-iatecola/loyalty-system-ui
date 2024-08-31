const localStorageContent = localStorage.getItem("Token")
if (localStorageContent) {
    location.assign("/user-voucher-list.html")
}

const titleElement = document.createElement("h3")
titleElement.textContent = "SignIn"

const emailInputElement = document.createElement("input")
emailInputElement.id = "Email"
emailInputElement.type = "email"
emailInputElement.required = "true"

const emailLabelElement = document.createElement("label")
emailLabelElement.htmlFor = "Email"
emailLabelElement.textContent = "Email"

const passwordInputElement = document.createElement("input")
passwordInputElement.id = "Password"
passwordInputElement.type = "password"
passwordInputElement.required = "true"

const passwordLabelElement = document.createElement("label")
passwordLabelElement.htmlFor = "Password"
passwordLabelElement.textContent = "Password"

const signInButtonElement = document.createElement("input")
signInButtonElement.type = "submit"
signInButtonElement.value = "SignIn"
signInButtonElement.id = "SignInButton"

const anchorSignUpElement = document.createElement("a")
anchorSignUpElement.textContent = "SignUp"
anchorSignUpElement.href = "http://localhost:5173/create-account.html"

const formElement = document.createElement("form")
formElement.append(titleElement, emailLabelElement, emailInputElement, passwordLabelElement, passwordInputElement, signInButtonElement, anchorSignUpElement)

document.body.prepend(formElement)

signInButtonElement.onclick = async (event)=>{
    event.preventDefault()
    try {
        const fetchResponse = await fetch("http://localhost:8000/accounts/login", {
            method: "POST",
            body: JSON.stringify({
                "email": emailInputElement.value,
                "password": passwordInputElement.value
            })
        })

        const response = await fetchResponse.json()
        if (fetchResponse.status !== 200){
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