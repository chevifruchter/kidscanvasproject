import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Drawing } from '../../../models/drawing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './system-management.component.html',
  styleUrls: ['./system-management.component.css']
})
export class SystemManagementComponent implements OnInit {
  drawings: Drawing[] = [];
  // displayedColumns: string[] = [];
  displayedColumns: string[] = ['name', 'path', 'categoryId', 'artist_name', 'target_age', 'created_at', 'updated_at', 'actions'];
  

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Drawing[]>('https://kidscanvasproject.onrender.com/api/Drawings').subscribe(
      data => {
        console.log("🎨 ציורים מהשרת:", data);
        this.drawings = data;
        this.displayedColumns = data && data.length > 0
          ? [...Object.keys(data[0]), 'actions']
          : [];
        console.log("🧩 עמודות מזוהות:", this.displayedColumns);
      },
      error => {
        console.error('❌ שגיאה בקבלת הציורים:', error);
      }
    );
  }

  openAddDrawing() {
    console.log("➕ פתיחת חלון הוספת ציור (לא ממומש עדיין)");
     this.router.navigate(['/upload-file']);
  }

editDrawing(drawing: Drawing): void {}
  getPresignedUrlToDownload(fileName: string): Observable<any> {
    const url = `https://kidscanvasproject.onrender.com/api/upload/download-url?fileName=${fileName}`;
    return this.http.get<any>(url);
  }

  downloadFile(fileName: string): void {
    this.getPresignedUrlToDownload(fileName).subscribe(
      data => {
        if (data?.url) {
          console.log("⬇️ הורדת קובץ:", fileName);
          window.open(data.url, "_blank");
        } else {
          alert("שגיאה בהורדת הקובץ");
        }
      },
      error => {
        console.error("❌ שגיאה בהורדה:", error);
      }
    );
  }

  deleteDrawing(id: number): void {
    if (!confirm("האם אתה בטוח שברצונך למחוק את הציור?")) return;

    this.http.delete(`https://kidscanvasproject.onrender.com/api/Drawings/${id}`).subscribe(
      () => {
        console.log("🗑️ הציור נמחק:", id);
        this.drawings = this.drawings.filter(d => Number(d.id) !== id);
        alert("הציור נמחק בהצלחה");
      },
      error => {
        console.error("❌ שגיאה במחיקת הציור:", error);
      }
    );
  }
}
