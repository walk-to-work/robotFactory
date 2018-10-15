var stageWidth = window.innerWidth;         //ウィンドウの横幅
var stageHeight = window.innerHeight;       //ウィンドウの縦幅
localStorage.setItem('mb',1);
console.log("stageWidth:"+stageWidth+" stageHeight:"+stageHeight);
window.addEventListener("load", init);
function init(){
    var cnvsBackground = $("<canvas width="+stageWidth+" height="+stageHeight+">").appendTo("body").get(0); //背景canvasを作成    
    var stageBackground = new createjs.Stage(cnvsBackground);                                               //canvasをステージに追加
    stageBackground.enableMouseOver();  //マウスオーバー検知を付けた

    var mx = stageBackground.mouseX;    //マウスのx座標のグローバル変数
    var my = stageBackground.mouseY;    //マウスのy座標のグローバル変数

    var fieldWidth = stageWidth*0.5;    //ステージの横幅
    var fieldHeight = stageHeight*0.85;  //ステージの縦幅
    console.log("fieldWidth:"+fieldWidth+" fieldHeight:"+fieldHeight);
    
    /* ここから画像読み込み処理 */
    var Asset = {};
    Asset.assets = [
        /*  json形式読み込んでいる
            {type: "image" , name: "このソフト内での表記" , src: "ファイルのパス"}
        */
        {type: "image" , name: "tile" , src: "images/stageTile.png"},               //タイル
        {type: "image" , name: "tileOver" , src: "images/stageTileOver.png"},       //タイル色反転
        {type: "image" , name: "assemblyArea" , src: "images/itemArea.png"},        //枠
        
        {type: "image" , name: "beltUp" , src: "images/stageBeltUp.png"},          //ベルト・上
        {type: "image" , name: "beltRight" , src: "images/stageBeltRight.png"},    //ベルト・右
        {type: "image" , name: "beltBottom" , src: "images/stagebeltBottom.png"},  //ベルト・下
        {type: "image" , name: "beltLeft" , src: "images/stageBeltLeft.png"},      //ベルト・左
        {type: "image" , name: "beltUp2" , src: "images/stageBeltUp2.png"},          //ベルト・上
        {type: "image" , name: "beltRight2" , src: "images/stageBeltRight2.png"},    //ベルト・右
        {type: "image" , name: "beltBottom2" , src: "images/stagebeltBottom2.png"},  //ベルト・下
        {type: "image" , name: "beltLeft2" , src: "images/stageBeltLeft2.png"},      //ベルト・左
        


        {type: "image" , name: "startBox" , src: "images/startBox.png"},            //SB
        
        {type: "image" , name: "goalBox" , src: "images/goalBox.png"},              //GB
        {type: "image" , name: "goalBox1" , src: "images/goalBox1.png"},            //GB
        {type: "image" , name: "goalBox2" , src: "images/goalBox2.png"},            //GB
        {type: "image" , name: "goalBox3" , src: "images/goalBox3.png"},            //GB
        {type: "image" , name: "goalBox4" , src: "images/goalBox4.png"},            //GB
        {type: "image" , name: "goalBox5" , src: "images/goalBox5.png"},            //GB
        {type: "image" , name: "goalBox6" , src: "images/goalBox6.png"},            //GB
        {type: "image" , name: "goalBox7" , src: "images/goalBox7.png"},            //GB
        {type: "image" , name: "goalBox8" , src: "images/goalBox8.png"},            //GB
        {type: "image" , name: "goalBox9" , src: "images/goalBox9.png"},            //GB
        
        {type: "image" , name: "forBox" , src: "images/forBox.png"},        //繰り返し
        
        {type: "image" , name: "ifBox" , src: "images/ifBox.png"},          //条件分岐
        {type: "image" , name: "ifBoxTuFb" , src: "images/ifBoxTuFb.png"},          //条件分岐
        {type: "image" , name: "ifBoxTuFr" , src: "images/ifBoxTuFr.png"},          //条件分岐
        {type: "image" , name: "ifBoxTuFl" , src: "images/ifBoxTuFl.png"},          //条件分岐
        {type: "image" , name: "ifBoxTrFu" , src: "images/ifBoxTrFu.png"},          //条件分岐
        {type: "image" , name: "ifBoxTrFb" , src: "images/ifBoxTrFb.png"},          //条件分岐
        {type: "image" , name: "ifBoxTrFl" , src: "images/ifBoxTrFl.png"},          //条件分岐
        {type: "image" , name: "ifBoxTbFu" , src: "images/ifBoxTbFu.png"},          //条件分岐
        {type: "image" , name: "ifBoxTbFr" , src: "images/ifBoxTbFr.png"},          //条件分岐
        {type: "image" , name: "ifBoxTbFl" , src: "images/ifBoxTbFl.png"},          //条件分岐
        {type: "image" , name: "ifBoxTlFu" , src: "images/ifBoxTlFu.png"},          //条件分岐
        {type: "image" , name: "ifBoxTlFr" , src: "images/ifBoxTlFr.png"},          //条件分岐
        {type: "image" , name: "ifBoxTlFb" , src: "images/ifBoxTlFb.png"},          //条件分岐
        
        {type: "image" , name: "nonBox" , src: "images/nonBox.png"},          //条件分岐


        {type: "image" , name: "paintBox" , src: "images/paintBox.png"},    //色塗り
        {type: "image" , name: "paintBoxBlue" , src: "images/paintBoxBlue.png"},    //色塗り
        {type: "image" , name: "paintBoxRed" , src: "images/paintBoxRed.png"},    //色塗り
        {type: "image" , name: "paintBoxYellow" , src: "images/paintBoxYellow.png"},    //色塗り
        
        {type: "image" , name: "dustBox" , src: "images/dustBox.png"},            //ゴミ箱
        {type: "image" , name: "chargeBox" , src: "images/chargeBox.png"},  //充電
        
        {type: "image" , name: "startButton" , src: "images/startButton.png"},      //スタートボタン
        {type: "image" , name: "stopButton" , src: "images/stopButton.png"},        //ストップボタン
        {type: "image" , name: "menuButton" , src: "images/menuButton.png"},        //メニューボタン
        {type: "image" , name: "discontinuationButton" , src: "images/discontinuationButton.png"},        //メニューボタン
        
        {type: "image" , name: "editButton" , src: "images/editButton.png"},        //メニューボタン
        {type: "image" , name: "editButtonOn" , src: "images/editButtonOn.png"},        //メニューボタン
        {type: "image" , name: "eraceButton" , src: "images/eraceButton.png"},        //メニューボタン
        {type: "image" , name: "eraceButtonOn" , src: "images/eraceButtonOn.png"},        //メニューボタン
        {type: "image" , name: "craneButton" , src: "images/craneButton.png"},        //メニューボタン
        {type: "image" , name: "craneButtonOn" , src: "images/craneButtonOn.png"},        //メニューボタン
        
        


        {type: "image" , name: "robotHead" , src: "images/robotHead.png"},              //ロボットの頭・黄
        {type: "image" , name: "robotHeadBlue" , src: "images/robotHeadBlue.png"},      //ロボットの頭・青
        {type: "image" , name: "robotHeadRed" , src: "images/robotHeadRed.png"},        //ロボットの頭・赤
        {type: "image" , name: "robotHeadYellow" , src: "images/robotHeadYellow.png"},  //ロボットの頭・黄
        
        

        {type: "image" , name: "robotBody" , src: "images/robotBody.png"},        //ロボットの胴体・青・0
        
        {type: "image" , name: "robotBody0" , src: "images/robotBody0.png"},        //ロボットの胴体・青・0
        {type: "image" , name: "robotBody1" , src: "images/robotBody1.png"},        //ロボットの胴体・青・1
        {type: "image" , name: "robotBody2" , src: "images/robotBody2.png"},        //ロボットの胴体・青・2
        {type: "image" , name: "robotBody3" , src: "images/robotBody3.png"},        //ロボットの胴体・青・3
        {type: "image" , name: "robotBodyOut" , src: "images/robotBodyOut.png"},    //ロボットの胴体・青・過充電
        
        {type: "image" , name: "robotBodyBlue0" , src: "images/robotBodyBlue0.png"},        //ロボットの胴体・青・0
        {type: "image" , name: "robotBodyBlue1" , src: "images/robotBodyBlue1.png"},        //ロボットの胴体・青・1
        {type: "image" , name: "robotBodyBlue2" , src: "images/robotBodyBlue2.png"},        //ロボットの胴体・青・2
        {type: "image" , name: "robotBodyBlue3" , src: "images/robotBodyBlue3.png"},        //ロボットの胴体・青・3
        {type: "image" , name: "robotBodyBlueOut" , src: "images/robotBodyBlueOut.png"},    //ロボットの胴体・青・過充電
        
        {type: "image" , name: "robotBodyYellow0" , src: "images/robotBodyYellow0.png"},      //ロボットの胴体・黄・0
        {type: "image" , name: "robotBodyYellow1" , src: "images/robotBodyYellow1.png"},      //ロボットの胴体・黄・1
        {type: "image" , name: "robotBodyYellow2" , src: "images/robotBodyYellow2.png"},      //ロボットの胴体・黄・2
        {type: "image" , name: "robotBodyYellow3" , src: "images/robotBodyYellow3.png"},      //ロボットの胴体・黄・3
        {type: "image" , name: "robotBodyYellowOut" , src: "images/robotBodyYellowOut.png"},  //ロボットの胴体・黄・過充電
       
        {type: "image" , name: "robotBodyRed0" , src: "images/robotBodyRed0.png"},      //ロボットの胴体・赤・0
        {type: "image" , name: "robotBodyRed1" , src: "images/robotBodyRed1.png"},      //ロボットの胴体・赤・1
        {type: "image" , name: "robotBodyRed2" , src: "images/robotBodyRed2.png"},      //ロボットの胴体・赤・2
        {type: "image" , name: "robotBodyRed3" , src: "images/robotBodyRed3.png"},      //ロボットの胴体・赤・3
        {type: "image" , name: "robotBodyRedOut" , src: "images/robotBodyRedOut.png"},  //ロボットの胴体・赤・過充電
       
        {type: "image" , name: "robotRightArm" , src: "images/robotRightArm.png"},  //ロボットの右手・黄
        {type: "image" , name: "robotRightArmBlue" , src: "images/robotRightArmBlue.png"},      //ロボットの右手・青
        {type: "image" , name: "robotRightArmRed" , src: "images/robotRightArmRed.png"},        //ロボットの右手・赤
        {type: "image" , name: "robotRightArmYellow" , src: "images/robotRightArmYellow.png"},  //ロボットの右手・黄

        {type: "image" , name: "robotLeftArm" , src: "images/robotLeftArm.png"},    //ロボットの左手・赤
        {type: "image" , name: "robotLeftArmBlue" , src: "images/robotLeftArmBlue.png"},     //ロボットの左手・青
        {type: "image" , name: "robotLeftArmYellow" , src: "images/robotLeftArmYellow.png"},    //ロボットの左手・黄
        {type: "image" , name: "robotLeftArmRed" , src: "images/robotLeftArmRed.png"},    //ロボットの左手・赤
                
        {type: "image" , name: "robotLegBlue" , src: "images/robotLegBlue.png"},        //ロボットの左手・青
        {type: "image" , name: "robotLegRed" , src: "images/robotLegRed.png"},          //ロボットの左手・赤
        {type: "image" , name: "robotLegYellow" , src: "images/robotLegYellow.png"},    //ロボットの左手・黄
        {type: "image" , name: "robotLeg", src: "images/robotLeg.png"},    //ロボットの左手・黄

        {type: "image" , name: "undefinedParts" , src: "images/undefinedParts.png"},        //「せっけいず」


        {type: "image" , name: "sekkeizu" , src: "images/sekkeizu.png"},        //「せっけいず」
        {type: "image" , name: "kumitateba" , src: "images/kumitateba.png"},    //「くみたてず」
        
        {type: "image" , name: "clearImage" , src: "images/clearImage.png"},    //「くみたてず」
        {type: "image" , name: "failedImage" , src: "images/failedImage.png"},    //「くみたてず」
        {type: "image" , name: "stopImage" , src: "images/stopImage.png"},    //「くみたてず」
        {type: "image" , name: "yazirusi" , src: "images/yazirusi.png"},

        {type: "image" , name: "test" , src: "images/test.png"}
        
    ];
    Asset.images = {};  //読み込んだ画像を格納する配列
    Asset.loadAssets = function(onComplete){
        var total = Asset.assets.length;    //アセットの合計数
        var loadCount = 0;                  //読み込み完了したアセット数
        var onLoad = function(){
            loadCount++;                    //読み込み完了数を１増やす
            if(loadCount >= total){
                //すべての読み込みが終わった
                onComplete();
            }
        }
        Asset.assets.forEach(function(asset){
            switch(asset.type){
                case 'image':
                    Asset._loadImage(asset ,onLoad);
                    break;
            }
        });
    };
    Asset._loadImage = function(asset , onLoad){
        var image = new Image();
        image.src = asset.src;
        image.onload = onLoad;
        Asset.images[asset.name] = image;
    };
    /* ここまで画像読み込み処理 */

    //画像を読み込んだら実行
    Asset.loadAssets(function(){
        
        /* ステージのパラメータ等の宣言 */

        var tileNumWidth = 10;                                  //タイルの横の枚数
        var tileNumHeight = 10;                                 //タイルの縦の枚数
        var tileWidth = fieldWidth/tileNumWidth;                //タイルの横幅(フィールドの大きさ/タイル横の枚数)
        var tileHeight = fieldHeight/tileNumHeight;             //タイルの縦幅(フィールドの大きさ/タイル縦の枚数)
        console.log("tileWidth:"+tileWidth+" tileHeight:"+tileHeight);
        var tileField = new createjs.Container();               //タイルを格納するコンテナの宣言
        stageBackground.addChild(tileField);                    //コンテナを背景ステージに格納     
        
        
       

        var quantityAreaX = ( stageWidth - fieldWidth ) + (stageWidth * 0.01);
        var quantityAreaY = stageHeight * 0.01;
        var quantityAreaHeight = stageHeight * 0.95;
        var quantityAreaWidth = (stageWidth - fieldWidth) * 0.3;
        var quantityType = 8;           //取れるやつの種類        
        var quantityBoxHeight = quantityAreaHeight / quantityType;
        var quantityBoxWidth = quantityAreaWidth / 3;
        var quatityBoxContainer = new createjs.Container();
        stageBackground.addChild(quatityBoxContainer);
        var quantityArea = new Array(quantityType);

        var waitPartsAreaX = quantityAreaX + quantityAreaWidth;
        var waitPartsAreaY = stageHeight * 0.01;
        var waitPartsAreaWidth = (stageWidth - fieldWidth) *0.1;
        var waitPartsAreaHeight = stageHeight * 0.95;
        var waitBoxWidth = waitPartsAreaWidth * 0.99;
        var waitBoxHeight = waitPartsAreaHeight / 8;
        var waitPartsWidth =  waitBoxWidth * 0.8;
        var waitPartsHeight =  waitBoxHeight * 0.8;
 
        var assemblyAreaY = stageHeight * 0.01;
        var assemblyAreaX = waitPartsAreaX + waitPartsAreaWidth  + (stageWidth * 0.01 );
        var assemblyAreaHeight = stageHeight * 0.95;               
        var assemblyAreaWidth = (stageWidth - fieldWidth) *0.4;
        var assemblyTileHeight = assemblyAreaHeight / 9;
        var assemblyTileWidth = assemblyAreaWidth / 3;
        var assemblyContainer = new createjs.Container;
        stageBackground.addChild(assemblyContainer);

        var takingModuleBox = new createjs.Bitmap(Asset.images["test"]);
        takingModuleBox.scaleX = tileWidth / takingModuleBox.getBounds().width; 
        takingModuleBox.scaleY = tileHeight / takingModuleBox.getBounds().height; 
        takingModuleBox.alpha = 0.5;
        var takingModuleBoxHitObject = new createjs.Shape();
        takingModuleBoxHitObject.graphics.beginFill("#000000").drawRect(0, 0 , stageWidth, stageHeight);
        takingModuleBox.hitArea = takingModuleBoxHitObject;     

        var partsHeight = tileHeight/2;                         //パーツの縦幅
        var partsWidth = tileWidth/2;                           //パーツの横幅
        var speedX = tileWidth/10;                              //移動中のパーツの横に進む速度
        var speedY = tileHeight/10;                             //移動中のパーツの縦に進む速度
        var ifPartsWidth = tileWidth * 6 / 11;
        var ifPartsHeight = tileHeight * 6 / 11;
        
        var itemContainer = new createjs.Container();
        stageBackground.addChild(itemContainer);

        var partsContainer = new createjs.Container();
        stageBackground.addChild(partsContainer);

        var bluePrintContainer = new createjs.Container();
        stageBackground.addChild(bluePrintContainer);

        var workSpaceContainer = new createjs.Container();
        stageBackground.addChild(workSpaceContainer);

        var waitAreaContainer = new createjs.Container();
        stageBackground.addChild(waitAreaContainer);

        var userMode = 0;
        /* ここまでステージのパラメータ等の宣言 */

        /* クラスの定義 */

          //座標クラス
        class point{
            constructor(y,x){
                this.y = y;
                this.x = x;
            }

            getPoint(){
                this.x = Math.floor(mx/tileWidth);
                this.y = Math.floor(my/tileHeight);
            }
        }

        //タイルエリアのボックス等のスーパークラス
        class boxClass{
            constructor(exist,portal,exit,what,y,x){
                this.exist  = exist;        //存在するか true or false
                this.portal = portal;       //入口 
                this.exit   = exit;         //出口
                this.what   = what;         //何か    
                this.p      = new point(y,x);
            }

            //通過したパーツの座標を調整する関数
            moveParts(parts){
                switch(Number(this.exit)){
                    case 0:
                        parts.cimg.y = this.cimg.y - partsHeight;
                        parts.cimg.x = this.cimg.x + (tileWidth / 2) - (partsWidth / 2);
                        break;
                    case 1:
                        parts.cimg.x = this.cimg.x + tileWidth;
                        parts.cimg.y = this.cimg.y + (tileHeight / 2) - (partsHeight / 2);
                        break;
                    case 2:
                        parts.cimg.x = this.cimg.x + (tileWidth / 2) - (partsWidth / 2);
                        parts.cimg.y = this.cimg.y + tileHeight;
                        break;
                    case 3:
                        parts.cimg.x = this.cimg.x - partsWidth;
                        parts.cimg.y = this.cimg.y + (tileHeight / 2) - (partsHeight / 2);                    
                        break;
                    default:
                        break;                
                }
            }
            
            setImage(){
                this.setCImage(this.changeImage());
            }
            
            initBox(){
                this.setFunction(this.setImage());

            }

            changeImage(){
                switch(this.what){
                    case 0:
                        switch(this.exit){
                            case 0:
                                this.img = Asset.images["beltUp"];
                                break;
                            case 1:
                                this.img = Asset.images["beltRight"];
                                break;
                            case 2:
                                this.img = Asset.images["beltBottom"];
                                break;
                            case 3:
                                this.img = Asset.images["beltLeft"];
                                break;                       
                        }
                        break;
                    
                    case 1:
                        this.img = Asset.images["startBox"];
                        break;
                    case 2:
                        this.img = Asset.images["goalBox"];
                        break;
                    case 3:
                        this.img = Asset.images["paintBox"];
                        break;
                    case 4:
                        this.img = Asset.images["ifBox"];
                        break;
                    case 5:
                        this.img = Asset.images["forBox"];
                        break;
                    case 6:
                        this.img = Asset.images["dustBox"];
                        break;
                    case 7:
                        this.img = Asset.images["chargeBox"];
                        break;
                    default:
                        this.img = Asset.images["test"];    //debug
                        break;
                }
            }

            setCImage(){
                this.cimg = new createjs.Bitmap(this.img);
                this.cimg.scaleX = tileWidth / this.cimg.getBounds().width;
                this.cimg.scaleY = tileHeight / this.cimg.getBounds().height;
                this.cimg.x = this.p.x * tileWidth;
                this.cimg.y = this.p.y * tileHeight    
                this.hitObject = new createjs.Shape();
                let w = this.img.width;
                let h = this.img.height;

                this.hitObject.graphics.beginFill("#000000").drawRect( 0 , 0 , w , h );
                console.log("w:"+ w + " h:"+h);
                this.cimg.hitArea = this.hitObject;
            }

            changeCImage(){
                this.cimg.image = this.img;
            }
            
            addImage(){
                itemContainer.addChild(this.cimg);
                //itemContainer.addChild(this.hitObject);
            }

            removeImage(){
                itemContainer.removeChild(this.cimg);
            }

            setFunction(){
                let p = this.p;
                this.cimg.addEventListener("click",function(){editBox(p)});
            }
        }

        //ベルトのクラス
        class beltClass extends boxClass {
            constructor(exist,portal,exit,what,y,x){
                super(exist,portal,exit,what,y,x);
                this.roll = 1;
            }

            setFunction(){
                let p = this.p;
                this.cimg.addEventListener("click",function(){editBelt(p)});
            }

            rollBelt(){
                this.roll *= -1;
                this.changeCImage(this.changeImage());
            }

            changeImage(){
                switch(this.exit){
                    case 0:
                        if(this.roll == 1)
                            this.img = Asset.images["beltUp"];
                        else
                            this.img = Asset.images["beltUp2"];
                        break;
                              
                    case 1:
                        if(this.roll == 1)
                            this.img = Asset.images["beltRight"];
                        else
                            this.img = Asset.images["beltRight2"];
                        break;
                    case 2:
                        if(this.roll == 1)
                            this.img = Asset.images["beltBottom"];
                        else
                            this.img = Asset.images["beltBottom2"];
                        break;
                    case 3:
                        if(this.roll == 1)
                            this.img = Asset.images["beltLeft"];
                        else   
                            this.img = Asset.images["beltLeft2"];
                        break;
                    default:
                        break;
                }
            }
            
           
        }
        
        //スタートボックスのクラス
        class startBoxClass extends boxClass{
            changeImage(){
                this.img = Asset.images["startBox"];
            }
        }

        //ゴールボックスのクラス
        class goalBoxClass extends boxClass{
            constructor(exist,portal,exit,what,y,x,address){
                super(exist,portal,exit,what,y,x);
                this.address = address;
            }
    
            changeAddress(num){
                this.address = num;
                this.changeCImage(this.changeImage());
            }

            changeImage(){
                switch(this.address){
                    case 0:
                        this.img = Asset.images["goalBox1"];
                        break;
                    case 1:
                        this.img = Asset.images["goalBox2"];
                        break;
                    case 2:
                        this.img = Asset.images["goalBox3"];
                        break;
                    case 3:
                        this.img = Asset.images["goalBox4"];
                        break;
                    case 4:
                        this.img = Asset.images["goalBox5"];
                        break;
                    case 5:
                        this.img = Asset.images["goalBox6"];
                        break;
                    case 6:
                        this.img = Asset.images["goalBox7"];
                        break;
                    case 7:
                        this.img = Asset.images["goalBox8"];
                        break;
                    case 8:
                        this.img = Asset.images["goalBox9"];
                        break;
                    default:
                        this.img = Asset.images["goalBox"];
                        break;
                }
            }

            setFunction(){
                let p = this.p;
                this.cimg.addEventListener("click",function(){editGoalBox(p)});
            }
        }

        //ペイントボックスのクラス
        class paintBoxClass extends boxClass{
            constructor(exist,portal,exit,what,y,x,color){
                super(exist,portal,exit,what,y,x);
                this.color = color;     //変える色
            }

            changeImage(){
                switch(this.color){
                    case 0:
                        this.img = Asset.images["paintBoxBlue"];
                        break;
                    case 1:
                        this.img = Asset.images["paintBoxRed"];
                        break;
                    case 2:
                        this.img = Asset.images["paintBoxYellow"];
                        break;
                    default:
                        this.img = Asset.images["paintBox"];
                }
            }
            
            changeBoxColor(c){
                this.color = c;
                this.changeCImage(this.changeImage());
            }

            changePartsColor(p){
                p.color = this.color;
                p.changeCImage(p.changeImage());
            }
            
            setFunction(){
                let p = this.p;
                this.cimg.addEventListener("click",function(){editPaintBox(p)});
            }

        }

        //条件分岐ボックスのクラス
        class ifBoxClass extends boxClass{
            constructor(exist,portal,exit,what,y,x,type,trueRoot,falseRoot){
                super(exist,portal,exit,what,y,x);
                this.type = type;
                this.trueRoot = trueRoot;
                this.falseRoot = falseRoot;
            }
            
            setImage(){
                this.setPartsImg(this.setCImage(this.changeImage()));
            }

            setPartsImg(){
                this.parts = new ifPartsClass(this.type,null,null);
                this.parts.setImage();
                this.parts.setPoint( this.p ); 
            }

            changeImage(){
                switch(this.trueRoot){
                    case 0:
                        switch(this.falseRoot){
                            case 1:
                                this.img = Asset.images["ifBoxTuFr"];
                                break;
                            case 2:
                                this.img = Asset.images["ifBoxTuFb"];
                                break;
                            case 3:
                                this.img = Asset.images["ifBoxTuFl"];
                                break;
                            default:
                                this.img = Asset.images["test"];
                                break;
                        }
                        break;
                    case 1:
                        switch(this.falseRoot){
                            case 0:
                                this.img = Asset.images["ifBoxTrFu"];
                                break;
                            case 2:
                                this.img = Asset.images["ifBoxTrFb"];
                                break;
                            case 3:
                                this.img = Asset.images["ifBoxTrFl"];
                                break;
                            default:
                                this.img = Asset.images["test"];
                                break;
                        }
                        break;
                    case 2:
                        switch(this.falseRoot){
                            case 0:
                                this.img = Asset.images["ifBoxTbFu"];
                                break;
                            case 1:
                                this.img = Asset.images["ifBoxTbFr"];
                                break;
                            case 3:
                                this.img = Asset.images["ifBoxTbFl"];
                                break;
                            default:
                                this.img = Asset.images["test"];
                                break;
                        }
                        break;
                    case 3:
                        switch(this.falseRoot){
                            case 0:
                                this.img = Asset.images["ifBoxTlFu"];
                                break;
                            case 1:
                                this.img = Asset.images["ifBoxTlFr"];
                                break;
                            case 2:
                                this.img = Asset.images["ifBoxTlFb"];
                                break;
                            default:
                                this.img = Asset.images["test"];
                                break;
                        }
                        break;
                    default:
                        this.img = Asset.images["ifBox"];
                        break;
                }
            }

            checkRoot(boxtype){
                if(boxtype == this.type){
                    this.exit = this.trueRoot;
                }
                else{
                    this.exit = this.falseRoot;
                }
            }

            changeRoot(type,trueRoot,falseRoot){
                this.type     = type;
                this.trueRoot = trueRoot;
                this.falseRoot = falseRoot;
                this.changeCImage(this.changeImage());
                this.parts.type = this.type;
                this.parts.changeCImage(this.parts.changeImage());
                
            }
            
            setFunction(){
                let p = this.p;
                this.cimg.addEventListener("click",function(){editIfBox(p)});
            }
            
            addImage(){
                super.addImage();
                itemContainer.addChild(this.parts.cimg);
            }

            removeImage(){
                super.removeImage();
                itemContainer.removeChild(this.parts.cimg);
            }
        }

        //繰り返しボックスのクラス
        class forBoxClass extends boxClass{
            constructor(exist,portal,exit,what,y,x,num,trueRoot,falseRoot){
                super(exist,portal,exit,what,y,x);
                this.counter = 0;
                this.num = num;
                this.trueRoot = trueRoot;
                this.falseRoot = falseRoot;
            }

            reloadTxt(){
                this.ctxt.text = Number(this.counter) + "<" + Number(this.num);
            }

            setTxt(){
                this.rect = new createjs.Shape();
                this.rect.graphics.beginFill("#FFFFFF").drawRect(this.p.x * tileWidth  + (tileWidth * 1 / 6), this.p.y * tileHeight + (tileHeight * 1 / 3) , tileWidth * 4 / 6 , tileHeight * 1 / 3 );
                this.ctxt = new createjs.Text( "" , (tileHeight / 4) +"px serif", "Black");
                this.reloadTxt();
                this.ctxt.textAlign = "left";
                this.ctxt.x = this.p.x * tileWidth  + (tileWidth * 1 / 8);
                this.ctxt.y = this.p.y * tileHeight + (tileHeight * 1 / 3);
            }

            check(){
                if(this.counter < this.num ){
                    this.counter++;
                    this.exit = this.falseRoot;
                }
                else{
                    this.exit = this.trueRoot;
                }
            }

            initBox(){
                this.setTxt(this.setFunction(this.setImage()));
            }

            changeRoot(t,f,n){
                this.trueRoot = t;
                this.falseRoot = f;
                this.num = n;
                this.changeCImage(this.changeImage());
                this.reloadTxt();
            }
            
            addImage(){
                super.addImage();
                itemContainer.addChild(this.rect);
                itemContainer.addChild(this.ctxt);
                
            }

            setFunction(){
                let p = this.p;
                this.cimg.addEventListener("click",function(){editForBox(p)});
            }

            changeImage(){
                switch(this.trueRoot){
                    case 0:
                        switch(this.falseRoot){
                            case 1:
                                this.img = Asset.images["ifBoxTuFr"];
                                break;
                            case 2:
                                this.img = Asset.images["ifBoxTuFb"];
                                break;
                            case 3:
                                this.img = Asset.images["ifBoxTuFl"];
                                break;
                            default:
                                this.img = Asset.images["test"];
                                break;
                        }
                        break;
                    case 1:
                        switch(this.falseRoot){
                            case 0:
                                this.img = Asset.images["ifBoxTrFu"];
                                break;
                            case 2:
                                this.img = Asset.images["ifBoxTrFb"];
                                break;
                            case 3:
                                this.img = Asset.images["ifBoxTrFl"];
                                break;
                            default:
                                this.img = Asset.images["test"];
                                break;
                        }
                        break;
                    case 2:
                        switch(this.falseRoot){
                            case 0:
                                this.img = Asset.images["ifBoxTbFu"];
                                break;
                            case 1:
                                this.img = Asset.images["ifBoxTbFr"];
                                break;
                            case 3:
                                this.img = Asset.images["ifBoxTbFl"];
                                break;
                            default:
                                this.img = Asset.images["test"];
                                break;
                        }
                        break;
                    case 3:
                        switch(this.falseRoot){
                            case 0:
                                this.img = Asset.images["ifBoxTlFu"];
                                break;
                            case 1:
                                this.img = Asset.images["ifBoxTlFr"];
                                break;
                            case 2:
                                this.img = Asset.images["ifBoxTlFb"];
                                break;
                            default:
                                this.img = Asset.images["test"];
                                break;
                        }
                        break;
                    default:
                        this.img = Asset.images["nonBox"];
                        break;
                }
            }

            removeImage(){
                super.removeImage();
                itemContainer.removeChild(this.rect);
                itemContainer.removeChild(this.ctxt);
            }
            
            resetCount(){
                console.log(this.counter);
                this.counter = 0;
                console.log(this.counter);
                this.reloadTxt();
            }
            
        }

        //ゴミ箱のクラス
        class dustBoxClass extends boxClass{
            changeImage(){
                this.img = Asset.images["dustBox"];
            }
        }

        class chargeBoxClass extends boxClass{
            changeImage(){
                this.img = Asset.images["chargeBox"];
            }
        }

        //パーツのクラス
        class partsClass{
            constructor(type,color,charge){
                this.type   = type;             //パーツが何かを表す
                this.color  = color;            //パーツの色を表す
                this.charge = charge;           //充電量
            }
            
            //不可視化する関数
            invisible(){                
                this.cimg.alpha = 0;
            }
            
            //可視化する関数
            visible(){
                this.cimg.alpha = 1;
            }

            setImage(){
                this.setCImage(this.changeImage());
            }

            //画像を割り当てる関数
            changeImage(){
                switch(this.type){
                    case 0:
                        switch(this.color){
                            case 0:
                                this.img = Asset.images["robotHeadBlue"]
                                break;
                            case 1:
                                this.img = Asset.images["robotHeadRed"];
                                break;
                            case 2:
                                this.img = Asset.images["robotHeadYellow"];
                                break;
                            default:
                                this.img = Asset.images["robotHead"];    //debug
                                break;
                        }
                        break;
                    case 1:
                        console.log(this.color);
                        switch(this.color){
                            case 0:
                                console.log("charge:"+this.charge);
                                switch(this.charge){
                                    case 0:
                                        this.img = Asset.images["robotBodyBlue0"];
                                        break;
                                    case 1:
                                        this.img = Asset.images["robotBodyBlue1"];
                                        break;
                                    case 2:
                                        this.img = Asset.images["robotBodyBlue2"];
                                        break;
                                    case 3:
                                        this.img = Asset.images["robotBodyBlue3"];
                                        break;
                                    default:
                                        this.img = Asset.images["robotBodyBlueOut"];
                                        break;
                                }
                                break;
                                
                            case 1:
                                switch(this.charge){
                                    case 0:
                                        this.img = Asset.images["robotBodyRed0"];
                                        break;
                                    case 1:
                                        this.img = Asset.images["robotBodyRed1"];
                                        break;
                                    case 2:
                                        this.img = Asset.images["robotBodyRed2"];
                                        break;
                                    case 3:
                                        this.img = Asset.images["robotBodyRed3"];
                                        break;
                                    default:
                                        this.img = Asset.images["robotBodyRedOut"];
                                        break;
                                }
                                break;
                        
                            case 2:
                                switch(this.charge){
                                    case 0:
                                        this.img = Asset.images["robotBodyYellow0"];
                                        break;
                                    case 1:
                                        this.img = Asset.images["robotBodyYellow1"];
                                        break;
                                    case 2:
                                        this.img = Asset.images["robotBodyYellow2"];
                                        break;
                                    case 3:
                                        this.img = Asset.images["robotBodyYellow3"];
                                        break;
                                    default:
                                        this.img = Asset.images["robotBodyYellowout"];
                                        break;
                                }
                                break;
                                
                            default:
                                console.log("done");
                                switch(this.charge){
                                    case 0:
                                        this.img = Asset.images["robotBody0"];
                                        break;
                                    case 1:
                                        this.img = Asset.images["robotBody1"];
                                        break;
                                    case 2:
                                        this.img = Asset.images["robotBody2"];
                                        break;
                                    case 3:
                                        this.img = Asset.images["robotBody3"];
                                        break;
                                    default:
                                        this.img = Asset.images["robotBodyOut"];
                                        break;
                                }
                                break;
                                
                        }
                        break;
                    case 2:                       
                        switch(this.color){
                            case 0:
                                this.img = Asset.images["robotRightArmBlue"];
                                break;
                            case 1:
                                this.img = Asset.images["robotRightArmRed"];
                                break;
                            case 2:
                                this.img = Asset.images["robotRightArmYellow"];
                                break;
                            default:
                                this.img = Asset.images["robotRightArm"];
                                break;
                        }
                        
                        break;
                    case 3:
                        
                        switch(this.color){
                            case 0:
                                this.img = Asset.images["robotLeftArmBlue"];
                                break;
                            case 1:
                                this.img = Asset.images["robotLeftArmRed"];
                                break;
                            case 2:
                                this.img = Asset.images["robotLeftArmYellow"];
                                break;
                            default:
                                this.img = Asset.images["robotLeftArm"];
                               
                                break;
                        }
                        break;
                    case 4:
                        
                        switch(this.color){
                            case 0:
                                this.img = Asset.images["robotLegBlue"];
                                break;
                            case 1:
                                this.img = Asset.images["robotLegRed"];
                                break;
                            case 2:
                                this.img = Asset.images["robotLegYellow"];
                                break;
                            default:
                                this.img = Asset.images["robotLeg"];
                                break;
                        }
                        break;
                    default:
                        this.img = Asset.images["test"];
                        break;
                }
            }
            
            changeCImage(){
                this.cimg.image = this.img;
            }

            setCImage(){
                this.cimg = new createjs.Bitmap(this.img);      
                this.cimg.scaleX = partsWidth / this.cimg.getBounds().width;
                this.cimg.scaleY = partsHeight / this.cimg.getBounds().height;  
            }

            setPoint(p){
                this.putCImage(this.changePoint(p));
            }

            changePoint(p){
                this.p = p;
            }

            putCImage(){
                this.cimg.x = Math.floor(this.p.x * tileWidth + (tileWidth / 2 ) - (partsWidth / 2));
                this.cimg.y = Math.floor(this.p.y * tileHeight + (tileHeight / 2) - ( partsHeight / 2));                
                
            }

            removeImage(){
                partsContainer.removeChild(this.cimg);
            }
          




        }

        //条件分岐ボックス内のパーツのクラス
        class ifPartsClass extends partsClass{
            changeImage(){
                switch(this.type){
                    case 0:
                        this.img = Asset.images["robotHead"];
                        break;
                    case 1:
                        this.img = Asset.images["robotBody"];
                        break;
                    case 2:
                        this.img = Asset.images["robotRightArm"];
                        break;
                    case 3:
                        this.img = Asset.images["robotLeftArm"];
                        break;
                    case 4:
                        this.img = Asset.images["robotLeg"];
                        break;
                    default:
                        this.img = Asset.images["undefinedParts"];
                        break;
                }
            }

            setCImage(){
                this.cimg = new createjs.Bitmap(this.img);      
                this.cimg.scaleX = ifPartsWidth / this.cimg.getBounds().width;
                this.cimg.scaleY = ifPartsHeight / this.cimg.getBounds().height;  
            }

            putCImage(){
                this.cimg.x = Math.floor(this.p.x * tileWidth + (tileWidth / 2 ) - (ifPartsWidth / 2));
                this.cimg.y = Math.floor(this.p.y * tileHeight + (tileHeight / 2) - ( ifPartsHeight / 2));                
                
            }
        }

        //組み立てエリアのパーツのクラス
        class assemblyPartsClass extends partsClass{
            constructor(type,color,charge,exist){
                super(type,color,charge);
                this.exist = exist;
            }

            setCImage(){
                console.log(this.img);
                this.cimg = new createjs.Bitmap(this.img);       
                this.cimg.scaleX = assemblyTileWidth / this.cimg.getBounds().width;
                this.cimg.scaleY = assemblyTileHeight / this.cimg.getBounds().height;
            }

            removeImage(){
                workSpaceContainer.removeChild(this.cimg);
            }

        }

        //ボックス等の残量のクラス
        class quantityClass{
            constructor(quantity,what){
                this.quantity = quantity;
                this.what = what;
            }
            
            setTxt(){
                this.txt = new createjs.Text( "" , quantityBoxWidth+"px serif", "Black");
                this.txt.textBaseline = "start";
                this.reloadTxt();
            }

            reloadTxt(){
                this.txt.text = "×"+this.quantity;
            }

            take(){
                this.quantity--;
                this.reloadTxt();
            }

            put(){
                this.quantity++;
                this.reloadTxt();
            }

            setCImage(){
                this.cimg = new createjs.Bitmap(this.img);
                this.cimg.scaleX = quantityBoxWidth / this.cimg.getBounds().width;       
                this.cimg.scaleY = quantityBoxHeight / this.cimg.getBounds().height;
                console.log("setC");
            }

            changeImage(){
                switch(this.what){
                    case 0:
                        this.img = Asset.images["beltRight"];
                        break;
                    case 1:
                        this.img = Asset.images["startBox"];
                        break;
                    case 2:
                        this.img = Asset.images["goalBox"];
                        break;
                    case 3:
                        this.img = Asset.images["paintBox"];
                        break;
                    case 4:
                        this.img = Asset.images["ifBox"];
                        break;
                    case 5:
                        this.img = Asset.images["forBox"];
                        break;
                    case 6:
                        this.img = Asset.images["dustBox"];
                        break;
                    case 7:
                        this.img = Asset.images["chargeBox"];
                        break;
                    default:
                        this.img = Asset.images["test"];    //debug
                        break;
                }
            }

            initBox(){
                this.setCImage(this.changeImage());
                this.reloadTxt(this.setTxt());
            }
        }

        //読み込みデータのクラス
        class loadDataClass{
            constructor(fieldStatus,quantityNum,bluePrint,partsQueue,workSpace){
                this.fieldStatus = fieldStatus;
                this.quantityNum = quantityNum;
                this.bluePrint = bluePrint;
                this.partsQueue = partsQueue;
                this.workSpace = workSpace;
            }
        }

        /* ここまでクラス宣言 */

        var tiles = new Array(tileNumHeight);                   //タイルの配列
        for(let i = 0; i < tileNumHeight; i++) {    
            var tmp = new Array(tileNumWidth);
            tiles[i] = tmp;
        }
        
        var stageNumber = Number(sessionStorage.getItem('stageNumber'));
        console.log("stageNumber"+stageNumber);
        var fieldStatus;
        var partsQueue;
        var quantityNum;
        var movePartsQueue = new Queue();
        var waitPartsArray = new Array();
        var bluePrint;
        var workSpace;
        var quantityNum;
        var lD;
        initStage();

        function initStage(){
            loadStage();
            initTiles();
            initItems();
            initQuantityArea();
            initAssemblyArea();
            initWaitPartsArea();
            stageBackground.update();
        }
        
        function loadStage(){
            lD = loadTemplate(stageNumber);
            fieldStatus = lD.fieldStatus;
            quantityNum = lD.quantityNum;
            partsQueue = lD.partsQueue;
            bluePrint = lD.bluePrint;
            workSpace = lD.workSpace;
        }

        function initTiles(){
            for(let i = 0 ; i < tileNumHeight ; i++ ){
                for(let j = 0 ; j < tileNumWidth ; j++ ){
                    var tile = new createjs.Bitmap(Asset.images["tile"]);   //ファイル読み込み
                    tile.scaleX = tileWidth / tile.getBounds().width;       //タイルの横幅を変更
                    tile.scaleY = tileHeight / tile.getBounds().height;     //タイルの縦幅を変更
                    tile.x = tileWidth*j;
                    tile.y = tileHeight*i;
                    
                    tiles[i][j] = tile;
                    tiles[i][j].addEventListener("mouseover", tileMouseOver);
                    tiles[i][j].addEventListener("mouseout", tileMouseOut);
                    var tileHitObject = new createjs.Shape();
                    tileHitObject.graphics.beginFill("#000000").drawRect(0, 0, tiles[i][j].image.width, tiles[i][j].image.height);
                    tiles[i][j].hitArea = tileHitObject;
                    tileField.addChild(tiles[i][j]);
                    
                    function tileMouseOver(event){
                        tiles[i][j].image = Asset.images["tileOver"];   
                    }
    
                    function tileMouseOut(event){
                        tiles[i][j].image = Asset.images["tile"];
                    }
                    
                }
            }
        }

        function initItems(){
            for(let i = 0 ; i < tileNumHeight ; i++ ){
                for(let j = 0 ; j < tileNumWidth ; j++ ){
                    if(fieldStatus[i][j].exist == 1){
                        fieldStatus[i][j].addImage();
                    }
                }
            }
        }
        
        function initWaitPartsArea(){
            var waitAreaBack = new createjs.Shape();
            waitAreaBack.graphics.beginFill("#ffef20"); // 赤色で描画するように設定
            //waitAreaBack.alpha = 0.4;
            waitAreaBack.graphics.drawRect(waitPartsAreaX, waitPartsAreaY, waitPartsAreaWidth , waitPartsAreaHeight ) ; // 長方形を描画
            waitAreaContainer.addChild(waitAreaBack); // 表示リストに追加
            
            var waitStartBox = new createjs.Bitmap(Asset.images["startBox"]);
            waitStartBox.scaleX =  waitBoxWidth / waitStartBox.getBounds().width; 
            waitStartBox.scaleY =  waitBoxHeight / waitStartBox.getBounds().height;
            waitStartBox.x = waitPartsAreaX;
            waitStartBox.y = waitPartsAreaY;
            waitAreaContainer.addChild(waitStartBox);

            var waitYazirusi = new createjs.Bitmap(Asset.images["yazirusi"]);
            waitYazirusi.scaleX =  waitPartsWidth / waitYazirusi.getBounds().width; 
            waitYazirusi.scaleY =  waitPartsHeight / waitYazirusi.getBounds().height;
            waitYazirusi.x = waitPartsAreaX + waitBoxWidth * 0.1;
            waitYazirusi.y = waitPartsAreaY + waitBoxHeight + waitBoxHeight * 0.1;
            waitAreaContainer.addChild(waitYazirusi);
            
            drawWaitParts();
        }

        function drawWaitParts(){
            let num = partsQueue.size();
           
            for( let i = 0 ; i < num ; i++ ){
                var waitParts = partsQueue.dequeue();
                if( i != 0 ){
                    partsQueue.enqueue(waitParts);
                }
                else{
                    movePartsQueue.enqueue(waitParts);
                    waitAreaContainer.removeChild(waitParts.cimg);
                }

                waitParts.cimg.scaleX = waitPartsWidth / waitParts.cimg.getBounds().width;
                waitParts.cimg.scaleY = waitPartsHeight / waitParts.cimg.getBounds().height;

                waitParts.cimg.x = waitPartsAreaX + waitBoxWidth * 0.1;
                waitParts.cimg.y = waitPartsAreaY + waitBoxHeight + (waitBoxHeight * (i+1) );
                waitAreaContainer.addChild(waitParts.cimg);                
            }

        }
      

        function initQuantityArea(){
            for(let i = 0 ; i < quantityType ; i++ ){
                quantityArea[i] = new quantityClass(quantityNum[i],i);
                quantityArea[i].initBox();
                quantityArea[i].cimg.x = quantityAreaX;
                quantityArea[i].cimg.y = quantityAreaY + (quantityBoxHeight * i );
                quatityBoxContainer.addChild(quantityArea[i].cimg);
                quantityArea[i].cimg.addEventListener("click",function(){takeModuleBoxEvent(quantityArea[i])});
                quantityAreaHitObject = new createjs.Shape();
                quantityAreaHitObject.graphics.beginFill("#000000").drawRect(0, 0, quantityArea[i].cimg.image.width, quantityArea[i].cimg.image.height);
                quantityArea[i].cimg.hitArea = quantityAreaHitObject;
                quantityArea[i].txt.x = quantityArea[i].cimg.x + quantityBoxWidth ;
                quantityArea[i].txt.y = quantityArea[i].cimg.y + (quantityBoxHeight * 0.5);
                stageBackground.addChild(quantityArea[i].txt);    
            }

            
            function takingModuleBoxRelese(box){
                if(mx <= fieldWidth && my <= fieldHeight){
                    var bx = Math.floor(mx/tileWidth);
                    var by = Math.floor(my/tileHeight);
                    if(fieldStatus[by][bx].exist == 0){
                        var putBox;
                        switch(box.what){
                            case 0:
                                putBox = new beltClass(true,3,1,0,by,bx);
                                break;
                            case 1:
                                putBox = new startBoxClass(true,0,0,1,by,bx);
                                break;
                            case 2:
                                putBox = new goalBoxClass(true,0,0,2,by,bx,null);
                                break;
                            case 3:
                                putBox = new paintBoxClass(true,0,0,3,by,bx,null);
                                break;
                            case 4:
                                putBox = new ifBoxClass(true,0,0,4,by,bx,null,0,2);
                                break;
                            case 5:
                                putBox = new forBoxClass(true,0,0,5,by,bx,0,2,0);
                                break;
                            case 6:
                                putBox = new dustBoxClass(true,0,0,6,by,bx);
                                break;
                            case 7:
                                putBox = new chargeBoxClass(true,0,0,7,by,bx);
                                break;
                        }
                        
                        fieldStatus[by][bx] = putBox;
                        fieldStatus[by][bx].initBox();
                        fieldStatus[by][bx].addImage(); 
                        stageBackground.removeChild(takingModuleBox);
                        //stageBackground.removeChild(takingModuleBoxHitObject);
                    }
                    else{
                        alert("もうおいてあるから置けないよ");
                    }
                    
                }
                else{
                    alert("そこには置けないよ");
                }
            }
                    
            function takeModuleBoxEvent(box){ 
                if(box.quantity > 0 && mode == 0 ){
                    box.take();
                    takingModuleBox.image = box.img;
                    stageBackground.addChild(takingModuleBox);
                    takingModuleBox.removeAllEventListeners();
                    takingModuleBox.addEventListener("click",function(){takingModuleBoxRelese(box)});
                }
                else{
                    alert("もうないよ");
                }
            }
        }

        function initAssemblyArea(){
            //ゴールエリアの描画
            var assemblyAreaBack = new createjs.Shape();
            assemblyAreaBack.graphics.beginFill("Red"); // 赤色で描画するように設定
            assemblyAreaBack.alpha = 0.1;
            assemblyAreaBack.graphics.drawRect(assemblyAreaX, assemblyAreaY, assemblyTileWidth * 3 , assemblyTileHeight * 4 ) ; // 長方形を描画
            assemblyContainer.addChild(assemblyAreaBack); // 表示リストに追加
            
            for(let i = 0 ; i < 3 ; i++ ){
                for(let j = 0 ; j < 3 ; j++ ){                    
                    var assemblyAreaImage = new createjs.Bitmap(Asset.images["assemblyArea"]);
                    assemblyAreaImage.scaleX = assemblyTileWidth / assemblyAreaImage.getBounds().width;       //タイルの横幅を変更
                    assemblyAreaImage.scaleY = assemblyTileHeight / assemblyAreaImage.getBounds().height;     //タイルの縦幅を変更
                    assemblyAreaImage.x = assemblyAreaX + (assemblyTileWidth * (j));
                    assemblyAreaImage.y = assemblyAreaY + (assemblyTileHeight) * ( i + 1 );
                    assemblyContainer.addChild(assemblyAreaImage);

                    var areaNum = new createjs.Text( i*3+j+1 , assemblyTileHeight / 2 + "px serif", "Black");
                    areaNum.x = assemblyAreaX + (assemblyTileWidth * (j));
                    areaNum.y = assemblyAreaY + (assemblyTileHeight) * ( i + 1 );
                    assemblyContainer.addChild(areaNum);

                }
            }
            
            setWorkSpaceParts();

            var kumitateba = new createjs.Bitmap(Asset.images["kumitateba"]);
            kumitateba.scaleX = assemblyTileWidth * 3 / kumitateba.getBounds().width;
            kumitateba.scaleY = assemblyTileHeight / kumitateba.getBounds().height;
            kumitateba.x = assemblyAreaX;
            kumitateba.y = assemblyAreaY;
            assemblyContainer.addChild(kumitateba);
            
            var blueprintAreaBack = new createjs.Shape();
            blueprintAreaBack.graphics.beginFill("blue"); // 赤色で描画するように設定
            blueprintAreaBack.alpha = 0.1;
            blueprintAreaBack.graphics.drawRect(assemblyAreaX, assemblyAreaY + assemblyTileHeight * 5, assemblyTileWidth * 3 , assemblyTileHeight * 4 ) ; // 長方形を描画
            assemblyContainer.addChild(blueprintAreaBack); // 表示リストに追加

            //設計図の描画
            for(let i = 0 ; i < 3 ; i++ ){
                for(let j = 0 ; j < 3 ; j++ ){
                    var assemblyAreaImage = new createjs.Bitmap(Asset.images["assemblyArea"]);
                    assemblyAreaImage.scaleX = assemblyTileWidth / assemblyAreaImage.getBounds().width;       //タイルの横幅を変更
                    assemblyAreaImage.scaleY = assemblyTileHeight / assemblyAreaImage.getBounds().height;     //タイルの縦幅を変更
                    assemblyAreaImage.x = assemblyAreaX + (assemblyTileWidth * (j));
                    assemblyAreaImage.y = assemblyAreaY + (assemblyTileHeight) * ( i ) + (assemblyTileHeight * 6);
                    assemblyContainer.addChild(assemblyAreaImage);

                    let parts = bluePrint[(i*3)+j];
                    if(parts.exist == 1){    
                        parts.cimg.x = assemblyAreaX + + (assemblyTileWidth * (j));;
                        parts.cimg.y = assemblyAreaY + (assemblyTileHeight) * ( i) + ( (assemblyTileHeight * 6));
                        bluePrintContainer.addChild(parts.cimg);
                    }
                    
                    
                    
                }
            }
            
            var sekkeizu = new createjs.Bitmap(Asset.images["sekkeizu"]);
            sekkeizu.scaleX = assemblyTileWidth * 3 / sekkeizu.getBounds().width;
            sekkeizu.scaleY = assemblyTileHeight / sekkeizu.getBounds().height;
            sekkeizu.x = assemblyAreaX;
            sekkeizu.y = assemblyAreaY + (assemblyTileHeight * 5);
            assemblyContainer.addChild(sekkeizu);

        }

        function setWorkSpaceParts(){
            for(let i = 0 ; i < 3 ; i++ ){
                for(let j = 0 ; j < 3 ; j++ ){                    
                    if(workSpace[(i*3)+j].exist == 1){    
                        workSpace[(i*3)+j].cimg.x = assemblyAreaX + (assemblyTileWidth * (j));
                        workSpace[(i*3)+j].cimg.y = assemblyAreaY + (assemblyTileHeight) * ( i + 1 );
                        workSpaceContainer.addChild(workSpace[(i*3)+j].cimg);
                    }
                }
            }
        }

        function clearWorkSpaceParts(){
            for(let i = 0 ; i < 9 ; i++ ){
                if(workSpace[i].exist == true){
                    workSpaceContainer.removeChild(workSpace[i].cimg);
                }
            }
        }

        //毎秒画面更新する関数
        createjs.Ticker.setFPS(15);
        
        var count = 0;
        var waitTime = Math.max(tileWidth / speedX , tileHeight / speedY );
        var beltNum = 0;
        createjs.Ticker.on("tick", function () {
            switch(mode){
                case 0:
                    infoArray[2].alpha = 0;
                    if(window.localStorage.getItem('check') == 1 ){
                        window.localStorage.setItem('check',0);
                        editStatus.window = false;
                        let editY = editStatus.p.y;
                        let editX = editStatus.p.x;
                        switch(editStatus.what){
                            case 2:
                                fieldStatus[editY][editX].changeAddress(Number(window.localStorage.getItem('num')));
                                break;
                            case 3:
                                fieldStatus[editY][editX].changeBoxColor(Number(window.localStorage.getItem('color')));
                                break;
                            case 4:
                                fieldStatus[editY][editX].changeRoot( Number( window.localStorage.getItem('type') ) , Number(window.localStorage.getItem('trueRoot') ) , Number( window.localStorage.getItem('falseRoot') ) );
                                break;
                            case 5:

                                fieldStatus[editY][editX].changeRoot(Number(window.localStorage.getItem('trueRoot')), Number(window.localStorage.getItem('falseRoot') ), Number(window.localStorage.getItem('num') ));
                                break;
                            default:
                                break;                 
                        }

                    }
                    
                    break;
                case 1:
                    beltNum++;

                    if(beltNum % 3 == 0 ){
                        for(let i = 0 ; i < tileNumHeight ; i++ ){
                            for(let j = 0 ; j < tileNumWidth ; j++ ){
                                if(fieldStatus[i][j].what == 0 ){
                                    fieldStatus[i][j].rollBelt();
                                }
                            }
                        }
                    }
                    infoArray[2].alpha = 0;
                    if(count > 0){
                        count--;
                    }
                    else{
                        movingParts.visible();
                        switch(fieldStatus[movingParts.p.y][movingParts.p.x].exit){
                            case 0:
                                movingParts.cimg.y -= speedY;
                                break;
                            case 1:
                                movingParts.cimg.x += speedX;
                                break;
                            case 2:
                                movingParts.cimg.y += speedY;
                                break;
                            case 3:
                                movingParts.cimg.x -= speedX;
                                break;
                            default:
                                console.log("undefinded box.exit");
                                break;
                        }
                        
                        movingParts.changePoint(new point( Math.floor(movingParts.cimg.y/tileHeight) , Math.floor(movingParts.cimg.x/tileWidth) ) ); 
                        
                        let y = movingParts.p.y;
                        let x = movingParts.p.x;
                        
                        console.log("y:"+y+" x:"+x);

                        switch(fieldStatus[y][x].what){
                            case 2:
                                console.log("goal:"+fieldStatus[y][x].address);
                                let workSpaceNum = fieldStatus[y][x].address;

                                if(!isInteger(workSpaceNum)){
                                    workSpaceNum = 0;
                                }
                                
                                if( workSpace[workSpaceNum].exist  == true ){
                                    console.log("remove done");
                                    workSpace[workSpaceNum].removeImage();
                                }

                                let setP = new assemblyPartsClass( movingParts.type, movingParts.color , movingParts.charge , true);
                                setP.setImage();
                                setP.cimg.x = assemblyAreaX + assemblyTileWidth * ((workSpaceNum % 3) );
                                setP.cimg.y = assemblyAreaY + assemblyTileHeight * (( Math.floor(workSpaceNum / 3)) + 1);                             
                                workSpace[workSpaceNum] = setP;
                                workSpaceContainer.addChild(workSpace[workSpaceNum].cimg);
                                partsContainer.removeChild(movingParts.cimg);
                                pickPart();
                                break;
                            case 3:
                                console.log("paint");
                                fieldStatus[y][x].changePartsColor(movingParts);
                                movingParts.invisible();
                                fieldStatus[y][x].moveParts(movingParts);
                                count = waitTime;
                                break;
                            case 4:
                                console.log("if");
                                fieldStatus[y][x].checkRoot(movingParts.type);
                                movingParts.invisible();
                                fieldStatus[y][x].moveParts(movingParts);
                                count = waitTime;
                                break;
                            case 5:
                                console.log("for");
                                fieldStatus[y][x].check();
                                fieldStatus[y][x].reloadTxt();
                                movingParts.invisible();
                                fieldStatus[y][x].moveParts(movingParts);
                                count = waitTime;
                                
                                break;
                            case 6:
                                console.log("dustshoot");
                                partsContainer.removeChild(movingParts.cimg);
                                pickPart();
                                break;
                            case 7:
                                console.log("charge");
                                movingParts.charge++;
                                movingParts.changeImage();
                                movingParts.changeCImage();
                                movingParts.invisible();
                                fieldStatus[y][x].moveParts(movingParts);
                                count = waitTime;
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case 2:
                    if(infoArray[2].alphaNum == 1)
                        infoArray[2].alpha += 0.05;
                    else 
                        infoArray[2].alpha -= 0.05;
                    
                    if(infoArray[2].alpha > 0.7)
                        infoArray[2].alphaNum = 0;
                    
                    if(infoArray[2].alpha < 0)
                        infoArray[2].alphaNum = 1;
                    break;
                    
                default:
                    break;
            }
            stageBackground.update();   // stageBackgroundの描画を更新
        });

        //マウスが動いたら実行
        createjs.Ticker.addEventListener("tick", handleTick);
        function handleTick(event) {
            // マウス座標を取得する
            mx = stageBackground.mouseX;
            my = stageBackground.mouseY;
            // シェイプをマウスに追随させる
            takingModuleBox.x = mx - (tileWidth/2);
            takingModuleBox.y = my - (tileHeight/2);
            // 画面を更新する
            stageBackground.update();
        }

        var movingParts;
        //スタートボタンを押したとき実行
        var mode = 0;                   //モード判定 0:編集モード 1:実行モード 2:ストップモード
        
        function pickPart(){
            if(movePartsQueue.size() > 0){
                movingParts = movePartsQueue.dequeue();
                movingParts.invisible();
                movingParts.setCImage();
                for(let i = 0 ; i < tileNumHeight ; i++ ){
                    for(let j = 0 ; j < tileNumWidth ; j++ ){
                        if(fieldStatus[i][j].what == 1 ){
                            let startPoint = new point(i,j);
                            console.log("startpoint y:"+startPoint.y+" x:"+startPoint.x);
                            movingParts.setPoint(startPoint);
                            console.log("movingParts y:"+movingParts.p.y+" x:"+movingParts.p.x);
                        }
                    }
                }
                partsContainer.addChild(movingParts.cimg);
                drawWaitParts();
            }

            else{
                movingParts = new partsClass();
                mode = 2;
                if(checkClear()){
                    console.log("clear");
                    infoArray[0].addEventListener("click",clearEvent);
                    infoArray[0].alpha = 1;
                    mode = 3;
                }
                else{
                    console.log("failed");
                    infoArray[1].addEventListener("click",failedEvent);
                    infoArray[1].alpha = 1;                
                    mode = 3;

                }
            }
        }

        //タイルに画像を割り当てる関数
        function setTileImage(target,image,i,j){
            target.img = new createjs.Bitmap(image);
            target.img.scaleX = tileWidth / target.img.getBounds().width;
            target.img.scaleY = tileHeight / target.img.getBounds().height;
            target.img.x = (j*tileWidth);
            target.img.y = (i*tileHeight);
            return target;
        }        

        class editStatusClass{
            constructor(p,what,window){
                this.p = new point();
                this.what = what;
                this.window = window;
            }
        
            open(what,p){
                this.what = what;
                this.p = p;
                this.window = 1;
            }
        
        }
        var editStatus = new editStatusClass();;
        editStatus.window = false;
        
        function takingModuleBoxRelese2(){
            if(mx <= fieldWidth && my <= fieldHeight){
                var bx = Math.floor(mx/tileWidth);
                var by = Math.floor(my/tileHeight);
                if(fieldStatus[by][bx].exist == 0){
                    var putBox = takingModuleBox.box;
                    putBox.p.x = bx;
                    putBox.p.y = by;
                    

                    fieldStatus[by][bx] = putBox;
                    fieldStatus[by][bx].initBox();
                    fieldStatus[by][bx].addImage();
                    //itemContainer.addChild(fieldStatus[by][bx].hitObject);
                    itemContainer.removeChild(takingModuleBox);
                }
                else{
                    alert("もうおいてあるから置けないよ");
                }
                
            }
            else{
                alert("そこには置けないよ");
            } 
        }

        function removeFieldBox(p){
            console.log(fieldStatus[p.y][p.x].what);
            quantityArea[ fieldStatus[p.y][p.x].what ].put();
            fieldStatus[p.y][p.x].removeImage();
            fieldStatus[p.y][p.x] = new boxClass();
            fieldStatus[p.y][p.x].exist = false;
        }

        function takeFieldBox(p){
            takingModuleBox.image = fieldStatus[p.y][p.x].img;
            fieldStatus[p.y][p.x].removeImage();
            takingModuleBox.box = fieldStatus[p.y][p.x];
            fieldStatus[p.y][p.x] = new boxClass();
            fieldStatus[p.y][p.x].exist = false;
            takingModuleBox.removeAllEventListeners();
            takingModuleBox.addEventListener("click",function(){takingModuleBoxRelese2()});
            itemContainer.addChild(takingModuleBox);                    
        }

        function editBox(p){
            switch(userMode){
                case 1:
                    removeFieldBox(p);
                    break;
                case 2:
                    takeFieldBox(p);
                    break;
                    
            } 
        }

        function editGoalBox(p){
            switch(userMode){
                case 0:
                    editStatus.open(2,p);
                    window.open('windows/editGoalWindow.html','_blank','width=400 height=100,top='+my+',left='+mx);
                    break;
                case 1:
                    removeFieldBox(p);
                    break;
                case 2:
                    takeFieldBox(p);
                    break;
                    
            } 
        }

        function editPaintBox(p){
            switch(userMode){
                case 0:
                    editStatus.open(3,p);
                    window.open('windows/editPaintWindow.html','_blank','width=400 height=100,top='+my+',left='+mx);
                    break;
                case 1:
                    removeFieldBox(p);
                    break;
                case 2:
                    takeFieldBox(p);
                    break;
            } 
        }

        function editIfBox(p){
            switch(userMode){
                case 0:
                    editStatus.open(4,p);
                    window.open('windows/editIfWindow.html','_blank','menubar=no,location=no,width=400,height=150,top='+my+',left='+mx);
                    break;
                case 1:
                    removeFieldBox(p);
                    break;
                case 2:
                    takeFieldBox(p);
                    break;
            } 
        }

        function editForBox(p){
            switch(userMode){
                case 0:
                    editStatus.open(5,p);
                    window.open('windows/editForWindow.html','_blank','width=400 height=150,top='+my+',left='+mx);
                    break;
                case 1:
                    removeFieldBox(p);
                    break;
                case 2:
                    takeFieldBox(p);
                    break;
            } 
        }

        function editBelt(p){
            switch(userMode){
                case 0:
                    switch(fieldStatus[p.y][p.x].exit){
                        case 0:
                            fieldStatus[p.y][p.x].cimg.image = Asset.images["beltRight"];
                            fieldStatus[p.y][p.x].exit = 1;
                            fieldStatus[p.y][p.x].portal = 3;
                            break;
                        case 1:
                            fieldStatus[p.y][p.x].cimg.image = Asset.images["beltBottom"];
                            fieldStatus[p.y][p.x].exit = 2;
                            fieldStatus[p.y][p.x].portal = 0;
                            
                            break;
                        case 2:
                            fieldStatus[p.y][p.x].cimg.image = Asset.images["beltLeft"];
                            fieldStatus[p.y][p.x].exit = 3;
                            fieldStatus[p.y][p.x].portal = 1;
                            break;
                        case 3:
                            fieldStatus[p.y][p.x].cimg.image = Asset.images["beltUp"];
                            fieldStatus[p.y][p.x].exit = 0;
                            fieldStatus[p.y][p.x].portal = 2;
                            break;
                        default:
                            break;
                        
                    }
                   
                    break;
                case 1:
                    removeFieldBox(p);
                    break;
                case 2:
                    takeFieldBox(p);
                    break;
            }    
        }

        function checkClear(){
            console.log("check");
            var checkSquare = true;
            for(let i = 0 ; i < 9 ; i++ ){
                let b = bluePrint[i];
                let w = workSpace[i];
                if(b.exist == w.exist){
                    if(b.exist == false){
                        continue;
                    }
                    if(b.type != w.type || b.color != w.color){
                        console.log("false1");
                        checkSquare = false;
                        break;
                    }
                    if(b.type == 1 && w.type == 1){
                        if(b.charge != w.charge){
                            checkSquare = false;
                        }
                    }

                }
                else{
                    console.log("false2");
                    checkSquare = false;
                    break;
                }
            }
            if(checkSquare){
                return true;
            }
            else{
                return false;
            }
        }

        function loadTemplate(num){

            var f = new Array(tileNumHeight);              //フィールドの状態を表す配列
            for(let i = 0; i < tileNumHeight; i++) {    
                let tmp = new Array(tileNumWidth);
                for(let j = 0 ; j < tileNumWidth; j++){
                    let ttmp = new boxClass();
                    ttmp.exist = 0;
                    tmp[j] = ttmp;
                }
                f[i] = tmp;
            }

            var b = new Array(9);                   //設計図
                    
            for(let i = 0 ; i < 9 ; i++ ){
                b[i] = new assemblyPartsClass();
                b[i].exist = false;
            }

            var w = new Array(9);                   //作業場

            for(let i = 0 ; i < 9 ; i++ ){
                w[i] = new assemblyPartsClass();
                w[i].exist = false;
            }


            var p = new Queue();                    //流すパーツを格納するキュー
            
            var q;

            switch(num){
                case 1:
                    f[5][4] = new startBoxClass(true,0,1,1,5,4);
                    f[5][5] = new beltClass(true,3,1,0,5,5);
                    f[5][6] = new goalBoxClass(true,3,1,2,5,6,0);

                    var p1 = new partsClass(0,0,0);
                    p.enqueue(p1);

                    q = [0,0,0,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,0,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[4] = new assemblyPartsClass(1,0,3,true);
                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    w[7] = new assemblyPartsClass(4,0,0,true);

                    break;
                case 2:
                    
                    f[5][1] = new startBoxClass(true,3,1,1,5,1);
                    f[5][2] = new beltClass(true,3,1,0,5,2);
                    f[5][3] = new paintBoxClass(true,3,1,3,5,3,null);
                    f[5][4] = new beltClass(true,3,1,0,5,4);
                    f[5][5] = new goalBoxClass(true,3,1,2,5,5,null);
                    var p1 = new partsClass(0,0,0);
                    p.enqueue(p1);
                    
                    q = [0,0,0,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,1,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[4] = new assemblyPartsClass(1,0,3,true);
                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    w[7] = new assemblyPartsClass(4,0,0,true);
                    break;
                    
                case 3:
                    f[3][3] = new beltClass(true,2,1,0,3,3)
                    f[3][4] = new beltClass(true,2,1,0,3,4)
                    f[3][5] = new goalBoxClass(true,3,1,2,3,5,null);
                    f[4][3] = new beltClass(true,2,0,0,4,3);
                    f[5][1] = new startBoxClass(true,3,1,1,5,1);
                    f[5][2] = new beltClass(true,3,1,0,5,2);
                    f[5][3] = new ifBoxClass(true,3,null,4,5,3,null,2,1);
                    f[5][4] = new beltClass(true,3,1,0,5,4);
                    f[5][5] = new goalBoxClass(true,3,1,2,5,5,null);
                    f[6][3] = new beltClass(true,0,2,0,6,3);
                    f[7][3] = new boxClass(true,2,2,6,7,3)
                    var p1 = new partsClass(0,0,0)
                    var p2 = new partsClass(4,0,0)
                    p.enqueue(p1);                    
                    p.enqueue(p2);
                    
                    q = [0,0,0,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,0,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[4] = new assemblyPartsClass(1,0,3,true);
                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    break;
                case 4:
                    f[3][3] = new beltClass(true,3,1,0,3,3);
                    f[3][4] = new beltClass(true,3,1,0,3,4);
                    f[3][5] = new paintBoxClass(true,3,1,3,3,5,null);
                    f[3][6] = new beltClass(true,3,1,0,3,6);
                    f[3][7] = new goalBoxClass(true,3,1,2,3,7,null);
                    f[4][3] = new beltClass(true,2,0,0,4,3);
                    f[5][1] = new startBoxClass(true,3,1,1,5,1);
                    f[5][2] = new beltClass(true,3,1,0,5,2);
                    f[5][3] = new ifBoxClass(true,3,null,4,5,3,null,2,1);
                    f[5][4] = new beltClass(true,3,1,0,5,4);
                    f[5][5] = new goalBoxClass(true,3,1,2,5,5,null);
                    var p1 = new partsClass(0,0,0);
                    var p2 = new partsClass(4,0,0);
                    p.enqueue(p1);                    
                    p.enqueue(p2);      
                    
                    q = [0,0,0,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,1,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[4] = new assemblyPartsClass(1,0,3,true);
                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    break;
                case 5:
                    f[3][3] = new beltClass(true,3,1,0,3,3);
                    f[3][4] = new beltClass(true,3,1,0,3,4);
                    f[3][5] = new paintBoxClass(true,3,1,3,3,5,null);
                    f[3][6] = new beltClass(true,3,1,0,3,6);
                    f[3][7] = new goalBoxClass(true,3,1,2,3,7,null);
                    f[4][3] = new beltClass(true,2,0,0,4,3);
                    f[5][3] = new ifBoxClass(true,2,1,4,5,3,null,1,0);
                    f[5][4] = new beltClass(true,3,1,0,5,4);
                    f[5][5] = new goalBoxClass(true,3,1,2,5,5,null);
                    f[6][3] = new beltClass(true,2,0,0,6,3);
                    f[7][1] = new startBoxClass(true,null,1,1,7,1);
                    f[7][2] = new beltClass(true,3,1,0,7,2);
                    f[7][3] = new ifBoxClass(true,3,1,4,7,3,null,0,1);
                    f[7][4] = new beltClass(true,3,1,0,7,4);
                    f[7][5] = new goalBoxClass(true,3,1,2,7,5,null);

                    var p1 = new partsClass(0,0,0);
                    var p2 = new partsClass(4,0,0);
                    var p3 = new partsClass(1,0,3);
                    p.enqueue(p1);                    
                    p.enqueue(p2);                    
                    p.enqueue(p3);                    

                    q = [0,0,0,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,1,0,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    break;
                
                case 6:
                    f[1][3] = new startBoxClass(true,3,1,1,1,3,null);
                    f[2][3] = new beltClass(true,0,2,0,2,3);
                    f[3][3] = new ifBoxClass(true,0,2,4,3,3,null,1,0);
                    f[3][4] = new beltClass(true,3,1,0,3,4);
                    f[3][5] = new paintBoxClass(true,3,1,3,3,5,null);
                    f[3][6] = new beltClass(true,3,1,0,3,6);
                    f[3][7] = new goalBoxClass(true,3,1,2,3,7);
                    f[4][3] = new beltClass(true,0,2,0,4,3);
                    f[5][3] = new paintBoxClass(true,0,2,3,5,3,null);
                    f[6][3] = new beltClass(true,0,2,0,6,3);
                    f[7][3] = new ifBoxClass(true,0,2,4,7,3,null,1,0);
                    f[7][4] = new beltClass(true,3,1,0,7,4);
                    f[7][5] = new goalBoxClass(true,3,1,2,7,5);                   
                    f[8][3] = new beltClass(true,0,2,0,8,3);
                    f[9][3] = new goalBoxClass(true,3,1,2,9,3);
                    
                    
                                        
                    
                    
                    var p1 = new partsClass(0,null,0);
                    var p2 = new partsClass(2,null,0);
                    var p3 = new partsClass(3,null,0);
                    p.enqueue(p1);                    
                    p.enqueue(p2);                    
                    p.enqueue(p3);                    

                    q = [0,0,0,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,1,0,true);
                    b[3] = new assemblyPartsClass(2,2,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[5] = new assemblyPartsClass(3,2,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);
                    w[4] = new assemblyPartsClass(1,0,3,true);
                    w[7] = new assemblyPartsClass(4,0,3,true);
                    break;
                case 7:
                    f[3][3] = new boxClass(true,2,1,7,3,3)
                    f[3][4] = new beltClass(true,2,1,0,3,4)
                    f[3][5] = new goalBoxClass(true,3,1,2,3,5,null);
                    f[4][3] = new beltClass(true,2,0,0,4,3);
                    f[5][1] = new startBoxClass(true,3,1,1,5,1);
                    f[5][2] = new beltClass(true,3,1,0,5,2);
                    f[5][3] = new ifBoxClass(true,3,null,4,5,3,null,2,1);
                    f[5][4] = new beltClass(true,3,1,0,5,4);
                    f[5][5] = new goalBoxClass(true,3,1,2,5,5,null);
                    f[6][3] = new beltClass(true,0,2,0,6,3);
                    f[7][3] = new boxClass(true,2,2,6,7,3)
                    
                    var p1 = new partsClass(0,0,0)
                    var p2 = new partsClass(1,0,2)
                    p.enqueue(p1);                    
                    p.enqueue(p2);                    

                    q = [0,0,0,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,0,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);
                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    w[7] = new assemblyPartsClass(4,0,0,true);
                    break;
                case 8:
                    f[4][3] = new goalBoxClass(true,0,0,2,4,3,null);
                    f[5][3] = new beltClass(true,2,0,0,5,3);
                    f[6][1] = new startBoxClass(true,3,1,1,6,1);
                    f[6][2] = new beltClass(true,3,1,0,6,2);
                    f[6][3] = new forBoxClass(true,0,0,5,6,3,null,null,null);
                    f[6][4] = new beltClass(true,1,3,0,6,4);
                    f[6][5] = new boxClass(true,2,3,7,6,5);
                    f[7][3] = new beltClass(true,0,2,0,7,3);
                    f[7][5] = new beltClass(true,2,0,0,7,5);
                    f[8][3] = new beltClass(true,3,1,0,8,3);
                    f[8][4] = new beltClass(true,3,1,0,8,4);
                    f[8][5] = new beltClass(true,3,0,0,8,5);
                    var p1 = new partsClass(1,0,0);
                    p.enqueue(p1);                    

                    q = [0,0,0,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,0,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[1] = new assemblyPartsClass(0,0,0,true);
                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    w[7] = new assemblyPartsClass(4,0,0,true);
                    break;
                
                case 9:
                    f[2][3] = new paintBoxClass(true,0,1,3,2,3,null);
                    f[2][4] = new beltClass(true,3,1,0,2,4);
                    f[2][5] = new goalBoxClass(true,0,0,2,2,5,null);
                    f[3][3] = new beltClass(true,3,1,0,3,3);
                    f[4][1] = new goalBoxClass(true,0,0,2,4,1,null);
                    f[4][2] = new beltClass(true,1,3,0,4,2);
                    f[4][3] = new ifBoxClass(true,3,1,4,4,3,null,0,1);
                    f[4][5] = new goalBoxClass(true,0,0,2,4,5,null);
                    f[5][3] = new beltClass(true,3,0,0,5,3);
                    f[5][5] = new beltClass(true,3,0,0,5,5);
                    f[6][1] = new startBoxClass(true,3,1,1,6,1);
                    f[6][2] = new beltClass(true,3,1,0,6,2);
                    f[6][3] = new ifBoxClass(true,3,1,4,6,3,null,0,2);
                    f[6][4] = new beltClass(true,3,1,0,6,4);
                    f[6][5] = new forBoxClass(true,3,1,5,6,5,0,1,2);
                    f[6][6] = new beltClass(true,1,3,0,6,6);
                    f[6][7] = new boxClass(true,2,3,7,6,7);
                    f[7][5] = new beltClass(true,3,2,0,7,5);
                    f[7][7] = new beltClass(true,3,0,0,7,7);
                    f[8][5] = new beltClass(true,3,1,0,8,5);
                    f[8][6] = new beltClass(true,3,1,0,8,6);
                    f[8][7] = new beltClass(true,3,0,0,8,7);

                    var p1 = new partsClass(0,null,0);
                    var p2 = new partsClass(1,0,0);
                    var p3 = new partsClass(2,0,0);
                    p.enqueue(p1);
                    p.enqueue(p2);
                    p.enqueue(p3);
                    
                    q = [0,0,0,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,1,0,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);
                    
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    w[7] = new assemblyPartsClass(4,0,0,true);
                    
                   

                    break;
                case 10:
                    var p1 = new partsClass(0,0,null);
                    p.enqueue(p1);
                    q = [50,1,1,0,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,0,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[4] = new assemblyPartsClass(1,0,3,true);
                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    w[7] = new assemblyPartsClass(4,0,0,true);
                    break;
                
                case 11:
                    var p1 = new partsClass(0,null,null);
                    p.enqueue(p1);

                    q = [50,1,1,1,0,0,0,0];

                    b[1] = new assemblyPartsClass(0,0,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[4] = new assemblyPartsClass(1,0,3,true);
                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    w[7] = new assemblyPartsClass(4,0,0,true);
                    
                    break;
                case 12:
                    var p1 = new partsClass(0,null,null);
                    p.enqueue(p1);
                    var p2 = new partsClass(1,null,3);
                    p.enqueue(p2);
                    var p3 = new partsClass(4,null,null);
                    p.enqueue(p3);
                    

                    q = [50,1,2,1,2,0,1,0];

                    b[1] = new assemblyPartsClass(0,0,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,0,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[4] = new assemblyPartsClass(1,0,3,true);
                    w[3] = new assemblyPartsClass(2,0,0,true);
                    w[5] = new assemblyPartsClass(3,0,0,true);
                    w[7] = new assemblyPartsClass(4,0,0,true);
                    break;
                case 13:
                    var p1 = new partsClass(0,null,null);
                    p.enqueue(p1);
                    var p2 = new partsClass(2,null,null);
                    p.enqueue(p2);
                    var p3 = new partsClass(3,null,null);
                    p.enqueue(p3);

                    q = [99,1,3,3,3,0,0,0];

                    b[1] = new assemblyPartsClass(0,1,0,true);
                    b[4] = new assemblyPartsClass(1,0,3,true);
                    b[3] = new assemblyPartsClass(2,0,0,true);
                    b[5] = new assemblyPartsClass(3,2,0,true);
                    b[7] = new assemblyPartsClass(4,0,0,true);

                    w[4] = new assemblyPartsClass(1,0,3,true);
                    w[7] = new assemblyPartsClass(4,0,0,true);               
                    break;
                case 14:
                    var p1 = new partsClass(0,null,null);
                    p.enqueue(p1);
                    var p2 = new partsClass(2,null,null);
                    p.enqueue(p2);
                    var p3 = new partsClass(3,null,null);
                    p.enqueue(p3);
                    var p4 = new partsClass(1,null,0);
                    p.enqueue(p4);

                    q = [99,1,3,5,5,0,1,3];

                    b[1] = new assemblyPartsClass(0,1,0,true);
                    b[4] = new assemblyPartsClass(1,1,3,true);
                    b[3] = new assemblyPartsClass(2,1,0,true);
                    b[5] = new assemblyPartsClass(3,1,0,true);
                    b[7] = new assemblyPartsClass(4,1,0,true);

                    w[1] = new assemblyPartsClass(0,1,0,true);
                    w[7] = new assemblyPartsClass(4,1,0,true);
            
                    break;
                case 15:
                    var p1 = new partsClass(0,null,null);
                    var p2 = new partsClass(2,null,null);
                    var p3 = new partsClass(3,null,null);
                    var p4 = new partsClass(1,null,0);
                    var p5 = new partsClass(4,null,null);
                    p.enqueue(p1);
                    p.enqueue(p2);
                    p.enqueue(p3);
                    p.enqueue(p4);
                    p.enqueue(p5);

                    q = [99,1,5,5,5,1,1,1];

                    b[1] = new assemblyPartsClass(0,0,0,true);
                    b[4] = new assemblyPartsClass(1,1,3,true);
                    b[3] = new assemblyPartsClass(2,2,0,true);
                    b[5] = new assemblyPartsClass(3,2,0,true);
                    b[7] = new assemblyPartsClass(4,2,0,true);
                    break;
                case 21:
                    f[5][3] = new beltClass(true,2,0,0,5,3);
                    f[5][3].initBox();
                    f[5][5] = new goalBoxClass(true,0,0,2,5,5);
                    f[5][5].initBox();

                    f[5][7] = new paintBoxClass(true,0,0,3,5,7,null);
                    f[5][7].initBox();

                    break;
                    
                default:
                    break;
            }

            
            for(let i = 0 ; i < tileNumHeight ; i++ ){
                for(let j = 0 ; j < tileNumWidth ; j++ ){
                    if(f[i][j].exist)
                        f[i][j].initBox();
                }
            }

            for( let i = 0 ; i < 9 ; i++ ){
                if(b[i].exist)
                    b[i].setImage();
                if(w[i].exist)
                    w[i].setImage();
            }
            
            let pNum = p.size();
            for(let i = 0 ; i < num ; i++ ){
                let tmpP = p.dequeue();
                tmpP.setImage();
                p.enqueue(tmpP);
            }

            var template = new loadDataClass(f,q,b,p,w);
            return template;
        }


        //ボタンの設定
        var buttonContainer = new createjs.Container();
        stageBackground.addChild(buttonContainer);
        var buttonType = 5;
        var buttonSizeY = (stageHeight- fieldHeight) * 0.8 ;
        var buttonSizeX = fieldWidth / (buttonType);
        var buttonY = fieldHeight + ((stageHeight - fieldHeight) / 10 );
        
        var buttonArray = new Array(buttonType);

        buttonArray[0] = new createjs.Bitmap(Asset.images["startButton"]);
        buttonArray[1] = new createjs.Bitmap(Asset.images["editButton"]);
        buttonArray[2] = new createjs.Bitmap(Asset.images["eraceButton"]);
        buttonArray[3] = new createjs.Bitmap(Asset.images["craneButton"])
        buttonArray[4] = new createjs.Bitmap(Asset.images["menuButton"]);
        buttonArray[0].addEventListener("click",startEvent);
        buttonArray[1].addEventListener("click",editEvent);
        buttonArray[2].addEventListener("click",eraceEvent);
        buttonArray[3].addEventListener("click",craneEvent);
        buttonArray[4].addEventListener("click",menuEvent);
        
           
        for(let i = 0 ; i < buttonType ; i++ ){
            console.log(i);
            buttonArray[i].scaleY = buttonSizeY / buttonArray[i].getBounds().height;
            buttonArray[i].scaleX = buttonSizeX / buttonArray[i].getBounds().width;
            buttonArray[i].y = buttonY;
            buttonArray[i].x = (buttonSizeX * i);
            var startHitObject = new createjs.Shape();
            startHitObject.graphics.beginFill("#000000").drawRect(0, 0, buttonArray[i].image.width, buttonArray[i].image.height);
            buttonArray[i].hitArea = startHitObject;
            buttonContainer.addChild(buttonArray[i]);    
        }

        function startEvent(event){
            switch(mode){
                case 0:
                    mode = 1;
                    buttonArray[0].image = Asset.images["stopButton"];
                    buttonArray[1].image = Asset.images["discontinuationButton"];
                    buttonArray[1].alpha = 0;
                    buttonArray[2].alpha = 0;
                    buttonArray[3].alpha = 0;

                    for(let i = 0 ; i < tileNumHeight ; i++ ){
                        for(let j = 0 ; j < tileNumWidth ; j++ ){
                            let what = fieldStatus[i][j].what;
                            if(what == 1 || what == 6 || what == 7 || what == 3){
                                if( i > 0 ){
                                    if(fieldStatus[i-1][j].what == 0){
                                        if(fieldStatus[i-1][j].portal == 2){
                                            fieldStatus[i][j].exit = 0;
                                        }
                                    }
                                }

                                if( i < tileNumHeight - 1 ){
                                    if(fieldStatus[i+1][j].what == 0){
                                        if(fieldStatus[i+1][j].portal == 0){
                                            fieldStatus[i][j].exit = 2;
                                        }
                                    }
                                }

                                if( j > 0 ){
                                    if(fieldStatus[i][j-1].what == 0){
                                        if(fieldStatus[i][j-1].portal == 1){
                                            fieldStatus[i][j].exit = 3;
                                        }
                                    }
                                }
                                
                               if( j < tileNumWidth - 1){
                                    if(fieldStatus[i][j+1].what == 0){
                                        if(fieldStatus[i][j+1].portal == 3){
                                            fieldStatus[i][j].exit = 1;
                                        }
                                    }
                                }

                            }
                        }
                    }

                    pickPart();
                    break;
                case 1:
                    mode = 2;
                    buttonArray[0].image = Asset.images["startButton"];
                    buttonArray[1].alpha = 1;
                    buttonArray[2].alpha = 0;
                    buttonArray[3].alpha = 0;
                    
                    break;
                case 2:
                    mode = 1;
                    buttonArray[0].image = Asset.images["stopButton"];
                    buttonArray[1].alpha = 0;
                    break;
                
            }   
        }
        
        function editEvent(){
            if(mode == 0){
                userMode = 0;
                buttonArray[1].image  = Asset.images["editButtonOn"];
                buttonArray[2].image  = Asset.images["eraceButton"];
                buttonArray[3].image = Asset.images["craneButton"];
            }

            if(mode == 2){
                console.log("failed");
                let num = movePartsQueue.size();
                for(let i = 0 ; i < num ; i++ ){
                    movePartsQueue.dequeue();
                }
                
                for(let i = 0 ; i < tileNumHeight ; i++ ){
                    for(let j = 0 ; j < tileNumWidth ; j++ ){
                        if(fieldStatus[i][j].what == 5 ){
                            fieldStatus[i][j].resetCount();
                        }
                    }
                }
                lD = loadTemplate(stageNumber);
                partsQueue = lD.partsQueue;
                initWaitPartsArea();
                buttonArray[0].image = Asset.images["startButton"];
                clearWorkSpaceParts();                                        
                workSpace = lD.workSpace;
                setWorkSpaceParts();
                movingParts.removeImage();
                mode = 0;
                userMode = 0;
                buttonArray[1].image  = Asset.images["editButtonOn"];
                buttonArray[2].alpha = 1;
                buttonArray[2].image  = Asset.images["eraceButton"];
                buttonArray[3].alpha = 1;
                buttonArray[3].image = Asset.images["craneButton"];
            }
        }

        function eraceEvent(){
            if(mode == 0){
                userMode = 1;
                buttonArray[1].image  = Asset.images["editButton"];
                buttonArray[2].image = Asset.images["eraceButtonOn"];
                buttonArray[3].image  = Asset.images["craneButton"];            
            }
        }

        function craneEvent(){
            if(mode == 0){
                userMode = 2;
                buttonArray[1].image = Asset.images["editButton"];
                buttonArray[2].image = Asset.images["eraceButton"];
                buttonArray[3].image= Asset.images["craneButtonOn"];
            }
        }
        
        
        //クリア・失敗・ストップ中
        var infoContainer = new createjs.Container();
        stageBackground.addChild(infoContainer);

        var infoType = 3;
        var infoArray = new Array(infoType);
        var infoWidth = stageWidth / 2;
        var infoHeight = stageHeight / 5;
        infoArray[0] = new createjs.Bitmap(Asset.images["clearImage"]);
        infoArray[1] = new createjs.Bitmap(Asset.images["failedImage"]);
        infoArray[2] = new createjs.Bitmap(Asset.images["stopImage"]);
        infoArray[2].alphaNum = 1;
        
        for(let i = 0 ; i < infoType ; i++ ){
            infoArray[i].scaleX = infoWidth / infoArray[i].getBounds().width;
            infoArray[i].scaleY = infoHeight / infoArray[i].getBounds().height;
            infoArray[i].x = (stageWidth / 2) - (infoWidth / 2 );
            infoArray[i].y = (stageHeight / 2) - (infoHeight / 2 );
            infoContainer.addChild(infoArray[i]);
            let infoHitObject = new createjs.Shape();
            infoHitObject.graphics.beginFill("#000000").drawRect(0, 0, infoArray[i].image.width, infoArray[i].image.height);
            infoArray[i].hitArea = infoHitObject;
            buttonContainer.addChild(infoArray[i]);    
            infoArray[i].alpha = 0;
            
        }

        function clearEvent(event){
            let clearStatus = sessionStorage.getItem('clearStatus');
            console.log(clearStatus);
            clearStatus.slice(stageNumber-1);
            let tmpClear = "";
            for(let i = 0 ; i < 15 ; i++ ){
                if( i != stageNumber - 1)
                    tmpClear += clearStatus[i];
                else
                    tmpClear += "1";
            }
            
            console.log(tmpClear);
            sessionStorage.setItem("clearStatus",tmpClear);
            
            window.location.href = 'selectStage.html';
        }

        function failedEvent(event){
            lD = loadTemplate(stageNumber);
            partsQueue = lD.partsQueue;
            initWaitPartsArea();
            buttonArray[0].image = Asset.images["startButton"];
            clearWorkSpaceParts();                                        
            workSpace = lD.workSpace;
            setWorkSpaceParts();

            for(let i = 0 ; i < tileNumHeight ; i++ ){
                for(let j = 0 ; j < tileNumWidth ; j++ ){
                    if(fieldStatus[i][j].what == 5 ){
                        fieldStatus[i][j].resetCount();
                    }
                }
            }

            mode = 0;
            infoArray[1].removeAllEventListeners();
            infoArray[1].alpha = 0;
            userMode = 0;
            buttonArray[1].alpha = 1;
            buttonArray[1].image  = Asset.images["editButtonOn"];
            buttonArray[2].alpha = 1;
            buttonArray[2].image  = Asset.images["eraceButton"];
            buttonArray[3].alpha = 1;
            buttonArray[3].image = Asset.images["craneButton"];
        }


    });

    
}





function menuEvent(event){
    window.location.href = 'selectStage.html';
}

function isInteger(x) {
    return Math.round(x) === x;
}

// Queueの実装
function Queue() {
	this.__a = new Array();
}
Queue.prototype.enqueue = function(o) {
	this.__a.push(o);
}

Queue.prototype.dequeue = function() {
	if( this.__a.length > 0 ) {
		return this.__a.shift();
	}
	return null;
}
Queue.prototype.size = function() {
	return this.__a.length;
} 
Queue.prototype.toString = function() {
	return '[' + this.__a.join(',') + ']';
}

//stackの実装
function Stack() {
	this.__a = new Array();
}
Stack.prototype.push = function(o) {
	this.__a.push(o);
}
Stack.prototype.pop = function() {
	if( this.__a.length > 0 ) {
		return this.__a.pop();
	}
	return null;
}
Stack.prototype.size = function() {
	return this.__a.length;
}
Stack.prototype.toString = function() {
	return '[' + this.__a.join(',') + ']';
}