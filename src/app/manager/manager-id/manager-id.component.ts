import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-manager-id',
    templateUrl: './manager-id.component.html'
})
export class ManagerIdComponent {

    constructor(private router: Router) { }

    submit(): void {

        this.router.navigateByUrl('dashboard');
    }

}