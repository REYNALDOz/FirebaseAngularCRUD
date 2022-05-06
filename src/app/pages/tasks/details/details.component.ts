import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TasksService } from '../tasks.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };
  task: Task | any = null;

  constructor(private router: Router, private tasksSVC: TasksService) {
    //para traer los datos al navegar
    const navigation = this.router.getCurrentNavigation();
    this.task = navigation?.extras?.state;
  }

  ngOnInit(): void {
    if (typeof this.task === 'undefined') {
      this.router.navigate(['list']);
    }
  }

  onGoToEdit(): void {
    this.navigationExtras.state = this.task;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoToBackList(): void {
    this.router.navigate(['list']);
  }

 

  async onGoToDelete(): Promise<void> {
    try {
      await this.tasksSVC.onDeleteTask(this.task?.id);

      Swal.fire({
        icon: 'success',
        title: 'success',
        text: 'Taks deleted',
      });
      this.onGoToBackList();
    } catch (error) {
      console.log(error);
    }
  }
}
