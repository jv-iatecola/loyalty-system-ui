const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}

const groupElement = document.createElement("div")
const createStoreButtonElement = document.createElement("button")
createStoreButtonElement.textContent = "+"

createStoreButtonElement.onclick = () => {
    location.assign("/create-store.html")
}

async function getStores(){
    try {
        const fetchResponse = await fetch("http://localhost:8000/stores", {
            method: "GET",
            headers: {
                "Authorization": localStorageContent
            }
        })
        const response = await fetchResponse.json()

        response.data.forEach(element => {
            const pStoreIdElement = document.createElement("p")
            pStoreIdElement.textContent = element.id
            const pStoreNameElement = document.createElement("p")
            pStoreNameElement.textContent = element.store_name
            const pStoreCreatedAtElement = document.createElement("p")
            pStoreCreatedAtElement.textContent = element.created_at
            const pStoreAccountsIdElement = document.createElement("p")
            pStoreAccountsIdElement.textContent = element.accounts_id

            const storeButtonElement = document.createElement("button")
            storeButtonElement.append(pStoreIdElement, pStoreNameElement, pStoreCreatedAtElement, pStoreAccountsIdElement)

            groupElement.append(storeButtonElement)
        })
        
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "You dont't have a store yet. Do you want to create one now?"
        createStoreButtonElement.textContent = "Create Store"
        groupElement.append(pErrorElement)        
    }
}

document.body.prepend(groupElement, createStoreButtonElement)

getStores()
