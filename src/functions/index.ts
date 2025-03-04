import Chart from 'chart.js/auto';
import { Character, Filters } from "../types/rick_and_morty_types";
import data from "./../data/rickandmorty/rickandmorty"

export const populateSelect = (select: HTMLElement | null , options: string[]) => {
  if (!select) return;   
  options.forEach((option) => {
      const newOption = document.createElement("option");
      newOption.value = option;
      newOption.textContent = option;
      select.appendChild(newOption);
    });
  }

export const filterCharacters =(
    data: Character[],
    filters: { status?: string; species?: string; gender?: string; orderBy?: string; orderType?: string }
  ): Character[] => {
    let filteredData = [...data];
    if (filters.status && filters.status !== "All") {
      filteredData = filteredData.filter((char) => char.status === filters.status);
    }
    if (filters.species && filters.species !== "All") {
      filteredData = filteredData.filter((char) => char.species === filters.species);
    }
    if (filters.gender && filters.gender !== "All") {
      filteredData = filteredData.filter((char) => char.gender === filters.gender);
      
    }
    // Ordenamiento
    if (filters.orderBy) {
      filteredData.sort((a, b) => {
        let valueA = a[filters.orderBy as keyof Character];
        let valueB = b[filters.orderBy as keyof Character];
  
        if (typeof valueA === "string") {
          valueA = valueA.toLowerCase();
          valueB = (valueB as string).toLowerCase();
        }
  
        return filters.orderType === "DESC" ? (valueA < valueB ? 1 : -1) : (valueA > valueB ? 1 : -1);
      });
    }  
    return filteredData;
}

export const searchCharacter = (name: string) => {
  let filteredData: Character[] = [...data.results];
  if (name.trim() !== "") {
    filteredData = filteredData.filter(character => 
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  return filteredData;
}
  

export const sortData = (data: Character[], orderTypeValue: string, ordenbyValue: string) => {
  
  if (ordenbyValue === "Id") {
    data.sort((a, b) => {
      if (orderTypeValue === "ASC") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  if (ordenbyValue === "Name") {
    data.sort((a, b) => {
      const valorA = a.name.toLowerCase();
      const valorB = b.name.toLowerCase();
      const compare = valorA.localeCompare(valorB);
      return orderTypeValue === "ASC" ? compare : -compare;
    });
  }
  if (ordenbyValue === "") {
    data.sort((a, b) => {
    return a.id - b.id;
  });
}
  return data;
};

export const filterData = (data:Character[], filterBy: keyof Character, value: string) => {
  if (value === "All") {
    return data;
  }
  const arrFiltered = data.filter((persona: Character) => persona[filterBy] === value);
  return arrFiltered;
};

export function filterAll(data: Character[], statusValue: string, speciesValue: string, genderValue: string, orderTypeValue: string, ordenbyValue: string): any[] {
  let arrFiltered = data;
  sortData(arrFiltered, orderTypeValue, ordenbyValue);

  if (speciesValue !== "All") {
    arrFiltered = filterData(arrFiltered, "species", speciesValue);
  }
  if (statusValue !== "All") {
    arrFiltered = filterData(arrFiltered, "status", statusValue);
  }
  if (genderValue !== "All") {
    arrFiltered = filterData(arrFiltered, "gender", genderValue);
  }
  return arrFiltered
}

export const renderFilters = (ArrayData: Character[]): Filters[] => {
  const listStatus = ArrayData.map((x) => x.status);
  const listStatusUniques =  listStatus.filter((valor, indice) => {
    return listStatus.indexOf(valor) === indice;
  });
  const listSpecies = ArrayData.map((x) => x.species);
  const listSpeciesUniques = listSpecies.filter((valor, indice) => {
    return listSpecies.indexOf(valor) === indice;
  });
  const listGenders = ArrayData.map((x) => x.gender);
  const listGendersUniques = listGenders.filter((valor, indice) => {
    return listGenders.indexOf(valor) === indice;
  });

  const AllFilters: Filters[] = [
    { "Status": listStatusUniques ,
    "Species": listSpeciesUniques , "Gender": listGendersUniques }
  ];
  return AllFilters
}

export const computeStats = (
  graficGender:HTMLCanvasElement | null, 
  graficStatus: HTMLCanvasElement | null,
  graficSpecies:HTMLCanvasElement | null,
  arrayData: Character[]
)=>{
  const arrayFemale = filterData(arrayData,"gender","Female").length
  const arrayMale = filterData(arrayData,"gender","Male").length
  const arrayUnknown = filterData(arrayData,"gender","unknown").length
  // eslint-disable-next-line no-undef
  if (graficGender) {
    new Chart(graficGender,{
      type: 'doughnut',
      data: {
        labels:["Female","Male","Unknown"], 
        datasets: [{
          data:[arrayFemale,arrayMale,arrayUnknown],
          backgroundColor:[
            'rgb(251, 36, 232)',
            'rgb(69,25,255)',
            'rgb(255, 169, 59)',
          ],
          borderColor:'transparent',
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    })
  
  }
  const alive = filterData(arrayData,"status","Alive").length
  const dead = filterData(arrayData,"status","Dead").length
  const knowliv = filterData(arrayData,"status","unknown").length
  // eslint-disable-next-line no-undef
  if(graficStatus) {
    new Chart(graficStatus,{
      type: 'doughnut',
      data: {
        labels:["Alive","Dead","Unknown"], 
        datasets: [{
          data:[alive,dead,knowliv],
          backgroundColor:[
            'rgb(252, 252, 0)',
            'rgb(158,82,233)',
            'rgb(0, 180, 203)',
          ],
          borderColor:'transparent',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, 
          }
        }
      }
    })
  }


  const human = filterData(arrayData,"species","Human").length;
  const alien = filterData(arrayData,"species","Alien").length;
  const humanoid = filterData(arrayData,"species","Humanoid").length;
  const knownspecie = filterData(arrayData,"species","unknown").length;
  const poopybutthole = filterData(arrayData,"species","Poopybutthole").length;
  const mytholog = filterData(arrayData,"species","Mytholog").length;
  const Animal = filterData(arrayData,"species","Animal").length;
  const vampire = filterData(arrayData,"species","Vampire").length;
  const robot = filterData(arrayData,"species","Robot").length;
  const cronenberg = filterData(arrayData,"species","Cronenberg").length;
  const disease = filterData(arrayData,"species","Disease").length;
  const parasite = filterData(arrayData,"species","Parasite").length;

  // eslint-disable-next-line no-undef
  if (graficSpecies) {
    new Chart(graficSpecies,{
      type: 'doughnut',
      data: {
        labels:["Human","Alien","Humanoid","Unknown","Poopybutthole","Mytholog","Animal","Vampire","Robot","cronenberg","Disease","parasite"], 
        datasets: [{
          data:[human,alien,humanoid,knownspecie,poopybutthole,mytholog,Animal,vampire,robot,cronenberg,disease,parasite],
          backgroundColor:[
            'rgb(245, 0, 163)',
            'rgb(69,25,255)',
            'rgb(255,119,5)',
            'rgb(2,20, 100)',
            'rgb(244, 90, 115)',
            'rgb(245,163,1)',
            'rgb(1, 221, 134)',
            'rgb(153, 245, 1)',
            'rgb(163, 0, 245)',
            'rgb(235, 243, 9)',
            'rgb(243, 1, 0)',
            'rgb(60,14,210)',
          ],
          borderColor:'transparent',
        }],
     
      },   
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    })

  }
 
}
