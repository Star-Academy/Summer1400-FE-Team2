import { Component, OnInit } from "@angular/core";
import { DataHandlerService } from "src/app/service/dataHandler/data-handler.service";
@Component({
  selector: "app-library",
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.scss"],
})
export class LibraryComponent implements OnInit {
  constructor(public _dataHandle: DataHandlerService) {}

  async ngOnInit() {}
}
