import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login/login.component';
import { HomeComponent } from '../components/home/home/home.component';
import { UserManagementComponent } from '../components/user-management/user-management/user-management.component';
import { SystemManagementComponent } from '../components/system-management/system-management/system-management.component';
import { UploadComponent } from '../components/uploud-file/uploud-file.component';

export const routes: Routes = [
    {path: 'login',component:LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'home',component: HomeComponent},
    {path: 'user-management',component: UserManagementComponent},
    {path: 'system-management',component: SystemManagementComponent},
    {path: 'upload-file',component: UploadComponent}
];
