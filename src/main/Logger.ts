import { ColorPallete } from './Utils';



/**
 * 画面上にTextFrameItemを作って、実行ログを出力する
 */
export class Logger {

  private static _defaultLogger : Logger

  static getDefault() {
    if(this._defaultLogger == null) {
      this._defaultLogger = new Logger("__log")
    }
    return this._defaultLogger
  }

  textItem: TextFrameItem
  constructor(layerName: string) {
    let layer : Layer
    try {
      layer = app.activeDocument.layers.getByName(layerName)
      
      if(layer) {
        this.textItem = layer.pageItems.getByName("message") as TextFrameItem
      }
    }catch(err) {
    }
    if(!layer) {
      layer = app.activeDocument.layers.add()
      layer.name = layerName
    }
    if(!this.textItem) {
      this.textItem = layer.textFrames.add()
      this.textItem.name = "message"
    }

    this.textItem.contents = ""
    this.textItem.textRange.characterAttributes.size = 15
    this.textItem.textRange.characterAttributes.leading = 18
    this.textItem.textRange.characterAttributes.autoLeading = false
  }

  log(log: string) {
    this.coloredLog(log, ColorPallete.black())
  }

  warn(log: string) {
    this.coloredLog("WARN: " + log, ColorPallete.yellow())
  }

  error(log: string) {
    this.coloredLog("ERROR: " + log, ColorPallete.red())
  }

  coloredLog(log: string, color: Color) {
    const tr = this.textItem.characters.add(log + "\n")
    tr.characterAttributes.strokeColor = color
  }
  
}