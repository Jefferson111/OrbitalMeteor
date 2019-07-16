window.addEventListener("load", onload);

function onload() {

    const entity = document.querySelector('#sphere');
    let counter = 0;
    document.addEventListener("click", function () {
        console.log("click   click");
        ++counter;
        counter = counter % 9;
        switch (counter) {
            case 1:
                entity.setAttribute('material', 'color', 'crimson');
                break;
            case 2:
                entity.setAttribute('material', 'color', 'orange');
                break;
            case 3:
                entity.setAttribute('material', 'color', 'yellow');
                break;
            case 4:
                entity.setAttribute('material', 'color', 'green');
                break;
            case 5:
                entity.setAttribute('material', 'color', 'blue');
                break;
            case 6:
                entity.setAttribute('material', 'color', 'indigo');
                break;
            case 7:
                entity.setAttribute('material', 'color', 'violet');
                break;
            case 8:
                entity.setAttribute('material', 'color', 'black');
                break;
            case 0:
                entity.setAttribute('material', 'color', 'white');
                break;
        }
    });
}