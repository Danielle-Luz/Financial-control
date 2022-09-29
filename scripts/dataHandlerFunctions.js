import { insertedValues } from "../pages/home/valuesData.js";

function getLocalStorageInstanceAsArray (instanceName) {
    return JSON.parse(localStorage.getItem(instanceName));
}

function setValueType (event, valueTypesSelector) {
    const valueTypes = [...document.querySelectorAll(`[${valueTypesSelector}]`)];
    const clickedButton = event.target;

    valueTypes.forEach( valueType => {
        if (valueType != clickedButton) {
            valueType.setAttribute(valueTypesSelector, "off");
            valueType.classList.remove("color-brand-1", "bg-brand-3", "border-brand-1");
            valueType.classList.add("bg-white", "border-grey-lighter", "color-grey-2");
        } else {
            valueType.setAttribute(valueTypesSelector, "on");
            valueType.classList.add("color-brand-1", "bg-brand-3", "border-brand-1");
            valueType.classList.remove("bg-white", "border-grey-lighter", "color-grey-2")
        }
    });
}

function getTypeId (filter) {
    return filter == "Entradas" || filter == "Entrada" ? 1 : filter == "Saídas" || filter == "Saída" ? 2 : filter == 1 ? "Entrada" : "Saída";
}

export { getLocalStorageInstanceAsArray, setValueType, getTypeId };