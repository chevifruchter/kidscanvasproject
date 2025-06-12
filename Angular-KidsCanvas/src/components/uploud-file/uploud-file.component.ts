import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './uploud-file.component.html',
  styleUrls: ['./uploud-file.component.css']
})
export class UploadComponent {
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile!: File;

  drawing = {
    name: '',
    targetAge: 0,
    artistName: ''
  };

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

  constructor(private http: HttpClient) {}

   upload() {
    if (!this.selectedFile) return;

    // 1. בקשה לשרת ליצירת URL זמני להעלאה ל-S3
    this.http.post<{ uploadUrl: string, fileUrl: string }>(
      'https://kidscanvasproject.onrender.com/api/Upload/upload-url',
      { name: this.drawing.name, artistName: this.drawing.artistName, targetAge: this.drawing.targetAge }
    ).subscribe(presigned => {
      // 2. שליחת הקובץ בפועל ל-S3
      this.http.put(presigned.uploadUrl, this.selectedFile, {
        headers: { 'Content-Type': this.selectedFile.type }
      }).subscribe(() => {
        // 3. שמירת ה-URL של הקובץ במסד הנתונים
        this.saveDrawingToDb(presigned.fileUrl);
      });
    });
  }

  saveDrawingToDb(fileUrl: string) {
  const payload = {
    name: this.drawing.name,
    artistName: this.drawing.artistName,
    targetAge: this.drawing.targetAge,
    url: fileUrl
  };

  this.http.post('https://kidscanvasproject.onrender.com/api/Upload/save', payload)
    .subscribe({
      next: () => {
        alert('הציור נשמר במסד הנתונים בהצלחה!');
      },
      error: (err) => {
        console.error('שגיאה בשמירה למסד הנתונים', err);
      }
    });
}

}
