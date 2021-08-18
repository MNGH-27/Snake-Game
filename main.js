const container = document.getElementById("container");

const newGame_Div = document.getElementById("new-game");
const loose_Div = document.getElementById("loose");
const pause_Div = document.getElementById("puase");

const Selecting_btns = document.querySelectorAll(".btn-gameselector");

const Score_txt = document.querySelectorAll(".score-value");
const Topscore_txt = document.querySelectorAll(".top-score-value");

const hide_class_name = "hide-div";//To give Display:none | css Class

var numberblock = 10;//Assumption of Blocks number

var Score = 0;
Score_txt.forEach(function(elem){
    elem.innerHTML=Score
})

var TopScore = 0;
Topscore_txt.forEach((elem)=>elem.innerHTML=TopScore);

var Snake = [//initialize we use this is in new_game()
    {
        Situation:"image-right",
        Current_pos:0,
        prev_pos:0,
    }
];

var img_head;
img_head = document.createElement("img");
img_head.src="img/Snake_head.png";
img_head.classList.add("image-size");
img_head.classList.add("image-right");

var Eat_apple=true;

var Snakemover;//This is setInterval(SnakeMovement,300);
var appleCreator;//this is setInterval(Create_Apple,5000);

function Selecting_game_type(btn){//Selecting number of Blocks
    Selecting_btns.forEach((_btn)=>{
        _btn.classList.remove("btn-selected");
    })
    numberblock = btn.value;
    btn.classList.add("btn-selected");
}

var Blocks = [];
function Start_Game(){
    
    for(let i =0;i<numberblock*numberblock ;i++){//CreateBlocks
        const block = document.createElement("div");
        block.classList.add("col");
        if(Number(numberblock)===10){
            block.style.height="57px";
        }else if(Number(numberblock)===12){
            block.style.height="47px";
        }else if(Number(numberblock)===15){
            block.style.height="37px";
        }
        container.append(block);
    }
    
    /*giving Style to Grid-template-columns*/
    var grid_template_col="";
    const percent = (100/numberblock) - 0.25;
    for(let i =0;i<numberblock; i++ ){
        grid_template_col += `${percent}% `;
    }
    
    container.style.gridTemplateColumns = grid_template_col;
    /*End*/
    
    document.querySelectorAll(".col")[0].append(img_head);
    
    newGame_Div.classList.add(hide_class_name);

    Snakemover = setInterval(SnakeMovement,300);
    appleCreator = setInterval(Create_Apple,5000);
}

document.addEventListener("keypress",function move_Snake (event){
    if((event.key === "w"||event.key === "W")&&!img_head.classList.contains("image-bottom")){
        img_head.classList.remove(Snake[0].Situation);
        img_head.classList.add("image-up");
        Snake[0].Situation="image-up";
    }else if((event.key === "s"||event.key === "S")&&!img_head.classList.contains("image-up")){
        img_head.classList.remove(Snake[0].Situation);
        img_head.classList.add("image-bottom");
        Snake[0].Situation="image-bottom";
    }else if((event.key === "d"||event.key === "D")&&!img_head.classList.contains("image-left")){
        img_head.classList.remove(Snake[0].Situation);
        img_head.classList.add("image-right");
        Snake[0].Situation="image-right";
    }else if((event.key === "a"||event.key === "A")&&!img_head.classList.contains("image-right")){
        img_head.classList.remove(Snake[0].Situation);
        img_head.classList.add("image-left");
        Snake[0].Situation="image-left";
    }
});

function Create_Apple(){
    if(Eat_apple){
        let Isvalid=true;
        while(Isvalid){
            var Rand_number =parseInt(Math.random()*150);
            if(Rand_number<(numberblock*numberblock)-1){
                const Block = document.querySelectorAll(".col")[Rand_number];
                let canuse=true;
                
                Snake.forEach(function(Sn){//checking to Dont be Snake there
                    if(Rand_number===Sn.prev_pos||Rand_number===Sn.Current_pos){
                        canuse=false;
                    }
                })

                if(canuse){
                    Isvalid=false;
                    Eat_apple=false;
                    Block.style.backgroundColor="red";
                }
            }
        }
    }
}

