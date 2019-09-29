(() => {
  let firstCheck = true;
  let Place = 0;
  let boxNumber = 64;
  let mine_number = 10; //爆弾の個数
  let p_array = [];
  let field = new Map(); //Mapの作成
  let mine = new Map(); //Mapの作成
  let MINE = [];
  let FIELD = [];
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
        console.log('Place:' + Place);

        console.log('for start');
        for(var i = 0; i < 64; i++){
          field.set(i , t); //falseが爆弾
          mine.set(i, 0); //iは位置０は周囲に存在する爆弾の個数
        } //Mapを設定
        //for文で要素を格納する
        for(var n = 0; n < 8; n++){
          FIELD[n] = [];
          for(var m = 0; m < 8; m++){
            FIELD[n][m] = field.get(n*m);
          }
        }
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
        console.log('randoms:' + randoms);

        for(var i = 0; i < 64; i++){
          if(randoms.includes(i)){
            //for文で要素を格納する
            field.set(i, f);
            for(var n = 0; n < 8; n++){
              for(var m = 0; m < 8; m++){
                console.log('ok');
                if((n*8)+m == i){
                  FIELD[n][m] = false;
                  if(n-1 >= 0 && m-1 >= 0 && FIELD[n-1][m-1]){
                    console.log('1');
                    var a = (n-1)*8+(m-1);
                    var b = Number(mine.get(a));
                    mine.set(a,b+1);
                  }
                  if(n-1 >= 0 && FIELD[n-1][m]){
                    console.log('2');
                    var a = (n-1)*8+m;
                    var b = Number(mine.get(a));
                    mine.set(a,b+1);
                  }
                  if(n-1 >= 0 && m+1 < 8 && FIELD[n-1][m+1]){
                    console.log('3');
                    var a = (n-1)*8+(m+1);
                    var b = Number(mine.get(a));
                    mine.set(a,b+1);
                  }
                  if(m+1 < 8 && FIELD[n][m+1]){
                    console.log('4');
                    var a = n*8+(m+1);
                    var b = Number(mine.get(a));
                    mine.set(a,b+1);
                  }
                  if(n+1 < 8 && m+1 < 8 && FIELD[n+1][m+1]){
                    console.log('5');
                    var a = (n+1)*8+(m+1);
                    var b = Number(mine.get(a));
                    mine.set(a,b+1);
                  }
                  if(n+1 < 8 && m-1 >= 0 && FIELD[n+1][m-1]){
                    console.log('6');
                    var a = (n+1)*8+(m-1);
                    var b = Number(mine.get(a));
                    mine.set(a,b+1);
                  }
                  if(n+1 < 8 && FIELD[n+1][m]){
                    console.log('7');
                    var a = (n+1)*8+(m);
                    var b = Number(mine.get(a));
                    mine.set(a,b+1);
                  }
                  if(m-1 >= 0 && FIELD[n][m-1]){
                    console.log('8');
                    var a = n*8+(m-1);
                    var b = Number(mine.get(a));
                    mine.set(a,b+1);
                  }
                }
              }
            } 
            mine.set(i, -1); //爆弾設置
            console.log(mine);
          }
        }
        //for文で要素を格納する
        for(var n = 0; n < 8; n++){
          MINE[n] = [];
          for(var m = 0; m < 8; m++){
            MINE[n][m] = mine.get((n*8)+m);
          }
        }
        mine_check(Place);
      }else{
        console.log(mine.get(Place));//undefinedになる <- 何故？
        if(field.get(Place)){//改良が必要
          console.log('safe1');
          mine_check(Place);
        }else{
          /*ゲームオーバーの処理*/
          const loose = document.getElementById('loose');
          loose.classList.add('loose');
          loose.classList.remove('none');
          console.log('game 0ver');
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
    if(p >= 0 && p < 64){
      if(!p_array.includes(p)){
        p_array.push(p);
        for(var i=0; i<8; i++){
          for(var j=0; j<8; j++){
            if(p == i*8+j){
              if(MINE[i][j] == 0){
              /*周囲８マスをクリックしたことにしたい*/
              const box = document.getElementById(p);
                box.classList.add('safe');
                mine_check(p-1);
                mine_check(p-7);
                mine_check(p-8);
                mine_check(p-9);
                mine_check(p+1);
                mine_check(p+7);
                mine_check(p+8);
                mine_check(p+9);
              }else if(MINE[i][j] > 0){
              const box = document.getElementById(p);
                box.classList.add('safe');
                let squareNumber = mine.get(p);
              }else{
                console.log('stopping');
                let squareNumber = mine.get(p);
                console.log('p_array:' + p_array);
                /*マスに数字を表示する処理*/
              }
            }
          }
        }
      }
    }
  }

    /** min以上max以下の整数値の乱数を返す */
    function intRandom(min, max){
      return Math.floor( Math.random() * (max - min + 1)) + min;
    }
})();
