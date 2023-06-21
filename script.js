const addForm = document.querySelector('.add');
const tasks = document.querySelector('.tasks');
const clear = document.querySelector('.clear');
const messageSpan = document.querySelector('.message span')
const searchItem = document.querySelector('.search');

function updateMessage() {
    const textLength = tasks.children.length;
    messageSpan.textContent = `You Have ${textLength} Items In The Queue`;
}
updateMessage();
addForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const value = addForm.task.value.trim();
    if (value.length) {
        tasks.innerHTML += `<li>
        <span>${value}</span>
        <i class="bi bi-trash-fill delete"></i>
    </li>`
        addForm.reset();
        updateMessage();
    }
})

tasks.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
        updateMessage();
    }
})
clear.addEventListener('click', (event) => {
    const taskItem = tasks.querySelectorAll('li');
    taskItem.forEach((item) => {
        item.remove();
    })
    updateMessage();
})

function filterTask(term) {
    Array.from(tasks.children)
        .filter((item) => {
            return !item.textContent.toLowerCase().includes(term);
        })
        .forEach((item) => {
            item.classList.add('hide')
        })

    Array.from(tasks.children)
        .filter((item) => {
            return item.textContent.toLowerCase().includes(term);
        })
        .forEach((item) => {
            item.classList.remove('hide')
        })
}



searchItem.addEventListener('keyup', (event) => {
    const term = searchItem.task.value.trim().toLowerCase();
    filterTask(term);
})

searchItem.addEventListener('click', (event) => {
    if (event.target.classList.contains('reset')) {
        searchItem.reset();
        const term = searchItem.task.value.trim().toLowerCase();
        filterTask(term);
    }
})