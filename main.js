const body = document.querySelector("body");
const divPpal = document.createElement("div");
body.appendChild(divPpal);
const imgLogo = document.createElement('img')
const form = document.createElement("form");
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
const h3NombreImagenesSprite = document.createElement("h3");
const imagenesSprite = document.createElement("section");
const h3NombreStats = document.createElement("h3");
const stats = document.createElement("article");
const h3Hp = document.createElement("h4");
const h3Ataque = document.createElement("h4");
const h3Defensa = document.createElement("h4");
const h3AtaqueEspecial = document.createElement("h4");
const h3DefensaEspecial = document.createElement("h4");
const h3Velocidad = document.createElement("h4");

body.style ='background-image:url(./img/charizard-with-legendary-pokemon-c4ks8chjijbepv61.jpg); background-repeat:no-repeat; background-size:cover; background-position:center'
divPpal.style= 'display:flex; flex-direction:column; justify-content:center; align-items:center;'
divPpal.appendChild(imgLogo)
imgLogo.src = './img/descarga.png'
divPpal.appendChild(form);
form.style= 'display:flex; flex-direction:column; gap:1em;padding-top:2em; justify-content:center; align-items:center'
form.appendChild(labelInput);
labelInput.innerText = "Ingrese el nombre del Pokemon:";
labelInput.style = 'font-size: 50px; color:#0000cd'
form.appendChild(inputPoke);
inputPoke.style= 'height:1.5em'
form.appendChild(btnEnviar);
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
divPpal.appendChild(h3NombreImagenesSprite);
divPpal.appendChild(imagenesSprite);
divPpal.appendChild(h3NombreStats);
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
  divPpal.style.backgroundColor ='#fff5ee'
  inputPoke.value = ''
  //Nombre Pokemon
  h1Name.innerText = `Nombre : ${pokemon.name}`;

  //Id Pokemon
  h3Id.innerText = `Id : ${pokemon.id}`;

  //Exp base Pokemon
  h3Experiencia.innerText = `Exp base: ${pokemon.base_experience}`;

  //Altura Pokemon
  h3Altura.innerText = `Altura: ${pokemon.height}`;

  //Peso Pokemon

  h3Peso.innerText = `Peso: ${pokemon.weight}`;

  //Lista de juegos

  h3NombreListJuegos.innerText = "Lista de juegos en los que aparece:";
  const locGame = pokemon.game_indices;
  const locGameData = locGame.map((games) => {
    const liGamens = document.createElement("li");
    liGamens.innerText = games.version.name;
    listJuegos.appendChild(liGamens);
  });

  //Tipo de pokemon

  const tipoPoke = pokemon.types[0].type.name;
  h3Tipo.innerText = `Tipo: ${tipoPoke}`;

  ///Lista de movimientos

  h3NombreListMov.innerText = "Lista de movimientos:";
  const moveData = pokemon.moves;
  moveData.map((moves) => {
    const liMove = document.createElement("li");
    liMove.innerText = moves.move.name;
    listMov.append(liMove);
  });

  //Item que usa, si usa

  if (pokemon.held_items.length !== 0) {
    const itemPoke = pokemon.held_items[0].item.name;
    h3Item.innerText = `Item que usa: ${itemPoke}`;
  } else {
    h3Item.innerText = "Este Pokemon no usa ningún item";
  }

  //Areas de localizacion

  h3NombreListLoc.innerText = "Lista de areas donde se puede encontrar:";

  const locPoke = pokemon.location_area_encounters;
  const locPokeData = await fetch(locPoke);
  const locPokeDataResult = await locPokeData.json();
  listLoc.innerText = ''
  h3LocNoEncounter.innerText= ''
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

  //Imagenes en distintas versiones

  h3NombreImagenesSprite.innerText =
    "Imagenes en distintas versionnes y juegos:";
  imagenesSprite.innerHTML = "";
  const imagenes = pokemon.sprites;
  const imagenesUrl = Object.values(imagenes).slice(0, 8);
  console.log(imagenesUrl);
  const imgData = await Promise.all(imagenesUrl.map((url) => fetch(url)));
  console.log(imgData);
  imgData.forEach((img, indice) => {
    if (indice % 2 === 0) {
      const resultImg = document.createElement("img");
      resultImg.src = img.url;
      resultImg.style.width = "25em";
      imagenesSprite.appendChild(resultImg);
    }
  });

  const imgOther = imagenes.other;
  console.log(imgOther);
  const otherObject = Object.values(imgOther);
  console.log(otherObject);

  const arrayUrls = otherObject.map((element) => {
    const ulrImg = Object.values(element);
    return ulrImg;
  }); // la imagen que quiero que se muestre al principio esta en other en el primer objeto
  console.log(arrayUrls);

  const ulrPos0 = await Promise.all(arrayUrls[0].map((url) => fetch(url)));
  console.log(ulrPos0);
  ulrPos0.forEach((img, indice) => {
    if (indice % 2 === 0) {
      const resultImg = document.createElement("img");
      resultImg.src = img.url;
      resultImg.style.width = "25em";
      imagenesSprite.appendChild(resultImg);
    }
  });

  const ulrPos1 = await Promise.all(arrayUrls[1].map((url) => fetch(url)));
  console.log(ulrPos1);
  ulrPos1.forEach((img, indice) => {
    if (indice % 2 === 0) {
      const resultImg = document.createElement("img");
      resultImg.src = img.url;
      resultImg.style.width = "25em";
      imagenesSprite.appendChild(resultImg);
    }
  });

  const urlPos2 = await Promise.all(arrayUrls[2].map((url) => fetch(url)));
  console.log(urlPos2);
  urlPos2.forEach((img) => {
    const resultImg = document.createElement("img");
    resultImg.src = img.url;
    resultImg.style.width = "25em";
    imagenesSprite.appendChild(resultImg);
  });

  //Imagen Principal
  const imgPrincipal = await Promise.all(arrayUrls[1].map((url) => fetch(url)));
  console.log(imgPrincipal);
  imgPokemon.src = imgPrincipal[0].url;

  //Card Pokemon
  h3NombreStats.innerText = "Stats base de este Pokemon:";
  const statsBase = pokemon.stats;
  console.table(statsBase);
  h3Hp.innerText = `HP: ${statsBase[0].base_stat}`;
  h3Ataque.innerText = `Ataque: ${statsBase[1].base_stat}`;
  h3Defensa.innerText = `Defensa: ${statsBase[2].base_stat}`;
  h3AtaqueEspecial.innerText = `Ataque especial: ${statsBase[3].base_stat}`;
  h3DefensaEspecial.innerText = `Defensa Especial: ${statsBase[4].base_stat}`;
  h3Velocidad.innerText = `Velocidad: ${statsBase[5].base_stat}`;
};

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  pokeInfo(inputPoke.value);
  
});
