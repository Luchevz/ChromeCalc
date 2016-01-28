// Wait for the window to load before doing anything
window.addEventListener("load", windowLoaded());

// Declare global variables
var bar;
var num1, num2, num3, num4, num5, num6, num7, num8, num9;
var plusButton, minusButton, equalsButton;

// The function called after the window has loaded to declare all variables and event handlers
function windowLoaded() {
//	//VARIABLES and EVENTS
	bar = document.getElementById("bar");
	
	num1 = document.getElementById("num1");
	num2 = document.getElementById("num2");
	num3 = document.getElementById("num3");
	num4 = document.getElementById("num4");
	num5 = document.getElementById("num5");
	num6 = document.getElementById("num6");
	num7 = document.getElementById("num7");
	num8 = document.getElementById("num8");
	num9 = document.getElementById("num9");
	num1.onclick = clickButton.bind(event);
	num2.onclick = clickButton.bind(event);
	num3.onclick = clickButton.bind(event);
	num4.onclick = clickButton.bind(event);
	num5.onclick = clickButton.bind(event);
	num6.onclick = clickButton.bind(event);
	num7.onclick = clickButton.bind(event);
	num8.onclick = clickButton.bind(event);
	num9.onclick = clickButton.bind(event);
	
	plusButton = document.getElementById("plus");
	plusButton.onclick = clickButton.bind(event);
	minusButton = document.getElementById("minus");
	minusButton.onclick = clickButton.bind(event);
	equalsButton = document.getElementById("equals");
	equalsButton.onclick = Equals.bind();
	
//	// Always focus the input bar
	bar.focus();
	window.onclick = function() {bar.focus()};
	// Event on the input bar
	bar.addEventListener("keydown", function() {keyPressed(event)});
}

// Check if the key pressed is something specific
function keyPressed(event) {
	var keyNumerical = event.keyCode || event.which || event.charCode;
	//var keyActual = String.fromCharCode(keyNumerical);
	
	// Check if error() was on and return the background color of the input box
	if (bar.style.backgroundColor != "white")
		bar.style.backgroundColor = "white";
	
	// Enter key
	if (keyNumerical == 13)
		Equals();
	if ((keyNumerical == 8) && ((bar.value == "Not a valid statement") || (bar.value == "ERROR") || (bar.value == "NaN") || (bar.value == "true") || (bar.value == "false")))
			bar.value = "";

	//event.returnValue = false;
	//if(event.preventDefault) 
	//	event.preventDefault();
}

// Mouse click one of the buttons on screen
function clickButton(event) {
	bar.value = bar.value + event.srcElement.innerHTML;
}

function Equals() {
	try {
//		// VARIABLES
		// remove all spaces
		var barValue = bar.value.replace(/\s+/g, "");
		bar.value = barValue;
		var result = "ERROR";
		// Single sing/number
		var regexSign = /\+|\-|\*|\//;
		var regexNum = /^[-+]?\d+(\.\d+)?$/;
		// Multiple signs/numbers
		var regexSigns = /\+|\-|\*|\//g;
		var regexNums = /[-+]?[0-9]*\.?[0-9]+/g;
		
//		// TESTS
		// if the bar is empty do nothing
		if (barValue.length == 0)
			return;
		// if it's a single number do nothing
		if (regexNum.test(barValue))
			return;
		// try to see if there are too many SAME signs next to each other
		if (barValue.search(/([\-\+\*\/]){1}(\1)/) != -1)
			throw Exception;
		
//		// CALCULATION
		
		// separate all numbers in an array
		var numbers = barValue.match(regexNums);
		
		// if there are 2 numbers calculate normally
		if (numbers.length == 2) {
			var sign = barValue.replace(numbers[0], "").replace(numbers[1], "");
			if (sign.length == 1)
				result = +Calculate(numbers[0], numbers[1], sign).toFixed(9);
			else if (sign.length == 0)
				result = +Calculate(numbers[0], numbers[1], "+").toFixed(9);
			else
				throw Exception;	
		}
			
		// return the value if no error is present
		if (result == "ERROR")
			throw Exception;
		bar.value = result;
		
	}catch(e) {
		error();
	}
}

function Calculate(_n1, _n2, sign) {
	n1 = parseFloat(_n1)
	n2 = parseFloat(_n2)
	sign = (typeof(sign) === undefined) ? "+" : sign;
	
	if (sign == "+")
		return n1 + n2;
	if (sign == "-")
		return n1 - n2;
	if (sign == "*")
		return n1 * n2;
	if (sign == "/") {
		if (n2 != 0)
			return n1 / n2;
		else
			// throws exception
			return "Can't divide by zero";
	}
}

// called when an exception is thrown
function error() {
	bar.style.backgroundColor = "#ff3300";
}


