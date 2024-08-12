const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}

const params = new URLSearchParams(document.location.search)
const storeId = params.get("store_id")

const deleteAllVouchersButtonElement = document.createElement("button")
deleteAllVouchersButtonElement.textContent = "Delete All"

const groupElement = document.createElement("div")

async function deleteAllVouchers(){
    try {
        const fetchResponse = await fetch()
    } catch (error) {
        
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
        if (response.data.results){
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