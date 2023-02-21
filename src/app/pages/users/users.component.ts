import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom } from 'rxjs';
import { HttpMethods } from 'src/app/enums/http-methods';
import { UserFormComponent } from 'src/app/modules/user-form/user-form.component';
import { User } from 'src/app/schemas/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  paginationParams: any;
  loading: boolean = true;
  tableData: any = {}
  constructor(private apiService: ApiService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private primengConfig: PrimeNGConfig) {

  }

  async newBtnHandler() {
    const ref = this.dialogService.open(UserFormComponent, {
      header: 'Add User',
      width: '40%'
    });

    const result = await firstValueFrom(ref.onClose)
    if (result) {
      this.createUser(result)
    }
  }

  async createUser(user: User) {
    try {
      const resp = await firstValueFrom(this.apiService.request({ path: 'user', method: HttpMethods.POST, body: user }))
      if (resp.status = 201) {
        this.getUsers({})
      }
    } catch (error) {
      console.error(error)
    }
  }

  async updateUser(user: User) {
    try {
      const resp = await firstValueFrom(this.apiService.request({ path: `user/${user.userId}`, method: HttpMethods.PUT, body: user }))
      if (resp.status = 204) {
        this.getUsers({})
      }
    } catch (error) {
      console.error(error)
    }
  }

  async deleteUser(user: User) {
    try {
      const resp = await firstValueFrom(this.apiService.request({ path: `user/${user.userId}`, method: HttpMethods.DELETE }))
      if (resp.status = 204) {
        this.getUsers({})
      }
    } catch (error) {
      console.error(error)
    }
  }

  async editBtnHandler(user: User) {
    const ref = this.dialogService.open(UserFormComponent, {
      header: 'Update User',
      width: '40%',
      data: user
    });

    const result = await firstValueFrom(ref.onClose)
    if (result) {
      this.updateUser(result)
    }
  }

  async deleteBtnHandler(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      accept: () => {
        this.deleteUser(user)
        //Actual logic to perform a confirmation
      }
    });
  }

  loadData(event: any) {
    const parameters: any = {
      take: event?.rows || 10,
      skip: event?.first || 0
    };

    this.getUsers(parameters);
  }

  async getUsers({ skip = 0, take = 10 }: any) {
    try {
      this.paginationParams = { skip, take }
      const resp = await firstValueFrom(this.apiService.request({ path: 'user', qparams: { skip, take } }))
      this.loading = false;
      if (resp.status = 200) {
        this.tableData = resp.body
      }
    } catch (error) {
      console.error(error)
    }
  }


  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getUsers({})
  }

}
