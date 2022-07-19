import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodosComponent } from "./pages/todos/todos.component";

const routes: Routes = [
  /*
    @TASK - map route to the todos page
  */
 {
  path: '', component: TodosComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
