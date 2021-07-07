namespace Helper{
    //------------- 精灵注册/定义 -------------
    export class mySprite{
        img: Image
        cb: (sprite: Sprite)=>void
        bulletoverlap: ((s: Sprite, o: Sprite)=>void)[]
        constructor(img: Image, cb: (sprite: Sprite)=>void){
            this.img = img 
            this.cb = cb
        }
    }

    export class mysprites{ 
        k: string = ""
        v: {[key: string]: mySprite; } = {}
        constructor(k: string){
            this.k = k
            this.v = {}
        }
    }

    export function setSprite(kind: mysprites, img: Image, name:string, cb:(sprite: Sprite)=>void){
        if(kind.v[name] != undefined){
            console.log("定义" + kind.k + "时发生命名冲突："+name)
            return
        }
        let sprite = new mySprite(img, cb)
        kind.v[name] = sprite
    }

    export function createSprite(kind: mysprites, name: string, x: number, y: number){
        let w = kind.v[name]
        if(w == undefined){
            console.log("创建的"+kind.k+"'"+ name + "' 未定义!")
            return null
        }
        let sprite = sprites.create(w.img.clone())
        tiles.placeOnTile(sprite, tiles.getTileLocation(x, y))
        return sprite
    }

    //------------- 精灵死亡判定 -------------
    export function isDestroyed(sprite: Sprite){
        return sprite.flags & sprites.Flag.Destroyed
    }
}