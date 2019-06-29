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

export function createTeam(outputList) {
    const teamSize = document.querySelector("input[name='teamSlider']").value;
    if (teamSize === "0") {
        return;
    }
    const numOfTeams = Math.ceil(outputList.length / teamSize);
    let teams = [numOfTeams];
    let buckets = [teamSize];
    for (let i = 0; i < numOfTeams; ++i) {
        teams[i] = [];
    }
    for (let i = 0; i < teamSize; ++i) {
        buckets[i] = [];
    }
    for (let i = 0; i < outputList.length; ++i) {
        buckets[~~(i / numOfTeams)].push(outputList[i]);
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
        div.innerHTML = "Group " + i;
        document.querySelector("#grouping").appendChild(div);

        const persons = document.createElement("ul");
        div.appendChild(persons);

        console.log(i);
        teams[i].forEach(person => {
            const content = document.createElement("li");
            content.innerHTML = person.name;
            content.classList.add("person");
            persons.appendChild(content);
            console.log(person.name + " " + person.weight);
        });
    }
}

export function createSortedList(attribute) {
    let outputList = populateList(attribute);
    outputList.sort((a, b) => {
        return a.weight - b.weight;
    });
    return outputList;
}

function populateList(attribute) {
    const goodData = document.querySelectorAll(".goodData");
    let outputList = [];
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