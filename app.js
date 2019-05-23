var currentCase = 1;
var idDivApp = "div_app";

function initTestCase(){
	document.getElementById("div_test_cubo_1").innerHTML = "";
	test_case.execute(core);	
}

function initCases(){
	currentCase = 1;
	document.getElementById("div_app").innerHTML = "";
	initCaseRecursive(1);
}

function initCaseRecursive(indexCase){
	var casesObj = document.getElementById("int_cases");
	var divAppObj = document.getElementById(idDivApp);

	if(casesObj.value > 100){
		alert("1 <= Cases <= 50");
		return;
	}

	if(currentCase  > casesObj.value){		
		core.drawText(
			idDivApp,
			"********** FIN *********",
			"success"
		);
		return;
	}

	core.drawText(
		idDivApp,
		"********** Case " + (indexCase) +" *********",
		"success"
	);

	var div = document.createElement("DIV");
	div.innerHTML = "Enter matrix and defines the number of operations (N  M): ";
	
	var input = document.createElement("INPUT");
	input.setAttribute("type", "text");

	var button = document.createElement("button");
	button.setAttribute("type", "button");
	button.innerHTML  = "Aceptar";
	button.onclick  = function(){
		var textInput = input.value;
		if(validateInputMatrix(textInput)){
			startProcess(textInput);
		}
	}

	div.appendChild(input);
	div.appendChild(button);
	divAppObj.appendChild(div);
}

function validateInputMatrix(text){
	var textSplit = text.split(" ");

	if(textSplit.length != 2){
		alert("Please enter two integers separated by a single space.");
		return false;
	}

	 if(isNaN(textSplit[0])){
	 	alert(textSplit[0] +" is not a number.");
	 	return false;
	 }

	if(isNaN(textSplit[1])){
	 	alert(textSplit[1] +" is not a number.");
	 	return false;
	 }

	return true;
}

function startProcess(text){
	var textSplit = text.split(" ");
	var N = parseInt(textSplit[0]);
	var M = parseInt(textSplit[1]);

	if(N < 1 || N > 100){
		alert("1 <= Matrix <= 100");
		return;
	}

	
	if(M < 1 || M > 1000){
		alert("1 <= operaciones <= 1000");
		return;
	}
	

	core.lengthMatrix = N;
	core.init();

	core.drawText(
		idDivApp,
		"******** Cube of " +(N) +"*"+(N)+"*" +(N) + " and " + (M) + " queries *******",
		"success"
	);

	startQuerys(M);
}

function startQuerys(indexQuery){

	if(indexQuery == 0){
		currentCase++;
		initCaseRecursive(currentCase);
		return;
	}
	var divAppObj = document.getElementById(idDivApp);
	var div = document.createElement("DIV");
	div.innerHTML = "UPDATE x y z W OR QUERY x1 y1 z1 x2 y2 z2";
	
	var input = document.createElement("INPUT");
	input.setAttribute("type", "text");

	var button = document.createElement("button");
	button.setAttribute("type", "button");
	button.innerHTML  = "Aceptar";
	button.onclick  = function(){
		var textInput = input.value;
		if(validateInputQuery(textInput)){
			executeQurey(textInput,indexQuery);
		}
	}

	div.appendChild(input);
	div.appendChild(button);
	divAppObj.appendChild(div);
}

function executeQurey(textInputQuery,indexQuery){
	var textSplit = textInputQuery.split(" ");
	if(textSplit.length == 4){

		if((textSplit[0] < 1 || textSplit[0] > (core.matrix.length -1))
			&& (textSplit[1] < 1 || textSplit[1] > (core.matrix.length -1))
			&& (textSplit[2] < 1 || textSplit[2] > (core.matrix.length -1))){
			alert("1 <= x, y, z <= N");
			return;
		}

		if(parseInt(textSplit[3]) < -109 ||  parseInt(textSplit[3]) > 109){

			alert("-109 <= W <= 109");
			return;
		}

		core.update(
			parseInt(textSplit[0]),
			parseInt(textSplit[1]),
			parseInt(textSplit[2]),
			parseInt(textSplit[3])
		);

		var dsUpdate = "update(";
		dsUpdate += textSplit[0] +",";
		dsUpdate += textSplit[1] +",";
		dsUpdate += textSplit[2] +",";
		dsUpdate += textSplit[3] +")";

		core.drawText(
			idDivApp,
			dsUpdate,
			"success"
		);

		core.print_matrix(idDivApp);	
	}else{

		if(textSplit[0] < 1 || textSplit[3] > (core.matrix.length -1)){
			alert("1 <= x1 <= x2 <= N");
			return;
		}

		if(textSplit[1] < 1 || textSplit[4] > (core.matrix.length -1)){
			alert("1 <= y1 <= y2 <= N");
			return;
		}

		if(textSplit[2] < 1 || textSplit[5] > (core.matrix.length -1)){
			alert("1 <= z1 <= z2 <= N");
			return;
		}	
		

		var resultQuery = core.query(
			parseInt(textSplit[0]),
			parseInt(textSplit[1]),
			parseInt(textSplit[2]),
			parseInt(textSplit[3]),
			parseInt(textSplit[4]),
			parseInt(textSplit[5])
		);

		var dsQuery = "query(";
		dsQuery += textSplit[0] +",";
		dsQuery += textSplit[1] +",";
		dsQuery += textSplit[2] +",";
		dsQuery += textSplit[3] +",";
		dsQuery += textSplit[4] +",";
		dsQuery += textSplit[5] +") = " + resultQuery;

		core.drawText(
			idDivApp,
			dsQuery,
			"success"
		);

	}

	indexQuery--;
	startQuerys(indexQuery);
}

function validateInputQuery(textInputQuery){
	var textSplit = textInputQuery.split(" ");

	if(textSplit.length != 4 && textSplit.length != 6){
		alert("Please enter UPDATE x y z W OR QUERY x1 y1 z1 x2 y2 z2.");
		return false;
	}

	 if(isNaN(textSplit[0])){
	 	alert(textSplit[0] +" is not a number.");
	 	return false;
	 }

	if(isNaN(textSplit[1])){
	 	alert(textSplit[1] +" is not a number.");
	 	return false;
	 }

	 if(isNaN(textSplit[2])){
	 	alert(textSplit[2] +" is not a number.");
	 	return false;
	 }

	 if(textSplit.length == 6){

		 if(isNaN(textSplit[3])){
		 	alert(textSplit[3] +" is not a number.");
		 	return false;
		 }

		if(isNaN(textSplit[4])){
		 	alert(textSplit[4] +" is not a number.");
		 	return false;
		 }

		 if(isNaN(textSplit[5])){
		 	alert(textSplit[5] +" is not a number.");
		 	return false;
		 }
	}

	 return true;
}
