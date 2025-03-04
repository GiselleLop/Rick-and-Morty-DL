import './Card.css'
import { Character } from "../../../../types/rick_and_morty_types";
import { detailPage } from '../../../Detail';

export const Card = (navigateTo: any, character: Character ) => {
  const card =  document.createElement('article');
  card.classList.add('card');
 
  card.innerHTML = `
      <div class="data-card">
        <img src="${character.image}" alt="Character Image">
        <p class="idCharacter">${character.id}</p>
      </div>
      <div class="infoContainer">
        <h1 class="nameCharacter">${character.name}</h1>
         <h1 class="specieCharacter">${character.species}</h1>
      </div>
  `;

    card.addEventListener("click", (event) => {
      event.stopPropagation(); 
       detailPage(navigateTo, character); 
    });
    

  return card; 
};

