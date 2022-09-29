import { insertedValues } from "../pages/home/valuesData.js";
import { getLocalStorageInstanceAsArray, setValueType, getTypeId } from "./dataHandlerFunctions.js";
import { appendValueCards, filterArrayByValueType, showValuesSum, deleteValue, toggleEmptyMensage } from "../pages/home/index.js";

(() => {
    const submitButton = document.getElementById("b-submit");
    const valueTypesButtons = [...document.querySelectorAll("[data-type-selected]")];
    const toggleModalButtons = document.querySelectorAll("[data-modal-id]");
    const valueInput = document.getElementById("input-value");

    toggleModalButtons.forEach( button => {
        button.addEventListener("click", () => {
            toggleModal();
        });
    });

    valueTypesButtons.forEach( button => {
        button.addEventListener( "click", event => {
            setValueType(event, "data-type-selected");
        });
    });
    
    submitButton.addEventListener( "click", () => {
        const valuesArray = setNewValue();
        if (valuesArray) {
            appendValueCards(valuesArray);
            const filteredArray = filterArrayByValueType();
            showValuesSum(filteredArray);
            deleteValue();
            toggleEmptyMensage();
        } 
    });

    valueInput.addEventListener("input", verifyInputValue);
})();

function toggleModal () {
    const modal = document.getElementById("modal-wrapper");
    modal.classList.toggle("d-none");
    
    cleanInputs();
}

function setNewValue () {
    let valuesArray = getLocalStorageInstanceAsArray("valuesArray");
    valuesArray = !valuesArray ? insertedValues : valuesArray;
    const valueObject = getInputData(valuesArray);

    if (valueObject) {
        localStorage.setItem("valuesArray", JSON.stringify([...valuesArray, valueObject]));
        return getLocalStorageInstanceAsArray("valuesArray");
    }
}

function getInputData (valuesArray) {
    const value = parseFloat(document.getElementById("input-value").value);
    let valueType = document.querySelector("[data-type-selected='on']");

    if (value && valueType) {
        valueType = getTypeId(valueType.innerText);
        const lastValue = valuesArray[valuesArray.length - 1] || 1;
        const valueObject = {
            id: lastValue != 1 ? lastValue.id + 1 : lastValue + 1,
            value,
            categoryID: valueType,
        };
        return valueObject;
    }
}

function cleanInputs () {
    const valueInput = document.getElementById("input-value");
    const valueType = document.querySelector("[data-type-selected='on']");

    if (valueType) {
        valueType.setAttribute("data-type-selected", "off");
        valueType.classList.remove("color-brand-1", "bg-brand-3", "border-brand-1");
        valueType.classList.add("bg-white", "border-grey-lighter", "color-grey-2");
    }
    valueInput.value = "";
}

function verifyInputValue (event) {
    const inputValue = event.target;
    const typedCharacter = event.data;

    if (typedCharacter && !typedCharacter.match(/[0-9]/)) {
        const inputCharactersList = inputValue.value.split("");
        const typedCharacterIndex = inputCharactersList.findIndex( character => {
            return character == typedCharacter;
        });
        inputCharactersList.splice(typedCharacterIndex, 1);
        inputValue.value = inputCharactersList.join("");
    }
}