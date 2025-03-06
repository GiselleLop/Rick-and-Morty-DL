import { Character, Filters, rickAndMortyResponse } from '../../types/rick_and_morty_types';
import './Home.css'
import data from "./../../data/rickandmorty/rickandmorty"
import { Card } from './components/Card';
import { filterCharacters, populateSelect, renderFilters, searchCharacter } from '../../functions';
import { stadisticPage } from '../Stadistic';
import logo from "../../assets/images/logo.png"
import analytic from "../../assets/images/analitica.png"
import search from "../../assets/images/search.png"

export function homePage(navigateTo: (path: string) => void): HTMLElement {
  let arrayData: rickAndMortyResponse = data;
  const mainPage: HTMLElement | null  = document.createElement('div');
  mainPage.className = 'main_home';
  mainPage.innerHTML = `
  <header>     
    <div class="header_logo">
      <img class="logo" src="${logo}">
    </div> 

    <button class="stadistics">
      <img href="#" src="${analytic}" alt="menu" width="100%"/>
    </button>  
  </header>
  
  <nav class="menuOfFilters">
    <div class="container_filter_1">

      <div class="filter">
        <label for="status"> Status </label>
        <select id="status">
          <option> All </option>
        </select>
      </div>
    
      <div class="filter">
        <label for="species"> Species </label>
        <select id="species">
          <option> All </option>
        </select>
      </div>
    
      <div class="filter">
        <label for="gender"> Gender </label>
        <select id="gender">
          <option> All </option>
        </select>
      </div>
    
      <div class="filter">
        <label class='orderByText'> Order by </label>

        <div class="filter_sort">
          <select id="FilterByOrder">
          <option> ASC </option>
          <option> DESC </option>
        </select>
  
        <select id="FilterByDetail">
          <option> Id </option>
          <option> Name </option>
        </select>
        </div>
      
      </div>
    </div>
  
    <div class="container_filter_2">
      <div class="search_input_cont">
        <img href="#" src="${search}" class="search_img"/>
        <input type="search" class="input_search" placeholder="Enter the character's name" />
      </div>
      <button class="button_search">Search</button>
      <button class="button-clear">Clear</button>
    </div>
  </nav>
    
  <div class="container_card">
  </div>
      
    
  <footer>
    <h1>Created by: Giselle Lopez</h1>
  </footer> 
  `;
  const container_card: HTMLElement | null = mainPage.querySelector(".container_card");
  const selectStatus: HTMLSelectElement | null = mainPage.querySelector("#status") as HTMLSelectElement | null;
  const selectSpecies: HTMLSelectElement | null = mainPage.querySelector("#species") as HTMLSelectElement | null;
  const selectGender: HTMLSelectElement | null = mainPage.querySelector("#gender") as HTMLSelectElement | null;
  const orderType: HTMLSelectElement | null = mainPage.querySelector("#FilterByOrder");
  const orderBy: HTMLSelectElement | null = mainPage.querySelector("#FilterByDetail");
  const clearButton: HTMLElement | null = mainPage.querySelector(".button-clear");
  const searchInput: HTMLInputElement  | null = mainPage.querySelector(".input_search");
  const searchButton: HTMLElement | null = mainPage.querySelector(".button_search");

  if (mainPage ) {
    

    function updateData() {
      const filters = {
        status: selectStatus?.value || "All",
        species: selectSpecies?.value || "All",
        gender: selectGender?.value || "All",
        orderBy: orderBy?.value.toLowerCase() || "id",
        orderType: orderType?.value.toUpperCase() || "asc",
      };
      const filteredCharacters = filterCharacters(arrayData.results, filters);
      if(container_card) {
        container_card.innerHTML = "";
        filteredCharacters.forEach((char) => {
          const characterCard = Card( navigateTo, char);
          container_card?.appendChild(characterCard);
        });
      }
     
    }
    function clearFilters() {
      if (selectStatus) {
        selectStatus.value = "All";
      }
      if (selectGender) {
        selectGender.value = "All";
      }
      if (selectSpecies) {
        selectSpecies.value = "All";
      }
      if (orderType) {
        orderType.value = "ASC";
      }
      if (orderBy) {
        orderBy.value = "Id";
      }
      if (searchInput) {
        searchInput.value = ""
      }
      updateData();
    }

    const handleSearch = () => {
      const filteredCharacters = searchCharacter(searchInput?.value || "");
      if (container_card) {
        container_card.innerHTML = "";
        filteredCharacters.forEach((char) => {
          const characterCard = Card(navigateTo, char);
          container_card?.appendChild(characterCard);
        });
      }
    };

    
    [selectStatus, selectSpecies, selectGender, orderType, orderBy].forEach((select) => {
      select?.addEventListener("change", updateData);
    });

    clearButton?.addEventListener("click", clearFilters);
    searchButton?.addEventListener("click", handleSearch);
    searchInput?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    });

    let listOfFilterStatus: Filters[] =  renderFilters(arrayData.results);
    populateSelect(selectStatus, listOfFilterStatus[0].Status)
    populateSelect(selectSpecies, listOfFilterStatus[0].Species);
    populateSelect(selectGender, listOfFilterStatus[0].Gender);


    arrayData.results.forEach((char: Character)=> {
      const characterCard = Card(navigateTo, char);
      container_card?.appendChild(characterCard);
    })
    
    const stadisticsButton = mainPage.querySelector('.stadistics');
    if (stadisticsButton) {
      stadisticsButton.addEventListener('click', (event) => {
        event.stopPropagation();          
        stadisticPage(arrayData.results)
      });
    } 
  }


  return mainPage
}
