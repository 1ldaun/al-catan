import {HexInterface} from "../interfaces/hex.interface";

function shuffle(array: Array<HexInterface>): Array<HexInterface> {
    let currentIndex = array.length, temporaryValue, randomIndex ;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex].id;
        array[currentIndex].id = array[randomIndex].id;
        array[randomIndex].id = temporaryValue;
    }

    return array;
}

export default shuffle;
