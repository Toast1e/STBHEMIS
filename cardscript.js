// get all the card containers on the page
const cardContainers = document.querySelectorAll('.container .card');

// loop through each card container
cardContainers.forEach(cardContainer => {
  // get the title and description elements for both states
  const title1 = cardContainer.querySelector('.title1');
  const description1 = cardContainer.querySelector('.discription1');
  const title2 = cardContainer.querySelector('.title2');
  const description2 = cardContainer.querySelector('.description2');

  // create a new card element with the normal state content
  const card = document.createElement('div');
  card.classList.add('card');

  const normalState = document.createElement('div');
  normalState.classList.add('card-normal');
  
  const normalTitle = document.createElement('h2');
  normalTitle.textContent = title1.textContent;
  normalState.appendChild(normalTitle);
  
  const normalDescription = description1.cloneNode(true);
  normalDescription.classList.add('description');
  normalState.appendChild(normalDescription);

  const fullscreenState = document.createElement('div');
  fullscreenState.classList.add('card-fullscreen');
  fullscreenState.style.display = 'none'; // hide fullscreen state by default
  
  const fullscreenTitle = document.createElement('h2');
  fullscreenTitle.textContent = title2.textContent;
  fullscreenState.appendChild(fullscreenTitle);
  
  const fullscreenDescription = description2.cloneNode(true);
  fullscreenDescription.classList.add('description');
  fullscreenState.appendChild(fullscreenDescription);

  card.appendChild(normalState);
  card.appendChild(fullscreenState);

  // add a click event listener to the card
  card.addEventListener('click', () => {
    // toggle the fullscreen class on the card
    card.classList.toggle('fullscreen');

    // toggle the display of the normal and fullscreen states
    normalState.style.display = card.classList.contains('fullscreen') ? 'none' : 'block';
    fullscreenState.style.display = card.classList.contains('fullscreen') ? 'block' : 'none';
  });

  // add the new card element to the page
  cardContainer.parentNode.insertBefore(card, cardContainer.nextSibling);

  // hide the original card container
  cardContainer.style.display = 'none';
});
