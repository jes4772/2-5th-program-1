function onLoad() {
	var wordIdx = 0, enqueueCnt = 0, theWords = ["CERNER", "ENGINEERING", "IMPACTS", "LIVES", "AND", "BREAKS", "DOWN", "WALLS"], canvas = new fabric.StaticCanvas('myCanvas', {backgroundColor: 'white'});
	var floorLine = new fabric.Line([0, 360, 800, 360], {stroke: 'black'});
	var breakWall = new fabric.Polygon([{x: 800, y: 480}, {x: 600, y: 360}, {x: 600, y: -1}, {x: 800, y: -1}, {x: 800, y: 480}], {fill: '#6a737b', stroke: 'black'})
	canvas.add(floorLine, breakWall);
	function enqueue() { if (++enqueueCnt === theWords[wordIdx-1].length) {animateWord();}; }
	function rndmCrackvector(x, center) { return Math.floor(Math.random() * x) - x/2*center; }
	function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }
	function crash(letter) {
		var finalLoc = Math.floor(Math.random() * 300) + 350, finalangle = Math.floor(Math.random() * 360) - 180, finalDepth = Math.floor(Math.random() * 20) + 410;
		letter.animate('left', finalLoc, {onChange: canvas.renderAll.bind(canvas), duration: 1000, easing: fabric.util.ease.easeOutExpo, onComplete: function() {enqueue(letter);}});
		letter.animate('top', finalDepth, {onChange: canvas.renderAll.bind(canvas), duration: 1000, easing: fabric.util.ease.easeInExpo, onComplete: function() {letter.setShadow("rgba(0,0,0,0.5) -2px 2px 1px")}});
		letter.animate('angle', finalangle, {onChange: canvas.renderAll.bind(canvas), duration: 1000, easing: fabric.util.ease.easeOutExpo});
		var cPts = [rndmCrackvector(100, true), rndmCrackvector(200, true), rndmCrackvector(50, false), rndmCrackvector(100, false)];
		canvas.add(new fabric.Polyline([{x: 700 + rndmCrackvector(20, true), y: 150 + rndmCrackvector(20, true)}, {x: 700 + cPts[0], y: 150 + cPts[1]}, {x: 700 + cPts[0] + cPts[2] * sign(cPts[0]), y: 150 + cPts[1] + cPts[3] * sign(cPts[1])}], {fill: 'transparent', stroke: 'white'}));
	}	
	function animateWord() {		
		var theWord = theWords[wordIdx], leftStart = 100, durationStart = 1000;
		enqueueCnt = 0;
		if (theWord) {
			$(theWord.split("")).each(function () {
				var theLetter = new fabric.Text(this, {left: leftStart, top: 150, fill: '#0d94d2', width: 30, height: 30, fontFamily: "Courier", fontWeight: "bold", shadow: "rgba(0,0,0,0.3) -15px 15px 5px"});
				canvas.add(theLetter);
				theLetter.animate('left', 700, {onChange: canvas.renderAll.bind(canvas), duration: durationStart, easing: fabric.util.ease.easeInExpo, onComplete: function() {crash(theLetter);}});
				leftStart += 35;
				durationStart -= 20;
			});
			++wordIdx;
		} else breakWall.fill = 'transparent';
	}
	animateWord();
}