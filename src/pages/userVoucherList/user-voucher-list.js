const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}

const profileButtonElement = document.createElement("button")
profileButtonElement.textContent = "Profile"
const StoresListButtonElement = document.createElement("button")
StoresListButtonElement.textContent = "Stores List"
const logoutButtonElement = document.createElement("button")
logoutButtonElement.textContent = "Logout"


document.body.prepend(profileButtonElement, StoresListButtonElement, logoutButtonElement)

logoutButtonElement.onclick = ()=>{
    localStorage.clear()
    location.assign("/create-account.html")
}

const groupElement = document.createElement("div")

async function getVouchers(){
    try{
        const fetchResponse = await fetch("http://localhost:8000/vouchers", {
            method: "GET",
            headers: {
                "Authorization": localStorageContent
            }
        })
        const response = await fetchResponse.json()
        

        response.data.forEach(element => {
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
            });

    }catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Error"
        groupElement.append(pErrorElement)
    }
}

document.body.prepend(groupElement)

getVouchers()

