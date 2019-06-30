import { createTeam } from '../imports/algo/teamGenerate.js'

/**
 * To use createTeam, you must have a div with the id='grouping' for the results to be appended to
 * and also an input element with the name='teamSlider' whose value represent the size of each team the user wants
 * 
 * Pass in an array of objects that has .name and .weight
 * 
 * e.g. let listOfPpl = [];
 * let person = new Object();
 * person.name = "john";
 * person.weight = 0;
 * listOfPpl.push(person);
 * createTeam(listOfPpl);
 * 
 */


Template.home.rendered = () => {
}

Template.home.events({
    "click #cmdgen": () => {
        console.log("cmdgen clicked");
        createTeam(populateList());
    }
});

function populateList() {
    const namesTextArea = document.querySelector("#names");
    const namesData = namesTextArea.value;
    // const themesTextArea = document.querySelector("#themes");
    // const themesData = themesTextArea.value;
    // const actualGroupNamesTextArea = document.querySelector("#actualgroups");
    // const actualGroupNamesData = actualGroupNamesTextArea.value;
    const names = namesData.split(/\r?\n/); // split according newline character
    if (namesData !== "") {
        const node = document.querySelector("#output .desc #grouping");
        if (node.hasChildNodes()) {
            node.innerHTML = "";
        }
        let outputList = [];
        for (let i = 0; i < names.length; i++) {
            let person = new Object();
            person.name = names[i];
            person.weight = 0;
            outputList.push(person);
        }
        return outputList;
    }
}