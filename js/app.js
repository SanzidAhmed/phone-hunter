const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    
    const phonesContainer = document.getElementById('phone-card');
    phonesContainer.innerText = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length>12){
        phones = phones.slice(0,12);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none')
    }
    // display no phones found
    const noPhones = document.getElementById('no-phone-found');
    if(phones.length === 0){
        noPhones.classList.remove('d-none')
    }
    else{
        noPhones.classList.add('d-none')
    }
    phones.forEach(phone => {
        
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col')
        phonesDiv.innerHTML = `
                <div class="card p-4">
                    <img src="${phone.image}" class="img-fluid card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    </div>
                </div>
        `
        phonesContainer.appendChild(phonesDiv)
    });
    // stop loader
    toggleSpinner(false);
}
const processedLoader = (dataLimit) => {
    toggleSpinner(true)
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadPhones(searchText, dataLimit)
}
document.getElementById('search-btn').addEventListener('click', function(){
    // start loader
    processedLoader(12);
});
document.getElementById('input-field').addEventListener('keypress', function(e){
    console.log(e.key);
    if(e.key === 'Enter'){
        processedLoader(12);
    }
});
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
// not the best way
document.getElementById('btn-show-all').addEventListener('click', function(){
    processedLoader();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const modalBody = document.getElementById('phone-details');
    modalBody.innerHTML = `
    <img src="${phone.image}" class="  card-img-fluid" alt="...">
    <p class="mt-5"><span class="fw-bold">Release:</span> ${phone.releaseDate ?phone.releaseDate : 'no release date found'}</p>
    <p><span class="fw-bold">Brand:</span> ${phone.brand}</p>
    <p><span class="fw-bold">Chip-set:</span> ${phone.mainFeatures.chipSet}</p>
    <p><span class="fw-bold">Display:</span> ${phone.mainFeatures.displaySize}</p>
    <p><span class="fw-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
    
    `
}
// loadPhones('sam');