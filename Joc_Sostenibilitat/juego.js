$(function () {
    // Variables globals
    var posX = 870
    var posY = 330;
    var residus = 100;
    var consumEnergetic = 100;
    var contaminacioAmbiental = 100;
    var timer = 5;

    var hold;
    var rand;

    var pConsum=["consum1.png","consum2.png"];
    var rConsum=["a","c"];
    var pEcosis=["ecosis1.png","ecosis2.png"];
    var rEcosis=["a","a"];
    var pResidu=["residu1.png","residu2.png"];
    var rResidu=["d","b"];
    
    $(".residus").html(`<p>Residus: ${residus}</p>`);
    $(".consumEnergetic").html(`<p>Consum Energètic: ${consumEnergetic}</p>`);
    $(".contaminacio").html(`<p>Contaminació: ${contaminacioAmbiental}</p>`);
    // Funció per moure el personatge
    function moure(tecla) {
        if (tecla === "w" && $(".mc").hasClass("move") && posY > 70) { // Amunt
            posY -= 10;
            $(".mc").attr("src", "images/movement/W_Movement.gif");
        } 
        else if (tecla === "s" && $(".mc").hasClass("move") && posY < 580) { // Avall
            posY += 10;
            $(".mc").attr("src", "images/movement/S_Movement.gif");
        } 
        else if (tecla === "a" && $(".mc").hasClass("move") && posX > 390) { // Esquerra
            posX -= 10;
            $(".mc").attr("src", "images/movement/A_Movement.gif");
        } 
        else if (tecla === "d" && $(".mc").hasClass("move") && posX < 1340) { // Dreta
            posX += 10;
            $(".mc").attr("src", "images/movement/D_Movement.gif");

        }
        $("#mc").css({ left: posX + "px", top: posY + "px" });
    }

    // Canviar escenari
    function canviarEscenari() {
        if ($("#mc").hasClass("middle")) {
            if (posY === 70 && posX >= 820 && posX <= 920) {
                actualitzaEscenari("fabrica.jpg",860, 570, "adalt");
            } else if (posX === 390 && posY >= 280 && posY <= 380) {
                actualitzaEscenari("salacpd.jpg",1330, 330, "left");
            } else if (posX === 1340 && posY >= 270 && posY <= 390) {
                actualitzaEscenari("bosuqe.jpg", 400, 330, "right");
            }
        } else if ($("#mc").hasClass("adalt") && posY === 580 && posX >= 820 && posX <= 920) {
            actualitzaEscenari("salaprincipal.jpg",860, 80, "middle");
        } else if ($("#mc").hasClass("right") && posX === 390 && posY >= 280 && posY <= 380) {
            actualitzaEscenari("salaprincipal.jpg",1340, 330, "middle");
        } else if ($("#mc").hasClass("left") && posX === 1340 && posY >= 270 && posY <= 390) {
            actualitzaEscenari("salaprincipal.jpg",390, 330, "middle");
        }
    }

    // Funció per actualitzar l'escenari
    function actualitzaEscenari(imatge, novaPosX,novaPosY, novaClasse) {
        $("main.middle").css("background-image", `url(images/scenary/${imatge})`);
        posY = novaPosY;
        posX = novaPosX;
        $("#mc").attr("class", `mc ${novaClasse}`);
        $("#mc").css("left:"+ posX + "px","top:"+ posY + "px");
    }

    // Interacció amb personatges
    function interactuar(tecla) {
        if (tecla == "e"){
            $("#mc").addClass("statusPregunta");
            if ($("#mc").hasClass("adalt") && posX >= 1200 && posX <= 1320 && posY >= 180 && posY <= 400) {
                rand=randomBetween(0,1);
            
                parlar(pResidu[rand]);
            }
            else if ($("#mc").hasClass("right") && posX >= 1100 && posX <= 1320 && posY >= 240 && posY <= 520) {
                rand=randomBetween(0,1);

                parlar(pEcosis[rand]);
            } 
            else if ($("#mc").hasClass("left") && posX >= 400 && posX <= 560 && posY >= 380 && posY <= 490) {
                rand=randomBetween(0,1);

                parlar(pConsum[rand]);
            }
        }
        else if(tecla == "a" && $("#mc").hasClass("statusPregunta") || tecla == "b" && $("#mc").hasClass("statusPregunta") || tecla == "c" && $("#mc").hasClass("statusPregunta") || tecla == "d" && $("#mc").hasClass("statusPregunta") ){
            $("#mc").removeClass("statusPregunta");

            // Comprovacio per si eta correcte

            if($(".mc").hasClass("left") && tecla==rConsum[rand]){
                variacioContaminacio("Consum Energètic",".consumEnergetic",consumEnergetic-=50);
            }
            else if($(".mc").hasClass("left") && tecla!=rConsum[rand]){
                variacioContaminacio("Consum Energètic",".consumEnergetic",consumEnergetic+=25);
            }
            else if($(".mc").hasClass("right") && tecla==rEcosis[rand]){
                variacioContaminacio("Contaminació",".contaminacio",contaminacioAmbiental-=50);
            }
            else if($(".mc").hasClass("right") && tecla!=rEcosis[rand]){
                variacioContaminacio("Contaminacio",".contaminacio",contaminacioAmbiental+=25);
            }
            else if($(".mc").hasClass("adalt") && tecla==rResidu[rand]){
                variacioContaminacio("Residus",".residus",residus-=50);
            }
            else if($(".mc").hasClass("adalt") && tecla!=rResidu[rand]){
                variacioContaminacio("Residus",".residus",residus+=25);
            }
            

            // Al respondre per a canviar

            if($(".mc").hasClass("left")){
                actResposta("salacpd");
            }
            else if($(".mc").hasClass("right")){
                actResposta("bosuqe");
            }
            else if($(".mc").hasClass("adalt")){
                actResposta("fabrica");
            }
        }
        
    }


    // Restar en cas de respondre correctament

    function variacioContaminacio(contaminacio,clase,variacio){
        $(clase).html(`<p>${contaminacio}: ${variacio}</p>`);
        verificarGameOver();
        verificarGuanyar();
    }

    // Mostrar text i imatge del personatge
    function parlar(fons) {
 
        $(".mc").toggleClass("move");

        $("main").css('background-image', `url(images/preguntes/${fons})`);
        $(".mc").toggleClass("hide");
    }

    // Respondre

    function actResposta (sala){
            $("main").css('background-image',`url(images/scenary/${sala}.jpg)`);
            $("#imageBox").css('background-image', 'url(images/characters/mc.png)');
            //$("#textInTextBox").html("<p></p>");
            $(".mc").toggleClass("move");
            $(".mc").toggleClass("hide");
    }

    // Control del teclat
    $(document).keydown(function (e) {
        var tecla = e.key.toLowerCase();
        if ($(".mc").hasClass("move")) {
            moure(tecla);
            canviarEscenari();
            interactuar(tecla);
        }
    });

    // Actualitzar estadístiques i timer    
        /*
        if (residus > 150 || consumEnergetic > 150 || contaminacioAmbiental > 150){
            alert("GAME OVER");
        }
            */
    setInterval(() => {
        timer--;
        $(".tutorial").css("display","block");
        $("#mc").css("display","none");
        
        if (timer <= 0) $(".tutorial").css("display","none") && $("#mc").css("display","block") && clearInterval();
    }, 1000);
    function verificarGameOver() {
        if (contaminacioAmbiental >= 150 || consumEnergetic >= 150 || residus >= 150) {
            alert("Has perdut!");
            // Detener el juego o reiniciarlo
            location.reload();
        }
    }
    function verificarGuanyar(){
        if(contaminacioAmbiental <= 0 && consumEnergetic <= 0 && residus<=0){
            alert("Has guanyat!!!");
            location.reload();
        }
    }
    

});