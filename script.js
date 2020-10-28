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

var picturesObjectArray = []
window.addEventListener('DOMContentLoaded', (event) => {
buttonMaker();
});


function buttonMaker(){
    let buttonContainer = document.createElement("button")
    buttonContainer.classList.add("buttonContainer")
    for(i=3;i<6;i++){
        let buttonek = document.createElement('button')
        buttonek.appendChild(document.createTextNode(i+" X "+i))
        buttonek.onclick = buttonkoweSlicowanie(i);
        buttonContainer.appendChild(buttonek)
    }
    document.body.appendChild(buttonContainer)
}
function buttonkoweSlicowanie(i){
    return function(){
        imageSlicer(i)
    }
}
function imageSlicer(i){
    let imageToSlice = new Image()   //tworze nowe img
    imageToSlice.src = './Img/spooky_sceleton.jpg' //nadaje mu nowy src
    let imageWidth = imageToSlice.width / i; // pobieram width zdjęcia i dziele je przez ilość obrazków w celu uzyskania wiadomości ile jest potrzebne
    let imageHeight = imageToSlice.height/i;// pobieram height zdjęcia i dziele je przez ilość obrazków w celu uzyskania wiadomości ile jest potrzebne
    let picturesCounter=0
    document.querySelector('.spookySlicer').width = imageToSlice.width +"px";
    document.querySelector('.spookySlicer').height = imageToSlice.height+"px"
    //drawImage(zdjęcie , pozycja_wejściowego_X,pozycja_Wejściowego_Y,wejściowy_Width,WejściowyHeight,WyjściowyX,WyjściowyY,WyjścioweWidth,WyjścioweHeight)
    
    for(y=0;y<i;y++){
        for(x=0;x<i;x++){ 
                let imageCanvas = document.createElement('canvas') // tworzę moje płutno ponieważ tylko na tym moge pracować
                imageCanvas.width = imageWidth; //nadaję dla canwasImagu winth
                imageCanvas.height=imageHeight; // nadaję mu heigth
                imageCanvas.id =  picturesCounter; // nadaje id dla canvasu
                imageCanvas.style.top = (imageHeight*y)+"px" // ustawiam bezwzględną pozycje względem topa
                imageCanvas.style.left = (imageWidth*x) +"px"   // ustawiam bezwzględną pozycję wg left
                let contextOfSliceableImage = imageCanvas.getContext('2d')  //pobieram kontekst z płótna
                let objectForDiv = {
                    status: "containsImagine",
                    imgX:imageWidth * x,
                    imgY:imageHeight*y,
                    imgId:picturesCounter,
                    imgPosition:picturesCounter,
                    possibilities: function () {
                        if (picturesObjectArray[this.imgPosition - 1] != undefined && picturesObjectArray[this.imgPosition - 1].status == "EMPTY" && (this.imgPosition-1)%i!=(i-1))   // lewo && (this.imgPosition-1)%i != 0 
                            return 1;
                        if (picturesObjectArray[this.imgPosition + 1] != undefined && picturesObjectArray[this.imgPosition + 1].status == "EMPTY" && (this.imgPosition+1)%i!=0)  // && this.imgId % 10 != (i - 1)
                            return 2;
                        if(picturesObjectArray[this.imgPosition-i]!=undefined && picturesObjectArray[this.imgPosition-i].status=='EMPTY')  // góra 
                            return 3;
                        if(picturesObjectArray[this.imgPosition+i]!=undefined && picturesObjectArray[this.imgPosition+i].status=='EMPTY')  // dół
                                return 4
                        return 0;
                    },
                    moveMaker:function(i) {
                        console.log(i)
                        document.getElementById(this.imgPosition).style.left = picturesObjectArray[this.imgPosition + i].imgX + "px"
                        document.getElementById(this.imgPosition).style.top = picturesObjectArray[this.imgPosition + i].imgY +"px"
                        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.left = picturesObjectArray[this.imgPosition].imgX + "px";
                        document.getElementById(picturesObjectArray[this.imgPosition + i].imgPosition).style.top = picturesObjectArray[this.imgPosition].imgY + "px"
                        //podmmieniam indexy 
                        // próbuję podmienić 
                        let temporaryObject = this.imgPosition
                        let temporaryId= picturesObjectArray[this.imgPosition+i].imgPosition
                        Object.assign(picturesObjectArray[this.imgPosition], {
                            status : "EMPTY",
                            imgId : picturesObjectArray[this.imgPosition+i].imgId,
                        })   
                        Object.assign(picturesObjectArray[this.imgPosition+i], {
                            status : "containsImagine",
                            imgId : temporaryObject
                        })
                        document.getElementById(this.imgPosition+i).id = temporaryObject //Pusty 
                        document.getElementById(this.imgPosition).id = temporaryId
                        
                    },
                    move: function () {
                        switch (this.possibilities()) {
                            case 1: // lewo
                                this.moveMaker(-1)
                                break;
                            case 2: // w prawo
                                console.log("Prawo")
                                this.moveMaker(1)
                                break;
                            case 3:
                                console.log("Możliwość 3")
                                this.moveMaker(-i)
                                break;
                            case 4:
                                console.log("Możliwość 4")
                                this.moveMaker(i)
                                break
                            default:
                                console.log("Brak możliwości przesunięcia statku")
                                break
                    }
                }
                    
                    // move:move
                }
                // imageCanvas.objectForDiv
                picturesObjectArray.push(objectForDiv)
                picturesCounter++;
                if(picturesCounter==i**2) 
                    objectForDiv.status = "EMPTY"
                if(picturesCounter<i**2) 
                    contextOfSliceableImage.drawImage(imageToSlice ,(imageWidth*x), (imageHeight*y),imageWidth,imageHeight,0,0,imageWidth,imageHeight)
                imageCanvas.onclick=function(){
                    moverRanomizer(this.id)
                }
                document.querySelector('.spookySlicer').appendChild(imageCanvas)     
        
        }

    }
}

function moverRanomizer(id) {
    // console.log("######OLD POSSIBILITIES######")
    console.log(picturesObjectArray[id].possibilities())
    // console.log("Następuje przemieszczenie ")
    picturesObjectArray[id].move()
    // console.log("####New Object ####")
    // console.log(picturesObjectArray[(parseInt(id)+1)])
    // console.log(picturesObjectArray[(parseInt(id)+1)].possibilities())
    // console.log("##POSSIBILITIES##")
    // console.log(picturesObjectArray[0].possibilities())
    // console.log(picturesObjectArray[1].possibilities())
    // console.log(picturesObjectArray[2].possibilities())
    // console.log(picturesObjectArray[3].possibilities())
    // console.log(picturesObjectArray[4].possibilities())
    // console.log(picturesObjectArray[5].possibilities())
    // console.log(picturesObjectArray[6].possibilities())
    // console.log(picturesObjectArray[7].possibilities())
    // console.log(picturesObjectArray[8].possibilities())

    // console.log(picturesObjectArray)
}
function movePossibilities(i){
}
function move(id){
    picturesObjectArray[id].possibilities()  
}