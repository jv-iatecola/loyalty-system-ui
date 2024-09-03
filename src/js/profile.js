const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}

const groupElement = document.createElement("div")


let placeHolder = null

const returnButtonElement = document.createElement("button")
returnButtonElement.textContent = "<"
returnButtonElement.id = "returnButton"
returnButtonElement.onclick = () => {
    location.assign("/user-store-list.html")
}

const settingsButtonElement = document.createElement("button")
settingsButtonElement.textContent = "Settings"
settingsButtonElement.id = "settingsButtonElement"
settingsButtonElement.onclick = displaySettingsOptions

async function getUser(){
    try {
        const fetchResponse = await fetch("https://loyalty-system.onrender.com/accounts/get_user", {
            method: "GET",
            headers: {
                "Authorization": localStorageContent
            }
        })
        if (fetchResponse.status != 200){
            throw new Error("Oops, something went wrong. Please try again.")
        }

        const response = await fetchResponse.json()

        const pUsernameElement = document.createElement("p")
        pUsernameElement.textContent = response.data.username
        pUsernameElement.id = "pUsernameElement"
        const pEmailElement = document.createElement("p")
        pEmailElement.textContent = response.data.email
        const pIdElement = document.createElement("p")
        pIdElement.textContent = response.data.id
        
        groupElement.append(returnButtonElement, pUsernameElement, pEmailElement, pIdElement, settingsButtonElement)
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Oops, something went wrong. Please try again."
        groupElement.append(returnButtonElement, pErrorElement, settingsButtonElement)
    }
}

getUser()

function displaySettingsOptions(){
    const titleElement = document.createElement("h3")
    titleElement.textContent = "Personal Details"
    titleElement.id = "personalDetailsElement"

    const confirmButtonElement = document.createElement("input")
    confirmButtonElement.id = "confirmButtonElement"
    confirmButtonElement.value = "Confirm"
    confirmButtonElement.type = "submit"

    const newEmailInputElement = document.createElement("input")
    newEmailInputElement.id = "Email"
    newEmailInputElement.type = "email"

    const newUsernameInputElement = document.createElement("input")
    newUsernameInputElement.id = "Username"

    const newPasswordInputElement = document.createElement("input")
    newPasswordInputElement.id = "Password"
    newPasswordInputElement.type = "password"


    const newEmailLabelElement = document.createElement("label")
    newEmailLabelElement.htmlFor = "Email"
    newEmailLabelElement.textContent = "Email"

    const newUsernameLabelElement = document.createElement("label")
    newUsernameLabelElement.htmlFor = "Username"
    newUsernameLabelElement.textContent = "Username"

    const newPasswordLabelElement = document.createElement("label")
    newPasswordLabelElement.htmlFor = "Password"
    newPasswordLabelElement.textContent = "Password"

    const formElement = document.createElement("form")
    formElement.append(titleElement, newEmailLabelElement, newEmailInputElement, newUsernameLabelElement, newUsernameInputElement, newPasswordLabelElement, newPasswordInputElement, confirmButtonElement)

    if (!placeHolder){
        groupElement.append(formElement)
        placeHolder = formElement
        confirmButtonElement.onclick = () => {modifyUserInfo(newEmailInputElement, newUsernameInputElement, newPasswordInputElement)}
    }else{
        placeHolder.remove()
        placeHolder = null        
    }
}

async function modifyUserInfo(newEmailInputElement, newUsernameInputElement, newPasswordInputElement){
    if (!newEmailInputElement.value){
        requestEmail = undefined
    }else{
        requestEmail = newEmailInputElement.value
    }

    if (!newUsernameInputElement.value){
        requestUsername = undefined
    }else{
        requestUsername = newUsernameInputElement.value
    }

    if (!newPasswordInputElement.value){
        requestPassword = undefined
    }else{
        requestPassword = newPasswordInputElement.value
    }
    
    try {
        const fetchResponse = await fetch("https://loyalty-system.onrender.com/accounts/put", {
            method: "PUT",
            headers: {
                "Authorization": localStorageContent
            },
            body: JSON.stringify({
                email: requestEmail,
                username: requestUsername,
                password: requestPassword
            })
        })
        
        if (fetchResponse.status !== 200){
            throw new Error("Oops, something went wrong. Please try again.");
        }

        groupElement.append("Modifications applied successfully!")
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Oops, something went wrong. Please try again."
        document.body.prepend(pErrorElement)
    }
}
document.body.append(groupElement)