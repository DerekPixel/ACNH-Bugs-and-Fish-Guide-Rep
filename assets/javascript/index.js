import * as bugsAndFishList from "./bugsAndFish.js"

const BnF = bugsAndFishList;

const monthNamesArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var currentMonth = monthNamesArr[new Date().getMonth()];

for (const i in BnF.bugs) {

    if (returnTrueIfAnimalCanBeCaughtInCurrentMonth(BnF.bugs[i]))
    {
        let animalContainer = document.createElement('div');
        animalContainer.className = 'animal-card available-now';

        let title = document.createElement('h2');
        title.append(BnF.bugs[i].name);

        let img = document.createElement('img');
        img.setAttribute('src', `${BnF.bugs[i].picture}`);

        let price = document.createElement('p');
        price.className = 'price';
        price.append('Price: ' + BnF.bugs[i].price);

        let location = document.createElement('p');
        location.className = 'location';
        location.append('Location: ' + `${BnF.bugs[i].location}`);

        let time = document.createElement('p');
        time.className = 'time';
        time.append('Times: ' + `${BnF.bugs[i].time}`);

        let months = document.createElement('p');
        months.className = 'months';
        months.append('Months: ' + `${BnF.bugs[i].months}`);
            

        animalContainer.append(title, img, price, location, time, months);

        let animalElement = document.getElementById('available-now');
        animalElement.append(animalContainer);
    } else {
        let animalContainer = document.createElement('div');
        animalContainer.className = 'animal-card not-available';

        let title = document.createElement('h2');
        title.append(BnF.bugs[i].name);

        let img = document.createElement('img');
        img.setAttribute('src', `${BnF.bugs[i].picture}`);

        let price = document.createElement('p');
        price.className = 'price';
        price.append('Price: ' + BnF.bugs[i].price);

        let location = document.createElement('p');
        location.className = 'location';
        location.append('Location: ' + `${BnF.bugs[i].location}`);

        let time = document.createElement('p');
        time.className = 'time';
        time.append('Times: ' + `${BnF.bugs[i].time}`);

        let months = document.createElement('p');
        months.className = 'months';
        months.append('Months: ' + `${BnF.bugs[i].months}`);
            

        animalContainer.append(title, img, price, location, time, months);

        let animalElement = document.getElementById('not-available');
        animalElement.append(animalContainer);
    }

}





function returnTrueIfAnimalCanBeCaughtInCurrentMonth(animal) {
    const monthNamesArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var bugMonths = animal.months.split(' ');

    if (bugMonths.length == 1) {
        return checkCurrentMonthAgainstMonthRange(bugMonths);
    }
    else if (bugMonths.length == 2) {
        let test = bugMonths[0] + bugMonths[1];
        if (test == 'AllYear') {
            return true;
        }
    }
    else if (bugMonths.length == 3) {

        return checkIfAnimalAppearsInCurrentMonthInARange(monthNamesArr, bugMonths[0], bugMonths[2]);

    }
    else if (bugMonths.length == 7) {

        if (checkIfAnimalAppearsInCurrentMonthInARange(monthNamesArr, bugMonths[0], bugMonths[2])) {
            return true;
        } else {
            return checkIfAnimalAppearsInCurrentMonthInARange(monthNamesArr, bugMonths[4], bugMonths[6]);
        }

        

    }
}

function checkIfAnimalAppearsInCurrentMonthInARange(monthNamesArr, bugMonthOne, bugMonthTwo) {
    let firstBugMonth = bugMonthOne;
    let secondBugMonth = bugMonthTwo;

    let firstBugMonthIndex = monthNamesArr.indexOf(firstBugMonth);
    let secondBugMonthIndex = monthNamesArr.indexOf(secondBugMonth);

    if (firstBugMonthIndex < secondBugMonthIndex) {

        return checkIfAnimalAppearsInCurrentMonth(monthNamesArr, firstBugMonthIndex, secondBugMonthIndex);

    } else {

        return checkIfAnimalAppearsInCurrentMonthReversed(monthNamesArr, firstBugMonth, secondBugMonth);

    }
}

function checkIfAnimalAppearsInCurrentMonthReversed(monthNamesArr, firstBugMonth, secondBugMonth) {
    let months = reverseArray(monthNamesArr);

    let firstBugMonthIndex = months.indexOf(firstBugMonth);
    let secondBugMonthIndex = months.indexOf(secondBugMonth);

    let monthsToRmove = months.slice(firstBugMonthIndex, secondBugMonthIndex + 1);

    months.splice(firstBugMonthIndex, monthsToRmove.length);
    months.unshift(firstBugMonth);
    months.push(secondBugMonth);

    return checkCurrentMonthAgainstMonthRange(months);
}

function checkIfAnimalAppearsInCurrentMonth(monthNamesArr, firstBugMonthIndex, secondBugMonthIndex) {
    let months = monthNamesArr.slice(firstBugMonthIndex, secondBugMonthIndex + 1);

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
