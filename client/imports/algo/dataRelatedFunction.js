export function deleteChild(tag) {
    const data = document.querySelectorAll(tag);
    data.forEach(child => deleteData(child));
}

export function snapShot() {
    let inputShot = document.querySelector("#inputArea").cloneNode(true);
    let dataShot = document.querySelector("#dataArea").cloneNode(true);
    let snapshot = new Object();
    snapshot.inputShot = inputShot;
    snapshot.dataShot = dataShot;
    return snapshot;
}

export function createNewData(fieldsize, nameChunk) { //error handling needed here instead of if everywhere
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
        deleteChild(".goodData");
    }
}

export function isName(text) {
    let c = text;
    if (!isNaN(parseInt(c, 10))) {
        return false;
    }
    return true;
}

export function isContinuous(checkboxes) {
    return true;
}


export function renderData(data) {
    let res = data.split(/[\s,]+/);

    res.forEach((ele) => {
        if (ele !== "") {
            makeRawData(ele);
        }
    });
}

export function deleteData(your_params_here) {
    your_params_here.parentNode.removeChild(your_params_here);
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
