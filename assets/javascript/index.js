import * as bugsAndFishList from "./bugsAndFish.js"

const BnF = bugsAndFishList;

const userData = returnDataObjectIfExistsOrCreateDataObjectIfNot();

const hemiButton = document.querySelector('#hemishpere');

const bugsButton = document.querySelector('#bugs');
const fishButton = document.querySelector('#fish');
const seaCreatureButton = document.querySelector('#seaCreature');

const monthNamesArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var currentMonth = 'Sep';
// var currentMonth = monthNamesArr[new Date().getMonth()];

const currentAnimal = () => {
    var currentAnimal = userData.currentAnimal;
    bugsButton.addEventListener('click', () => {
        if(currentAnimal != 'bugs') {
            userData.currentAnimal = 'bugs';
            currentAnimal = 'bugs';
            window.localStorage.setItem('userData', JSON.stringify(userData));
            window.location.reload(false); 
            return currentAnimal;
        }
    });
    fishButton.addEventListener('click', () => {
        if(currentAnimal != 'fish') {
            userData.currentAnimal = 'fish';
            currentAnimal = 'fish';
            window.localStorage.setItem('userData', JSON.stringify(userData));
            window.location.reload(false); 
            return currentAnimal;
        }
    });
    seaCreatureButton.addEventListener('click', () => {
        if(currentAnimal != 'seaCreature') {
            userData.currentAnimal = 'seaCreature';
            currentAnimal = 'seaCreature';
            window.localStorage.setItem('userData', JSON.stringify(userData));
            window.location.reload(false); 
            return currentAnimal;
        }
    });
    return currentAnimal;
}
const hemishpere = () => {
    var hemi = userData.hemishpere;
    hemiButton.addEventListener('click', () => {
        if(hemi === 'months') {
            userData.hemishpere = 'southernMonths';
            hemi = 'southernMonths';
            window.localStorage.setItem('userData', JSON.stringify(userData));
            window.location.reload(false); 
            return hemi;
        } else if(hemi === 'southernMonths') {
            userData.hemishpere = 'months';
            hemi = 'months';
            window.localStorage.setItem('userData', JSON.stringify(userData));
            window.location.reload(false); 
            return hemi;
        }
    })

    return hemi;
};

//Real code starts here lol
initilizePageByCallingFunctions();

function initilizePageByCallingFunctions() {
    putAnimalsIntoCategories();
    checkForClickOnAnimalCardAndAddOrRemoveItFromCaughtList();
}

function putAnimalsIntoCategories() {
    for(const j in BnF.animals[currentAnimal()]) {
        var animal = BnF.animals[currentAnimal()][j];
        if(checkIfAnimalHasBeenCaught(animal.name)) {

                createAnimalCard('caught', animal);

        } else {

            if (returnTrueIfAnimalCanBeCaughtInCurrentMonth(animal)) {

                createAnimalCard('available-now', animal);

            } else {

                createAnimalCard('not-available', animal);

            }
        }
    }   
}

function checkForClickOnAnimalCardAndAddOrRemoveItFromCaughtList() {
    
    const animalCard = document.querySelectorAll('#animal-card');
    const animalCaught = document.querySelector('#caught');
    const animalAvailable = document.querySelector('#available-now');
    const animalNotAvailable = document.querySelector('#not-available');

    animalCard.forEach(animal => {
        animal.addEventListener('click', () => {

            var animalName = animal.childNodes[0].childNodes[0].nodeValue;

            var setLocalStorageAnimalBoolean = (bool) => {
                
                if (userData.bugs.hasOwnProperty(animalName)) userData.bugs[animalName] = bool;
                
                if (userData.fish.hasOwnProperty(animalName)) userData.fish[animalName] = bool;

                if (userData.seaCreature.hasOwnProperty(animalName)) userData.seaCreature[animalName] = bool;

                window.localStorage.setItem('userData', JSON.stringify(userData));

            }

            if(animal.classList.contains('caught')) {

                setLocalStorageAnimalBoolean(false);

                animal.classList.remove('caught');
                animal.parentElement.removeChild(animal);

                for(const j in BnF.animals[currentAnimal()]) {

                    var ani = BnF.animals[currentAnimal()][j];

                    if(ani.name == animalName) {
                        if(returnTrueIfAnimalCanBeCaughtInCurrentMonth(ani)) {
                            animal.classList.add('available-now');
                            animalAvailable.appendChild(animal);
                        } else {
                            animal.classList.add('not-available');
                            animalNotAvailable.appendChild(animal);
                        }
                    }

                }
            } else {
                if((animal.classList.contains('available-now')) || (animal.classList.contains('not-available'))) {

                    setLocalStorageAnimalBoolean(true);

                    animal.classList.remove('available-now', 'not-available');
                    animal.parentElement.removeChild(animal);

                    animal.classList.add('caught');
                    animalCaught.appendChild(animal);

                }
            }
        })
    })
}

