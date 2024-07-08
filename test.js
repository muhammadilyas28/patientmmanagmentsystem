
// Create and append h1 element
const mainHeading = document.createElement('h1');
mainHeading.classList.add('text-center');
mainHeading.innerText = 'Patient Management System';
document.body.appendChild(mainHeading);

// Create and append h2 element
// 


// Create form element
const form = document.createElement('form');
form.id = 'patientForm';
form.classList.add('mb-4');

// Create hidden input for patient ID
const patientIdInput = document.createElement('input');
patientIdInput.type = 'hidden';
patientIdInput.id = 'patientId';
form.appendChild(patientIdInput);


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

// Create and append name input
form.appendChild(createFormGroup('Name:', 'text', 'name', 'form-control'));

// Create and append age input
form.appendChild(createFormGroup('Age:', 'number', 'age', 'form-control'));

// Create and append condition input
form.appendChild(createFormGroup('Condition:', 'text', 'condition', 'form-control'));

// Create and append picture input
form.appendChild(createFormGroup('Picture:', 'file', 'picture', 'form-control-file', true, 'image/*'));

// Create and append save button
const saveButton = document.createElement('button');
saveButton.type = 'submit';
saveButton.classList.add('btn', 'btn-primary');
saveButton.innerText = 'Save';
form.appendChild(saveButton);

// Append the form to the body (or another container element)
document.body.appendChild(form);

// Create the main container div element
const containerDiv = document.createElement('div');
containerDiv.classList.add('container', 'mt-5');

// Create and append the div for patient cards
const patientCardsDiv = document.createElement('div');
patientCardsDiv.id = 'patientCards';
patientCardsDiv.classList.add('row');
containerDiv.appendChild(patientCardsDiv);

// Append the main container div to the body (or another container element)
document.body.appendChild(containerDiv);

const subHeading = document.createElement('h2');
subHeading.classList.add('text-center');
subHeading.innerText = 'Patient List';
document.body.appendChild(subHeading);

// -------------Container apped into Body--------



// -------------Form Data End-----------


document.addEventListener("DOMContentLoaded", function () {
    const patientForm = document.getElementById("patientForm");
    const patientCards = document.getElementById("patientCards");
    let patients = [];

    function renderCards() {
        patientCards.innerHTML = "";
        patients.forEach((patient, index) => {
            const card = document.createElement("div");
                card.className = "col-md-4";
                card.style.backgroundColor='#f6f6f6'
                card.style.borderRadius='3%'

            const cardInner = document.createElement("div");
            cardInner.className = "card";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h5");
            title.className = "card-title";
            title.textContent = `Appointment #${index + 1}`;
            cardBody.appendChild(title);

            const name = document.createElement("p");
            name.className = "card-text";
            name.textContent = `Name: ${patient.name}`;
            cardBody.appendChild(name);

            const age = document.createElement("p");
            age.className = "card-text";
            age.textContent = `Age: ${patient.age}`;
            cardBody.appendChild(age);

            const condition = document.createElement("p");
            condition.className = "card-text";
            condition.textContent = `Condition: ${patient.condition}`;
            cardBody.appendChild(condition);

            let img_div=document.createElement('img_parent')
            img_div.style.display='flex'
            img_div.style.flexDirection='row'
            img_div.style.alignItems='center'
            img_div.style.justifyContent='center'
            img_div.style.marginTop='10px'
            
            
            const img = document.createElement("img");
            img.style.borderRadius='100%'
            img.style.width='100px'
            img.style.height='100px'
            img.src = patient.picture;
            img.alt = "Patient Picture";
            img.className = "card-img-top";
            img_div.appendChild(img)
            cardInner.appendChild(img_div);

            const actions = document.createElement("div");
            actions.className = "card-body";

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "btn btn-warning btn-sm mr-2";
            editButton.addEventListener("click", () => editPatient(index));
            actions.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-danger btn-sm";
            deleteButton.addEventListener("click", () => deletePatient(index));
            actions.appendChild(deleteButton);

            cardInner.appendChild(cardBody);
            cardInner.appendChild(actions);
            card.appendChild(cardInner);

            patientCards.appendChild(card);
        });
    }

    function editPatient(index) {
        const patient = patients[index];
        document.getElementById("patientId").value = index;
        document.getElementById("name").value = patient.name;
        document.getElementById("age").value = patient.age;
        document.getElementById("condition").value = patient.condition;
        document.getElementById("picture").value = "";
    }

    function deletePatient(index) {
        patients.splice(index, 1);
        renderCards();
    }

    patientForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const patientId = document.getElementById("patientId").value;
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const condition = document.getElementById("condition").value;
        const pictureInput = document.getElementById("picture");
        let picture = "";

        if (pictureInput.files && pictureInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                picture = e.target.result;

                if (patientId) {
                    patients[patientId] = { name, age, condition, picture };
                } else {
                    patients.push({ name, age, condition, picture });
                }

                document.getElementById("patientId").value = "";
                patientForm.reset();
                renderCards();
            };
            reader.readAsDataURL(pictureInput.files[0]);
        } else {
            if (patientId) {
                patients[patientId] = { name, age, condition, picture: patients[patientId].picture };
            } else {
                patients.push({ name, age, condition, picture: "" });
            }

            document.getElementById("patientId").value = "";
            patientForm.reset();
            renderCards();
        }
    });

    renderCards();
});

