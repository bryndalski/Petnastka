//TOTO OD BRYNDALA Z 27.10 Z 00:29 DO BRYNDALA PEWNIE RANO
// GŁĄBIE ID BĘDZIE CI POTRZEBNE DO SPRAWDZANIA CZY DANE RZECZY SĄ NA SWOIM MIEJSCU . DASZ SOBIE NA TO FORA I BEDZIESZ SPRAWDZAŁ CZY I < OD WYMIAR^2 JEST RÓWNE ID JEŚLI TAK DASZ PRAWDE I KOCUR
// TWOJA IMG POZYCJA TO ODPOWIEDNIK W TABLICY 
// ZMIENIASZ WARTOŚĆ I PODMIENIASZ INDEXY
// MIŁEGO WSTAWANIA 
//DOBRA JEDNAK NIE MOŻESZ SOBIE ZMIAĆ NADAŃ JSONÓW ALE MOŻESZ PRZENOSIĆ I SWAPOWAĆ INDEXY W TABLICY CO TEŻ BĘDZIESZ ROBIŁ
//PORÓWNÓJ ICH STATUSY I NA PODSTAWIE TEGO MOŻESZ WYLICZYĆ JAKIE MAJĄ WEKTOR
// WTEDY GRA ZAKOŃCZY SIĘ KIEDY TABLICA WRÓCI DO STANOU WYJŚCOWEGO CO SPORWADZA SIĘ DO PK.2 
// DZIEŃ DOBRY PANIE BRYNDALKU
//KAWKA JUŻ BYŁA ?

let ilosc_poz=0, picturesIdCheckArray=[];
class pictureStatistic {
    constructor(status, imgX, imgY, picturesCounter) {
        this.status = status;
        this.imgX = imgX;
        this.imgY = imgY;
        this.imgId = picturesCounter;
        this.imgPosition = picturesCounter;
    }
    //WSTAW PARAMY
    possibilities(i) {
        if (picturesObjectArray[this.imgPosition - 1] != undefined && picturesObjectArray[this.imgPosition - 1].status == "EMPTY" && (this.imgPosition - 1) % i != (i - 1))   // lewo && (this.imgPosition-1)%i != 0 
            return 1;
        if (picturesObjectArray[this.imgPosition + 1] != undefined && picturesObjectArray[this.imgPosition + 1].status == "EMPTY" && (this.imgPosition + 1) % i != 0)  // && this.imgId % 10 != (i - 1)
            return 2;
        if (picturesObjectArray[this.imgPosition - i] != undefined && picturesObjectArray[this.imgPosition - i].status == "EMPTY")  // góra 
            return 3;
        if (picturesObjectArray[this.imgPosition + i] != undefined && picturesObjectArray[this.imgPosition + i].status == "EMPTY")  // dół
            return 4
        return 0;
    }
    moveMaker(i) {
        document.getElementById(this.imgPosition).style.left = picturesObjectArray[this.imgPosition + i].imgX + "px"
        document.getElementById(this.imgPosition).style.top = picturesObjectArray[this.imgPosition + i].imgY + "px"
        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.left = picturesObjectArray[this.imgPosition].imgX + "px";
        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.top = picturesObjectArray[this.imgPosition].imgY + "px"
        //podmmieniam indexy 
        // próbuję podmienić 
        let temporaryObject = this.imgPosition
        let temporaryId = picturesObjectArray[this.imgPosition + i].imgPosition
        // TODO ZAMIENŃ
        Object.assign(picturesObjectArray[this.imgPosition], {
            status: "EMPTY",
            imgId: picturesObjectArray[this.imgPosition + i].imgId,
        })
        Object.assign(picturesObjectArray[this.imgPosition + i], {
            status: "containsImagine",
            imgId: temporaryObject
        })
        document.getElementById(this.imgPosition + i).id = temporaryObject //Pusty 
        document.getElementById(this.imgPosition).id = temporaryId
        arrayIdTaker()
        winCheck()
    }
    moveMakerForWhteBlock(i) {

        document.getElementById(this.imgPosition).style.left = picturesObjectArray[this.imgPosition + i].imgX + "px"
        document.getElementById(this.imgPosition).style.top = picturesObjectArray[this.imgPosition + i].imgY + "px"
        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.left = picturesObjectArray[this.imgPosition].imgX + "px";
        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.top = picturesObjectArray[this.imgPosition].imgY + "px"
        //podmmieniam indexy 
        // próbuję podmienić 
        let temporaryObject = this.imgPosition
        let temporaryId = picturesObjectArray[this.imgPosition + i].imgPosition
        // TODO ZAMIENŃ 
        Object.assign(picturesObjectArray[this.imgPosition + i], {
            status: "EMPTY",
            imgId: temporaryObject
        })
        Object.assign(picturesObjectArray[this.imgPosition], {
            status: "containsImagine",
            imgId: picturesObjectArray[this.imgPosition + i].imgId,
        })
        document.getElementById(this.imgPosition).id = temporaryId
        document.getElementById(this.imgPosition + i).id = temporaryObject //Pusty 

    }
    move(i) {
        switch (this.possibilities(i)) {
            case 1: // lewo
                this.moveMaker(-1)
                return true
            case 2: // w prawo
                this.moveMaker(1)
                return true
            case 3:
                this.moveMaker(-i)
                return true
            case 4:
                this.moveMaker(+i)
                return true
            default:
                return false;
        }
    }
    whiteBoxMove(i) {
        let possibilitiesArray = this.whiteBoxPossibilities(i)
        let szukany = Math.floor((Math.random() * (possibilitiesArray.length)))
        switch (possibilitiesArray[szukany]) {
            case 1: // lewo
                this.moveMakerForWhteBlock(-1)
                break;
            case 2: // w prawo
                this.moveMakerForWhteBlock(1)
                break;
            case 3:
                this.moveMakerForWhteBlock(-i)
                break;
            case 4:
                this.moveMakerForWhteBlock(+i)
                break;
        }
    }


