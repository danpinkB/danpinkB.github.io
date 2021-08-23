class Sky{
    constructor(){
        this.texturesloader()
        this.createTimeOut = this.createTimeOut.bind(this)
        this.cloudSwim = this.cloudSwim.bind(this)  
        this.randomInterval = Math.floor(Math.random()*3)
        window.ticker.add(this.cloudSwim)
        window.ticker.add(this.createTimeOut)
       
    }
    texturesloader(){
        this.downLoading = this.downLoading.bind(this);
        this.downLoading()
    }
    downLoading(){
        this.sheet = PIXI.Loader.shared.resources["res/track/sky.jpg"];
        this.createSky()
    }
    createSky(){
        this.Sprite = new PIXI.Sprite(this.sheet.texture)
        this.Sprite.x=0
        this.Sprite.y=0
        this.Sprite.width = window.innerWidth
        this.Sprite.height = window.innerHeight/2
        this.deletedCloud = []
        this.clouds = []

        app.stage.addChild(this.Sprite);
        
        for (let i = 0; i < 6; i++){   
            let cloud = new Cloud()
            this.deletedCloud.push(cloud)
        }
    }
    createTimeOut(delta){
        
        this.randomInterval -=(delta/100)
        
        if(this.randomInterval<=0){
            if(this.deletedCloud.length>0){   
            
                let cloud = this.deletedCloud.shift()
                cloud.Sprite.x=app.view.width+window.app.stage.pivot.x
                cloud.Sprite.y= Math.floor(Math.random()*(app.view.height/3))
                
                this.clouds.push(cloud)
                app.stage.addChild(cloud.Sprite);
                this.randomInterval = Math.floor(Math.random()*3)+2  
            }
            else{
                this.randomInterval = Math.floor(Math.random()*3)+2
            }
        }
        
    }
    
    cloudSwim(){
        this.Sprite.x=window.app.stage.pivot.x
        
        for (let i = 0; i <  this.clouds.length; i++) {
            if(this.clouds[i]){
                if(( this.clouds[i].Sprite.width+ this.clouds[i].Sprite.x)<=window.app.stage.pivot.x){
                    console.log(this.clouds[i]);
                    let deleted = this.clouds.shift()
                    this.deletedCloud.push(deleted)
                }
            }    
        }
    }
}