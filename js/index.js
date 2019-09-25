(() => {
  let firstCheck = true;
  let firstPlase = 0;
  /** 重複チェック用配列 */
  var randoms = [];

  /** 最小値と最大値 */
  var min = 0, max = 63;

  const tool = document.getElementById('tool');
  for(var cnum = 0; cnum<64; cnum++){
    const div = document.createElement('div');
    const idname = cnum;
    div.onclick = function(){
      if(firstCheck){
        firstCheck=false;
        firstPlace=this.id;
        console.log(firstPlace);

        /** 重複チェックしながら乱数作成 */
        for(i = 0; i < mine_number; i++){
          while(true){
            var tmp = intRandom(min, max);
            if(!randoms.includes(tmp) && tmp != firstPlace){
              randoms.push(tmp);
              break;
            }
          }
        }
      }
      this.classList.add('safe');
    };
    const box = tool.appendChild(div);
    box.classList.add('box');
    box.setAttribute("id",idname);
  }



    
    let mine_number = 10; //爆弾の個数
    let field = new Map(); //Mapの作成
    let mine = new Map(); //Mapの作成

    for(var i = 0; i < 64; i++){
      field.set(i , true); //falseが爆弾
      mine.set(i, 0); //iは位置０は周囲に存在する爆弾の個数
    } //Mapを設定



    /** min以上max以下の整数値の乱数を返す */
    function intRandom(min, max){
      return Math.floor( Math.random() * (max - min + 1)) + min;
    }

    for(var j = 0; j < randoms.length; j++){
      for(var i = 0; i < field.size; i++){
        if(i == randoms[i]){
          field.set(i, false); //爆弾設置
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
    }

})();
