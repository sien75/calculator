function PreHandler(itemToInsert, mainString, start, end) {
  var isInArrayJudger = new IsInArrayJudger();

  this.preHandle = function() {
    if(itemToInsert == '@')return handleBracket();
  }

  var handleBracket = function() {//处理左右括号的选择问题
    var left = leftExceptBlank();
    var right = rightExceptBlank();
    if(left=='(')return '(';//左侧是左括号返回左括号
    if(isInArrayJudger.isInArray(left, 'ammd'))return '(';//左侧是加减乘除返回左括号
    if(leftBracketNumberOnLeft() > 0)return ')';//左边有单独的左括号返回右括号
    else if(isInArrayJudger.isInArray(left, 'number') || left==')')return '*(';
    //左侧是数字或右括号返回乘左括号
    if( isInArrayJudger.isInArray(right, 'number'))return '(';//右侧是数字返回左括号
    else if(right=='*' || right=='/')return ')';//右侧是乘除号返回右括号
    return '(';//默认返回左括号
  }

  function leftExceptBlank() {
    for (var i = start-1; i >= 0; i--) {
      if(mainString[i] != ' ')break;
    }
    return mainString[i];
  }

  function rightExceptBlank() {
    for (var i = start; i < mainString.length; i++) {
      if(mainString[i] != ' ')break;
    }
    return mainString[i];
  }

  function leftBracketNumberOnLeft() {
    var a = 0;
    for (var i = 0; i < start; i++) {
      if(mainString[i]=='(')a++;
      else if(mainString[i]==')')a--;
    }
    return a;
  }

  function rightBracketNumberOnRight() {
    var a = 0;
    for (var i = start; i < mainString.length; i++) {
      if(mainString[i]==')')a++;
      else if(mainString[i]=='(')a--;
    }
    return a;
  }
}
