const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}

const returnButtonElement = document.createElement("button")
returnButtonElement.textContent = "<"
returnButtonElement.id = "returnButton"
returnButtonElement.onclick = () => {
    location.assign("/user-store-list.html")
}

const storeNameInputElement = document.createElement("input")
storeNameInputElement.id = "Store Name"
storeNameInputElement.required = "true"

const storeNameLabelElement = document.createElement("label")
storeNameLabelElement.htmlFor = "Store Name"
storeNameLabelElement.textContent = "Store Name"

const createStoreButtonElement = document.createElement("input")
createStoreButtonElement.id = "createStore"
createStoreButtonElement.value = "Create Store"
createStoreButtonElement.type = "submit"

const groupElement = document.createElement("div")
groupElement.append(returnButtonElement, storeNameLabelElement, storeNameInputElement,  createStoreButtonElement)

document.body.prepend(groupElement)

createStoreButtonElement.onclick = async (event) => {
    event.preventDefault()
    try {
        const fetchResponse = await fetch("https://loyalty-system.onrender.com/stores", {
            method: "POST",
            headers: {
                "Authorization": localStorageContent
            },
            body: JSON.stringify({
                "store_name": storeNameInputElement.value
            })
        })

        if (fetchResponse.status !== 200){
            throw new Error("Oops, something went wrong. Please try again.")
        }

        location.assign("/user-store-list.html")
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Oops, something went wrong. Please try again."
        document.body.prepend(pErrorElement)
    }
}
