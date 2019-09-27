(() => {
  let firstCheck = true;
  let Place = 0;
  let boxNumber = 64;
  let mine_number = 10; //爆弾の個数
  let field = new Map(); //Mapの作成
  let mine = new Map(); //Mapの作成
  let t = true;
  let f = false;
  
  /** 重複チェック用配列 */
  var randoms = [];

  /** 最小値と最大値 */
  var min = 0, max = 63;

  const tool = document.getElementById('tool');
  for(var cnum = 0; cnum<64; cnum++){
    const div = document.createElement('div');
    const idname = cnum;
    div.onclick = function(){
      Place=Number(this.id);
      if(firstCheck){
        firstCheck=false;
        console.log(Place);

        console.log('for start');
        for(var i = 0; i < 64; i++){
          field.set(i , t); //falseが爆弾
          mine.set(i, 0); //iは位置０は周囲に存在する爆弾の個数
          console.log(mine.get(i));
        } //Mapを設定
        console.log('for end');

        /** 重複チェックしながら乱数作成 */
        for(i = 0; i < mine_number; i++){
          while(true){
            var tmp = intRandom(min, max);
            if(!randoms.includes(tmp) && tmp != Place){
              randoms.push(tmp);
              break;
            }
          }
        }
        console.log(randoms);

        for(var i = 0; i < 64; i++){
          if(randoms.includes(i)){
            field.set(i, f); //爆弾設置
            mine.set(i, -1); //爆弾設置
    
            /*ここから周囲の爆弾の個数の確認*/
            if(i-1 >= 0 && field.get(i-1) == true){
            var a = mine.get(i-1);
            mine.set(i-1, a+1);
            }
            if(i-7 >= 0 && field.get(i-7) == true){
              var a = mine.get(i-7);
              mine.set(i-7, a+1);
            }
            if(i-8 >= 0 && field.get(i-8) == true){
              var a = mine.get(i-8);
              mine.set(i-8, a+1);
            }
            if(i-9 >= 0 && field.get(i-9) == true){
              var a = mine.get(i-9);
              mine.set(i-9, a+1);
            }
            if(i+1 < 64 && field.get(i+1) == true){
              var a = mine.get(i+1);
              mine.set(i+1, a+1);
            }
            if(i+7 < 64 && field.get(i+7) == true){
              var a = mine.get(i+7);
              mine.set(i+7, a+1);
            }
            if(i+8 < 64 && field.get(i+8) == true){
              var a = mine.get(i+8);
              mine.set(i+8, a+1);
            }
            if(i+9 < 64 && field.get(i+9) == true){
              var a = mine.get(i+9);
              mine.set(i+9, a+1);
            }
          }
        }
        mine_check(Place);
        console.log(field);
        console.log(mine);
      }else{
        console.log(mine.get(Place));//undefinedになる <- 何故？
        if(field.get(Place)){//改良が必要
          console.log('safe');
          mine_check(Place);
          console.log(Place);
          console.log(mine.get(Place));//undefinedになる <- 何故？
        }else{
          /*ゲームオーバーの処理*/
          const loose = document.getElementById('loose');
          loose.classList.add('loose');
          loose.classList.remove('none');
          console.log('game 0ver');
          console.log(Place);
          console.log(field);
        }
      }
      this.classList.add('safe');
      boxNumber--;
      if(mine_number == boxNumber){
        /*ゲームクリアの処理*/
      }
    };
    const box = tool.appendChild(div);
    box.classList.add('box');
    box.setAttribute("id",idname);
  }

  function mine_check(p){
    if(p >= 0){
      if(mine.get(p) == 0){
        /*周囲８マスをクリックしたことにしたい*/
        var p_array = [];
        if(!p_array.includes(p)){
          p_array.push(p);
          mine_check(p-1);
          mine_check(p-7);
          mine_check(p-8);
          mine_check(p-9);
          mine_check(p+1);
          mine_check(p+7);
          mine_check(p+8);
          mine_check(p+9);
  
          const box = document.getElementById(p);
          box.classList.add('safe');
        }
      }else{
        console.log('stopping');
        let squareNumber = mine.get(p);
        /*マスに数字を表示する処理*/
      }
    }
  }

    /** min以上max以下の整数値の乱数を返す */
    function intRandom(min, max){
      return Math.floor( Math.random() * (max - min + 1)) + min;
    }
})();
