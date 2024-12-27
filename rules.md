entidades
characters = player, enemy
HP = sangue
MP = mana
classe = cavaleiro, mago, ladrao
name = exemplo cavaleiro

skill = fire ball, ice ball
name
classe
ATK
// attribute: fire \* pro futuro
MP cost

item: poison
HP = sangue ex: se recuperar sangue deve ter o valor a ser recuperado por exemplo 80
MP = mana ex: se recuperar sangue deve ter o valor a ser recuperado por exemplo 100
name = poção de cura, poção de mana  
 COST: valor em mana a ser gasto por usar aquele item

turn = controla acoes dos jogadores

// pro futuro
// area:
// if(attribute = 'fire'){
// -14
// }

const heathPoison = new Item('heath poison', 100, 0);

const fireball = new Skill('fireball', 15, 60);
const iceball = new Skill('iceball', 20, 80);

const health = 100;
const mana = 400;
const skills = [fireball, iceball];
const items = [heathPoison];

const player1 = new Character('Cami',health, mana ,skills, items)

player1.getSkill(1);

player.makeAction(1);

const players = [player1];

const turn = new Turn(players)

turn.getCurrentTurn() // turn 2;
turn.mountPlayersActionOrder() player1; enemy1; player2; enemy2;
