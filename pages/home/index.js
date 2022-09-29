import { getLocalStorageInstanceAsArray, setValueType, getTypeId } from "../../scripts/dataHandlerFunctions.js";
import { insertedValues } from "./valuesData.js";

(() => {
    const filterButtons = document.querySelectorAll("[data-is-filter-active]");
    const valuesArray = getLocalStorageInstanceAsArray("valuesArray") || insertedValues;
    let filteredArray;

    filterButtons.forEach( button => {
        button.addEventListener("click", event => {
            setValueType(event, "data-is-filter-active");
            filteredArray = filterArrayByValueType();
            appendValueCards(filteredArray);
            showValuesSum(filteredArray);
            deleteValue();
            toggleEmptyMensage();
        });
    });

    appendValueCards(valuesArray);
    showValuesSum(valuesArray);
    toggleEmptyMensage();
    deleteValue();
})();


function toggleEmptyMensage () {
    const cardValuesList = document.getElementById("value-list");
    const emptyMessage = document.getElementById("empty-message");
    const valuesCardAmount = cardValuesList.querySelectorAll("article").length;
    if (!valuesCardAmount) {
        emptyMessage.classList.remove("d-none");
        cardValuesList.classList.add("d-none");
    } else {
        emptyMessage.classList.add("d-none");
        cardValuesList.classList.remove("d-none");
    }
}

function showValuesSum (valuesArray) {
    const total = document.getElementById("total");
    const sum = valuesArray.reduce( (total, valueObject) => {
        return total + valueObject.value;
    }, 0);
    total.innerText = sum.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}

function filterArrayByValueType () {
    const activeFilterText = document.querySelector("[data-is-filter-active=on]").innerText;
    const activeFilter = getTypeId(activeFilterText);
    const valuesArray = getLocalStorageInstanceAsArray("valuesArray") || insertedValues;
    let filteredArray;
    if (activeFilterText != "Todos") {
        filteredArray = valuesArray.filter( value => {
            return value.categoryID == activeFilter;
        });
        appendValueCards(filteredArray);
    } else {
        appendValueCards(valuesArray);
        return valuesArray;
    }
    return filteredArray;
}

function appendValueCards (valuesArray) {
    const valuesContainer = document.getElementById("value-list");
    valuesContainer.innerHTML = "";
    valuesArray.forEach( valueData => {
        const cardHtml = createValueCard(valueData);
        valuesContainer.insertAdjacentHTML("beforeEnd", cardHtml);
    });
}

function createValueCard (valueData) {
    return `
    <article class="d-flex justify-between pd-2 align-center border-1 border-grey-lighter radius-1" data-value-id=${valueData.id}>
        <span class="price text-1">${valueData.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</span>
        <div class="d-flex gap-2">
            <span class="pd-2 bg-grey-4 border-grey-lighter radius-2 text-1 value-type">${getTypeId(valueData.categoryID)}</span>
            <button class="b-delete bg-white border-1 border-grey-lighter radius-2">
                <svg class="trash" width="13" height="14" viewBox="0 0 13 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5625 0.875H9.28125L9.00781 0.382812C8.89844 0.164062 8.67969 0 8.43359 0H5.28906C5.04297 0 4.82422 0.164062 4.71484 0.382812L4.46875 0.875H1.1875C0.941406 0.875 0.75 1.09375 0.75 1.3125V2.1875C0.75 2.43359 0.941406 2.625 1.1875 2.625H12.5625C12.7812 2.625 13 2.43359 13 2.1875V1.3125C13 1.09375 12.7812 0.875 12.5625 0.875ZM2.19922 12.7695C2.22656 13.4805 2.80078 14 3.51172 14H10.2109C10.9219 14 11.4961 13.4805 11.5234 12.7695L12.125 3.5H1.625L2.19922 12.7695Z"/>
                </svg>
            </button>
        </div>
    </article>
    `;
}

function deleteValue () {
    const deleteButtons = [...document.querySelectorAll(".b-delete")];
    deleteButtons.forEach( button => {
        console.log(button);
        button.addEventListener("click", event => {
            const valuesArray = getLocalStorageInstanceAsArray("valuesArray") || insertedValues;
            const buttonClicked = event.target;
            const cardValue = buttonClicked.closest("[data-value-id]");
            const deletedCardId = parseInt(cardValue.getAttribute("data-value-id"));
            const deletedCardIndex = valuesArray.findIndex( value => {
                return value.id == deletedCardId;
            });
            valuesArray.splice(deletedCardIndex, 1);
            localStorage.setItem("valuesArray", JSON.stringify(valuesArray));
            cardValue.remove();
            toggleEmptyMensage();
        });
    });
}

export { appendValueCards, filterArrayByValueType, showValuesSum, deleteValue, toggleEmptyMensage };