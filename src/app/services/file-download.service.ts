import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from "@angular/http";

import * as FileSaver from 'file-saver';

@Injectable()
export class FileDownloadService {

  constructor(private http: Http) { }
  
    downloadFile(api: string, fileName: string) {
        this.http.get(api, { responseType: ResponseContentType.Blob })
            .subscribe((response: any) => {
                FileSaver.saveAs(response.blob(), fileName);
            });

    }

}
