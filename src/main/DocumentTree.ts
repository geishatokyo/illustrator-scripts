import { Logger } from './Logger';




export abstract class Element {

  private static cache:any = {}

  static getActive(): Element {
    let doc = app.activeDocument
    if(this.cache[doc.name]) {
      return this.cache[doc.name] as Element
    } else {
      const e = new DocumentElement(doc)
      this.cache[doc.name] = e
      return e
    }
  }
  static clearCache() {
    this.cache = {}
  }

  protected _parent: Element

  constructor(parent: Element) {
    this._parent = parent
  }

  parent(): Element {
    return this._parent
  }

  root(): Element {
    if(this._parent == null) {
      return this
    } else {
      return this._parent.root()
    }
  }

  protected _children: Element[]
  children(): Element[] {
    if(this._children) {
      return this._children
    }
    this._children = this.makeChildren()
    return this._children
  }

  findElement(name: string): Element {
    for(const child of this.children()) {
      if(child.name() === name) {
        return child
      }
    }
    return null
  }

  protected abstract makeChildren(): Element[]

  abstract setVisible(visible: boolean): void
  abstract isVisible(): boolean

  abstract isLocked(): boolean
  abstract setLocked(locked: boolean): void

  abstract isSelected(): boolean
  abstract setSelected(selected: boolean): void

  abstract raw(): Document | PageItem | Layer


  name() {
    return this.raw().name
  }

  typename() {
    return this.raw().typename as string
  }

  asPageItem(): PageItem {
    return this.raw() as PageItem
  }
  asLayer(): Layer {
    return this.raw() as Layer
  }
  asDocument(): Document {
    return this.raw() as Document
  }

  makeModifiable() {
    if(this.parent() !== null) {
      this.parent().makeModifiable()
    }
    this.setVisible(true)
    this.setLocked(false)
  }

  makeVisibleAllChildren(visible: boolean) {
    this.setVisible(visible)
    for(const child of this.children()) {
      child.makeVisibleAllChildren(visible)
    }
  }

  isModifiable() {
    return this.isVisible() && !this.isLocked()
  }


  /**
   * この要素以外を不可視状態にする
   */
  makeOthersInvisible() {

    return this.makeOthersInvisibleExcept(null)
  }

  private makeOthersInvisibleExcept(except: Element) {
    if(this.parent() !== null) {
      this.parent().makeOthersInvisibleExcept(this)
    }
    this.setVisible(true)
    
    if(except === null) return

    for(const child of this.children()) { 
      if(child === except) {
        child.setVisible(true)
      } else {
        child.setVisible(false)
      }
    }
  }

  protected _isVisible : boolean = true
  protected _isLocked : boolean = false

  saveState() {
    this._isLocked = this.isLocked()
    this._isVisible = this.isVisible()
  }
  /**
   * 自身のみを巻き戻す
   */
  revertState() {
    
    if(this.isLocked() != this._isLocked) {
      // 可視状態でないと変更できない
      if(!this.isVisible()) {
        this.setVisible(true)
      }
      this.setLocked(this._isLocked)
    } 
    if(this.isVisible() != this._isVisible) {
      this.setVisible(this._isVisible)
    }
  }
  abstract remove(): void;
  /**
   * ドキュメント全体を巻き戻す
   */
  revertAll() {
    Logger.getDefault().log("Revert " + this.name())
    if(this.parent() !== null) {
      this.parent().revertAll()
    } else {
      this.revertChildren()
    }
  }
  /**
   * 自分と子供のみを巻き戻す
   */
  revertChildren() {
    this.setVisible(true)
    this.setLocked(false)
    for(const child of this.children()) {
      child.revertChildren()
    }
    this.revertState()
  }

  abstract moveTo(newParent: Element, ep: ElementPlacement): void;

  clearCache() {
    this._children = null;
  }

}


class PageItemElement extends Element {

  static create(item: PageItem, parent: Element) {
    if(item.typename === "GroupItem") {
      return new GroupItemElemennt(item as GroupItem, parent)
    } else {
      return new PageItemElement(item, parent)
    }
  }

