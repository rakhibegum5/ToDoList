const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("Write a task!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        const task = e.target;
        const isCompleted = task.classList.contains("checked");

        if (!isCompleted) {
            task.classList.add("checked");
            completeTask(task.querySelector("span"));
            saveData();
        } else {
            task.classList.remove("checked");
            saveData();
        }
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

inputBox.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        addTask();
    }
});

function completeTask(taskTextSpan) {
    taskTextSpan.style.textDecoration = 'line-through';
    taskTextSpan.style.color = '#999';
    showCelebrationMessage();
}

function showCelebrationMessage() {
    const celebrationMessage = document.getElementById('celebration');
    celebrationMessage.style.display = 'block';

    setTimeout(function () {
        celebrationMessage.style.display = 'none';
    }, 3000);
}