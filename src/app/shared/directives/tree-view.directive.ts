import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
export type ActiveTree = 'asc' | 'desc';
const rotate: { [key: string]: ActiveTree } = { asc: 'desc', desc: 'asc' };

export interface treeEvent {
  value: string;
  isActive: ActiveTree;
}
@Directive({
  selector: 'ul[treeView]',
  host: {
    '[class.open]': 'direction === "asc"',
    '[class.close]': 'direction === "desc"',
    '(click)': 'toggleTree()'
  }
})
export class TreeViewDirective {
  @Input() treeView: string;
  @Input() direction: ActiveTree = 'asc';
  @Output() emitId = new EventEmitter<treeEvent>();
  constructor(private elementRef: ElementRef) {
    //console.log(this.elementRef.nativeElement);
  }


  toggleTree() {
    this.direction = rotate[this.direction];
    this.emitId.emit({value: this.treeView, isActive: this.direction});
  }
}
