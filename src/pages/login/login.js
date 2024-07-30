const formElement = document.createElement("form")

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
signInButtonElement.textContent = "SignIn"

formElement.append(titleElement, emailInputElement, emailLabelElement, passwordInputElement, passwordLabelElement, signInButtonElement)

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
        console.log(fetchResponse)

        if (fetchResponse.status !== 200){
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