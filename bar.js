// This is the lineClass; 
// This is to create line objects. 
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

/** This is the class that creates a line with a length and an location on an 
 *  x axis
 *  
 *  @param xLoc Where on the x-axis is located
 *  @param n    The height "n" of the line.
 *
 *  When getting the values xLoc and n they should be the name of the object say "y"
 ^  and followed ".x" or ".length" for example y.x; or y.length; 
 */
class bar {
  constructor(xLoc, n) {
    this.x = xLoc;
    this.length = n;
    this.barColor = this.colorGradient();
  }

  /**Place, places a line and also keeps track of how much the line was moved. 
   */
  place() {
    strokeWeight(0);
    stroke(this.barColor);
    fill(this.barColor);
    //line(this.x, height, this.x, height - this.length);
    
    rect(this.x,height-(this.length/2),barWidth,this.length);
  }

  /**colorGradient 
   */
  colorGradient() {
    let temp = map(this.x, width, 0, 0, 255);
    if (colorScheme == "Red") {
      return color(255, temp, temp);
    } else if (colorScheme == "Green") {
      return color(temp, 255, temp);
    } else { //assumes blue
      return color(temp, temp, 255);
    }
    return -1;
  }
}
