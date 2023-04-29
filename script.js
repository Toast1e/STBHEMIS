function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("subjects-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

fetch('engData.json')
.then(response => response.json())
.then(data => {
  const tableBody = document.querySelector('#subjects-table tbody');
  let totalPassValues = JSON.parse(localStorage.getItem('totalPassValues')) || [0, 0, 0, 0];
  let totalTakingValues = JSON.parse(localStorage.getItem('totalTakingValues')) || [0, 0, 0, 0];

  data.forEach((subject, index) => {
    const row = document.createElement('tr');
    const moduleCell = document.createElement('td');
    moduleCell.innerText = subject.id;
    row.appendChild(moduleCell);

    const kreditsCell = document.createElement('td');
    kreditsCell.innerText = subject.value;
    row.appendChild(kreditsCell);

    const takingCell = document.createElement('td');
    const takingCheckbox = document.createElement('input');
    takingCheckbox.type = 'checkbox';
    takingCheckbox.checked = JSON.parse(localStorage.getItem(`taking${subject.id}`)) || false;
    takingCheckbox.addEventListener('click', () => {
      if (takingCheckbox.checked) {
        passCheckbox.disabled = false;
        totalTakingValues[subject.label - 1] += parseInt(subject.value);
      } else {
        passCheckbox.disabled = true;
        if (passCheckbox.checked) {
          passCheckbox.checked = false;
          totalPassValues[subject.label - 1] -= parseInt(subject.value);
        }
        totalTakingValues[subject.label - 1] -= parseInt(subject.value);
      }
      localStorage.setItem('totalTakingValues', JSON.stringify(totalTakingValues));
      localStorage.setItem(`taking${subject.id}`, takingCheckbox.checked);
      updateHemis();
    });
    takingCell.appendChild(takingCheckbox);
    row.appendChild(takingCell);

    const passCell = document.createElement('td');
    const passCheckbox = document.createElement('input');
    passCheckbox.type = 'checkbox';
    passCheckbox.disabled = true;
    passCheckbox.checked = JSON.parse(localStorage.getItem(`pass${subject.id}`)) || false;
    passCheckbox.addEventListener('click', () => {
      if (passCheckbox.checked) {
        totalPassValues[subject.label - 1] += parseInt(subject.value);
      } else {
        totalPassValues[subject.label - 1] -= parseInt(subject.value);
      }
      localStorage.setItem('totalPassValues', JSON.stringify(totalPassValues));
      localStorage.setItem(`pass${subject.id}`, passCheckbox.checked);
      updateHemis();
    });
    passCell.appendChild(passCheckbox);
    row.appendChild(passCell);

    if (index > 10) {
      tableBody.appendChild(row);
  } else {
    tableBody.appendChild(row).style.display = 'none';
  }
});

      // Load from local storage if available
    if (localStorage.getItem('subjects')) {
      const storedSubjects = JSON.parse(localStorage.getItem('subjects'));
      storedSubjects.forEach((storedSubject) => {
        const subject = data.find((s) => s.id === storedSubject.id);
        if (subject) {
          const row = document.createElement('tr');

          const moduleCell = document.createElement('td');
          moduleCell.innerText = subject.id;
          row.appendChild(moduleCell);

          const kreditsCell = document.createElement('td');
          kreditsCell.innerText = subject.value;
          row.appendChild(kreditsCell);

          const takingCell = document.createElement('td');
          const takingCheckbox = document.createElement('input');
          takingCheckbox.type = 'checkbox';
          takingCheckbox.addEventListener('click', () => {
            if (takingCheckbox.checked) {
              passCheckbox.disabled = false;
              totalTakingValues[subject.label - 1] += parseInt(subject.value);
              localStorage.setItem('subjects', JSON.stringify(getSubjects()));
            } else {
              passCheckbox.disabled = true;
              if (passCheckbox.checked) {
                passCheckbox.checked = false;
                totalPassValues[subject.label - 1] -= parseInt(subject.value);
                localStorage.setItem('subjects', JSON.stringify(getSubjects()));
              }
              totalTakingValues[subject.label - 1] -= parseInt(subject.value);
              localStorage.setItem('subjects', JSON.stringify(getSubjects()));
            }
            updateHemis();
          });
          takingCheckbox.checked = storedSubject.taking;
          takingCell.appendChild(takingCheckbox);
          row.appendChild(takingCell);

          const passCell = document.createElement('td');
          const passCheckbox = document.createElement('input');
          passCheckbox.type = 'checkbox';
          passCheckbox.disabled = !storedSubject.taking;
          passCheckbox.checked = storedSubject.passed;
          passCheckbox.addEventListener('click', () => {
            if (passCheckbox.checked) {
              totalPassValues[subject.label - 1] += parseInt(subject.value);
              localStorage.setItem('subjects', JSON.stringify(getSubjects()));
            } else {
              totalPassValues[subject.label - 1] -= parseInt(subject.value);
              localStorage.setItem('subjects', JSON.stringify(getSubjects()));
            }
            updateHemis();
          });
          passCell.appendChild(passCheckbox);
          row.appendChild(passCell);

          tableBody.appendChild(row);
        }
      });
    }

    updateHemis();

    function getSubjects() {
      const subjects = [];
      data.forEach((subject) => {
        const row = tableBody.querySelector(`tr td:first-child:contains(${subject.id})`).parentNode;
        if (row) {
          const takingCheckbox = row.querySelector('input[type="checkbox"]:first-child');
          const passCheckbox = row.querySelector('input[type="checkbox"]:last-child');
          const subjectData = {
            id: subject.id,
            taking: takingCheckbox.checked,
            passed: passCheckbox.checked,
          };
          subjects.push(subjectData);
        }
      });
      return subjects;
    }

    function updateHemis() {
      const hemis = document.querySelector('#hemis');
      let totalHemisValue = 0;
      for (let i = 0; i < 4; i++) {
        if (totalTakingValues[i] > 0) {
          const hemisValue = (totalPassValues[i] / totalTakingValues[i]).toFixed(2);
          totalHemisValue += parseFloat(hemisValue);
        }
      }
      hemis.innerText = `HEMIS: ${(totalHemisValue).toFixed(2)}`;
    }







  

          const popupContainer = document.querySelector(".popup-container");
          const popupCloseBtn = document.querySelector("#popup-close-btn");
          const popupTab = document.querySelector("#popup-tab");
          
          // show popup when page loads
          window.onload = function() {
            popupContainer.classList.add("show");
          };
          
          // close popup when close button is clicked
          popupCloseBtn.addEventListener("click", function() {
            popupContainer.classList.remove("show");
            popupTab.classList.add("show");
          });
          
          // show popup again when tab is clicked
          popupTab.addEventListener("click", function() {
            popupContainer.classList.add("show");
            popupTab.classList.remove("show");
          });
        });
