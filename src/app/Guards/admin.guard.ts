import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)


  const localData = localStorage.getItem('adminToken')

 
  if (localData != null) {
    return true
  } else {
    router.navigateByUrl('/admin')
    return false
  }
};
