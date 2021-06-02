function MoveBirdDown () {
    for (let index2 = 0; index2 < 3; index2++) {
        MoveBird()
    }
}
function lineWithWall () {
    for(let o=walls.length-1;o>=0;o--)
         if(walls[o].line==0)
         return walls[o].freeSpace
return -1
}
function showScore () {
    basic.showNumber(score)
}
function CheckIsAlive () {
    for (let n = 0; n <= walls.length - 1; n++) {
        if (walls[n].line == 1) {
            if (bird.y != walls[n].freeSpace && bird.y != walls[n].freeSpace + 1) {
                alive = false
            } else {
                console.log(bird.y+"d"+walls[n].freeSpace)
            }
        }
    }
}
function MoveWalls () {
    dt = 1
    while (alive) {
        music.playTone(262, music.beat(BeatFraction.Whole))
        CheckIsAlive()
        for (let l = 0; l <= walls.length - 1; l++) {
            if (walls[l].line == 0) {
                score += 1
                console.log(score)
control.inBackground(showScore)
index = l
                music.playTone(294, 60)
            }
            walls[l].moveWall()
        }
        walls.push(new Wall(walls[walls.length-1].line+2))
        walls[walls.length-1].buildWall()
pause(wallSpeed)
    }
}
function restartGameNotAlive () {
    while (!(alive)) {
        if (input.logoIsPressed()) {
            control.reset()
        }
    }
}
function restartGame () {
    if (input.logoIsPressed()) {
        control.reset()
    }
}
function MoveBird () {
    if (x >= 5) {
        bird.y+=1
tileDisplay.setMatrixColor(bird.x, bird.y - 1, Kitronik_Zip_Tile.colors(0))
        tileDisplay.setMatrixColor(bird.x, bird.y, birdColor)
        tileDisplay.show()
        music.playTone(277, 33)
        if (bird.y > 7) {
            alive = false
        }
    }
    if (lineWithWall() != -1 && bird.y != lineWithWall() && (lineWithWall() != -1 && bird.y != lineWithWall() + 1)) {
        alive = false
        console.log(lineWithWall()+"dwd "+bird.y)
    }
}
function createWalls () {
    walls.push(new Wall(walls[walls.length-1].line+2))
    walls[walls.length-1].buildWall()
}
function MoveBirdUP () {
    bird.y-=1
tileDisplay.setMatrixColor(bird.x, bird.y + 1, Kitronik_Zip_Tile.colors(0))
    tileDisplay.setMatrixColor(bird.x, bird.y, birdColor)
    tileDisplay.show()
    music.playTone(277, 33)
    if (lineWithWall() != -1 && bird.y != lineWithWall() && (lineWithWall() != -1 && bird.y != lineWithWall() + 1)) {
        alive = false
        console.log(lineWithWall()+" "+bird.y)
    }
}
let index = 0
let dt = 0
let birdColor = 0
let Wallcolors: number[] = []
let Birdcolors: number[] = []
let alive = false
let tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = null
let x=0
let score=0
let walls:Wall[]=[]
class position{
    x:number
    y:number
    constructor(x:number,y:number){
      this.x=x
      this.y=y
    }
}
let prevLineSpace:number=undefined
class Wall{
  line=1
   freeSpace:number
   p:position=new position(0,0);
  constructor(line:number){
      this.line=line;
  }
  buildWall(){
    let c=false
    if(prevLineSpace==undefined)
    this.freeSpace=Math.floor(Math.random()*7)
    else
    while(c==false){
        this.freeSpace=Math.floor(Math.random()*7)
        if(prevLineSpace-this.freeSpace<5)
        c=true
        else
        if(this.freeSpace-prevLineSpace<5)
        c=true
    }
   prevLineSpace=this.freeSpace
   this.p.x=this.freeSpace
   this.p.y=this.freeSpace+1
    for(let i=0;i<8;i++){
      if(i!=this.freeSpace&&i!=this.freeSpace+1){
       tileDisplay.setMatrixColor(this.line, i,wallColor)
       tileDisplay.show()
       
      }
       
     
    }
    
} 
 moveWall(){
    
       for(let j=0;j<8;j++){
      if(j!=this.freeSpace&&j!=this.freeSpace+1){
       tileDisplay.setMatrixColor(this.line, j, Kitronik_Zip_Tile.colors(0))
       tileDisplay.show()
       
      }
       
   
    }
     for(let k=0;k<8;k++){
      if(k!=this.freeSpace&&k!=this.freeSpace+1){
       tileDisplay.setMatrixColor(this.line-1, k, wallColor)
       tileDisplay.show()  
       
      }
    }
        
      this.line=this.line-1
    
    
 }

}
tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Visible)
tileDisplay.setBrightness(250)
let bird=new position(0,4)
let wall=new Wall(3)
alive = true
wall.buildWall()
walls.push(wall)
tileDisplay.show()
Birdcolors.push(Kitronik_Zip_Tile.colors(ZipLedColors.Red))
Birdcolors.push(Kitronik_Zip_Tile.colors(ZipLedColors.Indigo))
Birdcolors.push(Kitronik_Zip_Tile.colors(ZipLedColors.Orange))
Birdcolors.push(Kitronik_Zip_Tile.colors(ZipLedColors.Purple))
Birdcolors.push(Kitronik_Zip_Tile.colors(ZipLedColors.Violet))
Wallcolors.push(Kitronik_Zip_Tile.colors(ZipLedColors.White))
Wallcolors.push(Kitronik_Zip_Tile.colors(ZipLedColors.Yellow))
let wallColor = Wallcolors[Math.floor(Math.random() * Wallcolors.length)]
birdColor = Birdcolors[Math.floor(Math.random() * Birdcolors.length)]
tileDisplay.setMatrixColor(bird.x, bird.y, birdColor)
tileDisplay.show()
let wallSpeed = 3600
let d = 3
control.inBackground(MoveWalls)
music.setBuiltInSpeakerEnabled(true)
while (alive) {
    control.inBackground(restartGame)
console.log("light "+input.lightLevel())
input.onButtonPressed(Button.A, () => {
      MoveBirdUP()
      x=5
     
    })
input.onButtonPressed(Button.B, () => {
      MoveBirdDown()
      x=5
      
    })
x += 1
    MoveBird()
    if (score % 10 == 0 && score > 1) {
        birdColor = Birdcolors[Math.floor(Math.random() * Birdcolors.length)]
        wallSpeed += 0 - 200
    }
    pause(1000)
}
if (!(alive)) {
    pause(1000)
// music.playTone(Note.FSharp, 33)
    soundExpression.sad.play()
    basic.showIcon(IconNames.Sad)
    tileDisplay.scrollText(
    "Game Over,your score is:" + score,
    Kitronik_Zip_Tile.TextDirection.Left,
    150,
    Kitronik_Zip_Tile.TextStyle.None,
    Kitronik_Zip_Tile.colors(ZipLedColors.Red),
    Kitronik_Zip_Tile.colors(ZipLedColors.Red)
    )
    tileDisplay.scrollText(
    "Press the logo to restart",
    Kitronik_Zip_Tile.TextDirection.Left,
    150,
    Kitronik_Zip_Tile.TextStyle.None,
    Kitronik_Zip_Tile.colors(ZipLedColors.Red),
    Kitronik_Zip_Tile.colors(ZipLedColors.Blue)
    )
    pause(1000)
control.inBackground(restartGame)
}
