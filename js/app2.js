const loadPhones2 = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones2(data.data);
}
const displayPhones2 = phones => {
    
    const phonesContainer2 = document.getElementById('phone-container');
    phonesContainer2.innerText = '';
    
    const noPhones = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhones.classList.remove('d-none')
    }
    else{
        noPhones.classList.add('d-none')
    }
    toggleSpinner(false)
    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
            </div>
        </div>
        
        `
        phonesContainer2.appendChild(phoneDiv);
    });
}
document.getElementById('search-btn').addEventListener('click', function(){
    toggleSpinner(true)
    const searchField = document.getElementById('search-input-field');
    const searchText = searchField.value;
    loadPhones2(searchText);
})
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

loadPhones2('oppo');