var slider = document.getElementById("box-size");
var output = document.getElementById("box-value");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
	output.innerHTML = this.value;
}

// GLOBAL DATA
var validate = false;
var bags = [];
var containerSize;
var noFit = [];
var containers = 0;
var packedBags = 0;

// ********************

function validateInput(event) {
	if ($("#200g").val() < 0 || $("#400g").val() < 0 || $("#1000g").val() < 0) {
		event.preventDefault();
		$("#alert-bags").slideDown();
		validate = false;
	} else if ($("#200g").val() + $("#400g").val() + $("#1000g").val() == 0) {
		event.preventDefault();
		event.stopPropagation();
		$("#alert-total").slideDown();
		validate = false;
	} else {
		validate = true;
	}
}

function resetData() {
	bags = [];
	noFit = [];
	containers = 0;
	packedBags = 0;
}


function setData() {
	var numOf1000 = $("#1000g").val();
	var numOf400 = $("#400g").val();
	var numOf200 = $("#200g").val();

	//	Add 400g first
	for (let i = 0; i < numOf400; i++) {
		bags.push({
			w: 26,
			h: 2,
			d: 22
		});
	}

	//	Then add 200g
	for (let i = 0; i < numOf200; i++) {
		bags.push({
			w: 23,
			h: 2,
			d: 16
		});
	}

	//	Last, add 1000g
	for (let i = 0; i < numOf1000; i++) {
		bags.push({
			w: 26,
			h: 10,
			d: 14
		});
	}


	var edge = slider.value;
	//	Set container size
	containerSize = {
		w: edge,
		h: edge,
		d: edge
	};

}

//	Main function
function calculate(event) {
	validateInput(event);
	if (validate) {
		// $("#alert-answer").slideUp(100);

		resetData();
		setData();
		pack();

		$("#answer").text(containers);
		$("#alert-answer").slideDown();
	}
}