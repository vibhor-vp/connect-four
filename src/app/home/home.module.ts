import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

const _homeRoutes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(_homeRoutes)]
})

export class HomeModule {
    constructor() { }
}