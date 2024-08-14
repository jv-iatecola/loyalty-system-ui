const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}
let placeHolder = null

const params = new URLSearchParams(document.location.search)
const storeId = params.get("store_id")

const deleteAllVouchersButtonElement = document.createElement("button")
deleteAllVouchersButtonElement.textContent = "Delete All"
deleteAllVouchersButtonElement.onclick = () => deleteAllVouchers()

const groupElement = document.createElement("div")

function displayDeleteButton(selectedVoucherId){
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete?"

    if (!placeHolder){
        groupElement.append(deleteButton)
        placeHolder = deleteButton
        deleteButton.onclick = () => deleteSelectedVoucher(selectedVoucherId)

    }else{
        placeHolder.remove()
        placeHolder = null
    }
}

async function deleteAllVouchers(){
    try {
        const fetchResponse = await fetch(`http://localhost:8000/vouchers?store_id=${storeId}`, {
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
        const fetchResponse = await fetch(`http://localhost:8000/vouchers?id=${selectedVoucherId}`, {
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
        const fetchResponse = await fetch(`http://localhost:8000/vouchers?stores_id=${storeId}`, {
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