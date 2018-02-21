function ExtendChecker(accept) {
	accept = accept.replace(' ', '');
	var bracket_isBalanced = 0;
  var checkedOrNot = true;
  var isInArrayJudger = new IsInArrayJudger();
	var extendTable = [
		'asi', 'aco', 'ata', 'sin', 'cos', 'tan', 'abs', 'fac',
		'ln', 'lg', '^', 'π', 'e'
	];
	
	this.checkedFomula = (function() {
		if(!check1())return false;
		//检查sin, cos, tan, asi, aco, ata, abs, fac, ln, lg的前后是否合法
		if(!check2())return false;//检查^, π, e的前后是否合法
		if(!checkBracket())return false;//检查括号是否平衡, 是否有空括号（）
		if(!checkExtra())return false;//检查是否有多余的字母
		completeArray();//补全(右括号，乘号)
		return accept;
	})();
	
	function check1() {
		var label, len, left, right;
		for(var k=0; k<=7; k++) {
			label = accept.indexOf(extendTable[k]);
			while(label >= 0) {
				if(k>=0 || k<=5)len = 3;//sin, cos, tan, asi, aco, ata的长度
				else if(k>=6 || k<=7)len = 2;//ln, lg的长度
				left = accept[label-1];
				right = accept[label+len];
				if(!(isInArrayJudger.isInArray(left, 'ammd') ||
					isInArrayJudger.isInArray(left, 'number') ||
					isInArrayJudger.isInArray(left, 'alphabet') ||
					left=='(' || left=='π' || left=='e' || left==undefined))
					return false;
				if(!(isInArrayJudger.isInArray(right, 'number') ||
					isInArrayJudger.isInArray(right, 'alphabet') ||
					right=='π' || right=='(' || right=='+' || right=='-'))
					return false;
				label = accept.indexOf(extendTable[k], label+len);
			}
		}
		return true;
	}
	
	function check2() {
		var left, right;
		for(var i=0; i<accept.length; i++) {
			left = accept[i-1];
			right = accept[i+1];
			if(accept[i] == '^') {
				if(!(left==')' || isInArrayJudger.isInArray(left, 'number')))
					return false;
				if(right!='(')return false;
			}
			else if(accept[i]=='π' || accept[i]=='e') {
				if(left == ')' || left=='e' || left=='π')return false;
				if(isInArrayJudger.isInArray(right, 'number') ||
					right=='e' || right=='π')return false;
			}
		}
		return true;
	}
	
	function checkExtra() {
		var temp = accept, yOrN;
		do {
			yOrN = false;
			for(var j=0; j<extendTable.length; j++)
				temp = temp.replace(extendTable[j], '');
			for(j=0; j<extendTable.length; j++)
				if(temp.indexOf(extendTable[j])>=0)
				{
					yOrN = true;
					break;
				}
		} while(yOrN);
		for(j=0; j<temp.length; j++)
			if(isInArrayJudger.isInArray(temp[j], 'alphabet'))return false;
		return true;
	}
	
	function checkBracket() {
		if(accept[accept.length-1]=='(')return false;
		for(var i=0; i<accept.length; i++)
		{
			if(accept[i] == '(') {
				bracket_isBalanced++;
				if(accept[i+1] == ')')return false;
			}
			else if(accept[i] == ')')bracket_isBalanced--;
		}
		if(bracket_isBalanced<0)return false;
		return true;
	}
	
	function completeArray() {
		var i=0 ,j;
		for(; i<accept.length; i++)
			if((isInArrayJudger.isInArray(accept[i], 'number') ||
				accept[i]=='π' || accept[i]=='e') && 
				(accept[i+1]=='(' || accept[i+1]=='e' || accept[i+1]=='π' ||
				isInArrayJudger.isInArray(accept[i+1], 'alphabet'))) {
				accept = accept.slice(0, i+1) + '*' +
					accept.slice(i+1, accept.length);
			}
		for(i=0; i<bracket_isBalanced; i++)
			accept = accept + ')';
		for(i=0; i<accept.length; i++)
			if(accept[i]=='^' && accept[i-1]!=')') {
				j = i-1;
				while(isInArrayJudger.isInArray(accept[j], 'number'))
					j--;
				accept = accept.slice(0, j+1) + '(' + accept.slice(j+1, i) +
					')' + accept.slice(i, accept.length);
			}
	}
}