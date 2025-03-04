import axios from 'axios';
import { Character, Episode } from '../../types/rick_and_morty_types';
import './Detail.css'

export function detailPage(navigateTo: (path: string) => void, character?: Character ): HTMLElement {
  const mainPageDetail = document.createElement('div');
  mainPageDetail.classList.add('main_detail_page');
  mainPageDetail.innerHTML = `
  <div class="detail_page">
    <button class='close_button'>X</button>
    
    <div class="container_detail_main"> 
      <div class="container_character_detail1">
        
        <div class="character_name_container">
          <h1 class='nameOfCharacter'> ${character?.name.toUpperCase()} </h1>
          <img class="imageOfDetail" width="100%" src='${character?.image}'>
        </div>
         
        <ul class="textDetail" style="list-style: none;">
          <li>Status: ${character?.status}</li>
          <li>Specie: ${character?.species}</li>
          <li> Gender: ${character?.gender}</li>
          <li>Origin: ${character?.origin.name}</li>
          <li>Location: ${character?.location.name}</li>
          <li>Episodes: ${character?.episode.length}</li> 
        </ul>
      </div>
      
      <div class="episodes_container">
        <h1 class="episodes_title">EPISODES</h1>    
        <ol class="episodes_text_1">
         
        </ol>
      </div>
    </div>
  </div>`

  document.body.appendChild(mainPageDetail);
  const episodeText = mainPageDetail.querySelector('.episodes_text_1')
  mainPageDetail.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest(".detail_page")) {
      mainPageDetail.remove();
    }
  });

  character?.episode.forEach(async (episode: string)=> {
    try {
      const { data: episodeData } = await axios.get<Episode>(episode);
      const ep = document.createElement('li');
      ep.classList.add('ep');
      ep.innerHTML = `${episodeData.name}`;
      episodeText?.appendChild(ep);
    } catch (error) {
      console.error(`Error al obtener el episodio: ${episode}`, error);
    }
  })
    
  const buttonClose: HTMLElement | null = mainPageDetail.querySelector(".close_button");
  buttonClose?.addEventListener("click", (event) => { 
    event.stopPropagation();  
    mainPageDetail.remove();
  });
  return mainPageDetail
}
