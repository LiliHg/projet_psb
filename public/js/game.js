let cardContainer = document.getElementById('cardContainer');
let resetButton = document.getElementById('resetGame');
let tempCard = null;
let correctCount = 0;
let pairs = 8;

let image_array = ['https://image.ibb.co/m9SEcH/1.png',
'https://image.ibb.co/cKNfHH/2.png',
'https://image.ibb.co/dGTbrc/3.png',
'https://image.ibb.co/cGGUBc/4.png',
'https://image.ibb.co/gP2EcH/5.png',
'https://image.ibb.co/mB4SxH/6.png',
'https://image.ibb.co/bA0d4x/7.png',
'https://image.ibb.co/bRCrPx/8.png'];

cardContainer.addEventListener('click', turnCard);
resetButton.addEventListener('click', newGame);
document.addEventListener('DOMContentLoaded', newGame);


function turnCard(e) {

	if(!e.target.classList.contains('front')) return;

	let prevCard = null;
	let prevValue = null;

	let thisCard = e.target.parentElement;
	let thisValue = thisCard.getAttribute('data-match');

	if(tempCard == null) {

		console.log('First Card: ' + thisValue);

		$(thisCard).flip(true);
		tempCard = thisCard;
		return;

	}
	
	console.log('Second Card: ' + thisValue);

	prevCard = tempCard;
	prevValue = tempCard.getAttribute('data-match');

	tempCard = null;

	$(thisCard).flip(true, function(){

		console.log('==== Checking ===');
		console.log('Prev:' + prevValue + ', This: ' + thisValue);

		if(prevValue === thisValue) {

			console.log('%c Match!!!', 'font-weight: bold; color: red');

			correctCount++;
			document.getElementsByClassName('statistics')[0].innerText = `You've found ${correctCount} out of 8 pairs captain!`;

			if(correctCount === pairs) {

				$(cardContainer).effect('explode');

			} else {

				$(thisCard).effect('pulsate');
				$(prevCard).effect('pulsate');

			}

		} else {

			console.log('%c No Match', 'font-weight: bold; color: red');

			$(thisCard).effect({
				effect: 'shake',
				complete: function(){
					setTimeout(function(){
						$(thisCard).flip(false);
					}, 500);
				}
			});

			$(prevCard).effect({
				effect: 'shake',
				complete: function(){
					setTimeout(function(){
						$(prevCard).flip(false);
					}, 500);
				}
			});

		}

		console.log("\n\n");

	});


}

function newGame() {

	correctCount = 0;
	document.getElementsByClassName('statistics')[0].innerText = 'Please click a on card to launch...';

	while (cardContainer.firstChild) {
    	cardContainer.removeChild(cardContainer.firstChild);
	}

    let newCards = document.createDocumentFragment();

    let iconCount = 1;

    for(let i = 0; i < (pairs * 2); i++) {

    	let match = Math.ceil(iconCount / 2);
      
      let image_url = image_array[match - 1];

    	let card = document.createElement('div');
    	card.classList.add('card');
    	card.setAttribute('data-match', match);

    	let front = document.createElement('div');
    	front.classList.add('front');
    	front.style.display = 'none';

    	let back = document.createElement('div');
    	back.classList.add('back');

    	back.style.backgroundImage = `url('${image_url}')`;

    	card.appendChild(front);
    	card.appendChild(back);

    	newCards.appendChild(card);

    	iconCount++;

  	}


  	for(let j = newCards.children.length; j >= 0; j--) {
  		newCards.appendChild(newCards.children[Math.random() * j | 0]);
  	}

  	cardContainer.appendChild(newCards);

  	for(let k = 0; k < cardContainer.children.length; k++) {
  		setTimeout(function(){
  			$(cardContainer).children().eq(k).children('.front').fadeIn();
  		}, k * 40);
  	}

    $('.card').flip({'trigger' : 'manual'});

}