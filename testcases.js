var test_case = {

	divOut:"div_test_cubo_1",

	//number of cases
	cases : 2,

	//one object for each case, this with attributes:
	//N defines the N * N * N matrix. 
	//M defines the number of operations.
	matrix_operation:[
		{
			N:4,
			M:5,
			//difine the data for each operation,
			//the number of operations have be equal to M, in this case 5
			operations:[
				{
					type:"UPDATE",
					x: 2,
					y: 2,
					z: 2,
					W: 4
				},
				{
					type:"QUERY",
					x1: 1,
					y1: 1,
					z1: 1,
					x2: 3,
					y2: 3,
					z2: 3,
					result: 4
				},
				{
					type:"UPDATE",
					x: 1,
					y: 1,
					z: 1,
					W: 23
				},
				{
					type:"QUERY",
					x1: 2,
					y1: 2,
					z1: 2,
					x2: 4,
					y2: 4,
					z2: 4,
					result: 4
				},
				{
					type:"QUERY",
					x1: 1,
					y1: 1,
					z1: 1,
					x2: 3,
					y2: 3,
					z2: 3,
					result: 27
				},
			]
		},
		{
			N:2,
			M:4,
			operations:[
				{
					type:"UPDATE",
					x: 2,
					y: 2,
					z: 2,
					W: 1
				},
				{
					type:"QUERY",
					x1: 1,
					y1: 1,
					z1: 1,
					x2: 1,
					y2: 1,
					z2: 1,
					result: 0
				},
				{
					type:"QUERY",
					x1: 1,
					y1: 1,
					z1: 1,
					x2: 2,
					y2: 2,
					z2: 2,
					result: 1
				},
				{
					type:"QUERY",
					x1: 2,
					y1: 2,
					z1: 2,
					x2: 2,
					y2: 2,
					z2: 2,
					result: 1
				},

			]
		}
	],
	validate:function () {
		var me = this;
		var isOK = true;

		//Validate cases is equal to matrix_operation
		if(me.matrix_operation.length != me.cases){
			core.drawText(me.divOut,"The number of cases is different than operations supplied.","error");
			isOK = false;
		}

		//Validate number of operations defined in each case 
		//is equal to operations supplied
		for (var i = 0; i < me.matrix_operation.length; i++) {
			if(me.matrix_operation[i].M != me.matrix_operation[i].operations.length){
				core.drawText(
					me.divOut,
					"The number of operations defined in the case " +(i+1) + " is different to operations supplied.",
					"error"
				);
				isOK = false;
			}
		}

		return isOK;
	},
	execute:function(){
		var me = this;

		if(me.validate()){

			me.executeRecursive(0);

		}
	},
	executeRecursive:function(indexMatrix){
		var me = this;
		if(me.matrix_operation.length > indexMatrix){
			
			setTimeout(function(){
				var N = me.matrix_operation[indexMatrix].N;
				var M = me.matrix_operation[indexMatrix].M;

				core.drawText(
					me.divOut,
					"********** Case " + (indexMatrix + 1) + ": Cube of " +(N) +"*"+(N)+"*" +(N) + " and " + (M) + " queries *******",
					"success"
				);
				core.lengthMatrix = N;
				core.init();
				me.executeCase(me.matrix_operation[indexMatrix],indexMatrix);
			},100);
		}

	},
	executeCase:function(caseExe,indexMatrix){
		var me = this;
		me.executeCaseRecursive(0,indexMatrix);
	},
	executeCaseRecursive:function(indexOperation,indexMatrix){
		var me = this;
		if(me.matrix_operation[indexMatrix].operations.length > indexOperation){

			var operation = me.matrix_operation[indexMatrix].operations[indexOperation];

			if(operation.type == "UPDATE"){
				me.executeUpdate(operation);
			}
			if(operation.type == "QUERY"){
				me.executeQuery(operation);
			}

			setTimeout(function(){	
				indexOperation++;				
				me.executeCaseRecursive(indexOperation,indexMatrix);
			},100);
		}else{
			indexMatrix++;
			me.executeRecursive(indexMatrix);
		}
	},
	executeUpdate:function(operationUpdate){
		var me = this;
		core.update(
			operationUpdate.x,
			operationUpdate.y,
			operationUpdate.z,
			operationUpdate.W
		);

		var dsUpdate = "update(";
		dsUpdate += operationUpdate.x +",";
		dsUpdate += operationUpdate.y +",";
		dsUpdate += operationUpdate.z +",";
		dsUpdate += operationUpdate.W +")";

		core.drawText(
			me.divOut,
			dsUpdate,
			"success"
		);

		core.print_matrix(me.divOut);
	},
	executeQuery:function(operationQuery){
		var me = this;
		var resultQuery = core.query(
			operationQuery.x1,
			operationQuery.y1,
			operationQuery.z1,
			operationQuery.x2,
			operationQuery.y2,
			operationQuery.z2
		);

		var dsQuery = "query(";
		dsQuery += operationQuery.x1 +",";
		dsQuery += operationQuery.y1 +",";
		dsQuery += operationQuery.z1 +",";
		dsQuery += operationQuery.x2 +",";
		dsQuery += operationQuery.y2 +",";
		dsQuery += operationQuery.z2 +")";

		if(resultQuery == operationQuery.result){
			core.drawText(
				me.divOut,
				dsQuery +" = "+resultQuery+ " --> OK.",
				"success" 
			);
		}else{
			core.drawText(
				me.divOut,
				dsQuery +" = "+resultQuery+ " --> Failed.",
				"error"
			);
		}
	}
}