/// <reference types="illustrator/2015.3"/>

import { ColorPallete } from '../Utils';
import { ActionExecutor } from '../ActionExecutor';
import { aiscripts } from './Actions';
import { ImageExporter } from '../ImageExporter';


const OriginLayerName = "original"
const OutlinedLayerName = "outline"
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

    // 全体をコピー
    const outlinedLayer = copyer.copyAllItems(OriginLayerName, OutlinedLayerName)
    
    // アウトライン
    const layersForOutlines = outlinedLayer.layers

    for(let i = 0;i < layersForOutlines.length;i++) {
      const layer = layersForOutlines[i]
      const outlineOperator = new ObjectOperator(layer)
      outlineOperator.outlinenize(ColorPallete.noColor())
    }

    // シルエット
    const silhouetteLayer = copyer.copyAllItems(OutlinedLayerName, SilhouetteLayerName)
    const layersForSilhouette = silhouetteLayer.layers

    for(let i = 0;i < layersForSilhouette.length;i++){
      const layer = layersForSilhouette[i]
      const silhouetteOperator = new ObjectOperator(layer)
      silhouetteOperator.changeStrokeAndFillColor(StrokeColor, ColorPallete.white())
    }

    this.saveImages()

  }

  saveImages() {
    const imageExporter = new ImageExporter()

    const imageDir = "images/"

    imageExporter.makeDir(imageDir)

    this.foreachChildLayers(OriginLayerName)(layer => {
      imageExporter.saveAsPng(imageDir + layer.name, layer)
    })
    this.foreachChildLayers(OutlinedLayerName)(layer => {
      imageExporter.saveAsPng(imageDir + layer.name, layer)
    })
    this.foreachChildLayers(SilhouetteLayerName)(layer => {
      imageExporter.saveAsPng(imageDir + layer.name, layer)
    })

  }
  layer(name: string) {
    return app.activeDocument.layers.getByName(name)
  }
  foreachChildLayers(layerName: string) {
    return (func: (l: Layer) => any) => {
      const layers = app.activeDocument.layers.getByName(layerName).layers
      
      for(let i = 0;i < layers.length; i++) {
        const layer = layers[i]
        func(layer)
      }
    }
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

    this.copyRecursively(originLayer, newCopyTarget)

    return newCopyTarget
    
  }

  private copyRecursively(from: Layer, dest: Layer) {

    // Copy items
    for(let i = 0;i < from.pageItems.length;i++) {
      const fromI = from.pageItems[i]

      fromI.duplicate(dest, ElementPlacement.PLACEATEND)
    }
    // Copy layers
    for(let i = from.layers.length - 1;i >= 0;i-- ) {
      const fromL = from.layers[i]
      
      const copied = dest.layers.add()
      copied.name = fromL.name
      this.copyRecursively(fromL, copied)
    }
  }
}

class ObjectOperator {

  layer: Layer

  allItems : PageItem[]

  constructor(layer: Layer) {
    this.layer = layer
    this.allItems = this.gatherItems(layer)
  }

  gatherItems(layer: Layer) {
    let pageItems : PageItem[] = []

    for(let i = 0;i < layer.pageItems.length;i++) {
      pageItems.push(layer.pageItems[i])
    }
    
    for(let i = 0;i < layer.layers.length;i++) {
      pageItems = pageItems.concat(this.gatherItems(layer.layers[i]))
    }
    return pageItems
  }

  /**
   * 線画化する
   */
  outlinenize(fillColor: Color) {
    this.changeStrokeAndFillColor(
      StrokeColor, 
      fillColor)

    this.mergeAndOutineize()

    // 線の設定を変更
    new ActionExecutor().executeActionFromSrc(
      aiscripts.ChangeStrokeSide
    )

  }

  changeStrokeAndFillColor(strokeColor: Color, fillColor: Color) {

    const changeColor = (item: PageItem) => {
      if(item.typename == "CompoundPathItem") {
        const pathItems = (item as CompoundPathItem).pathItems
        for(let i = 0;i < pathItems.length;i++) {
          changeColor(pathItems[i])
        }
      } if(item.typename == "GroupItem") {
        const pathItems = (item as GroupItem).pathItems
        for(let i = 0;i < pathItems.length;i++) {
          changeColor(pathItems[i])
        }
      } else if(item.typename == "PathItem") {
        const pathItem = item as PathItem
        pathItem.strokeColor = strokeColor
        pathItem.fillColor = fillColor
      }
    }

    for(const item of this.allItems) {
      changeColor(item)
    }
  }
  private mergeAndOutineize() {
    const compound = this.layer.compoundPathItems.add()

    for(const item of this.allItems) {
      item.move(compound, ElementPlacement.PLACEATEND)
    }
    app.activeDocument.selection = []
    compound.selected = true
    app.executeMenuCommand("Live Pathfinder Add")
    app.executeMenuCommand('expandStyle');
  }

  

}


new FillItDocument().changeToOutline()

alert("Done!")





