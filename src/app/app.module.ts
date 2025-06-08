import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PartListComponent } from './components/part-list/part-list.component';
import { PartEditComponent } from './components/part-edit/part-edit.component';
import { PartDetailComponent } from './components/part-detail/part-detail.component';
import { PartsService } from './services/parts.service';
import { AngularSqliteUsageComponent } from './components/angular-sqlite-usage/angular-sqlite-usage.component';
import { DockerOnAwsComponent } from './components/docker-on-aws/docker-on-aws.component';

const routes: Routes = [
  { path: '', redirectTo: 'parts', pathMatch: 'full' },
  { path: 'parts', component: PartListComponent },
  { path: 'parts/:id', component: PartDetailComponent },
  { path: 'edit/:id', component: PartEditComponent },
  { path: 'add', component: PartEditComponent },
  { path: 'angular-sqlite-usage', component: AngularSqliteUsageComponent },
  { path: 'docker-on-aws', component: DockerOnAwsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PartListComponent,
    PartEditComponent,
    PartDetailComponent,
    AngularSqliteUsageComponent,
    DockerOnAwsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PartsService],
  bootstrap: [AppComponent]
})
export class AppModule { }