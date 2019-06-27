import {submit, generate, collapse, redo, undo, clear} from '../imports/algo/algoMain.js';

Template.algo.rendered = function () {
}

Template.algo.events({
    "click #generate": () => {
        console.log("generate clicked");
        generate();
    },

    "click #submit": () => {
        console.log("submit clicked");
        submit();
    },

    "click #collapse": () => {
        console.log("collapse clicked");
        collapse();
    },

    "click #redo": () => {
        console.log("redo clicked");
        redo();
    },

    "click #undo": () => {
        console.log("undo clicked");
        undo();
    },

    "click #clear": () => {
        console.log("clear clicked");
        clear();
    }
});