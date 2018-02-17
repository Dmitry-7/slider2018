
(function() {
function cloneFirstRibbonElement(){
	var ribbonFirstElement= document.querySelector('.sliderItem');
	var ribbonFirstElementClone = ribbonFirstElement.cloneNode(true);
	sliderRibbon.appendChild(ribbonFirstElementClone);
}

function setRibbonSettigs(){
	sliderRibbon.style.width = (sliderStepWidth * sliderRibbonChildCount) + 'px';
	sliderRibbon.style.height = sliderStepHeight + 'px';	
	for (var i = 0;i<sliderRibbonLi.length;i++){
		sliderRibbonLi[i].style.width =  sliderStepWidth + 'px';
		sliderRibbonLi[i].style.height =  sliderStepHeight + 'px';
	}
}

function buttonClick(){
	ribbonLeap.call(this);
	prevStepPosition=stepPosition;
	if(this==nextButton && stepPosition<sliderRibbonChildCount){
		++stepPosition;
	}else if(this==prevButton && stepPosition>1){
		--stepPosition;
	}

	setTimeout(()=>{
	ribbonShift();
	},10);			
}

function ribbonShift(){
	if(isRibbonShift){
		sliderRibbon.style.transition = 'linear 0.0s';
		stepPosition=prevStepPosition;
		sliderRibbon.style.transform = 'translate3d('+(((stepPosition-1)*sliderStepWidth*(-1))) +'px, 0, 5px)';
	} else {
		sliderRibbon.style.transition = 'linear 0.3s';
		sliderRibbon.style.transform = 'translate3d('+(stepPosition-1)*sliderStepWidth*(-1) +'px, 0, 0)';
	}

	isRibbonShift=true;
	
	setTimeout(()=>{
		isRibbonShift=false;
	},350);
}

function ribbonLeap(){
	if (this==nextButton && stepPosition>=sliderRibbonChildCount){
    	sliderRibbon.style.transition = 'linear 0s';
    	stepPosition=1;
		sliderRibbon.style.transform = 'translate3d('+(stepPosition-1)*sliderStepWidth*(-1) +'px, 0, 0)';
	
	}else if(this==prevButton && stepPosition<=1){
    	sliderRibbon.style.transition = 'linear 0s';
    	stepPosition=sliderRibbonChildCount;
		sliderRibbon.style.transform = 'translate3d('+(stepPosition-1)*sliderStepWidth*(-1) +'px, 0, 0)';
	}
}



var nextButton = document.getElementById('nextButton');
var prevButton = document.getElementById('prevButton');
var sliderRibbon = document.getElementById('sliderRibbon');
var sliderWindow = document.getElementById('sliderWindow');

var sliderRibbonChildCount = sliderRibbon.childElementCount+1;
var stepPosition = 1;
var computedStyle = getComputedStyle(sliderWindow,null);
var sliderStepWidth = parseInt((computedStyle.width).replace(/\D+/g,""));
var sliderStepHeight = parseInt((computedStyle.height).replace(/\D+/g,""));
var isRibbonShift=false;
var prevStepPosition;

prevButton.addEventListener('click',buttonClick);
nextButton.addEventListener('click',buttonClick);

cloneFirstRibbonElement();
var sliderRibbonLi = document.querySelectorAll('.sliderItem');
setRibbonSettigs();

})();
