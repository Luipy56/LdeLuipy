const description = document.querySelector(".description");
const title = document.querySelector(".title");
const background = document.querySelector(".top");

const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");
const textOption = document.querySelector(".textOption");

const leftStats = document.querySelector(".leftStats");
const rightStats = document.querySelector(".rightStats");

const metrics = {
  polution: { value: 5, HTML: document.querySelector(".polucion") },
  reciclaje: { value: 5, HTML: document.querySelector(".reciclaje") },
  EE: { value: 5, HTML: document.querySelector(".EE") },
  SS: { value: 5, HTML: document.querySelector(".SS") },
  capital: { value: 5, HTML: document.querySelector(".capital") },
};

let cards = [];
let index = 0;

const mezclarCards = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const ponerElSimboloMasOEnSuDefectoElSimboloMenosOSinoSeDesaparese = (
  items = []
) => {
  items.map((x, i) => {
    x.style.opacity = "1";
    const moreorless = x.querySelector(".moreorless");
    const impactNumber = cards[index].stats[1].impacts[i].impact;

    if (impactNumber === 0) x.style.opacity = "0";

    moreorless.textContent = impactNumber > 0 ? "+" : "-";
  });
};

const pintarCard = () => {
  description.textContent = cards[index].description;
  title.textContent = cards[index].title;

  const rightItems = [...rightStats.querySelectorAll(".item")];
  const leftItems = [...leftStats.querySelectorAll(".item")];

  background.style.backgroundImage = `url(${cards[index].img})`;

  ponerElSimboloMasOEnSuDefectoElSimboloMenosOSinoSeDesaparese(rightItems);
  ponerElSimboloMasOEnSuDefectoElSimboloMenosOSinoSeDesaparese(leftItems);

  index++;
};

const actualizarStatsHTML = () => {
  Object.keys(metrics).map((key) => {
    metrics[key].HTML.style.height = `${(metrics[key].value * 100) / 15}%`;

    //menu start & menu end
    //en cuyo caso de que se acabe el array, te pasaste el juego crack

    /*
    si la polucion llega al 100% = "you're a monster who destroyed the earth, Att Godzilla";
    si el reciclaje llega a 0 = "You're surrounded by trash (like you)";
    si la EE llega a 0 = "";
    si la SS llega a 0 = "People throw stones at you (people brought back the Guillotine (frenchs are horny))"
    si la capita llega a 0 = "you're broke as shit";
    */
  });
};

const sumarStats = (statsIndex) => {
  const impacts = cards[index].stats[statsIndex].impacts;

  impacts.map((impact) => {
    metrics[impact.key].value += impact.impact;
  });

  actualizarStatsHTML();
};

btnRight.addEventListener("click", () => {
  console.log("CLICK");
  sumarStats(1);
  pintarCard();
});

btnLeft.addEventListener("click", () => {
  sumarStats(0);
  pintarCard();
});

fetch("cards.json")
  .then((response) => response.json())
  .then((data) => {
    cards = mezclarCards(data.cards);
    pintarCard();
  })
  .catch(console.error);

// Al principio de cada partida, o de la primera vez que se entra a la Web, o incluso al perder, estaría bien que apareciera la frase:
//La tecnología nos brinda un nivel de comodidad y abundancia sin precedentes, aunque todavía no hemos aprendido a alcanzarlos sin destruir nuestra ecosfera.