import {createSlider, createSortedList, createTeam} from './teamGenerate.js';
import {snapShot, deleteData, deleteChild, createNewData, isName, isContinuous, renderData} from './dataRelatedFunction.js';

let fieldsize = 0;
let undoStack = [];
let redoStack = [];

export function submit() {
	const textArea = document.querySelector(".inputArea textarea");
	const data = textArea.value;
	textArea.value = "";
	if (data !== "") {
		updateStack();
		renderData(data);
	}
}

export function redo() {
	if (redoStack.length) {
		undoStack.push(snapShot());
		let newFrame = redoStack.pop();
		const parent = document.querySelector("#dummyParent");
		deleteData(document.querySelector("#sliderArea"));
        parent.appendChild(newFrame.inputShot);
        const parent2 = document.querySelector("#dummyParent2");
		deleteData(document.querySelector("#dataArea"));
		parent2.appendChild(newFrame.dataShot);
	}
}

export function clear() {
	updateStack();
	deleteChild(".rawData");
	deleteChild(".goodData");
	deleteChild(".group");
	deleteChild(".attSlider");
}

export function undo() {
	if (undoStack.length) {
		redoStack.push(snapShot());
		const newFrame = undoStack.pop();
		const parent = document.querySelector("#dummyParent");
		deleteData(document.querySelector("#sliderArea"));
        parent.appendChild(newFrame.inputShot);
        const parent2 = document.querySelector("#dummyParent2");
		deleteData(document.querySelector("#dataArea"));
		parent2.appendChild(newFrame.dataShot);
	}
}

export function collapse() {
	updateStack();
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
}

export function generate() {
	if (fieldsize > 0) {
		updateStack();
		executeGenerate(fieldsize - 1);
	}
}

function executeGenerate(attribute) {
	//clear previous list
	deleteChild(".group");

	createSlider(attribute);

	const outputList = createSortedList(attribute);

	//creates a team from a list of people
	//jsonobject: .name and .weight
	createTeam(outputList, []);
}

function updateStack() {
	undoStack.push(snapShot());
	redoStack = [];
}
//automatically collapse the data without the need of user to select the checkboxes
//incomplete currently
function smartCollapse() {
    const rawData = Array.from(document.querySelectorAll('.rawData'));
    let attributeList = [];
    rawData.forEach(ele => {
        const currType = getDataType(ele.firstElementChild.innerHTML);
        if (currType === 'name' && attributeList.length > 0 && attributeList[attributeList.length - 1] === 'name') {
        } else {
            attributeList.push(currType);
        }
    });
    const smallestDivisor = getSmallestPattern(attributeList);
    if (smallestDivisor > 1) {
        createNewData(smallestDivisor - 1, 1);
    } else {
        //no pattern detected, all data are the same type
    }
}

function getDataType(text) {
    //if int return something
    //if string return something else
    //etc
}

function getSmallestPattern(list) {
    const divisorArr = getDivisor(list.length);//from smallest to largest 1, ... , list.length
    divisorArr.forEach(ele => {
        const factor = list.length / ele;
        let newList = [];
        for (let i = 0; i < factor; ++i) {
            //splice and append
        }
        if (arrays_equal(newList, list)) {
            return ele;
        }
    });
}

function arrays_equal(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
}