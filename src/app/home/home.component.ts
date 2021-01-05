import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    constructor(private _router: Router) { }

    comingSoonMethod(){
        alert('COMMING SOON');
    }

    redirectToGameInfo(){
        this._router.navigate(['/players-info'])
    }
}