    whiteBoxPossibilities(i) {
        let possibilitiesArray = []
        if (picturesObjectArray[this.imgPosition - 1] != undefined && (this.imgPosition - 1) % i != (i - 1))   // lewo && (this.imgPosition-1)%i != 0 
            possibilitiesArray.push(1)
        if (picturesObjectArray[this.imgPosition + 1] != undefined && (this.imgPosition + 1) % i != 0)  // && this.imgId % 10 != (i - 1)
            possibilitiesArray.push(2)
        if (picturesObjectArray[this.imgPosition - i] != undefined)  // góra 
            possibilitiesArray.push(3)
        if (picturesObjectArray[this.imgPosition + i] != undefined)  // dół
            possibilitiesArray.push(4)
        return possibilitiesArray;
    }
}


var picturesObjectArray = []
window.addEventListener('DOMContentLoaded', (event) => {
    buttonMaker();
});


function buttonMaker() {
    let buttonContainer = document.createElement("button")
    buttonContainer.classList.add("buttonContainer")
    for (i = 3; i < 6; i++) {
        let buttonek = document.createElement('button')
        buttonek.appendChild(document.createTextNode(i + " X " + i))
        buttonek.onclick = buttonkoweSlicowanie(i);
        buttonContainer.appendChild(buttonek)
    }
    document.body.appendChild(buttonContainer)
}
//funckaj restartuje gre : czyści tablice usuwa container ==> dzieci i tworzy na nowo
function restarter() {
    picturesObjectArray = []
    if (document.body.querySelector('.spookySlicer') != null)
        document.body.querySelector('.spookySlicer').remove()
    let spooksCont = document.createElement('div')
    spooksCont.classList.add('spookySlicer')
    document.body.appendChild(spooksCont)
}
// funckja wywołana, pozwala na acess po tzw I do ilość buttonó itp
function buttonkoweSlicowanie(i) {
    return function () {
        restarter()
        imageSlicer(i)
        ilosc_poz = i;
        document.querySelector('.spookySlicer').addEventListener('click', moverRanomizer)
    }
}   
//funckja robiąca kwadrary 
function imageSlicer(i) {
    let imageToSlice = new Image()   //tworze nowe img
    imageToSlice.src = './Img/spooky_sceleton.jpg' //nadaje mu nowy src
    let imageWidth = imageToSlice.width / i; // pobieram width zdjęcia i dziele je przez ilość obrazków w celu uzyskania wiadomości ile jest potrzebne
    let imageHeight = imageToSlice.height / i;// pobieram height zdjęcia i dziele je przez ilość obrazków w celu uzyskania wiadomości ile jest potrzebne
    let picturesCounter = 0
    document.querySelector('.spookySlicer').width = imageToSlice.width + "px";
    document.querySelector('.spookySlicer').height = imageToSlice.height + "px"
    //drawImage(zdjęcie , pozycja_wejściowego_X,pozycja_Wejściowego_Y,wejściowy_Width,WejściowyHeight,WyjściowyX,WyjściowyY,WyjścioweWidth,WyjścioweHeight)
    for (y = 0; y < i; y++) {
        for (x = 0; x < i; x++) {
            let imageCanvas = document.createElement('canvas') // tworzę moje płutno ponieważ tylko na tym moge pracować
            imageCanvas.width = imageWidth; //nadaję dla canwasImagu winth
            imageCanvas.height = imageHeight; // nadaję mu heigth
            imageCanvas.id = picturesCounter; // nadaje id dla canvasu
            imageCanvas.style.top = (imageHeight * y) + "px" // ustawiam bezwzględną pozycje względem topa
            imageCanvas.style.left = (imageWidth * x) + "px"   // ustawiam bezwzględną pozycję wg left
            let contextOfSliceableImage = imageCanvas.getContext('2d')  //pobieram kontekst z płótna
            if (picturesCounter == i ** 2 - 1)
                picturesObjectArray.push(new pictureStatistic("EMPTY", imageWidth * x, imageHeight * y, picturesCounter))
            if (picturesCounter < i ** 2 - 1) {
                picturesObjectArray.push(new pictureStatistic("containsImagine", imageWidth * x, imageHeight * y, picturesCounter))
                contextOfSliceableImage.drawImage(imageToSlice, (imageWidth * x), (imageHeight * y), imageWidth, imageHeight, 0, 0, imageWidth, imageHeight)
            }
            // imageCanvas.onclick = function () {
            //     moverRanomizer(this.id, i)
            // }
            picturesCounter++;
            document.querySelector('.spookySlicer').appendChild(imageCanvas)

        }

    }
    let intervalCounter = i ** i
    let playInterval = setInterval(function () {
        intervalCounter--
        picturesObjectArray[picturesObjectArray.find(e => e.status == "EMPTY").imgPosition].whiteBoxMove(i)
        if (intervalCounter <= 0){
            clearInterval(playInterval)
            arrayIdTaker()
        }
    }, 1,b=i)
}
function arrIdCheck() {
    for (x = 0; x < document.body.querySelector('.spookySlicer').childElementCount; x++) {
       if(document.body.querySelector('.spookySlicer canvas:nth-child(' + (x + 1) + ')').id!=picturesIdCheckArray[x]){
        alert("Wykryto nieuczciwą zmienę ID, to bardzo NIE ŁADNE PODEJŚCIE. Strona teraz ma focha i się reloaduje. Nie pozdrawam.")
        window.location.reload(true)           
        break;
       }
    } 
}
function arrayIdTaker(){
    picturesIdCheckArray=[]
    for (x = 0; x < document.body.querySelector('.spookySlicer').childElementCount; x++) {
        picturesIdCheckArray.push(document.body.querySelector('.spookySlicer canvas:nth-child(' + (x + 1) + ')').id)
    } 
}

function winCheck() {
    let check = true;
    //TODO metoda łatwa do ogrania 
    for (x = 0; x < picturesObjectArray.length; x++) {
        if (document.body.querySelector('.spookySlicer canvas:nth-child(' + (x + 1) + ')').id != picturesObjectArray[x].imgPosition) {
            check = false
            break;
        }
    }
    if (check) {
        document.querySelector('.spookySlicer').removeEventListener('click', moverRanomizer)
        alert("KONIEC")
    }
}
function moverRanomizer(e) {
    arrIdCheck()
    winCheck()
    picturesObjectArray[e.target.id].move(ilosc_poz)
}
