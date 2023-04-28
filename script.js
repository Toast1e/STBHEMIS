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
    let totalPassValues = [0, 0, 0, 0];
    let totalTakingValues = [0, 0, 0, 0];

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
        updateHemis();
      });
      takingCell.appendChild(takingCheckbox);
      row.appendChild(takingCell);

      const passCell = document.createElement('td');
      const passCheckbox = document.createElement('input');
      passCheckbox.type = 'checkbox';
      passCheckbox.disabled = true;
      passCheckbox.addEventListener('click', () => {
        if (passCheckbox.checked) {
          totalPassValues[subject.label - 1] += parseInt(subject.value);
        } else {
          totalPassValues[subject.label - 1] -= parseInt(subject.value);
        }
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
  });

          // Get the button
              let mybutton = document.getElementById("myBtn");
  
          // When the user scrolls down 20px from the top of the document, show the button
              window.onscroll = function() {scrollFunction()};
  
              function scrollFunction() {
                    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                          mybutton.style.display = "block";
                    } else {
                      mybutton.style.display = "none";
                    }
              }
  
          // When the user clicks on the button, scroll to the top of the document
          function topFunction() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
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

// ----------------------collapseBtn-----------------------
          
//           const collapseBtn = document.getElementById('collapse-btn');
//           const hiddenBtns = document.querySelector('.hidden-btns');
          
//           collapseBtn.addEventListener('click', () => {
//             hiddenBtns.classList.toggle('show-btns');
//           });
              

// // Load the checkbox data from a JSON file
// function loadCheckboxData() {
//   return fetch('endData.json')
//     .then(response => response.json())
//     .catch(error => {
//       console.error('Failed to load checkbox data:', error);
//       return {};
//     });
// }

// // Function to save the state of all checkboxes
// function saveCheckboxesState(checkboxData) {
//   const checkboxStates = {};
//   for (const id in checkboxData) {
//     const checkbox = document.getElementById(id);
//     if (checkbox) {
//       checkboxStates[id] = checkbox.checked;
//     }
//   }
//   localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
// }

// // Function to load the state of all checkboxes
// function loadCheckboxesState(checkboxData) {
//   const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates'));
//   if (!checkboxStates) {
//     return;
//   }
//   for (const id in checkboxData) {
//     const checkbox = document.getElementById(id);
//     if (checkbox) {
//       checkbox.checked = checkboxStates[id];
//     }
//   }
// }

// // Function to clear all checkboxes and the saved state
// function clearCheckboxesState(checkboxData) {
//   for (const id in checkboxData) {
//     const checkbox = document.getElementById(id);
//     if (checkbox) {
//       checkbox.checked = false;
//     }
//   }
//   localStorage.removeItem('checkboxStates');
// }

// // Load the checkbox data and add event listeners to the buttons
// loadCheckboxData().then(checkboxData => {
//   document.getElementById('save-button').addEventListener('click', () => saveCheckboxesState(checkboxData));
//   document.getElementById('load-button').addEventListener('click', () => loadCheckboxesState(checkboxData));
//   document.getElementById('clear-button').addEventListener('click', () => clearCheckboxesState(checkboxData));
// });
