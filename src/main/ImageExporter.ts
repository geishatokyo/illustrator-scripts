import { Logger } from './Logger';
import { Element } from './DocumentTree';
/// <reference types="illustrator/2015.3"/>



export class ImageExporter {

  makeDir(name: string) {
    const f = new Folder(app.activeDocument.path + "/" + name)
    if(!f.exists) {
      f.create()
    }
  }

  saveAsPng(name: string, element: Element) {

    element.makeOthersInvisible()

    Logger.getDefault().log("Save as png:" + name)

    const exportOptions = new ExportOptionsPNG24()
    exportOptions.antiAliasing = true;
    exportOptions.transparency = true;
    exportOptions.matte = false;
    //exportOptions.clip = true;
    exportOptions.saveAsHTML = false;
    exportOptions.verticalScale = 100;
    exportOptions.horizontalScale = 100;

    app.activeDocument.exportFile(
      new File(app.activeDocument.path + "/" + name + ".png"),
      ExportType.PNG24,
      exportOptions
    )

    //element.revertAll()
  }




}