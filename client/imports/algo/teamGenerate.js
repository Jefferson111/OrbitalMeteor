export function createSlider(attribute) {
    for (let i = 0; i < attribute; ++i) {
        const key = "slider" + i
        if (document.querySelector("#" + key) === null) {
            const div = document.createElement("div");
            div.classList.add("attSlider");
            div.innerHTML = "Slider for attribute " + i;
            const input = document.createElement("input");
            input.type = "range";
            input.classList.add("slider");
            input.id = key;
            input.min = 0;
            input.max = 100;
            input.step = 1;
            div.appendChild(input);
            document.querySelector("#sliderArea").appendChild(div);
        }
    }
}

/**
 * Pre-Condition: Require a div with the id='grouping' for the results to be appended to
 * and also an input element with the name='teamSlider' whose value represent the size of each team the user wants.
 */

export function createTeam(namesList, groupNamesList) {
    const teamSize = document.querySelector("input[name='teamSlider']").value;
    if (teamSize === "0") {
        return;
    }
    const numOfTeams = Math.ceil(namesList.length / teamSize);
    const teams = [numOfTeams];
    const buckets = [teamSize];
    for (let i = 0; i < numOfTeams; ++i) {
        teams[i] = [];
    }
    for (let i = 0; i < teamSize; ++i) {
        buckets[i] = [];
    }
    for (let i = 0; i < namesList.length; ++i) {
        buckets[~~(i / numOfTeams)].push(namesList[i]);
    }
    for (let i = 0; i < numOfTeams; ++i) {
        for (let j = 0; j < teamSize; ++j) {
            if (buckets[j].length) {
                teams[i].push(buckets[j].splice(buckets[j].length * Math.random() | 0, 1)[0]);
            }
        }
    }
    for (let i = 0; i < numOfTeams; ++i) {
        const div = document.createElement("div");
        div.classList.add("group");
        div.innerHTML = "Group " + (groupNamesList.length >= numOfTeams ? groupNamesList[i] 
            : i + 1);
        document.querySelector("#grouping").appendChild(div);
        const persons = document.createElement("ul");
        div.appendChild(persons);
        // console.log(i);
        teams[i].forEach(person => {
            const content = document.createElement("li");
            content.innerHTML = person.name;
            content.classList.add("person");
            persons.appendChild(content);
            // console.log(person.name + " " + person.weight);
        });
    }
}

export function createSortedList(attribute) {
    const outputList = populateList(attribute);
    outputList.sort((a, b) => {
        return a.weight - b.weight;
    });
    return outputList;
}

function populateList(attribute) { // using the collapsed goodData 
    const goodData = document.querySelectorAll(".goodData");
    const outputList = [];
    goodData.forEach(ele => {
        const arr = ele.firstElementChild.innerHTML.split('\n');
        let weight = 0;
        for (let i = 0; i < attribute; ++i) {
            const slider = "#slider" + i;
            try {
                weight += document.querySelector(slider).value * arr[i + 1];
            } catch (err) {
                console.log("Data is bad, not formatted properly" + err);
                return [];
            }
        }
        let person = new Object();
        person.name = arr[0];
        person.weight = weight;
        outputList.push(person);
    });
    return outputList;
}

export function populateNamesList() {
    const namesTextArea = document.querySelector("#names");
    const namesData = namesTextArea.value;
    const namesList = [];
    if (namesData !== "") {
        const names = namesData.split(/\r?\n/); // split according newline character
        for (let i = 0; i < names.length; i++) {
            if (names[i].trim() === "") continue;
            let person = new Object();
            person.name = names[i];
            person.weight = 0;
            namesList.push(person);
        }
    }
    return namesList;
}

export function populateGroupNamesList() {
    const themesTextArea = document.querySelector("#themes");
    const themesData = themesTextArea.value;
    console.log(themesData);
    let groupNamesList = [];
    switch(themesData) {
        case "custom": 
            const actualGroupNamesTextArea = document.querySelector("#actualgroups");
            const actualGroupNamesData = actualGroupNamesTextArea.value;
            const groupNames = actualGroupNamesData.split(/\r?\n/); // split according newline character
            for (let i = 0; i < groupNames.length; i++) {
                if (groupNames[i].trim() === "") continue;
                groupNamesList.push(groupNames[i]);
            }    
            break;
        case "animals": // if more than numOfTeams > 10 , revert default which is 1, 2, 3, ...
            groupNamesList = ["Rat", "Ox", "Tiger", "Rabbit", "Snake", "Horse", "Sheep", "Monkey", "Dog", "Pig"];
            break;   
        case "colours": // if more than numOfTeams > 10 , revert default which is 1, 2, 3, ...
            groupNamesList = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet", "Cyan", "Magenta", "Black"];
            break;    
    }
    return groupNamesList;
}