  protected item: PageItem
  raw() {
    return this.item
  }

  constructor(item: PageItem, parent: Element) {
    super(parent)
    this.item = item
    this.saveState()
  }

  protected makeChildren(): Element[] {
    return []
  }

  setVisible(visible: boolean): void {
    this.item.hidden = !visible
  }
  isVisible(): boolean {
    return !this.item.hidden
  }

  isLocked(): boolean {
    return this.item.locked
  }
  setLocked(locked: boolean) {
    this.item.locked = locked
  }
  isSelected(): boolean {
    return this.item.selected
  }
  setSelected(selected: boolean): void {
    this.item.selected = selected
  }

  remove() {
    this.item.remove();
    this._children = null;
    this._parent.clearCache();
  }
  moveTo(newParent: Element, ep: ElementPlacement) {
    this.item.move(newParent.raw(), ep);
    this._parent = newParent;
    newParent.clearCache();
  }
}


class GroupItemElemennt extends PageItemElement {

  constructor(item: GroupItem, parent: Element) {
    super(item, parent)
    this.item = item
  }

  protected makeChildren(): Element[] {
    const items : Element[] = []
    const pageItems = (this.item as GroupItem).pageItems
    for(let i = 0;i < pageItems.length;i ++) {
      items.push(PageItemElement.create(pageItems[i], this))
    }
    return items
  }

}


class LayerElement extends Element {

  protected layer: Layer
  raw() {
    return this.layer
  }

  constructor(layer: Layer, parent: Element) {
    super(parent)
    this.layer = layer
    this.saveState()
  }

  protected makeChildren(): Element[] {
    const items : Element[] = []
    
    const layers = this.layer.layers
    for(let i = 0;i < layers.length;i++) {
      items.push(new LayerElement(layers[i], this))
    }
    const pageItems = this.layer.pageItems
    for(let i = 0;i < pageItems.length;i ++) {
      items.push(PageItemElement.create(pageItems[i], this))
    }
    return items
  }

  setVisible(visible: boolean): void {
    this.layer.visible = visible
  }
  isVisible(): boolean {
    return this.layer.visible
  }

  isLocked(): boolean {
    return this.layer.locked
  }
  setLocked(locked: boolean) {
    this.layer.locked = locked
  }

  isSelected(): boolean {
    for(const child of this.children()) {
      if(!child.isSelected()) {
        return false
      }
    }
    return true
  }
  setSelected(selected: boolean): void {
    for(const child of this.children()) {
      child.setSelected(selected)
    }
  }
  remove() {
    this.layer.remove();
    this._children = null;
    this._parent.clearCache();
  }

  moveTo(newParent: Element, ep: ElementPlacement) {
    this.layer.move(newParent.raw(), ep);
    this._parent = newParent;
    newParent.clearCache();
  }
}


class DocumentElement extends Element {

  protected document: Document

  raw() {
    return this.document
  }

  constructor(document: Document) {
    super(null)
    this.document = document
  }

  protected makeChildren(): Element[] {
    const items : Element[] = []
    
    const layers = this.document.layers
    for(let i = 0;i < layers.length;i++) {
      if(layers[i].parent === this.document) {
        items.push(new LayerElement(layers[i], this))
      }
    }
    const pageItems = this.document.pageItems
    for(let i = 0;i < pageItems.length;i ++) {
      if(pageItems[i].parent === this.document) {
        items.push(PageItemElement.create(pageItems[i], this))
      }
    }
    return items
  }

  setVisible(visible: boolean): void {
    
  }
  isVisible(): boolean {
    return true
  }

  isLocked(): boolean {
    return false
  }
  setLocked(locked: boolean) {
    
  }
  isSelected(): boolean {
    return false
  }
  setSelected(selected: boolean): void {
  }


  remove() {
  }

  moveTo(newParent: Element, ep: ElementPlacement) {
  }
}
