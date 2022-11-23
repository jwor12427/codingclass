/** @format */

//선택자
const tetrisWrap = document.querySelector(".tetris__wrap");
const playground = tetrisWrap.querySelector(".playground > ul");
const tetrisStart = tetrisWrap.querySelector(".tetris__start");
const tetrisReplay = tetrisWrap.querySelector(".t_replay_btn");
const tetrisOver = tetrisWrap.querySelector(".tetris__over");
const tetrisTimeTo = tetrisWrap.querySelector(".tetris__time");
const tetrisClose = tetrisWrap.querySelector(".tertis__close");
let tetrisScore = tetrisWrap.querySelector(".tetris__user");
let tetrisSpeed = tetrisWrap.querySelector(".tetris__speed");
let overScore = tetrisWrap.querySelector(".t_score");
let tetrisBgm = new Audio("../assets/audio/tetris_bg.mp3");
let tetrisOverBgm = new Audio("../assets/audio/tetris_over.mp3");

//변수 설정
let rows = 20;
let cols = 16;
let scoreT = 0;
let duration = 500;
let downInterval;
let tempMovungItem;
let stopTetris = false;
let tetrisTime = 240;
let setTetrisTime = "";
let setTetrisSpeed = 1;

//블록 정보
const movingItem = {
	type: "",
	direction: 0, //블록 모양
	top: 0,
	left: 6,
};

//블록의 좌표값 설정
const blocks = {
	Tmino: [
		[
			[2, 1],
			[0, 1],
			[1, 0],
			[1, 1],
		], //Tmino 기본모양
		[
			[1, 2],
			[0, 1],
			[1, 0],
			[1, 1],
		], //Tmino 기본모양2 (돌아가는 모양)
		[
			[1, 2],
			[0, 1],
			[2, 1],
			[1, 1],
		], //Tmino 기본모양3
		[
			[2, 1],
			[1, 2],
			[1, 0],
			[1, 1],
		], //Tmino 기본모양4
	],
	Lmino: [
		[
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 2],
		],
		[
			[0, 0],
			[1, 0],
			[2, 0],
			[0, 1],
		],
		[
			[0, 0],
			[1, 0],
			[1, 1],
			[1, 2],
		],
		[
			[0, 1],
			[1, 1],
			[2, 0],
			[2, 1],
		],
	],
	Jmino: [
		[
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2],
		],
		[
			[0, 0],
			[0, 1],
			[1, 1],
			[2, 1],
		],
		[
			[0, 0],
			[1, 0],
			[0, 1],
			[0, 2],
		],
		[
			[0, 0],
			[1, 0],
			[2, 0],
			[2, 1],
		],
	],
	Zmino: [
		[
			[0, 0],
			[1, 0],
			[1, 1],
			[2, 1],
		],
		[
			[1, 0],
			[0, 1],
			[1, 1],
			[0, 2],
		],
		[
			[0, 0],
			[1, 0],
			[1, 1],
			[2, 1],
		],
		[
			[1, 0],
			[0, 1],
			[1, 1],
			[0, 2],
		],
	],
	Smino: [
		[
			[1, 0],
			[2, 0],
			[0, 1],
			[1, 1],
		],
		[
			[0, 0],
			[0, 1],
			[1, 1],
			[1, 2],
		],
		[
			[1, 0],
			[2, 0],
			[0, 1],
			[1, 1],
		],
		[
			[0, 0],
			[0, 1],
			[1, 1],
			[1, 2],
		],
	],
	Omino: [
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
		],
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
		],
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
		],
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
		],
	],
	Imino: [
		[
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3],
		],
		[
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
		],
		[
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3],
		],
		[
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
		],
	],
};

//시작 하기
function init() {
	tempMovungItem = { ...movingItem }; //블록 모양 가지고 오기 (게임 재시작시 리셋해줘야 함 - 변수화 시켜준 이유)
	for (let i = 0; i < rows; i++) {
		prependNewLine(); //블록 라인 만들기
	}
	// stopTetris = false;
	// renderBlocks(); //블록 출력 하기
	// generateNewBlock(); //블록 만들기
}

