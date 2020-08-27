class indicator {
  constructor(xLoc) {
    this.xLoc = xLoc;
  }
  
  place() {
    //draws triangle
    stroke("#FFD700");
    fill("#FFD700");
    let x1 = this.xLoc; 
    let y1 = 100 
    let x2 = this.xLoc-barWidth/2;
    let y2 = y1-20;
    let x3 = this.xLoc+barWidth/2;
    let y3 = y1-20;
    triangle(x1,y1,x2,y2,x3,y3)
    
    rectMode(CENTER);
    rect(this.xLoc,y1-40,barWidth/2,50);
    rectMode(CORNER);
  }
}
