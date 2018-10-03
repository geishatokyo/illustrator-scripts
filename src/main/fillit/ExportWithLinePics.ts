/// <reference types="illustrator/2015.3"/>

import { ColorPallete } from '../Utils';
import { ActionExecutor } from '../ActionExecutor';
import { aiscripts } from './Actions';
import { ImageExporter } from '../ImageExporter';
import { Logger } from '../Logger';
import { Element } from '../DocumentTree';


const OriginLayerName = "original"
const OutlinedLayerName = "outline"
const TempOutlinedLayerName = "temp_outline";
const SilhouetteLayerName = "silhouette"

const StrokeColor = ColorPallete.rgbString("#898989")

/**
 * originalの名前のレイヤーを元に、
 * 輪郭化したものをoutline
 * シルエット化したものをshilhouette
 * のレイヤーに作成し、それぞれの画像を保存する
 */
class FillItDocument {

  private doc = app.activeDocument

  getDocName() {
    const name = app.activeDocument.name
    if(name.indexOf(".") >= 0) {
      return name.substring(0, name.indexOf("."))
    } else {
      return name
    }
  }
  
  getOriginLayer() {
    return this.doc.layers.getByName(OriginLayerName)
  }

  changeToOutline() {
    const copyer = new LayerCopyer()
    const logger = Logger.getDefault()
    logger.log("Start copy")
    copyer.copyAllItems(OriginLayerName, OutlinedLayerName)
    copyer.copyAllItems(OriginLayerName, TempOutlinedLayerName)
    copyer.copyAllItems(OriginLayerName, SilhouetteLayerName)
    
    logger.log("Make outline")
    // アウトライン化
    // 細線のみ
    logger.log("Inner lines");
    for(const ele of Element.getActive().findElement(OutlinedLayerName).children()) {
      logger.log("Layer " + ele.name())
      const outlineOperator = new ObjectOperator(ele)
      outlineOperator.outlinenize()
    }
    // 外線
    logger.log("Outer lines");
    for(const ele of Element.getActive().findElement(TempOutlinedLayerName).children()) {
      logger.log("Layer " + ele.name())
      const outlineOperator = new ObjectOperator(ele)
      outlineOperator.shilhouettenize(ColorPallete.noColor());
    }
    // 結合
    this.mergeOutlineElements();


    logger.log("Make silhouette")

    Element.getActive().revertAll();
    Element.clearCache();

    for(const ele of Element.getActive().findElement(SilhouetteLayerName).children()) {
      const outlineOperator = new ObjectOperator(ele)
      outlineOperator.shilhouettenize(ColorPallete.white());
    }

    this.saveImages();

    Element.getActive().revertAll();
  }

  saveImages() {
    const imageExporter = new ImageExporter()

    const imageDir = "images/"
    const logger = Logger.getDefault()

    imageExporter.makeDir(imageDir)
    
    logger.log("Export normal images")
    this.foreachChildLayers(OriginLayerName)(layer => {
      imageExporter.saveAsPng(imageDir + layer.name(), layer)
    })
    logger.log("Export outline images")
    this.foreachChildLayers(OutlinedLayerName)(layer => {
      imageExporter.saveAsPng(imageDir + layer.name() + "_outline", layer)
    })
    logger.log("Export silhouette images")
    this.foreachChildLayers(SilhouetteLayerName)(layer => {
      imageExporter.saveAsPng(imageDir + layer.name() + "_silhouette", layer)
    })

    Element.getActive().revertAll()

  }
  layer(name: string) {
    return app.activeDocument.layers.getByName(name)
  }
  foreachChildLayers(layerName: string) {
    return (func: (l: Element) => any) => {
      const targetLayer = Element.getActive().findElement(layerName)
      for(const ele of targetLayer.children()) {
        func(ele)
      }
    }
  }

  mergeOutlineElements() {
    const destinations = Element.getActive().findElement(OutlinedLayerName).children();
    const froms = Element.getActive().findElement(TempOutlinedLayerName).children();
    
    for(let i = 0;i < destinations.length;i++){
      const dest = destinations[i];
      const from = froms[i];
      (from.raw() as PageItem | Layer).name = "outer";
      from.moveTo(dest, ElementPlacement.PLACEATBEGINNING);
      
    }

    Element.getActive().findElement(TempOutlinedLayerName).remove();
  }

}

class LayerCopyer {