//블록 만들기
function prependNewLine() {
	//li갯수
	const li = document.createElement("li"); //li를 만들수 있음
	const ul = document.createElement("ul");
	//크기를 조정 가능
	for (let j = 0; j < cols; j++) {
		const matrix = document.createElement("li");
		ul.prepend(matrix); //ul에 뒤에 넣어줌
	}
	li.prepend(ul);
	playground.prepend(li); //최종적으로 playgorund의 뒤에 li이 넣어줌
}

//블록 출력하기
function renderBlocks(moveType = "") {
	//블록이 가장위에 닿지 않을때 계속 새로운 블록을 만들어 줌
	if (!stopTetris) {
		//아무것도 없을때도 처리, 있을때도 처리
		//정보 하나씩 가져오기
		// const ty = tempMovungItem.type;
		// const di = tempMovungItem.direction;
		// const to = tempMovungItem.top;
		// const le = tempMovungItem.left;

		//변수 선언하지 않고 바로 사용
		const { type, direction, top, left } = tempMovungItem;

		//클래스 제거
		const movingBlocks = document.querySelectorAll(".moving");
		movingBlocks.forEach((moving) => {
			moving.classList.remove(type, "moving");
		});

		//좌표값 가져오기
		// console.log(blocks[type][direction]); //좌표값 가져오는지 확인
		blocks[type][direction].some((block) => {
			//.some()은 forEach()랑 같지만, some은 중간에 멈출수 있음, forEach는 불가능
			//좌표값 저장
			const x = block[0] + left; // 2 0 1 1
			const y = block[1] + top; //1 1 0 1

			//li이가 없을때는 null
			const target = playground.childNodes[y]
				? playground.childNodes[y].childNodes[0].childNodes[x]
				: null; //자식선택(첫번째자식, 두번째, 그다음)

			const isAvailable = checkEmpty(target);

			//값이 있을때는 추가, 없을때는 그 전값으로 초기화
			if (isAvailable) {
				target.classList.add(type, "moving"); //클래스 추가
			} else {
				tempMovungItem = { ...movingItem };

				setTimeout(() => {
					renderBlocks(); //재귀함수
					//맨 밑에 있을 경우
					if (moveType === "top") {
						seizeBlock();
					}
				}, 0);

				return true;
			}

			// console.log({ playground }); //정보확인
		});
		//기존의 값 누적시키기
		movingItem.left = left;
		movingItem.top = top;
		movingItem.direction = direction;
	}
}

//블록 쌓임 감지하기
function seizeBlock() {
	const movingBlocks = document.querySelectorAll(".moving");
	movingBlocks.forEach((moving) => {
		moving.classList.remove("moving"); //클래스 지워서 멈춰주기
		moving.classList.add("seized"); //새로운 클래스 추가
	});

	//줄제거
	checkMatch();
}

//한줄 제거하기
function checkMatch() {
	//자식요소 선택
	const childNodes = playground.childNodes;

	//게임오버
	childNodes[0].children[0].childNodes.forEach((li) => {
		if (li.classList.contains("seized")) {
			stopTetris = true;
			tetrisGameover();
			tetrisOverBgm.play();
		}
	});

	childNodes.forEach((child) => {
		let match = true;
		child.children[0].childNodes.forEach((li) => {
			if (!li.classList.contains("seized")) {
				match = false;
			}
		});
		if (match) {
			child.remove();
			prependNewLine();
			scoreT++;
			tetrisScore.innerText = scoreT;
			switch (scoreT) {
				case 5:
					duration = 250;
					setTetrisSpeed++;
					tetrisSpeed.innerText = setTetrisSpeed;
					break;
				case 10:
					duration = 150;
					setTetrisSpeed++;
					tetrisSpeed.innerText = setTetrisSpeed;
					break;
				case 15:
					duration = 50;
					setTetrisSpeed++;
					tetrisSpeed.innerText = setTetrisSpeed;
					break;
			}
		}
	});
	//이상이 없으면 새블록 만들어 주기
	generateNewBlock();
}