function SnakeMovement(){
 
    var next_number;

    if(Snake[0].Situation==="image-right"){
        next_number=1;
    }else if(Snake[0].Situation==="image-left"){
        next_number=-1;
    }else if(Snake[0].Situation==="image-up"){
        next_number=-Number(numberblock);
    }else if(Snake[0].Situation==="image-bottom"){
        next_number=Number(numberblock);
    }
    
    Snake[0].prev_pos=Snake[0].Current_pos;

    if(Snake[0].Current_pos===((numberblock*numberblock)-numberblock)){
        //this is when Snake go to the End Block and make bug this is to fix it;!!!! 
        Snake[0].Current_pos=0;
    }
    else if(next_number>1&&Snake[0].Current_pos+next_number>numberblock*numberblock){//check be near bottom wall
        Snake[0].Current_pos-=(numberblock*(numberblock-1));
    }
    else if(next_number<-1&&Snake[0].Current_pos+next_number<0){//check be near up wall
        Snake[0].Current_pos+=(numberblock*(numberblock-1));
    }
    else if(next_number===-1){//check be near of left wall
        let Isinif=false;
        for(let i=0;i<numberblock;i++){
            if(Snake[0].Current_pos===(numberblock*i)&&Snake[0].Situation==="image-left"){
                Snake[0].Current_pos += (numberblock-1)
                Isinif=true;
            }
        }
        if(Isinif===false){
            Snake[0].Current_pos=Snake[0].Current_pos+next_number;
        }
    }
    else if(next_number===1){//check be near of right wall
        let Isinif=false;
        for(let i=0;i<numberblock;i++){
            if(Snake[0].Current_pos===((numberblock*(i+1))-1)&&Snake[0].Situation==="image-right"){
                Snake[0].Current_pos -= (numberblock-1)
                Isinif=true;
            }
        }
        if(Isinif===false){
            Snake[0].Current_pos=Snake[0].Current_pos+next_number;
        }
    }
    else{
        Snake[0].Current_pos=Snake[0].Current_pos+next_number;
    }

    let nextDiv = document.querySelectorAll(".col")[Number(Snake[0].Current_pos)];//the next div ahead of Snake

    if(nextDiv.style.backgroundColor==="red"){//getting the Apple
        Eat_apple=true;
        Score+=10;
        nextDiv.style.backgroundColor="blue";
        Snake.push(
            {
                Current_pos:Snake[Snake.length-1].prev_pos,
                prev_pos:0,
            }
        )
        Score_txt.forEach((elem)=>{
            elem.innerHTML=Score;
        })
        if(Score>TopScore){
            TopScore=Score;
            Topscore_txt.forEach((elem)=>elem.innerHTML=TopScore);
        }
    }

    if(nextDiv.innerHTML===""){//Going forward
        for(let i=0;i<Snake.length;i++){
            if(i==0){
                document.querySelectorAll(".col")[Snake[i].prev_pos].innerHTML="";
                nextDiv.append(img_head);
            }else{
                Snake[i].prev_pos=Snake[i].Current_pos;
                Snake[i].Current_pos=Snake[i-1].prev_pos;
                document.querySelectorAll(".col")[Snake[i].prev_pos].style.backgroundColor="blue";
                document.querySelectorAll(".col")[Snake[i].Current_pos].style.backgroundColor="green";
            }
        }
    }
    if(nextDiv.style.backgroundColor==="green"){
        container.innerHTML="";
        clearInterval(Snakemover);
        clearInterval(appleCreator);
        loose_Div.classList.remove(hide_class_name);
    }     
}

function new_game(){
    Score=0;
    Score_txt.forEach((elem)=>{
    elem.innerHTML=Score
    })
    Snake = [
        {
            Situation:"image-right",
            Current_pos:0,
            prev_pos:0,
        }
    ];
    Eat_apple=true;
    loose_Div.classList.add(hide_class_name);
    newGame_Div.classList.remove(hide_class_name);
}


function menu_new_game(){
    container.innerHTML="";
    clearInterval(Snakemover);
    clearInterval(appleCreator);
    loose_Div.classList.remove(hide_class_name);
    new_game;
}

/*Pause Div*/
function pause_game(){
    clearInterval(Snakemover);
    clearInterval(appleCreator);
    pause_Div.classList.remove(hide_class_name);
}

function resume_game(){
    Snakemover = setInterval(SnakeMovement,300);
    appleCreator = setInterval(Create_Apple,5000);
    pause_Div.classList.add(hide_class_name);
}