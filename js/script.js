// reload page
const clearCach = () => {
    location.reload();
}

// add navbar link
const productLoad = (searchKey) => {
    spinnerLoad('block');
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchKey}`)
    .then(response => response.json())
    .then(json => displayPhone(json.data));
    const titleShow = document.getElementById('title').style.display = 'block';
}


// warning div hide
const hiddenAlert = (id) => {
    const warning = document.getElementById(id);
    warning.style.display = 'none';
    spinnerLoad('none');
}

const spinnerLoad = (spLoad) => {
    const spinnerLoading = document.getElementById('spinner');
    spinnerLoading.style.display = spLoad;
}


// load phone primary details
const loadPhone = () => {
    spinnerLoad('block');
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = '';
    console.log(typeof searchValue);
    if(searchValue === ''){
        const warning = document.getElementById('warning');
        warning.style.display = 'block';
    }
    else{
        const titleShow = document.getElementById('title').style.display = 'block';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        .then(response => response.json())
        .then(json => displayPhone(json.data));
    }
}

const displayPhone = (phones) => {
    console.log(phones);
    if(phones.length == ''){
        const warning = document.getElementById('empty-product');
        warning.style.display = 'block';
    }
    else{
        const containerDiv2 = document.getElementById('more-details');
        containerDiv2.textContent = '';
        const firstPagePhone = phones.slice(0,20);
        const containerDiv = document.getElementById('phone-details');
        containerDiv.textContent = '';
        for(const phone of firstPagePhone){
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                    <div class="card h-100 box-shadow">
                        <img src="${phone?.image ?phone?.image:'Not Found'}" class="card-img-top w-50 mx-auto mt-4" alt="...">
                        <div class="card-body">
                        <h3 class="card-title">${phone?.phone_name ?phone?.phone_name:'Not Found'}</h3>
                        <h5 class="card-text">Brand: ${phone?.brand}</h5>
                        <button class="show-button my-3" role="button" onclick="moreDetails('${phone?.slug}')">Details</button>
                        </div>
                    </div>
            `;
            containerDiv.appendChild(div);
            spinnerLoad('none');
    }
    }
}

const moreDetails = (pId) => {
    spinnerLoad('block');
    console.log(pId);
    fetch(`https://openapi.programming-hero.com/api/phone/${pId}`)
    .then(response => response.json())
    .then(json => moreDetailsShow(json.data));
}

const moreDetailsShow = (details) => {
    console.log(details);
    const containerDiv = document.getElementById('phone-details');
    containerDiv.textContent = ''; 
    const containerDiv2 = document.getElementById('more-details');
        const div2 = document.createElement('div');
        div2.classList.add('col');
        div2.innerHTML = `
        <div class="div text-center p-lg-5">
            <img src="${details?.image ?details?.image:'Not Found'}" alt="">
            <div class="card-body mt-2">
                <h3 class="card-title">${details?.name ?details?.name:'Not Found'}</h3>
                <h5 class="card-text">Brand: ${details?.brand ?details?.brand:'Not Found'}</h5>
                <h6>${details?.releaseDate ?details?.releaseDate:'Not Found'}</h6>
            </div>
        </div>
        `;
        const div3 = document.createElement('div');
        div3.classList.add('col');
        div3.innerHTML = `
        <div class="details">
                    <table>
                        <tr>
                            <td><strong>Storage:</strong></td>
                            <td>${details.mainFeatures.storage}</td>
                        </tr>
                        <tr>
                            <td><strong>Display:</strong></td>
                            <td>${details.mainFeatures.displaySize}</td>
                        </tr>
                        <tr>
                            <td><strong>Chipset:</strong></td>
                            <td>${details.mainFeatures.chipSet}</td>
                        </tr>
                        <tr>
                            <td><strong>Memory:</strong></td>
                            <td>${details.mainFeatures.memory}</td>
                        </tr>
                    </table>
                </div>
                <div class="sensor mt-3">
                    <div class="title">
                        <h2>Sensor</h2>
                        <ul>
                            <li>${details?.mainFeatures?.sensors[0] ?details?.mainFeatures?.sensors[0]:'Not Found'}</li>
                            <li>${details?.mainFeatures?.sensors[1] ?details?.mainFeatures?.sensors[1]:'Not Found'}</li>
                            <li>${details?.mainFeatures?.sensors[2] ?details?.mainFeatures?.sensors[2]:'Not Found'}</li>
                            <li>${details?.mainFeatures?.sensors[3] ?details?.mainFeatures?.sensors[3]:'Not Found'}</li>
                        </ul>
                    </div>
                </div>
                <div class="others mt-3">
                    <div class="title">
                        <h2>Others</h2>
                        <table>
                            <tr>
                                <td><strong>WLAN:</strong></td>
                                <td>${details?.others?.WLAN ?details?.others?.WLAN:'Not Found'}</td>
                            </tr>
                            <tr>
                                <td><strong>Bluetooth:</strong></td>
                                <td>${details?.others?.Bluetooth ?details?.others?.Bluetooth:'Not Found'}</td>
                            </tr>
                            <tr>
                                <td><strong>GPS:</strong></td>
                                <td>${details?.others?.GPS ?details?.others?.GPS:'Not Found'}</td>
                            </tr>
                            <tr>
                                <td><strong>NFC:</strong></td>
                                <td>${details?.others?.NFC ?details?.others?.NFC:'Not Found'}</td>
                            </tr>
                            <tr>
                                <td><strong>Radio:</strong></td>
                                <td>${details?.others?.Radio ?details?.others?.Radio:'Not Found'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
        `;
        containerDiv2.appendChild(div2);
        containerDiv2.appendChild(div3);
        spinnerLoad('none');
}
