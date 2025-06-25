let hunger = sessionStorage.getItem('userHunger');
let saturation = false;
if (hunger === null) {
  hunger = 0;
} else {
  hunger = parseInt(hunger, 10);
}

function updateHungerBar(hungerValue) {
    const bar = document.getElementById('hungerBar');
    if (!bar) return;
  
    bar.innerHTML = '';
  
    // Mostramos de izquierda a derecha: de 0 a 9
    for (let i = 0; i < 10; i++) {
      const sprite = document.createElement('img');
  
      // Cada sprite representa 2 puntos
      const spriteValue = i * 2;
  
      if (hungerValue >= spriteValue + 2) {
        sprite.src = './sprites/fullHunger.png';
      } else if (hungerValue === spriteValue + 1) {
        sprite.src = './sprites/halfHunger.png';
      } else {
        sprite.src = './sprites/noHunger.png';
      }
  
      sprite.alt = 'hunger';
      bar.appendChild(sprite);
    }
}
  
function activeSaturation(){
    if (!saturation) {
        saturation = true;
        setTimeout(() => {
            saturation = false;
        }, 10000);
    }
}

setInterval(() => {
    if (!saturation) {
        hunger = Math.min(hunger + 1, 20)
        if (hunger === 0) {
            console.log("Starving");
        }
            updateHungerBar(hunger);
        }
    sessionStorage.setItem('userHunger', hunger);
}, 5000);

updateHungerBar(hunger);

function clickedNotch(){
    hunger = Math.max(hunger - 4, 0);
    updateHungerBar(hunger);
    activeSaturation();
}