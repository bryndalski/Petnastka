let ilosc_poz = 0, picturesIdCheckArray = [],  playInterval,  clockInterval, gameTime=0,lastMove=5;
const imageToSlice = new Image()   //tworze nowe img
imageToSlice.src = './Img/spooky_sceleton.jpg' //nadaje mu nowy src
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
        document.getElementById(this.imgPosition).style.left = picturesObjectArray[this.imgPosition + i].imgX + "%"
        document.getElementById(this.imgPosition).style.top = picturesObjectArray[this.imgPosition + i].imgY + "%"
        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.left = picturesObjectArray[this.imgPosition].imgX + "%";
        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.top = picturesObjectArray[this.imgPosition].imgY + "%"
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
        document.getElementById(this.imgPosition).style.left = picturesObjectArray[this.imgPosition + i].imgX + "%"
        document.getElementById(this.imgPosition).style.top = picturesObjectArray[this.imgPosition + i].imgY + "%"
        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.left = picturesObjectArray[this.imgPosition].imgX + "%";
        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.top = picturesObjectArray[this.imgPosition].imgY + "%"
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
        lastMove = possibilitiesArray[szukany]
        console.log(lastMove)
        switch (lastMove) {
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
        if (picturesObjectArray[this.imgPosition - 1] != undefined && (this.imgPosition - 1) % i != (i - 1) && lastMove != 2)   // lewo && (this.imgPosition-1)%i != 0 
            possibilitiesArray.push(1)
        if (picturesObjectArray[this.imgPosition + 1] != undefined && (this.imgPosition + 1) % i != 0 && lastMove != 1)  // && this.imgId % 10 != (i - 1)
            possibilitiesArray.push(2)
        if (picturesObjectArray[this.imgPosition - i] != undefined && lastMove!=4)  // góra 
            possibilitiesArray.push(3)
        if (picturesObjectArray[this.imgPosition + i] != undefined && lastMove != 3)  // dół
            possibilitiesArray.push(4)
        return possibilitiesArray;
    }
}
var picturesObjectArray = []
window.addEventListener('DOMContentLoaded', (event) => {
    buttonMaker();
});
function buttonMaker() {
    let buttonContainer = document.body.querySelector('.buttonContainer');
    for (i = 3; i <= 6; i++) {
        let buttonek = document.createElement('button')
        buttonek.appendChild(document.createTextNode(i + " X " + i))
        buttonek.onclick = buttonkoweSlicowanie(i);
        buttonContainer.appendChild(buttonek)
    }
}
//funckaj restartuje gre : czyści tablice usuwa container ==> dzieci i tworzy na nowo
function restarter() {
    clearInterval(playInterval);
    clearInterval(clockInterval)
    gameTime=0
    lastMove= 5
    document.body.querySelector('.time').textContent="00:00:00:00"
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
    console.log(imageToSlice.width)
    let imageWidth = imageToSlice.width / i; // pobieram width zdjęcia i dziele je przez ilość obrazków w celu uzyskania wiadomości ile jest potrzebne
    let imageHeight = imageToSlice.height / i;// pobieram height zdjęcia i dziele je przez ilość obrazków w celu uzyskania wiadomości ile jest potrzebne
    let picturesCounter = 0
    console.log(imageHeight,imageWidth)
    //drawImage(zdjęcie , pozycja_wejściowego_X,pozycja_Wejściowego_Y,wejściowy_Width,WejściowyHeight,WyjściowyX,WyjściowyY,WyjścioweWidth,WyjścioweHeight)
    for (y = 0; y < i; y++) {
        for (x = 0; x < i; x++) {
            let imageCanvas = document.createElement('canvas') // tworzę moje płutno ponieważ tylko na tym moge pracować
            imageCanvas.width = imageWidth; //nadaję dla canwasImagu
            imageCanvas.height = imageHeight //
            imageCanvas.id = picturesCounter; // nadaje id dla canvasu
            imageCanvas.style.top = ((100/i) * y) + "%" // ustawiam bezwzględną pozycje względem topa
            imageCanvas.style.left = ((100/i) * x) + "%"   // ustawiam bezwzględną pozycję wg left
            imageCanvas.classList.add('canvasNumber'+i) // nadaję specjalną klasę stworzoną pod responwyność 
            let contextOfSliceableImage = imageCanvas.getContext('2d')  //pobieram kontekst z płótna
            if (picturesCounter == i ** 2 - 1){
                picturesObjectArray.push(new pictureStatistic("EMPTY", ((100/i) * x),  ((100/i) * y), picturesCounter))
                imageCanvas.classList.add("empty")
            }    
            if (picturesCounter < i ** 2 - 1) {
                picturesObjectArray.push(new pictureStatistic("containsImagine",  ((100/i) * x),  ((100/i) * y), picturesCounter))
                contextOfSliceableImage.drawImage(imageToSlice, imageWidth * x, imageHeight * y, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight)
            }
            picturesCounter++;
            document.querySelector('.spookySlicer').appendChild(imageCanvas)
        }
    }
    let intervalCounter = i ** i
    playInterval = setInterval(function () {
        intervalCounter--
        picturesObjectArray[picturesObjectArray.find(e => e.status == "EMPTY").imgPosition].whiteBoxMove(i)
        if (intervalCounter <= 0) {
            firstDate = Date.now()
            console.log(firstDate)
            clockInterval = setInterval(clock, 1)
            arrayIdTaker()
            clearInterval(playInterval)
        }
    }, 1000, b = i)
}
function winCheck() {
    let check = true;
    for (x = 0; x < picturesObjectArray.length; x++) {
        if (document.body.querySelector('.spookySlicer canvas:nth-child(' + (x + 1) + ')').id != picturesObjectArray[x].imgPosition) {
            check = false
            break;
        }
    }
    if (check) {
        clearInterval(clockInterval)
        document.querySelector('.spookySlicer').removeEventListener('click', moverRanomizer)
        console.log(gameTime)
        let dvContainer = document.createElement('div')
        dvContainer.classList.add('alertClass')
        let noteContainer = document.createElement('h1')
        noteContainer.appendChild(document.createTextNode(gameTime))
        dvContainer.appendChild(noteContainer)
        let button = document.createElement('button')
        button.appendChild(document.createTextNode('OK'))
        button.onclick = (dvContainer)=>{
            document.body.querySelector('.alertClass').remove()
        }
        dvContainer.appendChild(button)
        document.body.appendChild(dvContainer)
    }
}
function moverRanomizer(e) {
    arrIdCheck()
    picturesObjectArray[e.target.id].move(ilosc_poz)
}
function clock() {
    let newHour = new Date(Date.now() - firstDate)
     gameTime = ((newHour.getHours() - 1) + " : " + newHour.getMinutes() + " : " +  newHour.getSeconds() + " : " + newHour.getMilliseconds())
    document.body.querySelector('.time').textContent = gameTime    
}
// funckje zabezpieczające próbe zmiany id i oszustwa 
function arrIdCheck() {
    for (x = 0; x < document.body.querySelector('.spookySlicer').childElementCount; x++) {
        if (document.body.querySelector('.spookySlicer canvas:nth-child(' + (x + 1) + ')').id != picturesIdCheckArray[x]) {
            alert("Wykryto nieuczciwą zmienę ID, to bardzo NIE ŁADNE PODEJŚCIE. Strona teraz ma focha i się reloaduje. Nie pozdrawam.")
            window.location.reload(true)
            break;
        }
    }
}
function arrayIdTaker() {
    picturesIdCheckArray = []
    for (x = 0; x < document.body.querySelector('.spookySlicer').childElementCount; x++) {
        picturesIdCheckArray.push(document.body.querySelector('.spookySlicer canvas:nth-child(' + (x + 1) + ')').id)
    }
}
