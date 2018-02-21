function Checker(accept) {
	accept = accept.replace(' ', '');
  var bracket_isBalanced = 0;
  var checkedOrNot = true;
  var isInArrayJudger = new IsInArrayJudger();

  this.checkedFomula = (function() {
    if(accept[0] == null)return false;//数组为空，不通过检查
    if(accept[0]!='+' && accept[0]!='-' && accept[0]!='(' &&
      !isInArrayJudger.isInArray(accept[0], 'number') )
      return false;//首元素不符合规则，不通过检查
    for (var i = 0; i < accept.length; i++) {
      if(isInArrayJudger.isInArray(accept[i], 'ammd'))
        checkedOrNot = checkedOrNot && checkAmmd(accept[i+1]);
      else if(isInArrayJudger.isInArray(accept[i], 'number'))
        checkedOrNot = checkedOrNot && checkNumber(accept[i-1], accept[i], accept[i+1]);
      else if(accept[i] == '(')checkedOrNot = checkedOrNot && checkLeftBracket(accept[i+1]);
      else if(accept[i] == ')')checkedOrNot = checkedOrNot && checkRightBracket(accept[i+1]);
      else checkedOrNot = false;
			if(!checkedOrNot)return false;//对元素逐一检查
    }
    if(bracket_isBalanced<0)return false;
		completeArray();//补全（右括号，乘号）
    return accept;
  })();

  function checkAmmd(val) {
    return val=='(' || isInArrayJudger.isInArray(val, 'number') || val=='+' || val=='-';
  }

  function checkNumber(left, mid, right) {
    if(mid == '.'&&!checkDot(left, right))return false;
    return isInArrayJudger.isInArray(right, 'number') ||
      isInArrayJudger.isInArray(right, 'ammd') ||
			right==')' || right=='(' || right==undefined;
  }

  function checkLeftBracket(val) {
    bracket_isBalanced ++;
    return val=='(' || isInArrayJudger.isInArray(val, 'number') || val=='+' || val=='-';
  }

  function checkRightBracket(val) {
    bracket_isBalanced --;
    return val==')' || isInArrayJudger.isInArray(val, 'ammd') || val==undefined;
  }

  function checkDot(left, right) {
    return (isInArrayJudger.isInArray(left, 'number')&&left!='.') ||
      (isInArrayJudger.isInArray(right, 'number')&&right!='.');
  }
	
	function completeArray()
	{
		var yOrN, i=0;
		for(yOrN=false; i<accept.length; i++)
			if(isInArrayJudger.isInArray(accept[i], 'number') &&
				accept[i+1]=='(') {
				accept = accept.slice(0, i+1) + '*' +
					accept.slice(i+1, accept.length);
			}
		for(i=0; i<bracket_isBalanced; i++)
			accept = accept + ')';
	}
}
