class Erth{
    constructor(){
        this.texturesloader()
    }
    texturesloader(){
        //console.log( PIXI.Loader.shared.stop());
        //if(){}
        //PIXI.loader.add("res/track/weed.png").load(this.downLoading);
        this.downLoading = this.downLoading.bind(this);
        this.CheckState = this.CheckState.bind(this)
        window.ticker.add(this.CheckState)
        this.downLoading()
    }
    downLoading(){
        this.sheet = PIXI.Loader.shared.resources["res/track/weed.png"];
        this.createErth()
    }
    getBounds(){
        return {x:0,y:(window.innerHeight/2)-100,width:window.innerWidth,height:120}
    }
    createErth(){
        this.Sprites = []
        for (let i = 0; i < 4; i++) {
            this.creteErthElement(i)       
        }
    }
    creteErthElement(i){
        let Sprite = new PIXI.Sprite(this.sheet.texture)
        Sprite.x=i*(window.innerWidth/3)-1
        Sprite.y=(window.innerHeight/2)-120
        Sprite.width = (window.innerWidth/3)+1
        Sprite.height = 120
        Sprite.getBounds = this.getBounds;
        app.stage.addChild(Sprite);
        this.Sprites.push(Sprite)
    }
    CheckState(){ 
        for (let i = 0; i < this.Sprites.length; i++) {
            if((this.Sprites[i].width+this.Sprites[i].x)<=window.app.stage.pivot.x){
                this.Sprites[i].x=app.view.width+window.app.stage.pivot.x
                this.Sprites[i].y=(window.innerHeight/2)-120
                //this.Sprites.shift()
            }
        }
    }
}