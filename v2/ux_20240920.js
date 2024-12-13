
TouchFree.Init();

Leap.loop(function(frame) {
  if (frame.hands.length > 0) {
    var hand = frame.hands[0];
    var x = hand.palmPosition[0];  // Leap Motion���� ������ X ��ǥ
    var y = hand.palmPosition[1];  // Leap Motion���� ������ Y ��ǥ

    // Leap Motion ��ǥ�� ������ ��ǥ�� ��ȯ�� �� ���
    var pageX = (x + window.innerWidth / 2);
    var pageY = window.innerHeight - y;

    console.log("Hand position in page coordinates: ", pageX, pageY);
  }
});


$(document).ready(function(){
    var startDesc = `<strong>[�������� �ܾ ��ƶ�!]</strong>
        <p>���� �׸��� ���� 40�� ���� ���ϴ� �ܾ Ŭ���ϼ��� !</p><br/><br/>
		<button class="btn-replay text" type="button" onclick="initGame()">���ӽ���</button>`;
   $("#layerBg").html(startDesc).show();

   /*setTimeout(()=>{
        $("#layerBg").html('').hide();
   }, 2000);*/
});
const words = [
    {word : "��", bg : "water"},
    {word : "����", bg : "doll"},
    {word : "����", bg : "bag"},
    {word : "å", bg : "book"},
    {word : "����", bg : "snack"},
    {word : "��", bg : "door"},
    {word : "��", bg : "cup"},
    {word : "��", bg : "house"},
    {word : "�Ź�", bg : "shoes"},
    {word : "����", bg : "candy"},
    {word : "�ſ�", bg : "mirror"},
    {word : "�޴�", bg : "sun"},
];

let currentPrompt = '';
let lastPrompt = '';
let score1 = 0;
let score2 = 0;
let countdown = 4000;
let correctClicks = 0;
let wrongClicks = 0;

// Ÿ�̸� ����
let gamePaused = false;  // ������ ������� ���θ� �����ϴ� ����
let timerInterval;       // Ÿ�̸Ӹ� ������ ����
let rainInterval;        // �ܾ� ���� �ֱ⸦ ������ ����
let divs = [];

function startTimer() {
    let totalDuration = 4000;  // 40��
    let progressMin = 5;     // �ּ� width �� (5%)
    let progressMax = 98;    // �ִ� width �� (98%)
    let progressRange = progressMax - progressMin; // width ���� ����

    timerInterval = setInterval(function() {
         if (!gamePaused && countdown > 0) {
            countdown--;
            let progressPercentage = progressMin + ((totalDuration - countdown) / totalDuration) * progressRange;
            document.getElementById('progress').style.width = progressPercentage + '%';
            // correctClicks >= 3 || 
            if (countdown <= 0 || wrongClicks >= 3) {
                clearInterval(timerInterval);
                clearInterval(rainInterval); // Ÿ�̸� ���� �� �ܾ� ������ ����

                setTimeout(function(){
                    // alert('���� ����! \n���� Ƚ�� : ' + score1 + ' / Ʋ�� Ƚ�� : ' + score2);
                    document.getElementById("score3").textContent = score1;
                    document.getElementById("score4").textContent = score2;
                    document.getElementById("resultLayer").style.display = 'block';
                    //resetGame();
                }, 700)
            }
        }
    }, 10);
}

// ���þ� ����
function setPrompt() {
    do {
        var randomIndex = Math.floor(Math.random() * words.length);
        currentPrompt = words[randomIndex].word;
    } while (currentPrompt === lastPrompt);

    lastPrompt = currentPrompt;
    document.getElementById('prompt').src = 'img/' + words[randomIndex].bg + '.png';
}

