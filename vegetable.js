function vegetable() {
    
    this.x = round(random(0, width));
    this.y = round(random(0, height));
    this.w = 20;
    this.h = 20;
    this.padding = (this.w + this.h)/2;
    this.xc = this.x + (this.w/2);
    this.yc = this.y + (this.h/2);
    this.isEaten = false;
    
   
    
    while (this.x <= this.w + this.padding || this.x >= width - this.w - this.padding) {
        this.x = round(random(0, width));
        this.xc = this.x + (this.w/2);
        //console.log('Too Much X');
    }
    
    while (this.y <= this.h + this.padding || this.y >= height - this.h - this.padding) {
        this.y = round(random(0, height));
        this.yc = this.y + (this.h/2);
        //console.log('Too Much Y');
    }
    
    this.show = function() {
        stroke(1);
        fill('rgb(0,150,0)');
        rect(this.x,this.y,this.w,this.h);  
        ellipse(this.x.c, this.y.c, 5);
    }
    
    
    }

this.eaten = function(){
        this.w -= 0.25;
        this.h -= 0.25;
        if (this.w <= 0 && this.h <= 0){
            this.isEaten = true;
        }
}