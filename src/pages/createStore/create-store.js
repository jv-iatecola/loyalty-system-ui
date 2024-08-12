const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}

const storeNameInputElement = document.createElement("input")
storeNameInputElement.id = "Store Name"
storeNameInputElement.required = "true"

const storeNameLabelElement = document.createElement("label")
storeNameLabelElement.htmlFor = "Store Name"
storeNameLabelElement.textContent = "Store Name"

const createStoreButtonElement = document.createElement("input")
createStoreButtonElement.value = "Create Store"
createStoreButtonElement.type = "submit"

const groupElement = document.createElement("div")
groupElement.append(storeNameInputElement, storeNameLabelElement, createStoreButtonElement)

document.body.prepend(groupElement)

createStoreButtonElement.onclick = async (event) => {
    event.preventDefault()
    try {
        const fetchResponse = await fetch("http://localhost:8000/stores", {
            method: "POST",
            headers: {
                "Authorization": localStorageContent
            },
            body: JSON.stringify({
                "store_name": storeNameInputElement.value
            })
        })

        if (fetchResponse.status !== 200){
            throw new Error("Invalid Store Name.")
        }

        location.assign("/user-store-list.html")
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Invalid Store Name."
        document.body.prepend(pErrorElement)
    }
}
