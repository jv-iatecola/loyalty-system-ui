const localStorageContent = localStorage.getItem("Token")
if (!localStorageContent){
    location.assign("/create-account.html")
}


const logoutButtonElement = document.createElement("button")
logoutButtonElement.textContent = "Logout"

document.body.prepend(logoutButtonElement)

logoutButtonElement.onclick = ()=>{
    localStorage.clear()
    location.assign("/create-account.html")
}