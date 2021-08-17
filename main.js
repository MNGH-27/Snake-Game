const container = document.getElementById("container");
var numberblock = 10;
var Blocks = [];
for(let i =0;i<100 ;i++){
    const block = document.createElement("div");
    block.classList.add("col");
    Blocks.push(block);
    container.append(block);
}

var grid_template_col="";
const percent = (100/numberblock) - 0.3;
for(let i =0;i<numberblock; i++ ){
    grid_template_col += `${percent}% `;
}

container.style.gridTemplateColumns = grid_template_col;

var img = document.createElement("img");
img.src="img/Snake_head.png";
img.classList.add("image-size");
var SnakeSituation = "Image-left";
img.classList.add("Image-left");

Blocks[5].append(img);

document.addEventListener("keypress",function move_Snake (event){
    if((event.key === "w"||event.key === "W")&&!img.classList.contains("image-up")){
        img.classList.remove(SnakeSituation);
        img.classList.add("image-up");
        SnakeSituation="image-up";
    }else if((event.key === "s"||event.key === "S")&&!img.classList.contains("image-bottom")){
        img.classList.remove(SnakeSituation);
        img.classList.add("image-bottom");
        SnakeSituation="image-bottom";
    }else if((event.key === "d"||event.key === "D")&&!img.classList.contains("image-right")){
        img.classList.remove(SnakeSituation);
        img.classList.add("image-right");
        SnakeSituation="image-right";
    }else if((event.key === "a"||event.key === "A")&&!img.classList.contains("image-left")){
        img.classList.remove(SnakeSituation);
        img.classList.add("image-left");
        SnakeSituation="image-left";
    }
});

