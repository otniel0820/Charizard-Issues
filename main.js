const body = document.querySelector("body");
const divPpal = document.createElement("div");
body.appendChild(divPpal);
const divInput = document.createElement("div");
const labelInput = document.createElement("label");
const inputPoke = document.createElement("input");
const btnEnviar = document.createElement("button");
const imgPokemon = document.createElement("img");
const h1Name = document.createElement("h1");
const h3Id = document.createElement("h3");
const h3Experiencia = document.createElement("h3");
const h3Altura = document.createElement("h3");
const h3Peso = document.createElement("h3");
const h3NombreListJuegos = document.createElement("h3");
const listJuegos = document.createElement("h3");
const h3Tipo = document.createElement("h3");
const h3NombreListMov = document.createElement("h3");
const listMov = document.createElement("ul");
const h3Item = document.createElement("h3");
const h3NombreListLoc = document.createElement("h3");
const listLoc = document.createElement("ul");
const h3LocNoEncounter = document.createElement("h3");
const imagenesSprite = document.createElement("section");
const stats = document.createElement("article");
const h3Hp = document.createElement("h4");
const h3Ataque = document.createElement("h4");
const h3Defensa = document.createElement("h4");
const h3AtaqueEspecial = document.createElement("h4");
const h3DefensaEspecial = document.createElement("h4");
const h3Velocidad = document.createElement("h4");

divPpal.appendChild(divInput);
divInput.appendChild(labelInput);
labelInput.innerText = "Ingrese el nombre del Pokemon:";
divInput.appendChild(inputPoke);
divInput.appendChild(btnEnviar);
btnEnviar.innerText = "Consultar";
divPpal.appendChild(imgPokemon);
divPpal.appendChild(h1Name);
divPpal.appendChild(h3Id);
divPpal.appendChild(h3Experiencia);
divPpal.appendChild(h3Altura);
divPpal.appendChild(h3Peso);
divPpal.appendChild(h3NombreListJuegos);
divPpal.appendChild(listJuegos);
divPpal.appendChild(h3Tipo);
divPpal.appendChild(h3NombreListMov);
divPpal.appendChild(listMov);
divPpal.appendChild(h3Item);
divPpal.appendChild(h3NombreListLoc);
divPpal.appendChild(listLoc);
divPpal.appendChild(h3LocNoEncounter);
divPpal.appendChild(imagenesSprite);
divPpal.appendChild(stats);
stats.appendChild(h3Hp);
stats.appendChild(h3Ataque);
stats.appendChild(h3Defensa);
stats.appendChild(h3AtaqueEspecial);
stats.appendChild(h3DefensaEspecial);
stats.appendChild(h3Velocidad);

const poke = async (name) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await result.json();
  console.log(data);
  return data;
};

const pokeInfo = async (name) => {
  const pokemon = await poke(name);

  h1Name.innerText = `Nombre : ${pokemon.name}`;

  h3Id.innerText = `Id : ${pokemon.id}`;

  h3Experiencia.innerText = `Exp base: ${pokemon.base_experience}`;

  h3Altura.innerText = `Altura: ${pokemon.height}`;

  h3Peso.innerText = `Peso: ${pokemon.weight}`;

  h3NombreListJuegos.innerText = "Lista de juegos en los que aparece:";
  const locGame = pokemon.game_indices;
  const locGameData = locGame.map((games) => {
    const liGamens = document.createElement("li");
    liGamens.innerText = games.version.name;
    listJuegos.appendChild(liGamens);
  });

  const tipoPoke = pokemon.types[0].type.name;
  h3Tipo.innerText = `Tipo: ${tipoPoke}`;

  h3NombreListMov.innerText = "Lista de movimientos:";
  const moveData = pokemon.moves;
  moveData.map((moves) => {
    const liMove = document.createElement("li");
    liMove.innerText = moves.move.name;
    listMov.append(liMove);
  });

  if (pokemon.held_items.length !== 0) {
    const itemPoke = pokemon.held_items[0].item.name;
    h3Item.innerText = `Item que usa: ${itemPoke}`;
  } else {
    h3Item.innerText = "No usa ningún item";
  }

  h3NombreListLoc.innerText = "Lista de areas donde se puede encontrar:";

  const locPoke = pokemon.location_area_encounters;
  const locPokeData = await fetch(locPoke);
  const locPokeDataResult = await locPokeData.json();
  console.log(locPokeDataResult);

  if (locPokeDataResult.length !== 0) {
    locPokeDataResult.map((encounter) => {
      const liLoc = document.createElement("li");
      liLoc.innerText = encounter.location_area.name;
      listLoc.appendChild(liLoc);
    });
  } else {
    h3LocNoEncounter.innerText = `${pokemon.name} no se puede encontrar en ningun area`;
  }

  const imagenes = pokemon.sprites;
  const imagenesUrl = Object.values(imagenes).slice(0, 9);
  console.log(imagenesUrl);
};

pokeInfo("blastoise");
