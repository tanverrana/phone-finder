//Search Field
const searchMobile = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    //console.log(searchText);
    searchField.value = "";
    /* if (searchText == "") {

    } */

    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data[0]))

}