function IsInArrayJudger() {
  var ammd = ['+', '-', '*', '/']; //ammd = add + minus + multiply = divide
  var number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  var am = ['+', '-', '#', '$'];//add and minus

  this.isInArray = function(item, arrayName) {
    var array;
    if(arrayName == 'ammd')array = ammd;
    else if(arrayName == 'number')array = number;
    else if(arrayName == 'am')array = am;
    for (var i = 0; i < array.length; i++) {
      if(item == array[i])return true;
    }
    return false;
  }
}
