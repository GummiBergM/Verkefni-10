// Get references
const searchBox = document.getElementById("pokemon-search");
const searchButton = document.getElementById("search-button");
const displayDiv = document.getElementById("pokemon-display");
const searchContainer = document.querySelector(".search-container");
const pokemonDisplay = document.querySelector(".pokemon-display");

// Main search function triggered on button click
searchButton.addEventListener("click", () => {
  const pokemonName = searchBox.value.trim().toLowerCase();
  if (pokemonName) {
    // Trigger fade-out effect
    pokemonDisplay.classList.remove("show", "shadowbox");

    // Delay fetching to allow fade-out to complete
    setTimeout(() => {
      fetchPokemonData(pokemonName);
      searchContainer.classList.add("clicked");
      searchBox.value = "";
    }, 500); // Wait for the fade-out to finish
  } else {
    console.log("Please enter a Pokémon name.");
  }
});

// Function to fetch basic Pokémon data
function fetchPokemonData(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found!");
      }
      return response.json();
    })
    .then((data) => {
      displayPokemonStats(data);
      fetchEvolutionChain(data.species.url);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      displayDiv.innerHTML = "<p>Pokémon not found! Try a different name.</p>";
    });
}

// Function to display Pokémon's image and basic stats
function displayPokemonStats(data) {
  displayDiv.innerHTML = ""; // Clear previous content

  const pokemonDiv = document.createElement("div");
  pokemonDiv.className = "pokemon-container";

  const pokemonImage = document.createElement("img");
  pokemonImage.src = data.sprites.front_default;
  pokemonImage.alt = `${data.name} image`;
  pokemonImage.style.width = "150px";

  pokemonDiv.innerHTML = `<h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>`;
  pokemonDiv.appendChild(pokemonImage);

  // Create table for type, height, and weight
  const table = document.createElement("table");

  // Create table headers
  const headerRow = document.createElement("tr");
  ["Type", "Height", "Weight"].forEach(headerText => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Get values for the table row
  const type = data.types.map(t => t.type.name).join(", ");
  const height = `${data.height * 10} cm`; // Convert to cm
  const weight = `${data.weight / 10} kg`; // Convert to kg

  // Create table row for Pokémon's stats
  const dataRow = document.createElement("tr");
  [type, height, weight].forEach(value => {
    const td = document.createElement("td");
    td.textContent = value;
    dataRow.appendChild(td);
  });
  table.appendChild(dataRow);

  // Append all elements to displayDiv
  displayDiv.appendChild(pokemonDiv);
  displayDiv.appendChild(table);

  // Trigger fade-in effect after setting new data
  setTimeout(() => {
    pokemonDisplay.classList.add("show", "shadowbox");
  }, 10); // Small delay to ensure opacity transition
}

// Function to fetch the evolution chain data from the species endpoint
function fetchEvolutionChain(speciesUrl) {
  fetch(speciesUrl)
    .then((speciesResponse) => {
      if (!speciesResponse.ok) {
        throw new Error("Species data not found!");
      }
      return speciesResponse.json();
    })
    .then((speciesData) => {
      return fetch(speciesData.evolution_chain.url);
    })
    .then((evolutionResponse) => {
      if (!evolutionResponse.ok) {
        throw new Error("Evolution chain data not found!");
      }
      return evolutionResponse.json();
    })
    .then((evolutionData) => {
      displayEvolutionChain(evolutionData.chain);
    })
    .catch((error) => console.error("Error fetching evolution chain:", error));
}

// Function to recursively display each Pokémon in the evolution chain
function displayEvolutionChain(evolution) {
  // Clear previous evolution content if any
  const existingEvolutionContainer = document.querySelector(".evolution-container");
  if (existingEvolutionContainer) {
    existingEvolutionContainer.remove();
  }

  const evolutionDiv = document.createElement("div");
  evolutionDiv.className = "evolution-container";
  evolutionDiv.innerHTML = "<h3>Related Pokémon:</h3>";

  // Function to fetch and display each evolution stage
  const fetchEvolutionImages = (evoStage) => {
    if (!evoStage) return;

    // Fetch data for the current evolution stage Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${evoStage.species.name}`)
      .then((response) => response.json())
      .then((pokemonData) => {
        const evoElement = document.createElement("div");

        const evoImage = document.createElement("img");
        evoImage.src = pokemonData.sprites.front_default;
        evoImage.alt = `${evoStage.species.name} image`;

        const evoName = document.createElement("p");
        evoName.textContent = evoStage.species.name;

        evoElement.appendChild(evoImage);
        evoElement.appendChild(evoName);
        evolutionDiv.appendChild(evoElement);

        // Continue fetching for next evolutions if available
        evoStage.evolves_to.forEach((nextEvo) => fetchEvolutionImages(nextEvo));
      })
      .catch((error) => console.error("Error fetching evolution data:", error));
  };

  // Start by displaying the first Pokémon in the chain
  fetchEvolutionImages(evolution);

  // Append the evolution container to the displayDiv
  displayDiv.appendChild(evolutionDiv);

  // Add shadow effect to the newly created evolution container after a delay
  setTimeout(() => {
    evolutionDiv.classList.add("shadowbox");
  }, 800);
}