const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}

const groupElement = document.createElement("div")

async function validateAccountVerifier(){
    try {
        const fetchResponse = await fetch("http://localhost:8000/accounts/verify", {
            method: "GET",
            headers: {
                "Authorization": localStorageContent
            }
        })
        if (fetchResponse.status === 200){
            location.assign("/create-account.html")
        }
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Oops, something went wrong. Please try again."
        groupElement.append(pErrorElement)
    }
}

validateAccountVerifier()

async function resendValidationEmail(){
    try {
        const fetchResponse = await fetch("http://localhost:8000/accounts/resend_email", {
            method: "GET",
            headers: {
                "Authorization": localStorageContent
            }
        })
        if (fetchResponse.status === 200){
            const pConfimationElement = document.createElement("p")
            pConfimationElement.textContent = "Email Sent Successfully! Please check the registered email."
            groupElement.append(pConfimationElement)
        }else{
            throw new Error("Oops, something went wrong. Please try again.")
        }
        
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Oops, something went wrong. Please try again."    
        groupElement.append(pErrorElement)
    }
}

const titleElement = document.createElement("h3")
titleElement.textContent = "Oops, something went wrong. Please try again."

const resendEmailButton = document.createElement("button")
resendEmailButton.textContent = "Resend Email?"
resendEmailButton.onclick = resendValidationEmail

groupElement.append(titleElement, resendEmailButton)

document.body.prepend(groupElement)