class Hero{
    x_(x){this.player.x+=x 
        this.graviPoint.x+=x
    }
    y_(y){this.player.y+=y}
    
    
    downLoading(){
        this.sheet = PIXI.Loader.shared.resources["res/hero.json"].spritesheet;
        //PIXI.loader.reset()
        this.createDefaultPlayer()
    }
    constructor(){
       
        this.downLoading = this.downLoading.bind(this);
        this.health = 100
        this.screw = 0
        this.armor = 0
        
        this.downLoading()
        //this.player.on('Move',this.onMove_)           
    }

    jumpAnimation(key){
        this.player.textures = this.sheet.animations[key];
        this.player.animationSpeed = 0.167
        this.player.play()
        this.player.onComplete=()=>{this.player.loop = true,this.changeAnumation(this.previosKey);}
        this.player.loop = false
    }
    changeAnumation(key){
        this.player.textures =this.sheet.animations[key];
        this.previosKey = key
        this.player.play();   
    }
    getBounds(){
        return {x:this.player.x,y:this.player.y,width:47,height:47}
    }
    createDefaultPlayer(){   
        this.previosKey = 'run'
		this.player = new PIXI.AnimatedSprite(this.sheet.animations["run"]);
		this.player.x =app.view.width/4.5;
		this.player.y =100;
        this.player.acceleration = new PIXI.Point(0);
		this.player.anchor.set(0.5);
		this.player.animationSpeed = 0.167
        this.graviPoint = {x:this.player.x,y:app.view.height*100000}

        console.log(this.player);
		this.player.play();
		app.stage.addChild(this.player);
         
    }
    move(x,y){
        this.x_(x)
        this.y_(y)
        this.Sprite.emit('Move')
    }
    onMove_(){
        console.log({x:this.x, y:this.y});
    }
}