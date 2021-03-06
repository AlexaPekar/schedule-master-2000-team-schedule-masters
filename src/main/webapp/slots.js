let selectedSlot;

function getColumnSlots(columnId){
    const link = "/schedule-masters/protected/slots/"+columnId;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSlotsReceived);
    xhr.open('GET',link);
    xhr.send();
}

function onSlotsReceived() {
    const text = this.responseText;
    const slotsDto = JSON.parse(text);

    const tableEl = document.createElement('table');
    tableEl.setAttribute('class', 'datatable');
    tableEl.setAttribute('id', 'slottable');


    tableEl.appendChild(createSlotsTableBody(slotsDto.slots));

    const slEl = document.getElementById('column' + slotsDto.index);
    slEl.appendChild(tableEl);
}

function createSlotsTableBody(slots) {
    const tbodyEl = document.createElement('tbody');

    for (let i=0;i < slots.length; i++) {
        const trEl = document.createElement('tr');
        const slot = slots[i];

        const slotTimeRangeTdEl = document.createElement('td');
        slotTimeRangeTdEl.textContent = slot.timeRange;

        trEl.appendChild(slotTimeRangeTdEl);

        const slotContentTdEl = document.createElement('td');
        const divEl = document.createElement('div');
        divEl.id = 'slot'+slot.id;
        slotContentTdEl.addEventListener('click',onSlotClicked);
        slotContentTdEl.id = "slotcontent";

        getSlotsTask(slot.id);

        slotContentTdEl.appendChild(divEl);

        trEl.appendChild(slotContentTdEl);
        trEl.setAttribute('id', 'trslotelement');

        tbodyEl.appendChild(trEl);
    }
    return tbodyEl;
}
function onSlotClicked(){
    if(this.textContent === "" || this.textContent === null){
        const slotText = this.children[0].id;
        selectedSlot = slotText.substring(slotText.indexOf("t")+1);
        getTaskForUsers();
        const lightbox = document.getElementById("slot-lightbox");
        const slotForm = document.getElementById("slot-form");
        removeAllChildren(slotForm);
        const dimmer = document.createElement("div");

        dimmer.id = "dimmer";
        dimmer.style.width =  window.innerWidth + 'px';
        dimmer.style.height = window.innerHeight + 'px';
        dimmer.className = 'dimmer';

        dimmer.onclick = function(){
            document.body.removeChild(this);
            lightbox.style.visibility = 'hidden';
        }


        document.body.appendChild(dimmer);

        lightbox.style.visibility = 'visible';
        lightbox.style.top = window.innerHeight/2 - 50 + 'px';
        lightbox.style.left = window.innerWidth/2 - 100 + 'px';
    }
}
function getTaskForUsers(){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onTasksLoaded);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', '/schedule-masters/protected/tasks');
    xhr.send();
}

function onTasksLoaded(){
    const text = this.responseText;
    const tasks = JSON.parse(text);
    createTaskSelectionForElement(tasks);
}

function createTaskSelectionForElement(tasks){
    const el = document.getElementById('slot-form');
    const selectDivEl = document.createElement('div');
    const selectEl = document.createElement('select');
    selectEl.id = "task-selection";
    for (let i=0;i < tasks.length; i++) {
        const task = tasks[i];
        const optionEl = document.createElement('option');
        optionEl.label = task.name;
        optionEl.value = task.id;
        selectEl.appendChild(optionEl);
    }
    selectDivEl.appendChild(selectEl);
    el.appendChild(selectDivEl);

}
function onSlotSaveClicked(){
    const taskSelectEl = document.getElementById("task-selection");
    const task = taskSelectEl.options[taskSelectEl.selectedIndex].value;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('error', onNetworkError);
    xhr.addEventListener('load', onScheduleRefresh);
    xhr.open('POST', 'protected/addtasktoslot?scheduleId='+currentSchedule+"&slotId="+selectedSlot+"&taskId="+task);
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState === 4 ){
            if (this.status === INTERNAL_SERVER_ERROR) {
                alert("You can't do that!");
            }
            else {
                alert("Task added to the slot!");
            }
        }
    };
    document.getElementById("dimmer").remove();
    document.getElementById("slot-lightbox").style.visibility = "hidden";

}