const description = document.querySelector(".description");
const cardTitle = document.querySelector(".cardTitle");
const background = document.querySelector(".top");

const textBox = document.querySelector(".text-box");
const extra = document.querySelector(".extra");

const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");
const textOption = document.querySelector(".textOption");

const leftStats = document.querySelector(".leftStats");
const rightStats = document.querySelector(".rightStats");

const pause = document.querySelector(".pause");
const loadTitle = document.querySelector(".loadTitle");
const start = document.querySelector(".start");

const metrics = {
  polution: {
    value: 15,
    HTML: document.querySelector(".polucion"),
    endText: "You're a monster who destroyed the earth",
  },
  reciclaje: {
    value: 15,
    HTML: document.querySelector(".reciclaje"),
    endText: "You're surrounded by trash",
  },
  EE: {
    value: 15,
    HTML: document.querySelector(".EE"),
    endText: "You consumed all the sources and the planet is gonna implode",
  },
  SS: {
    value: 15,
    HTML: document.querySelector(".SS"),
    endText: "People throw stones at you (they brought back the guillotine)",
  },
  capital: {
    value: 15,
    HTML: document.querySelector(".capital"),
    endText: "You're broke.",
  },
};

let cards = [];
let index = 0;
let fin = true;

const gameOver = () => {
  Object.entries(metrics).forEach(([key, metric]) => {
    if (fin) {
      pause.style.display = "flex";
      return;
    }

    if (
      (key === "polution" && (metric.value * 100) / 30 >= 100) ||
      metric.value <= 0
    ) {
      pause.textContent = metric.endText;
      fin = true;
    }
  });
};

const mezclarCards = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const moreOrLess = (items = [], statIndex = 0) => {
  items.map((x, i) => {
    x.style.opacity = "1";
    const moreorless = x.querySelector(".moreorless");
    const impactNumber = cards[index].stats[statIndex].impacts[i].impact;

    if (impactNumber === 0) x.style.opacity = "0";

    moreorless.textContent = impactNumber > 0 ? "+" : "-";
  });
};

const actualizarStatsHTML = () => {
  Object.keys(metrics).map((key) => {
    metrics[key].HTML.style.height = `${(metrics[key].value * 100) / 30}%`;
  });
};

const sumarStats = (statsIndex) => {
  const impacts = cards[index].stats[statsIndex].impacts;

  impacts.map((impact) => {
    metrics[impact.key].value += impact.impact;
  });

  actualizarStatsHTML();

  index++;
};

const pintarCard = () => {
  description.textContent = cards[index].description;
  cardTitle.textContent = cards[index].title;

  if (cards[index].extra) {
    extra.style.display = "flex";
    textBox.textContent = cards[index].extra;
  } else {
    extra.style.display = "none";
  }

  background.style.backgroundImage = `url(${cards[index].img})`;

  const rightItems = [...rightStats.querySelectorAll(".item")];
  const leftItems = [...leftStats.querySelectorAll(".item")];

  moreOrLess(rightItems, 1);
  moreOrLess(leftItems, 0);
  gameOver();
};

btnLeft.addEventListener("mouseenter", () => {
  textOption.textContent = cards[index].stats[0].statText;
});

btnLeft.addEventListener("mouseleave", () => {
  textOption.textContent = "";
});

btnRight.addEventListener("mouseenter", () => {
  textOption.textContent = cards[index].stats[1].statText;
});

btnRight.addEventListener("mouseleave", () => {
  textOption.textContent = "";
});

btnRight.addEventListener("click", () => {
  sumarStats(1);
  pintarCard();
});

btnLeft.addEventListener("click", () => {
  sumarStats(0);
  pintarCard();
});

start.addEventListener("click", () => {
  fin = false;
  pause.style.display = "none";
});

fetch("cards.json")
  .then((response) => response.json())
  .then((data) => {
    cards = mezclarCards(data.cards);
    pintarCard();
  })
  .catch(console.error);
