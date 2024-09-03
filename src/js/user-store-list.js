const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}

async function validateAccountVerifier(){
    try {
        const fetchResponse = await fetch("https://loyalty-system.onrender.com/accounts/verify", {
            method: "GET",
            headers: {
                "Authorization": localStorageContent
            }
        })
        if (fetchResponse.status !== 200){
            location.assign("/resend-validation-email.html")
        }

    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Oops, something went wrong. Please try again."
        groupElement.append(pErrorElement)
    }
}

validateAccountVerifier()

const returnButtonElement = document.createElement("button")
returnButtonElement.textContent = "<"
returnButtonElement.id = "returnButton"

const groupElement = document.createElement("div")
groupElement.append(returnButtonElement)

const createStoreButtonElement = document.createElement("button")
createStoreButtonElement.textContent = "+"
createStoreButtonElement.id = "createStoreButton"


returnButtonElement.onclick = () => {
    location.assign("/user-voucher-list.html")
}

createStoreButtonElement.onclick = () => {
    location.assign("/create-store.html")
}

function getVouchersByStore(storeId, storeName){
    location.assign(`/store-voucher-list.html?store_id=${storeId}&store_name=${storeName}`)
}

async function getStores(){
    try {
        const fetchResponse = await fetch("https://loyalty-system.onrender.com/stores", {
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
            storeButtonElement.onclick = () => getVouchersByStore(element.id, element.store_name)

            groupElement.append(storeButtonElement)
        })
        
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "You dont't have a store yet. Do you want to create one now?"
        createStoreButtonElement.textContent = "Create Store"
        groupElement.append(pErrorElement)        
    }
}

getStores()

document.body.prepend(groupElement, createStoreButtonElement)
