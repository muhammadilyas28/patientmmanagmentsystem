// Function to create main heading
function createMainHeading() {
    const mainHeading = document.createElement('h1');
    mainHeading.classList.add('text-center');
    mainHeading.innerText = 'Patient Management System';
    return mainHeading;
}

// Function to create form group
function createFormGroup(labelText, inputType, inputId, inputClass, inputRequired = true, acceptType = '') {
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const label = document.createElement('label');
    label.htmlFor = inputId;
    label.innerText = labelText;
    formGroup.appendChild(label);

    const input = document.createElement('input');
    input.type = inputType;
    input.id = inputId;
    input.classList.add(inputClass);
    input.required = inputRequired;
    if (acceptType) {
        input.accept = acceptType;
    }
    formGroup.appendChild(input);

    return formGroup;
}

// Function to create form
function createForm() {
    const form = document.createElement('form');
    form.id = 'patientForm';
    form.classList.add('mb-4');

    const patientIdInput = document.createElement('input');
    patientIdInput.type = 'hidden';
    patientIdInput.id = 'patientId';
    form.appendChild(patientIdInput);

    form.appendChild(createFormGroup('Name:', 'text', 'name', 'form-control'));
    form.appendChild(createFormGroup('Age:', 'number', 'age', 'form-control'));
    form.appendChild(createFormGroup('Condition:', 'text', 'condition', 'form-control'));
    form.appendChild(createFormGroup('Picture:', 'file', 'picture', 'form-control-file', true, 'image/*'));

    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.classList.add('btn', 'btn-primary');
    saveButton.innerText = 'Save';
    form.appendChild(saveButton);

    return form;
}

// Function to create patient list heading
function createSubHeading() {
    const subHeading = document.createElement('h2');
    subHeading.classList.add('text-center');
    subHeading.innerText = 'Patient List';
    return subHeading;
}

// Function to create main container
function createContainer() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container', 'mt-5');

    const patientCardsDiv = document.createElement('div');
    patientCardsDiv.id = 'patientCards';
    patientCardsDiv.classList.add('row');
    containerDiv.appendChild(patientCardsDiv);

    return containerDiv;
}

// Function to render patient cards
function renderCards(patients, patientCards) {
    patientCards.innerHTML = '';
    patients.forEach((patient, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.style.backgroundColor = '#f6f6f6';
        card.style.borderRadius = '3%';

        const cardInner = document.createElement('div');
        cardInner.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = `Appointment #${index + 1}`;
        cardBody.appendChild(title);

        const name = document.createElement('p');
        name.className = 'card-text';
        name.textContent = `Name: ${patient.name}`;
        cardBody.appendChild(name);

        const age = document.createElement('p');
        age.className = 'card-text';
        age.textContent = `Age: ${patient.age}`;
        cardBody.appendChild(age);

        const condition = document.createElement('p');
        condition.className = 'card-text';
        condition.textContent = `Condition: ${patient.condition}`;
        cardBody.appendChild(condition);

        const imgDiv = document.createElement('div');
        imgDiv.style.display = 'flex';
        imgDiv.style.flexDirection = 'row';
        imgDiv.style.alignItems = 'center';
        imgDiv.style.justifyContent = 'center';
        imgDiv.style.marginTop = '10px';

        const img = document.createElement('img');
        img.style.borderRadius = '100%';
        img.style.width = '100px';
        img.style.height = '100px';
        img.src = patient.picture;
        img.alt = 'Patient Picture';
        img.className = 'card-img-top';
        imgDiv.appendChild(img);
        cardInner.appendChild(imgDiv);

        const actions = document.createElement('div');
        actions.className = 'card-body';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-warning btn-sm mr-2';
        editButton.addEventListener('click', () => editPatient(index, patients, patientForm));
        actions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', () => deletePatient(index, patients, patientCards));
        actions.appendChild(deleteButton);

        cardInner.appendChild(cardBody);
        cardInner.appendChild(actions);
        card.appendChild(cardInner);

        patientCards.appendChild(card);
    });
}

// Function to edit patient
function editPatient(index, patients, patientForm) {
    const patient = patients[index];
    document.getElementById('patientId').value = index;
    document.getElementById('name').value = patient.name;
    document.getElementById('age').value = patient.age;
    document.getElementById('condition').value = patient.condition;
    document.getElementById('picture').value = '';
}

// Function to delete patient
function deletePatient(index, patients, patientCards) {
    patients.splice(index, 1);
    renderCards(patients, patientCards);
}

// Initialize app
function initializeApp() {
    const patients = [];

    const mainHeading = createMainHeading();
    const form = createForm();
    const subHeading = createSubHeading();
    const container = createContainer();
    const patientCards = container.querySelector('#patientCards');

    document.body.appendChild(mainHeading);
    document.body.appendChild(form);
    document.body.appendChild(subHeading);
    document.body.appendChild(container);

    document.getElementById('patientForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const patientId = document.getElementById('patientId').value;
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const condition = document.getElementById('condition').value;
        const pictureInput = document.getElementById('picture');
        let picture = '';

        if (pictureInput.files && pictureInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                picture = e.target.result;

                if (patientId) {
                    patients[patientId] = { name, age, condition, picture };
                } else {
                    patients.push({ name, age, condition, picture });
                }

                document.getElementById('patientId').value = '';
                form.reset();
                renderCards(patients, patientCards);
            };
            reader.readAsDataURL(pictureInput.files[0]);
        } else {
            if (patientId) {
                patients[patientId] = { name, age, condition, picture: patients[patientId].picture };
            } else {
                patients.push({ name, age, condition, picture: '' });
            }

            document.getElementById('patientId').value = '';
            form.reset();
            renderCards(patients, patientCards);
        }
    });

    renderCards(patients, patientCards);
}

document.addEventListener('DOMContentLoaded', initializeApp);
