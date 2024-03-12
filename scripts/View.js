updateView()
function updateView() {
    let html = '';
    for(i = 0; i < tasks.length; i++){
        html += createHtmlRow(i);
    }
    app.innerHTML = /*HTML*/ `
        <table>
            <tr>
                <th>Oppgave</th>
                <th>Ansvarlig</th>
                <th>Frist</th>
                <th>Gjort</th>
                <th>Fullført</th>
                <th></th>
            </tr>
            ${html}
        </table>
        <p>
            Oppgave: <input id="taskDescription" type="text"/><br>
            Ansvarlig: <input id="taskResponsible" type="text"/><br>
            frist: <input id="taskDeadline" type="date"/>  
            <button onclick="addTask()">Legg til</button>
        </p>
    `;
}

function createHtmlRow(i) {
const task = tasks[i];
const checkedHtml = task.isDone ? 'checked="checked"' : '';


if (!task.editMode)
    return /*HTML*/`
        <tr>
            <td>${task.description}</td>
            <td>${task.responsible}</td>
            <td>${task.deadline}</td>
            <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml} /></td>
            <td>${task.completed}</td>
            <td>
                <button onclick="deleteTask(${i})">Slett</button>
                <button onclick="editTask(${i})">Rediger</button>
            </td>
        </tr>
        `;
    return /*HTML*/`
        <tr>
            <td><input id="editDescription${i}" type="text" value="${task.description}"/></td>
            <td><input id="editResponsible${i}" type="text" value="${task.responsible}"/></td>
            <td><input id="editDate${i}" type="date"/></td>
            <td><input onchange="changeIsDone(this, ${i})" type="checkbox"/></td>
            <td>
                <button onclick="updateTask(${i})">Lagre</button>
            </td>
        </tr>
    `;
}