function createAnimalCard(availableCaught, animal) {
    if(currentAnimal() == 'bugs') {
        createBugCard(availableCaught, animal);
    } else if(currentAnimal() == 'fish') {
        createFishCard(availableCaught, animal);
    } else if(currentAnimal() == 'seaCreature') {
        createSeaCreatureCard(availableCaught, animal);
    }
}

function createBugCard(availableCaught, animal) {
    let animalContainer = document.createElement('div');
    animalContainer.className = `animal-card ${availableCaught}`;
    animalContainer.id = 'animal-card';

    let title = document.createElement('h2');
    title.append(animal.name);

    let img = document.createElement('img');
    img.setAttribute('src', `${animal.picture}`);

    let price = document.createElement('p');
    price.className = 'price';
    price.append('Price: ' + animal.price);

    let location = document.createElement('p');
    location.className = 'location';
    location.append('Location: ' + `${animal.location}`);

    let time = document.createElement('p');
    time.className = 'time';
    time.append('Times: ' + `${animal.time}`);

    let months = document.createElement('p');
    months.className = 'months';
    months.append('Months: ' + `${animal[hemishpere()]}`);  

    animalContainer.append(title, img, price, location, time, months);

    let animalElement = document.getElementById(`${availableCaught}`);
    animalElement.append(animalContainer);
}

function createFishCard(availableCaught, animal) {
    let animalContainer = document.createElement('div');
    animalContainer.className = `animal-card ${availableCaught}`;
    animalContainer.id = 'animal-card' //`${animal.name}`

    let title = document.createElement('h2');
    title.append(animal.name);

    let img = document.createElement('img');
    img.setAttribute('src', `${animal.picture}`);

    let price = document.createElement('p');
    price.className = 'price';
    price.append('Price: ' + animal.price);

    let location = document.createElement('p');
    location.className = 'location';
    location.append('Location: ' + `${animal.location}`);

    let size = document.createElement('p');
    size.className = 'size';
    size.append('Size: ' + animal.size);

    let time = document.createElement('p');
    time.className = 'time';
    time.append('Times: ' + `${animal.time}`);

    let months = document.createElement('p');
    months.className = 'months';
    months.append('Months: ' + `${animal[hemishpere()]}`);  

    animalContainer.append(title, img, price, location, size, time, months);

    let animalElement = document.getElementById(`${availableCaught}`);
    animalElement.append(animalContainer);
}

function createSeaCreatureCard(availableCaught, animal) {
    let animalContainer = document.createElement('div');
    animalContainer.className = `animal-card ${availableCaught}`;
    animalContainer.id = 'animal-card' //`${animal.name}`

    let title = document.createElement('h2');
    title.append(animal.name);

    let img = document.createElement('img');
    img.setAttribute('src', `${animal.picture}`);

    let price = document.createElement('p');
    price.className = 'price';
    price.append('Price: ' + animal.price);

    let movement = document.createElement('p');
    movement.className = 'movement';
    movement.append('movement: ' + `${animal.movement}`);

    let size = document.createElement('p');
    size.className = 'size';
    size.append('Size: ' + animal.size);

    let time = document.createElement('p');
    time.className = 'time';
    time.append('Times: ' + `${animal.time}`);

    let months = document.createElement('p');
    months.className = 'months';
    months.append('Months: ' + `${animal[hemishpere()]}`);  

    animalContainer.append(title, img, price, movement, size, time, months);

    let animalElement = document.getElementById(`${availableCaught}`);
    animalElement.append(animalContainer);
}

