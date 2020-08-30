// This is the bar class; 
// This is to create bar objects. 
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

/** This is the class that creates a bar with a length and an location on an 
 *  x axis
 *  
 *  @param xLoc Where on the x-axis is located, Only used so the correct color is assigned.
 *  @param n The height "n" of the line
 *
 *  When getting the values xLoc and n they should be the name of the object say "y"
 ^  and followed ".x" or ".length" for example y.x; or y.length; 
 */
class bar {
  constructor(xLoc, n) {
    this.length = n;
    this.barColor = this.colorGradient(xLoc);
  }

  /**place
   * Place - Places a bar (rectangle) at centered at x. The y coordinate is found by dividing  
   * the height (this.length) of the bar in half. This is subtracted from the height of the canvas.
   *
   * @param x The x location on the x-axis where the bar should be placed.  
   */
  place(x) {
    strokeWeight(0);
    stroke(this.barColor);
    fill(this.barColor);
    rect(x, height - (this.length / 2), barWidth, this.length);
  }

  /**colorGradient 
   * colorGradient - Knowing the xLoc of the bar assigns a color to it so that it can create a white to
   * the a color forming a gradient. Depending on user input the gradient may be red/blue/green.
   *
   */
  colorGradient(xLoc) {
    let temp = map(xLoc, width, 0, 0, 255);
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
