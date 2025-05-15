const params = new URLSearchParams(window.location.search);
const typeLocal = params.get("type");
const type = params.get("type");
const p1 = params.get("p1");
const p2 = params.get("p2");
const maximosJSON = {
    casa: 30,
    coche: 120,
    avion: 10000
};
const mediasMundial = {
    casa: 5,
    coche: 40,
    avion: 3000
};
const labels = {
    casa: "Minutos",
    coche: "Kms",
    avion: "Kms"
};

const p1Local = parseFloat(Math.min(params.get("p1"), maximosJSON[typeLocal]));

// Crear el gráfico
const ctx = document.getElementById('graficoComparacion').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Tus '+labels[typeLocal], 'Media mundial'],
        datasets: [{
            label: 'Comparación con la media mundial.',
            data: [p1Local, mediasMundial[typeLocal]],
            backgroundColor: ['#4caf50', '#f44336']
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: labels[typeLocal]
                }
            }
        }
    }
});




if (p1!="NaN"){
    cargarYConsultar(type,p1,p2);
}else{
    console.log("Something Wrong")
}

async function cargarYConsultar(type, p1, p2) {
    try {
        const respuesta = await fetch('data/data.json');
        const datos = await respuesta.json();

        if (datos[type]) {

            let resultadoP1;
            let resultadoP2 = "";

            if(type=="coche") resultadoP1 = buscarP1MasCercanoEnCoche(datos, p2, p1);
            else {
                const keyP1 = Object.keys(datos[type].p1).map(Number);
                const p1Num = Number(p1);

                const keyMasCercanaP1 = keyP1.reduce((a, b) => Math.abs(b - p1Num) < Math.abs(a - p1Num) ? b : a);
                resultadoP1 = datos[type].p1[String(keyMasCercanaP1)]  || "";

                if(type=='casa'){
                    const keyP2 = Object.keys(datos[type].p2).map(Number);
                    const p2Num = Number(p2);

                    const keyMasCercanaP2 = keyP2.reduce((a, b) => Math.abs(b - p2Num) < Math.abs(a - p2Num) ? b : a);

                    resultadoP2 = datos[type].p2[String(keyMasCercanaP2)];
                }
            }

            document.getElementById("resultatP1").textContent = resultadoP1;
            document.getElementById("resultatP2").textContent = resultadoP2;
            
        }else document.getElementById("resultatP1").textContent = "Something miss";

    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
}

function buscarP1MasCercanoEnCoche(datos, tipoCombustible, p1) {
    if (!datos.coche || !datos.coche.p2[tipoCombustible]) {
        return "Categoría de combustible no encontrada";
    }

    const p1Obj = datos.coche.p2[tipoCombustible].p1;
    const clavesP1 = Object.keys(p1Obj).map(Number);
    const p1Num = Number(p1);

    if (clavesP1.length === 0) {
        return "No hay datos en p1 para este combustible";
    }

    const keyMasCercana = clavesP1.reduce((a, b) =>
        Math.abs(b - p1Num) < Math.abs(a - p1Num) ? b : a
    );
    return p1Obj[String(keyMasCercana)];
}