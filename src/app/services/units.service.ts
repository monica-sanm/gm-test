import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanionService {

    constructor(
        private http: HttpClient
    ) { }
    
    getUnits(tabName: string) {
        let url = '', token = '', filterText = '', selCompDayValue = 1, selTempInstance = -1;
        console.log(tabName);
        if(tabName == 'unidades') {
            url = `http://gm3.cyrus.tech:8081/gm3.rest/api/units/lastposition?search=${filterText}`;
            token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDV0Rlc2Fycm9sbG8iLCJpc3MiOiJDeXJ1cyBXaXJlbGVzcyIsImlhdCI6IjE2NTY2MTE1MzUiLCJuYW1lIjoiVGVtcG9yYWwgRGVzYXJyb2xsbyAiLCJ1c2VyIjoiMjU0MiJ9.v3g7oR26OGQ8z2u9mG3gLaznSHauDrkjff9FBCcqACw'
        } else if(tabName == 'companion') {
            url =`http://gm3.cyrus.tech:8081/gm3.rest/api/units/expert?search=${filterText}&days=${selCompDayValue}&inservice=${selTempInstance}`;
            token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJbmdlbmllcmlhIiwiaXNzIjoiQ3lydXMgV2lyZWxlc3MiLCJpYXQiOiIxNjU2NTE3NDgyIiwibmFtZSI6IlBydWViYSBJTkciLCJ1c2VyIjoiMjY3OSJ9.1p65dciYz0W3j8hLWqtxLV820kn-HP6rHKnYm3t1MEM'
        }

        return this.http.get(url, {
            headers: {
                authorization: token
            }
        });
    }
}
