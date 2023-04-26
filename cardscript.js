// get all the card containers on the page
const cardContainers = document.querySelectorAll('.container .card');

// loop through each card container
cardContainers.forEach(cardContainer => {
  // get the title and description elements for the first state
  const title1 = cardContainer.querySelector('.title1');
  const description1 = cardContainer.querySelector('.discription1');

  // get the title and description elements for the second state
  const title2 = cardContainer.querySelector('.title2');
  const description2 = cardContainer.querySelector('.description2');

  // create the card element with the first state content
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h2>${title1.textContent}</h2>
    <p>${description1.textContent}</p>
  `;

  // add a click event listener to the card
  card.addEventListener('click', () => {
    // toggle the fullscreen class on the card
    card.classList.toggle('fullscreen');

    // update the card content based on the current state
    if (card.classList.contains('fullscreen')) {
      card.innerHTML = `
        <h2>${title2.textContent}</h2>
        <p>${description2.textContent}</p>
      `;
    } else {
      card.innerHTML = `
        <h2>${title1.textContent}</h2>
        <p>${description1.textContent}</p>
      `;
    }
  });

  // replace the original card container with the new card element
  cardContainer.replaceWith(card);
});
