
window.onload=function (){
	
	//选取所有按键
	var keys = document.querySelectorAll('#calculator span');
	var operators = ['+', '-', 'x', '÷'];
	var decimalAdded = false;   //小数点
	
	//按键增加点击事件
	for(var i = 0; i < keys.length; i++){
		keys[i].onclick = function(e) {
			//获取屏幕和按钮值
			var input = document.querySelector('.screen');
			var inputVal = input.innerHTML;
			var btnVal = this.innerHTML;
			
			//将按钮值放到input里，并计算
			//首先 clear键
			if(btnVal == 'C'){
				input.innerHTML = '';	
				decimalAdded = false;
			}else if(btnVal == '='){     	  //'='按下  
				var equation = inputVal;
				var lastChar = equation[equation.length - 1];
				equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
				
				//判断最后输入的字符是什么，是加号小数点就删除
				if(operators.indexOf(lastChar) > -1||lastChar == '.'){
					equation = equation.replace(/.$/, '');		
				}
				if(equation){
					input.innerHTML = eval(equation);           //直接解析字符串，得出运算结果	
				}
				decimalAdded = false;
			}
			else if(operators.indexOf(btnVal)>-1) {             //说明输入了运算符号
				var lastChar = inputVal[inputVal.length - 1];
				
				if(inputVal != '' && operators.indexOf(lastChar) == -1)
                input.innerHTML += btnVal;                      //只在input不为空的情况下添加运算符号
				
				else if(inputVal == '' && btnVal == '-')
                input.innerHTML += btnVal;                      //小数

				if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
         
                input.innerHTML = inputVal.replace(/.$/, btnVal);  //输入2个计算符号解决
          		 }

            decimalAdded =false;

			}
			else if(btnVal == '.') {                           //输入小数点
            if(!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            	}
       		}
			else {
            input.innerHTML += btnVal;
       		 }

       		 e.preventDefault();                              //阻止默认事件


		}	
	}
}