import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { User, UserService } from '../../core';

@Component({
    selector: 'jhi-user-mgmt-delete-dialog',
    templateUrl: './user-management-delete-dialog.component.html'
})
export class UserMgmtDeleteDialogComponent {
    user: User;

    constructor(private userService: UserService, public activeModal: NgbActiveModal) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(login) {
        this.userService.delete(login).subscribe(response => {            
            this.activeModal.dismiss(true);
        });
    }
}
