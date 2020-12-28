
function printBugName() {
    for (const i in bugs) {
        console.log(bugs[i].name);
    }
}

printBugName();

// const commonButterfly = {
//     name:"Common Butterfly",
//     picture: true,
//     price:"160",
//     location:"Flying",
//     startTime:"4 am",
//     endTime:"7 pm",
//     jan: true,
//     feb: true,
//     mar: true,
//     apr: true,
//     may: true,
//     jun: true,
//     jul: false,
//     aug: false,
//     sep: true,
//     oct: true,
//     nov: true,
//     dev: true,
//     notes:""
// }

// const yellowButterfly = {
//     name:"Yellow Butterfly",
//     picture: true,
//     price:"160",
//     location:"Flying",
//     startTime:"4 am",
//     endTime:"7 pm",
//     jan: false,
//     feb: false,
//     mar: true,
//     apr: true,
//     may: true,
//     jun: true,
//     jul: false,
//     aug: false,
//     sep: true,
//     oct: true,
//     nov: false,
//     dev: false,
//     notes:""
// }

// const tigerButterfly = {
//     name:"Tiger Butterfly",
//     picture: true,
//     price:"240",
//     location:"Flying",
//     startTime:"4 am",
//     endTime:"7 pm",
//     jan: false,
//     feb: false,
//     mar: true,
//     apr: true,
//     may: true,
//     jun: true,
//     jul: true,
//     aug: true,
//     sep: true,
//     oct: false,
//     nov: false,
//     dev: false,
//     notes:""
// }

// var arr = ["commonButterfly", "yellowButterfly", "tigerButterfly"];

// var commonButterfly = [1];
// var yellowButterfly = [2];
// var tigerButterfly = [3];

// for (let index = 0; index < arr.length; index++) {
//     const element = arr[index];
//     console.log(`${element}`);
// }

// var findObjectByLabel = function(bugs, label) {
//     if(bugs.label === label) { return bugs; }
//     for(var i in bugs) {
//         if(bugs.hasOwnProperty(i)){
//             var foundLabel = findObjectByLabel(bugs[i], label);
//             if(foundLabel) { return foundLabel; }
//         }
//     }
//     return null;
// };