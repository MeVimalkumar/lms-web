import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Course } from 'src/app/schemas/course';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = []
  paginationParams: any;

  constructor(private apiService: ApiService) {
  }

  next(event: any) {
    if ((event.target.body.scrollHeight - window.pageYOffset) <= event.target.body.offsetHeight) {
      this.getCourses({ skip: this.paginationParams.skip + 9 })
      console.log("End");
    }
  }

  async getCourses({ skip = 0, take = 9 }: any) {
    try {
      this.paginationParams = { ...this.paginationParams, skip, take };
      const resp = await firstValueFrom(this.apiService.request({ path: 'course', qparams: { skip, take } }))
      if (resp.status === 200) {
        this.courses.push(...resp.body)
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.getCourses({})
    window.addEventListener('scroll', this.next.bind(this), true); //third parameter
  }

}
