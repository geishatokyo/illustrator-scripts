
export class ColorPallete {

  /**
   * 0 <= parameter <= 255
   * @param r 
   * @param g 
   * @param b 
   */
  static rgb(r: number, g: number, b: number) {
    const color = new RGBColor()
    color.red = r
    color.green = g
    color.blue = b
    return color
  }
  /**
   * 
   * @param sharpColor #ffffff
   */
  static rgbString(sharpColor: string) {
    if(sharpColor.charAt(0) == "#") {
      sharpColor = sharpColor.slice(1)
    }

    const r = parseInt(sharpColor.slice(0,2), 16)
    const g = parseInt(sharpColor.slice(2,4), 16)
    const b = parseInt(sharpColor.slice(4,6), 16)

    return this.rgb(r,g,b)
  }


  static white() : Color{
    return this.rgb(255,255,255)
  }
  static black() : Color {
    return this.rgb(0,0,0)
  }

  static red() : Color {
    return this.rgb(255,0,0)
  }

  static yellow(): Color {
    return this.rgb(255,255,0)
  }

  static noColor() {
    return new NoColor()
  }
}
