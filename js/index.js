(() => {
  let firstCheck = true;
  let Place = 0;
  let boxNumber = 64;
  let mine_number = 10; //爆弾の個数
  let p_array = [];
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
        //for文で要素を格納する
        for(var n = 0; n < 8; n++){
          FIELD[n] = [];
          MINE[n] = [];
          for(var m = 0; m < 8; m++){
            FIELD[n][m] = true;//falseが爆弾
            MINE[n][m] = 0;
          }
        }
        console.log('for end');
        console.log(MINE);
        console.log(FIELD);

        /** 重複チェックしながら乱数作成 */ 
        for(i = 0; i < mine_number; i++){//<-ここを修正
          while(true){
            var tmp = intRandom(min, max);
            if(!randoms.includes(tmp) && tmp != Place && tmp != Place-1 && tmp != Place-7 && tmp != Place-8 && tmp != Place-9 && tmp != Place+1 && tmp != Place+7 && tmp != Place+8 && tmp != Place+9){
              randoms.push(tmp);
              break;
            }
          }
        }
        console.log('randoms:' + randoms);

        for(var i = 0; i < 64; i++){
          if(randoms.includes(i)){
            //for文で要素を格納する
            for(var n = 0; n < 8; n++){
              for(var m = 0; m < 8; m++){
                console.log('ok');
                if((n*8)+m == i){
                  FIELD[n][m] = false;
                  MINE[n][m] = -1;//爆弾設置
                  if(n-1 >= 0 && m-1 >= 0 && FIELD[n-1][m-1]){
                    console.log('1');
                    var b = Number(MINE[n-1][m-1]);
                    MINE[n-1][m-1] = b+1;
                  }
                  if(n-1 >= 0 && FIELD[n-1][m]){
                    console.log('2');
                    var b = Number(MINE[n-1][m]);
                    MINE[n-1][m] = b+1;
                  }
                  if(n-1 >= 0 && m+1 < 8 && FIELD[n-1][m+1]){
                    console.log('3');
                    var b = Number(MINE[n-1][m+1]);
                    MINE[n-1][m+1] = b+1;
                  }
                  if(m+1 < 8 && FIELD[n][m+1]){
                    console.log('4');
                    var b = Number(MINE[n][m+1]);
                    MINE[n][m+1] = b+1;
                  }
                  if(n+1 < 8 && m+1 < 8 && FIELD[n+1][m+1]){
                    console.log('5');
                    var b = Number(MINE[n+1][m+1]);
                    MINE[n+1][m+1] = b+1;
                  }
                  if(n+1 < 8 && m-1 >= 0 && FIELD[n+1][m-1]){
                    console.log('6');
                    var b = Number(MINE[n+1][m-1]);
                    MINE[n+1][m-1] = b+1;
                  }
                  if(n+1 < 8 && FIELD[n+1][m]){
                    console.log('7');
                    var b = Number(MINE[n+1][m]);
                    MINE[n+1][m] = b+1;
                  }
                  if(m-1 >= 0 && FIELD[n][m-1]){
                    console.log('8');
                    var b = Number(MINE[n][m-1]);
                    MINE[n][m-1] = b+1;
                  }
                }
              }
            } 
          }
        }
        for(var n = 0; n < 8; n++){
          for(var m = 0; m < 8; m++){
            if(Place == (n*8)+m){
              mine_check(n, m);
            }
          }
        }
      }else{
        for(var n = 0; n < 8; n++){
          for(var m = 0; m < 8; m++){
            if(Place==(n*8)+m){
              if(FIELD[n][m]){//改良が必要
                console.log('safe1');
                mine_check(n, m);
              }else{
                /*ゲームオーバーの処理*/
                const loose = document.getElementById('loose');
                loose.classList.add('loose');
                loose.classList.remove('none');
                console.log('game 0ver');
              }
            }
          }
        }
      }
      //console.log(MINE);
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

  function mine_check(n, m){
    if((n >= 0 && m >= 0) && (n < 8 && m < 8)){
      if(!p_array.includes((n*8)+m)){
        p_array.push((n*8)+m);
        for(var i=0; i<8; i++){
          for(var j=0; j<8; j++){
            if(n == i && m == j){
              if(MINE[i][j] == 0){
              /*周囲８マスをクリックしたことにしたい*/
                mine_check(n, m);
                mine_check(n, m-1);
                mine_check(n-1, m+1);
                mine_check(n-1, m);
                mine_check(n-1, m-1);
                mine_check(n, m+1);
                mine_check(n+1, m+1);
                mine_check(n+1, m);
                mine_check(n+1, m-1);
                const box = document.getElementById((n*8)+m);
                box.classList.add('safe');
              }else if(MINE[i][j] > 0){
                const box = document.getElementById((n*8)+m);
                box.classList.add('safe');
                let squareNumber = MINE[n][m];
              }else{
                console.log('stopping');
                let squareNumber = MINE[n][m];
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