// �� ȭ�鿡 �ܾ 10���� �����ǵ��� ����
function createFallingWord() {
    const maxWords = 10;
    const currentWords = document.querySelectorAll('.click').length;

    if (currentWords >= maxWords) {
        return;  // ȭ�鿡 10�� �̻��� �ܾ ���� ���, ���ο� �ܾ �������� ����
    }

    var randomIndex;
    var selectedWord;

    // ���þ �� ���� ������ �� Ȯ�� ����
    if (Math.random() < 0.5) {
        selectedWord = words.find(word => word.word === currentPrompt);
    } else {
        randomIndex = Math.floor(Math.random() * words.length);
        selectedWord = words[randomIndex];

        while (selectedWord.word === currentPrompt) {
            randomIndex = Math.floor(Math.random() * words.length);
            selectedWord = words[randomIndex];
        }
    }

    // div ����
    var div = document.createElement('div');
    div.classList.add('click');
    div.innerHTML = selectedWord.word;

    // �ܾ ��ġ�� �ʵ��� ���� ��ġ ����
    div.style.left = Math.random() * 1200 + 'px';
    
    // ������ �ӵ��� �������� ���� (���� 10��)
    div.style.animation = `drop 10s linear`;
	
    div.onclick = function(event) {
		console.log(event.pageX, event.pageY)
        if (selectedWord.word === currentPrompt) {
            correctClicks++;
            score1++;
            showCorrectEffect(selectedWord.bg, event.pageX, event.pageY, div);
            // document.getElementById('score1').textContent = '���� Ƚ��: ' + correctClicks + ' / 3';
            

        } else {
            wrongClicks++;
            score2++;
            showWrongEffect(event.pageX, event.pageY);
            // document.getElementById('score2').textContent = 'Ʋ�� Ƚ��: ' + wrongClicks + ' / 3';
            var removeHeart = "heart" + wrongClicks;
            document.querySelectorAll('.score2 img').forEach((el)=>{
                if(el.id == removeHeart) {
                   document.getElementById(removeHeart).remove();
                }
            })
        }
        div.remove();
    };

	div.onpointerover = function() {
		div.classList.add("hovered");
	}

	div.onpointerleave = function() {
		div.classList.remove("hovered");
	}
	
	div.onpointerdown = function() {
		div.classList.add("pressed");
	}

	div.onpointerup = function() {
		div.classList.remove("pressed");
	}

    document.getElementById('wrap').appendChild(div);

    // �������� �ִϸ��̼� ����
    setTimeout(function() {
        div.style.top = window.innerHeight + 'px';
    }, 10);

    // ���� Ÿ�̸� ���� ����
    let removeTimeout;
    let remainingTime = 12000; // �ʱ� 12�� ����
    let startTime = Date.now(); // ���� �ð� ����

    // 12�� �� �ڵ� ����
    removeTimeout = setTimeout(function () {
        div.remove();
    }, remainingTime);

    // div ���� ���� ����
    divs.push({ element: div, removeTimeout, remainingTime, startTime });
}



// ���� ȿ��
function showCorrectEffect(imgSrc, x, y) {
    var correctImg = document.createElement("img");
    correctImg.classList.add("correct_img");  
    correctImg.src = 'img/' + imgSrc + '.png';
    correctImg.style.left = (x - 100) + 'px';
    correctImg.style.top = (y - 100) + 'px';
    document.body.appendChild(correctImg);
    //clapLottie.play();
    correctImg.style.opacity = 1;

    var ispark = document.getElementById("ispark");
    ispark.style.left = (x - 200) + 'px';
    ispark.style.top = y + 'px';
    ispark.style.opacity = 1;
    ispark.style.zIndex = 1;

    setTimeout(function() {
        ispark.style.opacity = 0;
        ispark.style.zIndex = -1;
        //clapLottie.stop();
        correctImg.remove();
    }, 2000);
}

// ���� ȿ��
function showWrongEffect(x, y) {
    //wrongLottie.play();

    var iwrong = document.getElementById("iwrong");
    iwrong.style.left = (x - 100) + 'px';
    iwrong.style.top = (y - 100) + 'px';
    iwrong.style.opacity = 1;
    iwrong.style.zIndex = 1;


    setTimeout(function() {
        iwrong.style.opacity = 0;
        iwrong.style.zIndex = -1;
        //wrongLottie.stop();
    }, 1500);
}

// �ܾ� ���� �ֱ⸦ �����ϰ� ����
function startRain() {
    rainInterval = setInterval(function() { 
        if (!gamePaused) {  
            createFallingWord();
        }
    }, 2000);  // ������ �������� �ܾ� ���� (2�ʸ��� ����)
}

// ���� �Ͻ� ����
function pauseGame() {
    //console.log("���� ����")
    gamePaused = true;

    divs.forEach(obj => {
        const div = obj.element;

        // �ִϸ��̼� ����
        div.style.animationPlayState = 'paused';

        // ���� �ð� ��� �� Ÿ�̸� ���
        clearTimeout(obj.removeTimeout);
        obj.remainingTime -= Date.now() - obj.startTime;
    });

    $("#layerBg").html("<p style='font-size:50px'>���� �Ͻ�����</p>").show();
    clearInterval(rainInterval);  // �ܾ� ������ ����
    document.getElementById("ibgm").pause();
}

// ���� �簳
function resumeGame() {
    gamePaused = false;
    $("#layerBg").hide();
    divs.forEach(obj => {
        const div = obj.element;

        // �ִϸ��̼� �簳
        div.style.animationPlayState = 'running';

        // ���� �ð����� Ÿ�̸� �缳��
        obj.startTime = Date.now();
        obj.removeTimeout = setTimeout(function () {
            div.remove();
        }, obj.remainingTime);
    });
    document.getElementById("ibgm").play();
    startRain();  // �ܾ� ������ �簳
}

function resetGame() {
    score1 = 0;
    score2 = 0;
    correctClicks = 0;
    wrongClicks = 0;
    countdown = 3000;
    
    document.querySelectorAll('.click').forEach(function(div){
        div.remove();
    })

    setPrompt();
    startRain();
    startTimer();
}

// ���� ����
function initGame(){
	 $("#layerBg").html('').hide();
	document.getElementById("ibgm").play();

	setPrompt();
    startRain();
    startTimer();
}
   
