//Search Field
const searchMobile = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    //console.log(searchText);
    searchField.value = "";
    /* if (searchText == "") {

    } */

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))

}
//Display Search Result
const displaySearchResult = phones => {
    const searchResult = document.getElementById("search-result");
    // console.log(phones);
    searchResult.innerHTML = "";
    if (phones.length == 0) {
        //show no result found
        const noResult = document.getElementById("no-result");
        noResult.style.display = "block";
    }
    else {
        phones.forEach(phone => {
            //console.log(phone);
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
                                <button onclick="phoneDetails('${phone.slug}')" class="btn bg-primary text-white">More Information</button>
                            </div>
                        </div>
            `;
            searchResult.appendChild(div);
        })
    }

}

const phoneDetails = id => {
    //console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}
const displayPhoneDetails = details => {
    //console.log(details.mainFeatures.displaySize);
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = "";
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <img src="${details.image}" class="card-img-top" height="700" alt="...">
    <div class="card-body">
        <h3 class="card-title"> ${details.name}</h3>
        <p class="card-text"><span class ="fw-bold">Release Date:</span> ${details.releaseDate}</p>
        <p class="card-text"><span class ="fw-bold">Display Size:</span> ${details.mainFeatures.displaySize}</p>
        <p class="card-text"><span class ="fw-bold">Chip Set:</span> ${details.mainFeatures.chipSet}</p>
        <p class="card-text"><span class ="fw-bold">Release Date:</span> ${details.mainFeatures.memory}</p>
        <p class="card-text"><span class ="fw-bold">Sensors:</span> ${details.mainFeatures.sensors}</p>
        
    </div>`;
    phoneDetails.appendChild(div);
}