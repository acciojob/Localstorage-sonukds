const addItemForm = document.getElementById('addItemForm');
const itemText = document.getElementById('itemText');
const platesList = document.getElementById('plates');

let items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = itemText.value.trim();
    if (text === '') return;
    const item = {
        text: text,
        done: false
    };
    items.push(item);
    populateList(items, platesList);
    localStorage.setItem('items', JSON.stringify(items));
    itemText.value = '';
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input[type="checkbox"]')) return;
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, platesList);
}

addItemForm.addEventListener('submit', addItem);
platesList.addEventListener('click', toggleDone);

populateList(items, platesList);
