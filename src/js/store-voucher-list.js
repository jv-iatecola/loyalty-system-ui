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
        pErrorElement.textContent = "Account Validation Error"
        groupElement.append(pErrorElement)
    }
}

validateAccountVerifier()

let placeHolder = null

const urlParams = new URLSearchParams(document.location.search)
const storeId = urlParams.get("store_id")

const storeNameTitleElement = document.createElement("h3")
storeNameTitleElement.id = "storeNameElement"
storeNameTitleElement.textContent = urlParams.get("store_name")

const returnButtonElement = document.createElement("button")
returnButtonElement.textContent = "<"
returnButtonElement.id = "returnButton"
returnButtonElement.onclick = () => {
    location.assign("/user-store-list.html")
}

const deleteAllVouchersButtonElement = document.createElement("button")
deleteAllVouchersButtonElement.id = "deleteAllVouchersButtonElement"
deleteAllVouchersButtonElement.textContent = "Delete All"
deleteAllVouchersButtonElement.onclick = () => deleteAllVouchers()

const groupElement = document.createElement("div")
groupElement.append(returnButtonElement, storeNameTitleElement)

function displayDeleteButton(selectedVoucherId){
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete?"

    if (!placeHolder){
        groupElement.pend(deleteButton)
        placeHolder = deleteButton
        deleteButton.onclick = () => deleteSelectedVoucher(selectedVoucherId)

    }else{
        placeHolder.remove()
        placeHolder = null
    }
}

async function deleteAllVouchers(){
    try {
        const fetchResponse = await fetch(`https://loyalty-system.onrender.com/vouchers?store_id=${storeId}`, {
            method: "DELETE",
            headers: {
                "Authorization": localStorageContent
            }
        })
        location.reload()

    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Failed to delete voucher(s)."
        groupElement.append(pErrorElement)  
    }
}

async function deleteSelectedVoucher(selectedVoucherId){
    try {
        const fetchResponse = await fetch(`https://loyalty-system.onrender.com/vouchers?id=${selectedVoucherId}`, {
            method: "DELETE",
            headers: {
                "Authorization": localStorageContent
            }
        })
        location.reload()   

    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Failed to delete voucher."
        groupElement.append(pErrorElement)  
    }
}

async function getVouchersByStore(){
    try {
        const fetchResponse = await fetch(`https://loyalty-system.onrender.com/vouchers?stores_id=${storeId}`, {
            method: "GET",
            headers: {
                "Authorization": localStorageContent
            }
        })
        const response = await fetchResponse.json()
        if (response.data.results.length === 0){
            throw new Error("There are no vouchers related to this store.")
        }

        response.data.results.forEach(element => {
            const pVoucherIdElement = document.createElement("p")
            pVoucherIdElement.textContent = element.id
            const pVoucherCreatedAtElement = document.createElement("p")
            pVoucherCreatedAtElement.textContent = element.created_at
            const pVoucherStoreNameElement = document.createElement("p")
            pVoucherStoreNameElement.textContent = element.store_name
            const pVoucherStoreIdElement = document.createElement("p")
            pVoucherStoreIdElement.textContent = element.stores_id

            const voucherButtonElement = document.createElement("button")
            voucherButtonElement.append(pVoucherIdElement, pVoucherCreatedAtElement, pVoucherStoreNameElement, pVoucherStoreIdElement)
            voucherButtonElement.onclick = () => displayDeleteButton(element.id)
            
            groupElement.append(voucherButtonElement)
        })
        
    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "There are no vouchers related to this store."
        groupElement.append(pErrorElement)        
    }
}

getVouchersByStore()

document.body.prepend(groupElement, deleteAllVouchersButtonElement)