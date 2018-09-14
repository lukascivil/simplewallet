import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as M from 'materialize-css';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  header: string = "..."
  content: string = "..."
  instance: any;
  @ViewChild('dynamicmodal') dynamicmodal: ElementRef;

  constructor(private modalService: ModalService) {
    this.modalService.listen().subscribe((data) => {
      this.header = data.header;
      this.content = data.content;
      this.open();
    })
  }

  ngOnInit() {
  }

  // Open dynamicmodal
  open() {
    this.instance = M.Modal.getInstance(this.dynamicmodal.nativeElement);
    this.instance.open();
  }

}
