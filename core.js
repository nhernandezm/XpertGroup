
core = {
	lengthMatrix:0,
	matrix:new Array(0),
	load_matrix:function(){
		var me = this;
		for (var x = 0; x < me.matrix.length; x++) {
			me.matrix[x] = new Array(me.lengthMatrix);

			for (var y = 0; y < me.matrix[x].length; y++) {
				me.matrix[x][y] = new Array(me.lengthMatrix);

				for (var z = 0; z < me.matrix[x][y].length; z++) {
					me.matrix[x][y][z] = 0;
				}
			}
		}
	},
	print_matrix:function(idDiv){
		var me = this;
		for (var x = 1; x < me.matrix.length; x++) {

			for (var y = 0; y < me.matrix[x].length; y++) {

				for (var z = 0; z < me.matrix[x][y].length; z++) {
					if(x == y && x == z ){
						me.drawText(idDiv,(x) + " " +(y) + " " +(z) + " = " +(me.matrix[x][y][z]));
						console.log(x,y,z,me.matrix[x][y][z]);
					}
				}
			}
		}
	},
	update:function(x1,y1,z1,W){
		var me = this;
		for (var x = 0; x < me.matrix.length; x++) {

			for (var y = 0; y < me.matrix[x].length; y++) {

				for (var z = 0; z < me.matrix[x][y].length; z++) {
					if(x == x1 && y == y1 && z == z1 ){
						me.matrix[x][y][z] = W;
					}
				}
			}
		}
	},
	query:function(x1,y1,z1,x2,y2,z2){
		var me = this;

		var sum = 0;
		var iteratoins = 1;

		for (var tt = 0; tt < iteratoins; tt++) {
			var xaux = 0;
			var yaux = 0;
			var zaux = 0;
			for (var xx = x1; xx <= x2; xx++) {
				xaux = xx;
				for (var x = 0; x < me.matrix.length; x++) {


					for (var yy = y1; yy <= y2; yy++) {
						yaux = yy;
						for (var y = 0; y < me.matrix[x].length; y++) {

							for (var zz = z1; zz <= z2; zz++) {
								zaux = zz;
								for (var z = 0; z < me.matrix[x][y].length; z++) {

									if(x == xaux && y == yaux && z == zaux ){
										sum += me.matrix[xaux][yaux][zaux];
									}
								}
							}
						}
					}
				}
			}
		}

		return sum;
	},
	drawText:function(idDiv,text){
		var innertext = document.getElementById(idDiv).innerHTML;
		document.getElementById(idDiv).innerHTML = innertext +"<br>"+ text;
	},
	init:function(){
		var me = this;
		me.lengthMatrix = me.lengthMatrix + 1;
		me.matrix = new Array(me.lengthMatrix);
		me.load_matrix();
	}
}
