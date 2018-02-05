import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskmanagerComponent } from './taskmanager/taskmanager.component';
import { TaskmanagerColumnComponent } from './taskmanager-column/taskmanager-column.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TaskmanagerComponent,
    TaskmanagerColumnComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
