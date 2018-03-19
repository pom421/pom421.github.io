//const idGoogleSheet = "https://docs.google.com/spreadsheets/d/1c5QlP0q_mPQ-s2AVxa0KJFgONELIBrNNzBSHDU8woBI/"
const idGoogleSheet = "https://docs.google.com/spreadsheets/d/1tPQ8qQX_6Xc6SvR_xMBZ6W_vG5m-NmHLMbwEVm7lbJI/"

let sheet

function setup() {
	noCanvas()

	var params = getURLParams();

	if (params.urlSheet) {
		idGoogleSheet = params.urlSheet
	}
	
	sheet = new Sheet(idGoogleSheet)

	Tabletop.init({
		key: idGoogleSheet,
		callback: sheet.init.bind(sheet),
		simpleSheet: true
	})

}

function keyPressed() {
	sheet.keyPressed()
}


