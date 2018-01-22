function Calculator() {
  var accept = arguments[0].replace(' ', '');
  var isInArrayJudger = new IsInArrayJudger();
  var checkedFomul;
  var replaceTable = {
    '+' : '#',
    '-' : '$',
    '#' : '#',
    '$' : '$'
  }

  this.calculate = function() {
    return cal(checkedFomul);
  }

  this.check = function() {
    var checker = new Checker(accept);
    return checkedFomul = checker.isChecked();
  }

  function cal(fomul) {
    fomul = convertTo(fomul);
    //将加减乘除号之后的正负号合并成代替符号#$，防止被之后的加减函数当作分割符
    for (var i=0; i < fomul.length; i++) {
      if(fomul[i]=='(') {
        var j = findItsRightBracket(i, fomul);
        if(j === false)return 0;
        return cal(fomul.slice(0, i) +
          cal(fomul.slice(i+1, j)) + fomul.slice(j+1, fomul.length));
      }
    }//运算括号内的式子
    return add(fomul);
  }

  function add() {//加
    var fomula = arguments[0].split('+');
    blankToZero(fomula);//将分割后数组中空项转换成0
    var result = minus(fomula[0]);
    for (var i = 1; i < fomula.length; i++) {
      var result = result + minus(fomula[i]);
    }
    return result;
  }

  function minus() {//减
    var fomula = arguments[0].split('-');
    blankToZero(fomula);//将分割后数组中空项转换成0
    var result = multiply(fomula[0]);
    for (var i = 1; i < fomula.length; i++) {
      var result = result - multiply(fomula[i]);
    }
    return result;
  }

  function multiply() {//乘
    var fomula = arguments[0].split('*');
    var result = divide(fomula[0]);
    for (var i = 1; i < fomula.length; i++) {
      result = result * divide(fomula[i]);
    }
    return result;
  }

  function divide() {//除
    var fomula = arguments[0].split('/');
    convertBack(fomula);
    var result = parseFloat(fomula[0]);
    for (var i = 1; i < fomula.length; i++) {
      fomula[i] = parseFloat(fomula[i]);
      result = result / parseFloat(fomula[i]);
    }
    return result;
  }

  function blankToZero() {//将分割后数组中空项转换成0的函数
    for (var i = 0; i < arguments[0].length; i++) {
      if(arguments[0][i] == '')arguments[0][i] = '0';
    }
  }

  function convertTo(fomul) {//将正负号转换成代替符的函数
    var i, j;
    for (var i = 0; i < fomul.length; i++) {
      if((fomul[i]=='*' || fomul[i]=='/') &&
        isInArrayJudger.isInArray(fomul[i+1], 'am')) {//乘除号之后接上正负号的情况
        fomul = fomul.slice(0, i+1) + replaceTable[fomul[i+1]] +
          fomul.slice(i+2, fomul.length);
      }
      else if(isInArrayJudger.isInArray(fomul[i], 'am') &&
        isInArrayJudger.isInArray(fomul[i+1], 'am')) {//正负号之后接上正负号的情况
        fomul[i] = replaceTable[fomul[i]];
        fomul[i+1] = replaceTable[fomul[i+1]];
        var a = fomul[i]==fomul[i+1]?'#':'$';
        fomul = fomul.slice(0, i) + a + fomul.slice(i+2, fomul.length);
      }
    }
    return fomul;
  }

  function convertBack(fomula) {//将代替符转换回正负号的函数
    for (var i = 0; i < fomula.length; i++) {
      if(fomula[i][0] == '#')fomula[i] = fomula[i].replace('#', '+');
      else if(fomula[i][0] == '$')fomula[i] = fomula[i].replace('$', '-');
    }
    //return fomula;
  }

  function findItsRightBracket(i, fomul) {//找到某个左括号对应的右括号的函数
    var num = 1;
    for (var a = i+1; a < fomul.length; a++) {
      if(fomul[a] == ')')num--;
      else if(fomul[a] == '(')num++;
      if(num == 0)return a;
    }
    return false;
  }
}
