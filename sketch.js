var vegetables = [];
var herbivores = [];

function setup() {
    createCanvas(640, 480);
    //frameRate(1);
    
    for (var i = 0; i < 4; i++) {
    vegetables[i] = new vegetable();   
    }
    
        for (var i = 0; i < 1; i++) {
        herbivores[i] = new herbivore();    
    }
}

function draw() {
    background(51);
    
    for (var i = 0; i < vegetables.length; i++) {
        vegetables[i].show(); 
    }
    
    for (var i = vegetables.length; i > 1; i--){
        if (vegetables[i].isEaten){
            vegetables.splice(i,1);
        }
    }
    
    
    
    
    
    for (var i = 0; i < herbivores.length; i++) {
        herbivores[i].show(); 
        herbivores[i].action();
        herbivores[i].moveToTarget();
    }
}