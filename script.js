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
              let totalPassValue = 0;
              let totalTakingValue = 0;
  
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
                        totalTakingValue += parseInt(subject.value);
                    } else {
                        passCheckbox.disabled = true;
                        if (passCheckbox.checked) {
                            passCheckbox.checked = false;
                            totalPassValue -= parseInt(subject.value);
                        }
                        totalTakingValue -= parseInt(subject.value);
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
                        totalPassValue += parseInt(subject.value);
                    } else {
                        totalPassValue -= parseInt(subject.value);
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
              if (totalTakingValue > 0) {
                  const hemisValue = (totalPassValue / totalTakingValue).toFixed(2);
                      hemis.innerText = `HEMIS: ${hemisValue}`;
              } else {
                  hemis.innerText = 'HEMIS: N/A';
              }
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