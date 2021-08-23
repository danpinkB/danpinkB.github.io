class Cloud{
    constructor(){
        this.texturesloader()
    }
    texturesloader(){
        //console.log( PIXI.Loader.shared.stop());
        //if(){}
        //PIXI.loader.add("res/track/weed.png").load(this.downLoading);
        this.downLoading = this.downLoading.bind(this);
        this.downLoading()  
    }
    downLoading(){
        this.sheet = PIXI.Loader.shared.resources["res/sky/cloud_1.png"];
        this.createSky()
    }
    createSky(){
        this.Sprite = new PIXI.Sprite(this.sheet.texture)
        this.Sprite.x=app.view.width
        this.Sprite.y= Math.floor(Math.random()*(app.view.height/3))
        this.Sprite.width = Math.floor(Math.random()*100)+100
        this.Sprite.height = this.Sprite.width/2
        
    }
    
}