function changeIsDone(checkbox, index) {
    tasks[index].isDone = checkbox.checked;
    if(checkbox.checked) {
        tasks[index].completed = formatDateDDMMYYYY(new Date());
    } else {
        tasks[index].completed = ''; 
    }
    updateView();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateView();
}

function editTask(index) {
    tasks[index].editMode = true;
    updateView();

    setTimeout(() => {
        const dateInput = document.getElementById(`editDate${index}`);
        if (dateInput) {
            const deadlineAsDateObject = convertToDateObject(tasks[index].deadline);
            dateInput.value = formatDateYYYYMMDD(deadlineAsDateObject.toISOString().split('T')[0]);
        } else {
            console.error('Dato-inputfeltet ble ikke funnet.');
        }
    }, 0);
}

function updateTask(index) {
    updateDescription(index);
    updateResponsible(index);
    updateDate(index);
    tasks[index].editMode = false;
    updateView();            
}

function updateDescription(index) {
    const descriptionID = `editDescription${index}`;
    const descriptionInput = document.getElementById(descriptionID);
    tasks[index].description = descriptionInput.value;
    return descriptionInput.value;
}

function updateResponsible(index) {
    const responsibleID = `editResponsible${index}`;
    const responsibleInput = document.getElementById(responsibleID);
    tasks[index].responsible = responsibleInput.value;
    return responsibleInput.value;
}

function updateDate(index) {
    
    const dateID = `editDate${index}`;
    const dateInput = document.getElementById(dateID);
    let formattedDeadline = formatDateDDMMYYYY(dateInput.value);
    tasks[index].deadline = formattedDeadline;
}

function addTask() {
    let taskDescriptionInput = document.getElementById('taskDescription');
    let taskResponsibleInput = document.getElementById('taskResponsible');
    let taskDeadlineInput = document.getElementById('taskDeadline');
    let formattedDeadline = formatDateDDMMYYYY(taskDeadlineInput.value);

    tasks.push({
        description: taskDescriptionInput.value,
        responsible: taskResponsibleInput.value,
        deadline: formattedDeadline,
        isDone: false,
        completed: '',
    }); 
    taskDescriptionInput.value = '';
    taskResponsibleInput.value = '';
    taskDeadlineInput.value = '';
    updateView();
}

function formatDateDDMMYYYY(dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return dateString;
    const formattedDate = date.toLocaleString('nb-NO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    return formattedDate;
}

function formatDateYYYYMMDD(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const formattedDate = date.toISOString().substr(0,10);
    return formattedDate;
}

function convertToDateObject(dateString) {
    const parts = dateString.split('.');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    } else {
        console.error('Feil datofomat:', dateString);
        return new Date();
    }
}
