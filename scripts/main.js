var output = document.getElementById('output');
var input = document.getElementById('input');
var browser = new Browser();

window.onload = function() {//初始下就聚焦于输入框
  input.focus();
  if(browser.versions.mobile) {
    input.readOnly = "readOnly";
  }
	//指数‘e'的问题，整个删除, 显示结果的优化（如NaN）,程序优化
}

function showResult() {//按下等号将结果显示在输出框的响应函数
  if(output.value != '') {
    input.value = output.value;
    output.value = null;
    input.focus();
  }
}

function addValue(itemToInsert) {
  //按下数字，操作符时将它们显示在输入框内的响应函数;计算结果的响应函数
  input.focus();//聚焦于输入框
  itemToInsert = itemToInsert.toString();//转换成字符串
  if(itemToInsert == '@'/*需预处理的条件，这里的@代指括号*/) {
    var preHandler = new PreHandler
      (itemToInsert, input.value, input.selectionStart, input.selectionEnd);
    itemToInsert = preHandler.preHandle();
  }//待插入字符串的预处理
  input.selectionStart = input.selectionEnd = insert_innerFunction(itemToInsert);
  //将预处理过的字符串插入输入框，并返回新的光标位置
	var extendCalculator = new ExtendCalculator(input.value);
	output.value = extendCalculator.calculate();
}

function insert_innerFunction() {//在鼠标选中区插入字符
  var a = input.selectionStart;
  var stringToInsert = arguments[0];
  input.value =
    input.value.substr(0,input.selectionStart) + stringToInsert
    + input.value.substr(input.selectionEnd, input.value.length);
  return (a + stringToInsert.length);
}

input.onkeydown = function addValueByKeyboard() {
  var ew = event.which;
  var es = event.shiftKey;
  var ec = event.ctrlKey;
  if(37<=ew && ew<=40)return true;//上下左右键
	if(ew==116 || ew==123)return true;//F5和F12
	if(ec && (ew==67 || ew==86))return true;//复制与粘贴ctrl+c/v
  if(48<=ew && ew<=57) {//大键盘数字键按下时
    if(es) {
      if(ew == 48)addValue(')');
      else if(ew == 56)addValue('*');
      else if(ew == 57)addValue('(');
    }
    else addValue(ew-48);
  }
  else if(96<=ew && ew<=105)addValue(ew-96);//小键盘（除了回车键）按下时
  //else if(65<=ew && ew<=90)addValue(fromCharCode(ew));//字母键按下时
  else if((ew==187 && es) || ew==107)addValue('+');
  else if((ew==189 && !es) || ew==109)addValue('-');
  else if(ew==106)addValue('*');
  else if((ew==191 && !es) || ew==111)addValue('/');
  else if((ew==190 && !es) || ew==110)addValue('.');//加减乘除和小数点键按下时
  else if(ew==8 && !ec)del();//退格键按下时
  else if(ew==8 && ec)clea();//ctrl和回车键按下时
  else if(ew==187 && !es)showResult();//按下等号显示结果
	else addExtendsByKeyboard(ew);
  return false;
}

function addExtendsByKeyboard(ew) {
	if(ew == 81)addValue('sin(');
	else if(ew == 87)addValue('cos(');
	else if(ew == 69)addValue('tan(');
	else if(ew == 82)addValue('abs(');
	else if(ew == 65)addValue('asi(');
	else if(ew == 83)addValue('aco(');
	else if(ew == 68)addValue('ata(');
	else if(ew == 70)addValue('fac(');
	else if(ew == 90)addValue('ln(');
	else if(ew == 88)addValue('lg(');
	else if(ew == 67)addValue('(e)^(');
	else if(ew == 86)addValue('(10)^(');
	else if(ew == 66)addValue('π');
	else if(ew == 78)addValue('e');
	else if(ew == 77)addValue('^(2)');
	else if(ew == 188)addValue('^(');
}

function del() {//按下Del的响应函数
  howToDel_innerFunction();//具体的删除函数
  input.focus();//保持输入框聚焦
	var extendCalculator = new ExtendCalculator(input.value);
	output.value = extendCalculator.calculate();//计算
}

function howToDel_innerFunction() {
  var a = input.selectionStart;
  if(input.selectionStart==input.selectionEnd && input.selectionStart!=0) {
    input.value = input.value.slice(0, input.selectionStart-1) +
    input.value.slice(input.selectionEnd, input.value.length);
    input.selectionStart = input.selectionEnd = a-1;
  }//未选中时的删除--退格
  else if(input.selectionStart!=input.selectionEnd) {
    input.value = input.value.slice(0, input.selectionStart) +
    input.value.slice(input.selectionEnd, input.value.length);
    input.selectionStart = input.selectionEnd = a;
  }//选中时的删除--不退格
}

function clea() {//按下Clear的响应函数
  input.value = null;
  output.value = null;
  input.focus();
}
