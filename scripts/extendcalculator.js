function ExtendCalculator(accept) {
	var extendTable = [
		'asi', 'aco', 'ata', 'sin', 'cos', 'tan', 'abs', 'fac',
		'ln', 'lg', '^', 'π', 'e'
	];
	var replaceTable = {
		'asi' : 'asin', 'aco' : 'acos', 'ata' : 'atan',
		'sin' : 'sin', 'cos' : 'cos', 'tan' : 'tan',
		'abs' : 'abs', 'ln' : 'log', '^' : 'pow'
	}
	var isInArrayJudger = new IsInArrayJudger();
	var checkedFomula = (function() {
		var exTendChecker = new ExtendChecker(accept);
		return exTendChecker.checkedFomula;
	})();

	this.calculate = function() {
		if(checkedFomula === false)return null;
		return powTrans(cal(checkedFomula));
	}

	function powTrans(fomul) {
		if(fomul && fomul.toString().indexOf('e')>=0) {
			fomul = fomul.toString();
			var i = fomul.indexOf('e');
			fomul = fomul.slice(0, i) + '^(' +
				fomul.slice(i+1, fomul.length) + ')';
		}
		return fomul;
	}

	function cal(fomul) {
		var left, mid, right;//用于^, 因为^有两个参数:()^()
		var start, bLeft, bRight;//用于一个参数的扩展运算符
		var pos;//用于无参数的e和π
		do {
			if(fomul.indexOf('^') < 0)break;
			mid = fomul.indexOf('^');
			left = findItsLeftBracket(mid-1, fomul);
			right = findItsRightBracket(mid+1, fomul);
			var temp = handleExtends('^', fomul.slice(left+1, mid-1),
				fomul.slice(mid+2, right));
			fomul = fomul.slice(0, left) + temp +
				fomul.slice(right+1, fomul.length);
		} while(true);//处理^
		do {
			if(fomul.indexOf('e') < 0) {
				if(fomul.indexOf('π') < 0)break;
				fomul = fomul.replace('π', handleExtends('π'));
			} else
			fomul = fomul.replace('e', handleExtends('e'));
		} while(true);//处理e和π
		for(var i=0; i<extendTable.length; i++)
			do {
				if(fomul.indexOf(extendTable[i]) < 0)
					break;
				start = fomul.indexOf(extendTable[i]);
				bLeft = fomul.indexOf('(', start);
				bRight = findItsRightBracket(bLeft, fomul);
				fomul = fomul.slice(0, start) +
					handleExtends(fomul.slice(start, bLeft),
						fomul.slice(bLeft+1, bRight), null, i)+
					fomul.slice(bRight+1, fomul.length);
			} while(true);//处理其他扩展运算符
		var calculator = new Calculator(fomul);
		return calculator.calculate();
	}

	function handleExtends(name, para1, para2) {
		if(para1)
			for(var u=0; u<para1.length; u++)
				if(!isInArrayJudger.isInArray(para1[u], 'number')) {
					para1 = cal(para1);
					break;
				}
		if(para2)
			for(u=0; u<para2.length; u++)
				if(!isInArrayJudger.isInArray(para2[u], 'number')) {
					para2 = cal(para2);
					break;
				}
		if(name == 'e')return Math.E;
		if(name == 'π')return Math.PI;
		if(name == 'fac') {
			if(parseInt(para1)<0 || parseInt(para1)>=22 ||
				parseInt(para1).toString()=='NaN')return NaN;
			var result=1;
			for(var i=1; i<=parseInt(para1); i++)
				result *= i;
			return result.toString();
		}
		name = replaceTable[name];
		return Math[name](parseFloat(para1), parseFloat(para2)).toString();
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

	function findItsLeftBracket(i, fomul) {//找到某个右括号对应的左括号的函数
    var num = -1;
    for (var a = i-1; a>=0; a--) {
      if(fomul[a] == ')')num--;
      else if(fomul[a] == '(')num++;
      if(num == 0)return a;
    }
    return false;
  }
}
