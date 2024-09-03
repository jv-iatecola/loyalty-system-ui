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
        response = await fetchResponse.json()

    } catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Oops, something went wrong. Please try again."
        groupElement.append(pErrorElement)
    }
}

const logoutButtonElement = document.createElement("button")
logoutButtonElement.textContent = "Logout"
logoutButtonElement.id = "logoutButton"

const profileButtonElement = document.createElement("button")
profileButtonElement.textContent = "Profile"
profileButtonElement.id = "profileButton"

const topButtonsGroupElement = document.createElement("div")
topButtonsGroupElement.id = "topDiv"
topButtonsGroupElement.append(logoutButtonElement, profileButtonElement)

const groupElement = document.createElement("div")

validateAccountVerifier()

const storesListButtonElement = document.createElement("button")
storesListButtonElement.textContent = "Stores List"
storesListButtonElement.id = "StoresListButton"

const responseGroupElement = document.createElement("div")
groupElement.append(topButtonsGroupElement, responseGroupElement, storesListButtonElement)

logoutButtonElement.onclick = ()=>{
    localStorage.clear()
    location.assign("/create-account.html")
}

profileButtonElement.onclick = () => {
    location.assign("/profile.html")
}

storesListButtonElement.onclick = ()=>{
    location.assign("/user-store-list.html")
}


async function getVouchers(){
    try{
        const fetchResponse = await fetch("https://loyalty-system.onrender.com/vouchers", {
            method: "GET",
            headers: {
                "Authorization": localStorageContent
            }
        })
        const response = await fetchResponse.json()
        if (response.data.length === 0){
            const pNoVouchersElement = document.createElement("p")
            pNoVouchersElement.textContent = "You don't have vouchers yet :C"
            pNoVouchersElement.id = "pNoVouchersElement"
            responseGroupElement.append(pNoVouchersElement)
        }
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
            
            responseGroupElement.append(voucherButtonElement)
        });

    }catch (error) {
        const pErrorElement = document.createElement("p")
        pErrorElement.textContent = "Oops, something went wrong. Please try again."
        groupElement.append(pErrorElement)
    }
}

document.body.prepend(groupElement)

getVouchers()