function returnTrueIfAnimalCanBeCaughtInCurrentMonth(animal) {
    const monthNamesArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var animalMonths = animal[hemishpere()].split(' ');

    if (animalMonths.length == 1) {
        return checkCurrentMonthAgainstMonthRange(animalMonths);
    }
    else if (animalMonths.length == 2) {
        let allYearTest = animalMonths[0] + animalMonths[1];
        if (allYearTest == 'AllYear') {
            return true;
        }
    }
    else if (animalMonths.length == 3) {
        return checkIfAnimalAppearsInCurrentMonthInARange(monthNamesArr, animalMonths[0], animalMonths[2]);
    }
    else if (animalMonths.length == 5) {
        if (checkIfAnimalAppearsInCurrentMonthInARange(monthNamesArr, animalMonths[0], animalMonths[2])) {
            return true;
        } else {
            return checkCurrentMonthAgainstMonthRange(animalMonths[4]);
        }
    }
    else if (animalMonths.length == 7) {
        if (checkIfAnimalAppearsInCurrentMonthInARange(monthNamesArr, animalMonths[0], animalMonths[2])) {
            return true;
        } else {
            return checkIfAnimalAppearsInCurrentMonthInARange(monthNamesArr, animalMonths[4], animalMonths[6]);
        }
    }
}

function checkIfAnimalAppearsInCurrentMonthInARange(monthNamesArr, animalMonthOne, animalMonthTwo) {
    let firstAnimalMonth = animalMonthOne;
    let secondAnimalMonth = animalMonthTwo;

    let firstAnimalMonthIndex = monthNamesArr.indexOf(firstAnimalMonth);
    let secondAnimalMonthIndex = monthNamesArr.indexOf(secondAnimalMonth);

    if (firstAnimalMonthIndex < secondAnimalMonthIndex) {

        return checkIfAnimalAppearsInCurrentMonth(monthNamesArr, firstAnimalMonthIndex, secondAnimalMonthIndex);

    } else {

        return checkIfAnimalAppearsInCurrentMonthReversed(monthNamesArr, firstAnimalMonth, secondAnimalMonth);

    }
}

function checkIfAnimalAppearsInCurrentMonthReversed(monthNamesArr, firstAnimalMonth, secondAnimalMonth) {
    let months = reverseArray(monthNamesArr);

    let firstAnimalMonthIndex = months.indexOf(firstAnimalMonth);
    let secondAnimalMonthIndex = months.indexOf(secondAnimalMonth);

    let monthsToRmove = months.slice(firstAnimalMonthIndex, secondAnimalMonthIndex + 1);

    months.splice(firstAnimalMonthIndex, monthsToRmove.length);
    months.unshift(firstAnimalMonth);
    months.push(secondAnimalMonth);

    return checkCurrentMonthAgainstMonthRange(months);
}

function checkIfAnimalAppearsInCurrentMonth(monthNamesArr, firstAnimalMonthIndex, secondAnimalMonthIndex) {
    let months = monthNamesArr.slice(firstAnimalMonthIndex, secondAnimalMonthIndex + 1);

    return checkCurrentMonthAgainstMonthRange(months);
}

function checkCurrentMonthAgainstMonthRange(months) {
    for (let i in months) {
        let re = new RegExp(months[i], 'g');
        if(re.test(currentMonth)) {
            return true;
        }
    }
}

function reverseArray(arr) {
    var newArray = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        newArray.push(arr[i]);
    }
    return newArray;
}

function makeNewlocalStorageObject(){

    var Data = {};

    Data.currentAnimal = 'bugs';
    Data.hemishpere = 'months';
    Data.bugs = {};
    Data.fish = {};
    Data.seaCreature = {};

    for(let i in BnF.animals.bugs) {
        Data.bugs[BnF.animals.bugs[i].name] = false;
    }
    for(let i in BnF.animals.fish) {
        Data.fish[BnF.animals.fish[i].name] = false;
    }
    for(let i in BnF.animals.seaCreature) {
        Data.seaCreature[BnF.animals.seaCreature[i].name] = false;
    }

    return JSON.stringify(Data);
}

function returnDataObjectIfExistsOrCreateDataObjectIfNot() {
    if(window.localStorage.getItem('userData') == null) {
        window.localStorage.setItem('userData', makeNewlocalStorageObject());
    } else {
        return JSON.parse(window.localStorage.getItem('userData'));
    }

    return JSON.parse(window.localStorage.getItem('userData'));

}

function checkIfAnimalHasBeenCaught(animalName) {
    if(userData[currentAnimal()][animalName] == true) {
        return true;
    } else {
        return false;
    }
}
