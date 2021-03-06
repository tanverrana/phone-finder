//Search Field
const searchMobile = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    //Empty search Field Error Handle
    if (searchText == "") {
        const noText = document.getElementById("no-text");
        noText.style.display = "block";
    }
    else if (typeof searchText === 'number') {
        const noText = document.getElementById("no-text");
        noText.style.display = "block";
    }

    else {
        //API Link
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
    }
    searchField.value = "";
}
//Display Search Result
const displaySearchResult = phones => {
    const searchResult = document.getElementById("search-result");
    //Get only 20 Result
    const first20Data = phones.slice(0, 20);
    //Hide Search Error Message
    const noText = document.getElementById("no-text");
    noText.style.display = "none";
    //Hide No result Error Message
    const noResult = document.getElementById("no-result");
    noResult.style.display = "none";

    //Remover Previous Data
    searchResult.innerHTML = "";
    //no result found condition
    if (phones.length == 0) {
        //show no result found
        const noResult = document.getElementById("no-result");
        noResult.style.display = "block";
    }
    else {
        first20Data.forEach(phone => {
            //console.log(phone);
            //Create div and div class
            const div = document.createElement("div");
            div.classList.add("col-lg-4")
            div.classList.add("col-md-12")
            div.classList.add("my-3")
            div.innerHTML = `
             <div class="card" style="width: 18rem;">
                            <img src="${phone.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <p class="card-text">${phone.brand}</p>
                                <button onclick="phoneDetails('${phone.slug}')" class="btn bg-warning text-dark">Details</button>
                            </div>
                        </div>
            `;
            searchResult.appendChild(div);
        })
    }

}
// Phone Details
const phoneDetails = id => {
    //Connect Phone Detail API 
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}
//Display Phone Details
const displayPhoneDetails = details => {
    //console.log(details.mainFeatures.displaySize);
    const phoneDetails = document.getElementById("phone-details");
    //Remove Previous Phone details
    phoneDetails.textContent = "";
    const div = document.createElement("div");
    div.classList.add("card");
    //Display Data HTML Format
    div.innerHTML = `
    <img src="${details.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h3 class="card-title"> ${details.name}</h3>
        <p class="card-text"><span class ="fw-bold">Release Date:</span> ${details.releaseDate == "" ? "No Release Date" : details.releaseDate}</p>
        <p class="card-text"><span class ="fw-bold">Display Size:</span> ${details.mainFeatures.displaySize}</p>
        <p class="card-text"><span class ="fw-bold">Chip Set:</span> ${details.mainFeatures.chipSet}</p>
        <p class="card-text"><span class ="fw-bold">Memory:</span> ${details.mainFeatures.memory}</p>
        <p class="card-text"><span class ="fw-bold">Sensors:</span> ${details.mainFeatures.sensors}</p>
        <p class="card-text"><span class ="fw-bold">WLAN:</span> ${details.others.WLAN}</p>
        <p class="card-text"><span class ="fw-bold">Bluetooth:</span> ${details.others.Bluetooth}</p>
        <p class="card-text"><span class ="fw-bold">GPS:</span> ${details.others.GPS}</p>
        <p class="card-text"><span class ="fw-bold">NFC:</span> ${details.others.NFC}</p>
        <p class="card-text"><span class ="fw-bold">Radio:</span> ${details.others.Radio}</p>
        <p class="card-text"><span class ="fw-bold">USB:</span> ${details.others.USB}</p>
        
    </div>`;
    phoneDetails.appendChild(div);

}