  copyAllItems(copyFromLayerName: string, copyTargetLayerName: string) {
    const doc = app.activeDocument

    const originLayer = doc.layers.getByName(copyFromLayerName)

    if(!originLayer) {
      return null
    }

    let copyTarget: Layer = null
    try {
      copyTarget = doc.layers.getByName(copyTargetLayerName)
    }catch(err) {
      copyTarget = null
    }

    if(copyTarget) {
      if(!copyTarget.visible) {
        copyTarget.visible = true
      }
      copyTarget.remove()
    }


    const newCopyTarget = doc.layers.add()

    newCopyTarget.name = copyTargetLayerName

    const isVisible = originLayer.visible
    originLayer.visible = true
    this.copyRecursively(originLayer, newCopyTarget)
    originLayer.visible = isVisible

    return newCopyTarget
    
  }

  private copyRecursively(from: Layer, dest: Layer) {

    // Copy items
    for(let i = 0;i < from.pageItems.length;i++) {
      const fromI = from.pageItems[i]

      // Invisibleになっている場合、コピーのために表示状態にして
      // 終わったら元に戻す
      let isVisible = true
      if(fromI.hidden) {
        isVisible = false
        fromI.hidden = false
      }
      fromI.duplicate(dest, ElementPlacement.PLACEATEND)
      if(!isVisible) {
        fromI.hidden = true
      }
    }
    // Copy layers
    for(let i = from.layers.length - 1;i >= 0;i-- ) {
      const fromL = from.layers[i]

      let isVisible = true
      if(!fromL.visible) {
        fromL.visible = true
        isVisible = false
      }
      
      const copied = dest.layers.add()
      copied.name = fromL.name
      this.copyRecursively(fromL, copied)

      if(!isVisible) {
        fromL.visible = false
      }
    }
  }
}

class ObjectOperator {

  element: Element


  constructor(element: Element) {
    this.element = element
  }

  gatherItems(layer: Layer | GroupItem) {
    let pageItems : PageItem[] = []

    for(let i = 0;i < layer.pageItems.length;i++) {
      pageItems.push(layer.pageItems[i])
    }
    if(layer.typename == "Layer") {
      const l = layer as Layer
      for(let i = 0;i < l.layers.length;i++) {
        pageItems = pageItems.concat(this.gatherItems(l.layers[i]))
      }
    }
    return pageItems
  }

  /**
   * 線画化する
   */
  outlinenize() {

    const actionExecutor = new ActionExecutor();
    for( const i of this.element.children()) {
      const pageItem = i.raw() as PathItem;
      const strokeWidth = pageItem.strokeWidth;

      if(pageItem == null) {
        continue;
      }

      // 色変更
      pageItem.strokeColor = pageItem.fillColor;
      pageItem.fillColor = ColorPallete.white();

      actionExecutor.executeActionFromSrc(
        aiscripts.ChangeStrokeSide
      );
      pageItem.strokeWidth = strokeWidth;
    }
  }


  shilhouettenize(fillColor: Color) {
    this.changeStrokeAndFillColor(
      StrokeColor, 
      fillColor);

    this.mergeAndOutineize();

    // 線の設定を変更
    new ActionExecutor().executeActionFromSrc(
      aiscripts.ChangeStrokeSide
    );

  }

  changeStrokeAndFillColor(strokeColor: Color, fillColor: Color) {

    this.element.makeModifiable()

    const changeColor = (ele: Element) => {
      if(ele.typename() == "PathItem") {

        const pathItem = ele.asPageItem() as PathItem
        pathItem.strokeColor = strokeColor
        pathItem.fillColor = fillColor

      } else {
        for(const c of ele.children()) {
          changeColor(c)
        }
      }
    }

    for(const item of this.element.children()) {
      changeColor(item)
    }

  }
  
  private mergeAndOutineize() {
    Logger.getDefault().log("Outlineize: " + this.element.name())
    this.element.makeVisibleAllChildren(true)

    if(this.element.typename() == "Layer") {
      const layer = this.element.asLayer()
      const compound = layer.compoundPathItems.add()

      for(const child of this.element.children()) {
        const item = child.raw() as Layer | PageItem

        item.move(compound, ElementPlacement.PLACEATEND)
      }
      app.activeDocument.selection = []
      compound.selected = true
      app.executeMenuCommand("Live Pathfinder Add")
      app.executeMenuCommand('expandStyle');

    } else {
      app.activeDocument.selection = [];
      this.element.setSelected(true)
      app.executeMenuCommand("Live Pathfinder Add")
      app.executeMenuCommand('expandStyle');

    }

  }

  

}


new FillItDocument().changeToOutline()

alert("Done!")





