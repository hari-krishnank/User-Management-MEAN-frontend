import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  selectedFile: File | null = null;
  storedProfileImage: string | null = localStorage.getItem('profileImage');

  @ViewChild('imageInput') imageInput: any;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfile();
    // const storedProfileImage = localStorage.getItem('profileImage');
    // if (storedProfileImage ) {
    //   this.userProfile = { image: storedProfileImage }
    //   this.getUserProfile()
    // } else {
    //   this.getUserProfile();
    // }
  }

  getUserProfile(): void {
    const token = localStorage.getItem('token');
    console.log('User Profile....', token);

    if (token) {
      this.userService.VerifyToken(token).subscribe((response: any) => {
        if (response.valid) {
          console.log('Token is valid');
          this.http.post<any>('http://localhost:5000/api/userProfile', { token }).subscribe(
            (profileResponse) => {
              this.userProfile = profileResponse;
              console.log('ithaan profile response:', this.userProfile);

              if (this.userProfile && this.userProfile.image) {
                localStorage.setItem('profileImage', this.userProfile.image);
              }

            },
            (error) => {
              console.error('Error fetching user profile:', error);
            }
          );
        } else {
          console.log('Token is invalid');
        }
      });
    }
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      const token = localStorage.getItem('token');
      if (token) {
        formData.append('token', token);
        console.log(formData);
      } else {
        console.error('Token not found in local storage');
        return;
      }
      console.log(this.selectedFile);


      this.http.post<any>('http://localhost:5000/api/userProfile', formData).subscribe(
        (profileResponse) => {
          console.log('Image uploaded successfully:', profileResponse);

          this.userProfile.image = profileResponse.image;

          if (this.userProfile && this.userProfile.image) {
            localStorage.setItem('profileImage', this.userProfile.image);
          }
          window.location.reload()
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }

}