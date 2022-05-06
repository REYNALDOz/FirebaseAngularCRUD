import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/pages/tasks/tasks.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  task: Task | any = null;
  taskForm: FormGroup | any;

  constructor(private router: Router, private fb: FormBuilder, private taskSVC: TasksService) {
    const navigation = this.router.getCurrentNavigation();
    this.task = navigation?.extras?.state;
    this.initForm();
  }

  ngOnInit(): void {
    //edit patch
    if (typeof this.task === 'undefined') {
      this.router.navigate(['new']);
    } else {
      this.taskForm.patchValue(this.task);
    }
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      const tasksId = this.task?.id || null;
      this.taskSVC.onSaveTask(task, tasksId);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'task created',
        showConfirmButton: false,
        timer: 1500,
      });
      this.taskForm.reset();
      this.onGoToBackList();
    }
  }

  onGoToBackList(): void {
    this.router.navigate(['list']);
  }

  private initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      finishDate: ['', [Validators.required]],
    });
  }
}
