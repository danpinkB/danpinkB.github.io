
class heroController{
   
    constructor(hero){
        this.heroLoop = this.heroLoop.bind(this)
        this.keysDown = this.keysDown.bind(this)
        this.keysUp = this.keysUp.bind(this)

        this.keysInit()
        this.setSpeedY(5)
        window.ticker.add(this.heroLoop)
        this.hero = hero
      
        window.addEventListener('keydown',this.keysDown)
        window.addEventListener('keyup',this.keysUp)
    }
    setSpeedY(y){
        this.speedY = y
    }
    keysInit(){
        this.keys = {
            65:false,
            68:false,
            87:false,
            83:false,
            32:false
        }
    }
    heroLoop(){
        //a
        
        this.hero.x_(1)
        if(this.keys[65]){
            this.hero.x_(-5)
        }
        //d
        if(this.keys[68]){
            this.hero.x_(+5)
        }
        //w
        if(this.keys[87]){
            this.hero.y_(-this.speedY)
        }
        //s
        if(this.keys[83]){
            this.hero.y_(+this.speedY)
        }
        //space
        if(this.keys[32]){
            this.hero.jumpAnimation('jump')
            if (!this.hero.player.isFall) {
                // const newAcceleration = this.hero.player.acceleration.y - 1.4;
                // this.hero.player.acceleration.y =
                //   newAcceleration > -15 ? newAcceleration : this.hero.player.acceleration.y;
                // if (newAcceleration <= -15) this.hero.player.isFall = true;
                this.hero.player.acceleration.y=-15;
                this.hero.player.isFall = true;
              }
        }
    }
    keysDown(event){

        if(this.keys[event.keyCode]!=undefined){
            this.keys[event.keyCode]=true      
        }
    }
    keysUp(event){
        if(this.keys[event.keyCode]!=undefined){
            this.keys[event.keyCode]=false
        }
    }
}
