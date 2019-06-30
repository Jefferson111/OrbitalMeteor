import {submit, generate, collapse, redo, undo, clear} from '../imports/algo/algoMain.js';

Template.algo.rendered = function () {
}

Template.algo.events({
    "click #generate": () => {
        console.log("generate clicked");
        generate();
        Bert.alert("Congratulations! You are done!", "success", "growl-top-right");
    },

    "click #submit": () => {
        console.log("submit clicked");
        submit();
        Bert.alert("Now select data to collapse", "success", "growl-top-right");
    },

    "click #collapse": () => {
        console.log("collapse clicked");
        collapse();
        Bert.alert("Now select teams size to generate", "success", "growl-top-right");
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