//새로운 블록 만들기
function generateNewBlock() {
	//시간초 초기화
	clearInterval(downInterval);

	//블록 내려오기
	downInterval = setInterval(() => {
		moveBlock("top", 1);
	}, duration);

	//랜덤으로 블록 나오게 하기
	const blockArray = Object.entries(blocks);
	const randomIndex = Math.floor(Math.random() * blockArray.length);
	movingItem.type = blockArray[randomIndex][0];

	//초기화
	movingItem.top = 0;
	movingItem.left = 6;
	movingItem.direction = 0;
	tempMovungItem = { ...movingItem };
	renderBlocks();
}

//빈칸 확인하기
function checkEmpty(target) {
	if (!target || target.classList.contains("seized")) {
		return false;
	}
	return true;
}

//블록 움직이기 (left, top - 1칸씩 움직이게)
function moveBlock(moveType, amount) {
	tempMovungItem[moveType] += amount;
	renderBlocks(moveType);
}

//모양 바꾸기
function changeDirection() {
	const direction = tempMovungItem.direction;
	direction === 3
		? (tempMovungItem.direction = 0)
		: (tempMovungItem.direction += 1);
	renderBlocks();
}

//빨리 내리기
function dropBlock() {
	clearInterval(downInterval); //다시 초기화
	downInterval = setInterval(() => {
		moveBlock("top", 1);
	}, 10);
}

//시간 설정
function timeTetris() {
	tetrisTime--;

	if (tetrisTime == 0) tetrisGameover();

	tetrisTimeTo.innerHTML = displayTetris();
}

//시간 표시
function displayTetris() {
	if (tetrisTime <= 0) {
		return "0:00";
	} else {
		let miutes = Math.floor(tetrisTime / 60);
		let second = tetrisTime % 60;

		if (second < 10) second = "0" + second;
		return miutes + ":" + second;
	}
}

//게임 시작하기
function tetrisStartGo() {
	tetrisStart.classList.add("hide");
	generateNewBlock();
	tetrisBgm.play();
	tetrisBgm.loop = true;
	setTetrisTime = setInterval(timeTetris, 1000);
}
//게임 오버
function tetrisGameover() {
	tetrisOver.classList.add("show");
	overScore.innerHTML = `당신의 점수는 ${scoreT * 5} 입니다 O_O`;
	tetrisBgm.pause();
	tetrisBgm.currentTime = 0;
	tetrisTime = 0;
}
//게임 재시작하기
function tetrisRe() {
	const restartMino = playground.querySelectorAll("li > ul > li");
	restartMino.forEach((li) => {
		li.className = "";
	});
	stopTetris = false;
	generateNewBlock();
	tetrisBgm.play();
	scoreT = 0;
	tetrisScore.innerText = 0;
	duration = 500;
	setTetrisSpeed = 1;
	tetrisSpeed.innerText = 1;
	tetrisOverBgm.currentTime = 0;
	tetrisTime = 240;
}

//이벤트
document.addEventListener("keydown", (e) => {
	switch (e.keyCode) {
		case 39:
			moveBlock("left", 1);
			break;
		case 37:
			moveBlock("left", -1);
			break;
		case 40:
			moveBlock("top", 1);
			break;
		case 38:
			changeDirection();
			break;
		case 32:
			dropBlock();
			break;
		default:
			break;
	}
});

//시작버튼 누르면 게임시작
tetrisStart.addEventListener("click", () => {
	tetrisStartGo();
});

//재시작 버튼 클릭
document.querySelector(".t_replay_btn").addEventListener("click", () => {
	tetrisRe();
	tetrisOver.classList.remove("show");
	tetrisOverBgm.pause();
});

//게임창 끄기
tetrisClose.addEventListener("click", () => {
	tetrisWrap.classList.remove("open");
	tetrisGameover();
	stopTetris = true;
	tetrisStart.classList.add("hide");
});

init();
