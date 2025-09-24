📝 Git Cheatsheet – Update ke Repo Kelompok
--------------------------------------------------------------------------------------
🔹 1. Clone Repo (sekali saja di awal)

Kalau belum punya repo di laptop:

git clone https://github.com/Farhanselifan/WordPressProjectKel9.git

cd WordPressProjectKel9
--------------------------------------------------------------------------------------
🔹 2. Cek Status Repo

Sebelum kerja:

git status

👉 Lihat apakah ada file yang berubah/harus di-commit.
--------------------------------------------------------------------------------------
🔹 3. Update dari GitHub (Wajib Sebelum Mulai Kerja)

Supaya update dari teman masuk dulu:

git pull origin main --rebase
--------------------------------------------------------------------------------------
🔹 4. Tambahkan File yang Kamu Ubah

git add .

👉 Titik (.) artinya semua file yang berubah ditambahkan.
--------------------------------------------------------------------------------------
🔹 5. Simpan Perubahan di Lokal

git commit -m "Deskripsi singkat perubahan"
--------------------------------------------------------------------------------------
🔹 6. Kirim ke GitHub

git push origin main
--------------------------------------------------------------------------------------
🔹 7. Cek Remote Repo

Kalau mau cek koneksi remote:

git remote -v
--------------------------------------------------------------------------------------
🔹 8. Cek Branch Aktif

git branch

👉 Biasanya main.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

⚡ Tips Kerja Kelompok
1. Selalu git pull origin main --rebase sebelum mulai kerja.
2. Beri commit message jelas (biar teman ngerti perubahanmu).
3. Kalau kerja fitur besar, lebih aman bikin branch baru:
git checkout -b fitur-profil

lalu push dengan:
git push origin fitur-profil

Setelah selesai, merge lewat GitHub Pull Request.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

📌 Dengan cheatsheet ini kamu tinggal ikuti alur:
pull → edit → add → commit → push
