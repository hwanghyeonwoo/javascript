/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

게임 룰:

- 2인용, 턴 게임이다.
- 각 턴마다 사용자는 원하는 만큼 주사위를 굴린다. 주사위의 숫자는 라운드 스코어에 더해진다
- 하지만 1이 나온다면 모든 라운드 스코어는 사라지고 턴이 다른 사용자에게 넘어간다.
- 플레이어는 홀드를 선택할 수 있다. 홀드는 그동안 모은 라운드 스코어를 전체 스코어에 더한 후 턴을 넘긴다.
- 전체 스코어 100에 달성한 사람이 이기게 된다.

*/

var scores, roundScore, activePlayer, gamePlaying, sixDice;
//전역변수 스코어, 라운드스코어, 플레이어, 게임플레이상태

init();
//초기화함수
//scores=[0점수,1점수], roundScore 0, activePlayer->o or 1, gamePlaying t/f

//주사위 굴리기 버튼 클릭 시
//1)랜덤넘버 생성(UI업데이트)
//2)1일 경우 턴 종료
document.querySelector('.btn-roll').addEventListener('click', function() {
    //게임 플레잉 상태일 경우만
    if (gamePlaying) {
        // 1. Random number
        //var dice = Math.floor(Math.random() * 6) + 1;
        var dice = 6;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round scor0 IF the rolled number was NOT a 1
        if (dice >= 2 && dice <= 5) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            sixDice = false;
        } else if (dice === 6) {
            if (sixDice) {
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else {
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                sixDice = true;
            }

        } else {
            //Next player
            nextPlayer();
        }
    }
});

//홀드 클릭 시 
//1. 글로벌 스코어 업데이트(전역변수,UI))
//2. 글로벌 스코어 100점 넘었을 시 게임 종료
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {

        var winScore = document.getElementById("winScore").value;


        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

//액티브 플레이어 변경 및 라운드스코어 0로 변경
function nextPlayer() {
    //Next player
    sixDice = false;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //현재점수 UI 0으로 변경
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //액티브 클래스 (색 및 아이콘 추가)
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    //주사위 제거
    document.querySelector('.dice').style.display = 'none';
}
//new 게임 클릭시 init 호출
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

챌린지(룰추가)

1.2회 연속 6이 나오면 그동안 쌓은 모든 점수를 잃고 다음 턴으로 넘어간다.
2.목표점수를 사용자가 정할 수 있다.
3.주사위가 하나 추가된다. 둘 중 하나라도 1이 나오면 기존룰과 같이 진행된다.
*/