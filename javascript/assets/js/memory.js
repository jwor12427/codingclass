/** @format */

// 01 HTML/CSS 디자인 구성
// 02 클릭한 카드 뒤집기
// 03 두개의 카드 뒤집기 확인하기(첫번째, 두번째)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryInner = document.querySelector(".memory__card");
const memoryCards = memoryWrap.querySelectorAll(".cards li");
const memoryOverInfo = document.querySelector(".memory__over");
const memoryOverInfoh3 = document.querySelector(".memory__over h3");
const memoryOver = memoryWrap.querySelector(".memory__over__msg");
const memoryOverScore = memoryWrap.querySelector(".memory__over__msg span");
const memoryRE = memoryWrap.querySelector(".memory__re__btn");
const memoryScore = memoryWrap.querySelector(".point span");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let matchScore = 100;

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
			//모든 카드 뒤집었을 때
			soundSuccess.play();
			memoryInner.style.pointerEvents = "none";
			setTimeout(() => {
				memoryOverInfo.classList.add("show");
				memoryOverScore.innerHTML = `<span>${matchScore}점을 획득하셨습니다!</span>`;
			}, 500);
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
			soundUnMatch.play();
		}, 1600);

		matchScore = matchScore - 5;

		if (matchScore == 0) {
			memoryInner.style.pointerEvents = "none";
			memoryOverInfo.classList.add("show");
			memoryOverInfoh3.innerHTML = "Game Over....";
			memoryOverScore.innerHTML = `<span>${matchScore}점을 획득하셨습니다!</span>`;
		}
	}
	memoryScore.innerText = matchScore;
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
			card.style.pointerEvents = "auto";
		}, 4000);


		let imgTag = card.querySelector(".back img");
		imgTag.src = `../assets/img/icon/memory_icon0${arr[index]}.svg`;
	});
}

const memoryStart = document.querySelector(".memory__start__info");
const memoryStartBtn = document.querySelector(".memory__start__btn");

//게임 시작
memoryStartBtn.addEventListener("click", () => {
	memoryStart.classList.remove("show");
	shullfedCard();
	soundSuccess.play();
});
//리셋
function memoryReset() {
	memoryStart.classList.add("show");
	cardOne = cardTwo = "";
	disableDeck = false;
	matchedCard = 0;
	matchScore = 100;
	memoryScore.innerText = "100";
	memoryInner.style.pointerEvents = "none";
	memoryCards.forEach((card) => {
		card.classList.remove("flip");
	});
}

//리셋버튼
memoryRE.addEventListener("click", () => {
	memoryOverInfo.classList.remove("show");
	memoryReset();
});

//카드 클릭
memoryCards.forEach((card) => {
	card.addEventListener("click", flipCard);
});

//게임 종료
const memoryClose = document.querySelector(".memory__close__btn");

memoryClose.addEventListener("click", () => {
	memoryWrap.classList.remove("show");
	memoryReset();
});
