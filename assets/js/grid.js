function createGrid() {
	if (json.grid == false) return;
	
	var grid, rule, columns;
	
	grid = document.createElement("div");
	grid.id = "grid";
	
	rule = {};
	
	rule.v  = document.createElement("div");
	rule.hr = document.createElement("div");
	rule.hl = document.createElement("div");	
	rule.v.id  = "rule_v";
	rule.hr.id = "rule_h_right";	
	rule.hl.id = "rule_h_left";	
	
	columns = {}
	
	columns.group = document.createElement("div");
	columns.group.id = "columnGroup";
	
	for(var i = 1; i <= 16; i++){
		columns["col"+i] = document.createElement("div");
		columns["col"+i].id = "column" + i;
		columns["col"+i].classList.add("gridColumn");
		columns.group.appendChild(columns["col"+i]);
	}
	
	
	grid.appendChild(rule.v);
	grid.appendChild(rule.hr);
	grid.appendChild(rule.hl);
	grid.appendChild(columns.group);
	
	document.body.appendChild(grid);
	gridToggleListener()
}

document.addEventListener('DOMContentLoaded', createGrid);

////////////////////////////////////////////////////////////////////////////////

function gridToggleListener(){

	var isHeld = false;
	var timer  = false;
	var gridOn = true;
	
	document.body.addEventListener("mousedown",  startTimer);
	document.body.addEventListener("mouseup",    clearTimer);
	document.body.addEventListener("touchstart", startTimer);
	document.body.addEventListener("touchend",   clearTimer);
	
	function startTimer(){ timer = setTimeout(setIsHeld, 500); }
	function setIsHeld() { isHeld = true; clearTimer(); }
	function clearTimer(){
		clearTimeout(timer);
		if (isHeld){
			document.getElementById("grid").classList.toggle("hidden");
			document.body.classList.toggle("gridHidden");
		}
		isHeld = false;
	}
}