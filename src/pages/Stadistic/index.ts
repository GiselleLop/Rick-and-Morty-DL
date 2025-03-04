import { computeStats } from "../../functions";
import { Character } from "../../types/rick_and_morty_types";
import "./Stadistic.css"

export function stadisticPage(arrayData: Character[]): HTMLElement {
  const mainPageStadistic = document.createElement('div');
  mainPageStadistic.classList.add('main_stadistic_page');
  mainPageStadistic.innerHTML = `
  <div class="stadistic_page">
  
    <button class="modal_close">X</button>
       
    <div class="charts_container">
      <div class="charts">
        <p class="titleChar">In this graph we can see the number of characters divided by gender.</p>
        <canvas id="graficGender" style="display: flex"></canvas>
      </div>
      
      <div class="charts">
            <p class="titleChar">In this graph we can see the number of characters divided by life status.</p>
            <canvas id="graficStatus" style="display: flex"></canvas>
      </div>
          
      <div class="charts">
        <p class="titleChar">In this graph we can see the number of characters divided by species</p>
        <canvas id="graficSpecies" style="display: flex"></canvas>
      </div>
    </div>

  </div>
  `
  document.body.appendChild(mainPageStadistic);


  const graficGender = mainPageStadistic.querySelector("#graficGender") as HTMLCanvasElement | null;
  const graficStatus = mainPageStadistic.querySelector("#graficStatus") as HTMLCanvasElement | null;
  const graficSpecies = mainPageStadistic.querySelector("#graficSpecies") as HTMLCanvasElement | null;
  const buttonClose: HTMLElement | null = mainPageStadistic.querySelector(".modal_close");

  computeStats(graficGender, graficStatus, graficSpecies, arrayData )
  mainPageStadistic.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  if (target && !target.closest(".stadistic_page")) {
    mainPageStadistic.remove();
  }
  });
  buttonClose?.addEventListener("click", (event) => { 
    event.stopPropagation();  
    mainPageStadistic.remove();
  });
   
    return mainPageStadistic;
  }
  