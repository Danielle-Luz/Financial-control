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
            valueType.style = "background-color: var(--color-mode); color: var(--color-grey-2); border-color: var(--color-grey-5);";
        } else {
            valueType.setAttribute(valueTypesSelector, "on");
            valueType.style = "background-color: var(--color-brand-3); color: var(--color-brand-1); border-color: var(--color-brand-1);";
        }
    });
}

function getTypeId (filter) {
    return filter == "Entradas" || filter == "Entrada" ? 1 : filter == "Saídas" || filter == "Saída" ? 2 : filter == 1 ? "Entradas" : "Saídas";
}

export {getLocalStorageInstanceAsArray, setValueType, getTypeId};