import { createTeam, populateNamesList, populateGroupNamesList } from '../imports/algo/teamGenerate.js'
import { clearInnerHTML } from '../imports/algo/dataRelatedFunction.js'

Template.randomised.rendered = () => {
}

Template.randomised.events({
    "click #cmdgen": () => {
        console.log("cmdgen clicked");
        clearInnerHTML(document.querySelector("#output .desc #grouping"));
        createTeam(populateNamesList(), populateGroupNamesList());
    }
});
