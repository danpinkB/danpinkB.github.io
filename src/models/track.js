class Track{
    constructor(){
       
        this.downLoading = this.downLoading.bind(this);
        this.donloadResourses()
        window.ticker.add(this.stageMove)
        window.ticker.start();
         
    }
    donloadResourses(){
        PIXI.loader.add("res/hero.json")
        PIXI.loader.add("res/track/weed.png")
        PIXI.loader.add("res/track/sky.jpg")
        PIXI.loader.add("res/sky/cloud_1.png")
        PIXI.loader.add("res/screw/coin.json")
        PIXI.loader.load(this.downLoading)
    }
    downLoading(){
        this.sky = new Sky()
        this.erth = new Erth()
        this.hero = new Hero()

        this.physicsObject = physics();  
        this.physicsObject.setGravitationPoint(this.hero.graviPoint)
        this.physicsObject.setDynamicObject(this.hero.player, true);
        for (let i = 0; i < this.erth.Sprites.length; i++) {
            this.physicsObject.setStaticObject(this.erth.Sprites[i])
        }
       
	    this.heroController = new heroController(this.hero)
        this.erthHeroCheck = this.erthHeroCheck.bind(this)
        window.ticker.add(this.erthHeroCheck)
        window.track = this
    }
    erthHeroCheck(delta){
        this.physicsObject.tick(delta);
        if(this.objectsIntersect(this.erth,this.hero)){
            this.heroController.setSpeedY(0)
        }
    }

    objectsIntersect(a,b){
        let aBox = a.getBounds()
        let bBox = b.getBounds()
        return  aBox.x + aBox.width > bBox.x &&
                aBox.x < bBox.x + bBox.width &&
                aBox.y + aBox.height > bBox.y &&
                aBox.y < bBox.y + bBox.height
    }
    stageMove(delta){
		window.app.stage.pivot.x+=1
	}
}