/** @format */

// 01 HTML/CSS 디자인 구성
// 02 클릭한 카드 뒤집기
// 03 두개의 카드 뒤집기 확인하기(첫번째, 두번째)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCards = memoryWrap.querySelectorAll(".cards li");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;

let sound = [
	"../assets/audio/match.mp3",
	"../assets/audio/unmatch.mp3",
	"../assets/audio/up.mp3",
];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);

//카드 뒤집기
function flipCard(e) {
	let clickedCard = e.target;

	if (clickedCard !== cardOne && !disableDeck) {
		clickedCard.classList.add("flip");
		// console.log(clickedCard);

		//첫 번째 이미지 값은 없지만 이후 두번째 이미지에서 두 이미지의 값을 받아옴 -> 두번째 부터 에러
		if (!cardOne) {
			return (cardOne = clickedCard);
		}
		cardTwo = clickedCard;
		disableDeck = true;
	}
	let cardOneImg = cardOne.querySelector(".back img").src;
	let cardTwoImg = cardTwo.querySelector(".back img").src;

	matchCards(cardOneImg, cardTwoImg);

	// console.log(cardOneImg);
	// console.log(cardTwoImg); -> 두번째에 첫번째 이미지 값도 같이 불러옴
}

//카드 확인(두개의 이미지 비교)
function matchCards(img1, img2) {
	if (img1 == img2) {
		//같은 경우
		matchedCard++;

		if (matchedCard == 8) {
			alert("You Win!!");
		}
		cardOne.removeEventListener("click", flipCard);
		cardTwo.removeEventListener("click", flipCard);
		cardOne = cardTwo = "";
		disableDeck = false;
		soundMatch.play();
	} else {
		//일치하지 않는 경우(틀린음악, 이미지가 좌우로 흔들림)
		setTimeout(() => {
			cardOne.classList.add("shakeX");
			cardTwo.classList.add("shakeX");
		}, 500);

		setTimeout(() => {
			cardOne.classList.remove("shakeX", "flip");
			cardTwo.classList.remove("shakeX", "flip");
			cardOne = cardTwo = "";
			disableDeck = false;
		}, 1600);
		soundUnMatch.play();
	}
}

//카드 섞기
function shullfedCard() {
	cardOne = cardTwo = "";
	disableDeck = false;
	matchedCard = 0;

	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
	let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

	memoryCards.forEach((card, index) => {
		card.classList.remove("flip");

		setTimeout(() => {
			card.classList.add("flip");
		}, 200 * index);

		setTimeout(() => {
			card.classList.remove("flip");
		}, 4000);

		let imgTag = card.querySelector(".back img");
		imgTag.src = `../assets/img/icon/memory_icon0${arr[index]}.svg`;
	});
}
shullfedCard();

//카드 클릭
memoryCards.forEach((card) => {
	setTimeout(() => {
		card.addEventListener("click", flipCard);
	}, 500);
});
