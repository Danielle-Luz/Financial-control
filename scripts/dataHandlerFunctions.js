import { insertedValues } from "../pages/home/valuesData.js";

function getLocalStorageInstanceAsArray (instanceName) {
    let instance = localStorage.getItem(instanceName);
    return JSON.parse(instance);
}

function setValueType (event, valueTypesSelector) {
    const valueTypes = [...document.querySelectorAll(`[${valueTypesSelector}]`)];
    const clickedButton = event.target;
    valueTypes.forEach( valueType => {
        if (valueType != clickedButton) {
            valueType.setAttribute(valueTypesSelector, "off");
            valueType.classList.remove("color-brand-1", "bg-brand-3", "border-brand-1");
        } else {
            valueType.setAttribute(valueTypesSelector, "on");
            valueType.classList.add("color-brand-1", "bg-brand-3", "border-brand-1");
        }
    });
}

function getTypeId (filter) {
    return filter == "Entradas" || filter == "Entrada" ? 1 : filter == "Saídas" || filter == "Saída" ? 2 : filter == 1 ? "Entradas" : "Saídas";
}

export {getLocalStorageInstanceAsArray, setValueType, getTypeId};