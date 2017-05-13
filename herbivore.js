function herbivore() {
    
    this.x = (random(0, width));
    this.y = (random(0, height));
    this.r = 10;
    this.lineOfSight = 50;
    this.hasTarget = false;
    this.hasReachedTarget = false;
    this.targetX = 0;
    this.targetY = 0;
    this.targetIsFood = false;
    this.closestVegetable = 0;
    
    while (this.x <= this.r * 2 || this.x >= width - this.r * 2) {
        this.x = (random(0, width));
        console.log('herbivore Too Much X');
    }
    
    while (this.y <= this.r * 2 || this.y >= height - this.r * 2) {
        this.y = (random(0, height));
        console.log('Herbivore Too Much Y');
    }
    
        
    this.show = function() {        
        
        stroke(0);
        fill('rgb(150,150,0)');  
        ellipse(this.x, this.y, this.r + this.r);
        
        // Line of Sight
        stroke(255);
        noFill();
        ellipse(this.x, this.y, this.lineOfSight * 2);
    }
    
    this.action = function() {
        
        var closestVegetableDistance = Infinity;
        var xDist = Infinity;
        var yDist = Infinity;
        var dist = Infinity;
        
        // finds nearest vegetable
        for (var i = 0; i < vegetables.length; i++) {
            xDist = this.x - vegetables[i].xc;
            yDist = this.y - vegetables[i].yc;            
            dist = sqrt( sq(xDist) + sq(yDist) );
            if (dist < closestVegetableDistance) {
                closestVegetableDistance = dist;
                this.closestVegetable = i;                
            }
        } 
        
        //draws a line to the nearest
        line(this.x, this.y, vegetables[this.closestVegetable].xc, vegetables[this.closestVegetable].yc);
        // console.log(this.x, this.y, vegetables[closest].xc, vegetables[closest].yc)
        
        //TODO: Check whole vegetable is in LOS
        
        //checks if the vegetable is in it's FOV 
        if (closestVegetableDistance <= this.lineOfSight) {
            this.hasTarget = true;
            this.targetIsFood = true;
            this.targetX = vegetables[this.closestVegetable].xc;
            this.targetY = vegetables[this.closestVegetable].yc;
            //console.log(closest);
        } 
        
        if (!this.hasTarget) {
            this.pickWanderDestination();
        }
    }
    
    this.pickWanderDestination = function(){
        //pick a random x and y within 100 pixels of itself        
        var moveX = random(this.x - 100, this.x + 100);
        var moveY = random(this.y -100, this.y + 100);
        
        while (moveX <= 0 || moveX >= width){
            var moveX = random(this.x - 100, this.x + 100);
        }
        
        while (moveY <= 0 || moveY >= height){
             var moveY = random(this.y -100, this.y + 100);
        }
        
        //set x and y as target
        this.targetX = moveX;
        this.targetY = moveY;
        console.log(this.targetX, this.targetY);
        this.hasTarget = true;
    }
    
    this.moveToTarget = function(){
        
        var xDist = Infinity;
        var yDist = Infinity;
        var dist = Infinity;
        var distMovePerFrame = 1;
        var distanceToMove = Infinity;
        var t = Infinity;
        var newX = 0;
        var newY = 0;
        var opp = 0;
        var adj = 0;
        var hyp = 0;
        
        //draw a line to target
        stroke(150,0,0);
        line(this.x, this.y, this.targetX, this.targetY);
        
        //calculate distance to go
        xDist = this.x - this.targetX;
        yDist = this.y - this.targetY;            
        dist = sqrt( sq(xDist) + sq(yDist) );
        console.log(dist);
        
        //calculate direction to move
        angleMode(DEGREES);
        theta = atan(yDist/xDist);
        //console.log(theta, 'degrees');
        
        //calculate new x and y
        angleMode(RADIANS);
        opp = sin(theta) * distMovePerFrame;
        //console.log('opp', opp);        
        adj = cos(theta) * distMovePerFrame;
        //console.log('adj', adj);
       
        newX = this.x - adj;
        newY = this.y - opp;
        
        //check if dist to target is within
        if (dist <= 20 && !this.targetIsFood){
            this.hasReachedTarget = true;
            this.hasTarget = false;
        }  
        
        if ( dist <= 20 && this.targetIsFood){
            this.consumeFood();
            console.log('consuming');
        }
        
        //set new x and y        
        this.x = newX;
        this.y = newY;
        
    }
    this.consumeFood = function() {
        vegetables[this.closestVegetable].eaten();
    }
}