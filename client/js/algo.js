let fieldsize = 0;

Template.algo.rendered = function () {
}

Template.algo.events({
    "click #generate": () => {
        console.log("generate clicked");
        if (fieldsize > 1) {
            generate(fieldsize - 1);
        }
    },

    "click #submit": () => {
        console.log("submit clicked");
        const textArea = document.querySelector("#inputArea textarea");
        const data = textArea.value;
        textArea.value = "";
        if (data !== "") {
            renderData(data);
        }
    },

    "click #collapse": () => {
        console.log("collapse clicked");
        const checkboxes = document.querySelectorAll(".sel");
        fieldsize = 0;
        let nameChunk = 0;
        if (isContinuous(checkboxes)) {
            const validboxes = Array.from(checkboxes).filter(ele => (ele.checked === true));
            fieldsize = 1;
            validboxes.forEach((ele) => {
                if (isName(ele.parentNode.firstChild.innerHTML)) { //should write own function for this
                    nameChunk++;
                } else {
                    fieldsize++;
                }
            });
        }
        createNewData(fieldsize, nameChunk);
    },

    "click #undo": () => {
        console.log("undo clicked");
    },

    "click #clear": () => {
        console.log("clear clicked");
    }
});

function generate(attribute) {
    //create object here

    let totalWeight = 0;
    for (let i = 0; i < attribute; ++i) {
        const div = document.createElement("div");
        const input = document.createElement("input");
        input.type = "range";
        input.id = "slider" + i;
        input.min = 0;
        input.max = 100;
        input.step = 1;
        div.appendChild(input);
        document.querySelector("#inputArea").appendChild(div);
    }
    const goodData = document.querySelectorAll(".goodData");
    goodData.forEach(ele => {
        const arr = ele.firstElementChild.innerHTML.split('\n');
        console.log(arr[0]);
        let weight = 0;
        for (let i = 0; i < attribute; ++i) {
            const slider = "#slider" + i;
            weight += document.querySelector(slider).value * arr[i + 1];
        }
        console.log(weight);
    });

    //when want to sort add up the weights and put inside a set
    //than compute number of teams = x, total ppl/team size
    //split the set into x buckets, and randomly take 1 person from each bucket to create the team

}

function errorNoFieldSize(fieldsize) {
    if (fieldsize === 0) {
        throw "error, data size is 0";
    }
}

function errorNull(node) {
    if (node === null) {
        throw "error, null encountered";
    }
}

function errorIncomplete(i, fieldsize, node) {
    if (node === null && i + 1 < fieldsize) {
        throw "error, data is not complete";
    }
}

function errorIdentity(name) {
    if (name === "") {
        throw "Data contains multiple/no names";
    }
}

function createNewData(fieldsize, nameChunk) { //error handling needed here instead of if everywhere
    try {
        errorNoFieldSize(fieldsize);
        let child = document.querySelector("#raw").firstElementChild;
        while (child !== null) {
            let name = "";
            const div = document.createElement("div");
            div.classList.add("goodData");

            if (fieldsize === 1) {
                for (let i = 0; i < nameChunk; i++) {
                    errorNull(child);
                    name += child.firstChild.innerHTML + ' ';
                    child = child.nextSibling;
                }
            } else {
                while (isName(child.firstChild.innerHTML)) {
                    errorNull(child);
                    name += child.firstChild.innerHTML + ' ';
                    child = child.nextSibling;
                }
            }
            errorIdentity(name);
            name += '\n';

            for (let i = 1; i < fieldsize; ++i) {
                name += child.firstChild.innerHTML + '\n';
                child = child.nextSibling;
                errorIncomplete(i, fieldsize, child);
            }

            const content = document.createElement("div");
            content.innerHTML = name;
            div.appendChild(content);

            createDel(div);

            createEdit(div);

            document.querySelector("#process").appendChild(div);
        }
    } catch (err) {
        console.log(err);
    }
}

function isName(text) {
    let c = text;
    if (!isNaN(parseInt(c, 10))) {
        return false;
    }
    return true;
}

function isContinuous(checkboxes) {
    return true;
}


function renderData(data) {
    let res = data.split(/[\s,]+/);

    res.forEach((ele) => {
        if (ele !== "") {
            makeRawData(ele);
        }
    });
}

function makeRawData(ele) {
    const div = document.createElement("div");
    div.classList.add("rawData");

    const content = document.createElement("div");
    content.innerHTML = ele;
    div.appendChild(content);

    createDel(div);

    createSel(div);

    createEdit(div);

    document.querySelector("#raw").appendChild(div);
}

function createDel(div) {
    const del = document.createElement("button");
    del.innerText = "Delete";
    del.addEventListener("click", () => deleteData(div));
    div.appendChild(del);
}

function createSel(div) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("sel");
    div.appendChild(checkbox);
}

function createEdit(div) {
    const edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.addEventListener("click", () => editData(div, edit));
    div.appendChild(edit);
}

function editData(node, edit) {
    edit.parentNode.removeChild(edit);
    const ok = document.createElement("button");
    ok.innerText = "Ok";
    const textarea = document.createElement("textarea");
    textarea.value = node.firstElementChild.innerHTML;
    ok.addEventListener("click", () => {
        node.firstChild.innerHTML = ok.nextElementSibling.value;
        if (ok.nextElementSibling.value === "") {
            deleteData(node);
        } else {
            deleteData(ok);
            deleteData(textarea);
            createEdit(node);
        }
    });
    node.appendChild(ok);
    node.appendChild(textarea);
}

function deleteData(your_params_here) {
    your_params_here.parentNode.removeChild(your_params_here);
}