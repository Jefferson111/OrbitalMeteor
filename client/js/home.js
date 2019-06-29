import { createTeam } from '../imports/algo/teamGenerate.js'

/**
 * To use createTeam, you must have a div with the id='grouping' for the results to be appended to
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
        const namesTextArea = document.querySelector("#names");
        const namesData = namesTextArea.value;
        const themesTextArea = document.querySelector("#themes");
        const themesData = themesTextArea.value;
        const actualGroupNamesTextArea = document.querySelector("#actualgroups");
        const actualGroupNamesData = actualGroupNamesTextArea.value;
        if (namesData !== "") {
            const node = document.querySelector("#output .desc #groupings");
            if (node.hasChildNodes()) {
                node.innerHTML = ""; // clears innerHTML before renderData
            }
            renderData(namesData, themesData, actualGroupNamesData);
        }
    }
});

function renderData(namesData, themesData, actualGroupNamesData) {
    const names = namesData.split(/[\s,]+/);
    const groups = actualGroupNamesData.split(/[\s,]+/);
    for (let i = 0; i < names.length; i++) {
        makeRawData("Group" + ((themesData === "default" || groups[i] === "" ||
            groups.length !== names.length) ? i + 1 : groups[i]) + ": " + names[i]);
    }
}

function makeRawData(ele) {
    const div = document.createElement("div");
    const content = document.createElement("div");
    content.innerHTML = ele;
    div.appendChild(content);
    document.querySelector("#output .desc #groupings").appendChild(div);
}
