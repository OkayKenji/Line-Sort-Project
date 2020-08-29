// This is the indicator clas; 
// This is to create an indicator to show what bar the sort is looking at now.
// 
// v8.2020 
//
// Special thanks to: 
// * "Daniel Shiffman" @ The Coding Train for helping me to learn this stuff
//     - See his channel here: https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw; 
//     - See his video on JS classes here: https://youtu.be/T-HGdc8L-7w 
// * w3schools
// * https://developer.mozilla.org/en-US/docs/Web/JavaScript
// * The developers of p5.js

/** This is the class that creates an arrow made from a triangle and a rectangle with a location on the
 *  x-axis  
 *
 *  @param xLoc Where on the x-axis is located. Used put the arrow at the right place.
 *
 */
class indicator {
  constructor(xLoc) {
    this.xLoc = xLoc;
  }

  /** place
   *
   * place - Places an arrow at the xLoc
   *
   */
  place() {
    //draws triangle 'pointy end of arrow'
    stroke("#FFD700");
    fill("#FFD700");
    let x1 = this.xLoc;
    let y1 = 100
    let x2 = this.xLoc - barWidth / 2;
    let y2 = y1 - 20;
    let x3 = this.xLoc + barWidth / 2;
    let y3 = y1 - 20;
    triangle(x1, y1, x2, y2, x3, y3)
    
    //draws a rectangle 'stem of arrow'
    rectMode(CENTER);
    rect(this.xLoc, y1 - 40, barWidth / 2, 50);
    rectMode(CORNER);
  }
}
