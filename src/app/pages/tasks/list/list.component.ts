import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TasksService } from '../tasks.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tasks$ = this.tasksSVC.tasks;

  //para pasar la informacion a travez de rutas el objeto completo
  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  displayedColumns: string[] = [
    'title',
    'description',
    'owner',
    'startDate',
    'finishDate',
    'actions',
  ];
  dataSource = this.tasks$;

  constructor(private router: Router, private tasksSVC: TasksService) {}

  ngOnInit(): void {}

  onGoToEdit(item: any): void {
    this.navigationExtras.state = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }
  onGoToSee(item: any): void {
    this.navigationExtras.state = item;
    this.router.navigate(['details'], this.navigationExtras);
  }
  async onGoToDelete(taskId: string): Promise<void> {
    try {
      await this.tasksSVC.onDeleteTask(taskId);
      Swal.fire({
        icon: 'success',
        title: 'success',
        text: 'Taks deleted',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
