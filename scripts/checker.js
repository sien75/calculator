function Checker(accept) {
  var bracket_isBalanced = 0;
  var checkedOrNot = true;
  var isInArrayJudger = new IsInArrayJudger();

  this.isChecked = function() {
    if(accept[0] == null)return false;
    if(accept[0]!='+' && accept[0]!='-' && accept[0]!='(' &&
      !isInArrayJudger.isInArray(accept[0], 'number') )
      return false;
    for (var i = 0; i < accept.length; i++) {
      if(isInArrayJudger.isInArray(accept[i], 'ammd'))
        checkedOrNot = checkedOrNot && checkAmmd(accept[i+1]);
      else if(isInArrayJudger.isInArray(accept[i], 'number'))
        checkedOrNot = checkedOrNot && checkNumber(accept[i+1]);
      else if(accept[i] == '(')checkedOrNot = checkedOrNot && checkLeftBracket(accept[i+1]);
      else if(accept[i] == ')')checkedOrNot = checkedOrNot && checkRightBracket(accept[i+1]);
      if(!checkedOrNot)return false;
    }
    if(bracket_isBalanced<0)return false;
    else if(bracket_isBalanced>0)
      for (var i = 0; i < bracket_isBalanced; i++) {
        accept = accept + ')';
      }
    return accept;
  }

  function checkAmmd(val) {
    return val=='(' || isInArrayJudger.isInArray(val, 'number') || val=='+' || val=='-';
  }

  function checkNumber(val) {
    return isInArrayJudger.isInArray(val, 'number') ||
      isInArrayJudger.isInArray(val, 'ammd') || val==')' || val=='.' || val==undefined;
  }

  function checkLeftBracket(val) {
    bracket_isBalanced ++;
    return val=='(' || isInArrayJudger.isInArray(val, 'number') || val=='+' || val=='-';
  }

  function checkRightBracket(val) {
    bracket_isBalanced --;
    return val==')' || isInArrayJudger.isInArray(val, 'ammd') || val==undefined;
  }
}
