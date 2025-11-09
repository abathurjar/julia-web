@echo off
echo Создаю превью для видео...
mkdir videos\previews 2>nul

ffmpeg -i videos/Lipgloss.mp4 -ss 00:00:01 -vframes 1 -q:v 2 videos/previews/Lipgloss-preview.jpg
ffmpeg -i videos/Comp.mp4 -ss 00:00:01 -vframes 1 -q:v 2 videos/previews/Comp-preview.jpg
ffmpeg -i videos/abathur.mp4 -ss 00:00:01 -vframes 1 -q:v 2 videos/previews/abathur-preview.jpg
ffmpeg -i videos/Ring.mp4 -ss 00:00:01 -vframes 1 -q:v 2 videos/previews/Ring-preview.jpg
ffmpeg -i videos/Slurry.mp4 -ss 00:00:01 -vframes 1 -q:v 2 videos/previews/Slurry-preview.jpg
ffmpeg -i videos/ZheeShe.mp4 -ss 00:00:01 -vframes 1 -q:v 2 videos/previews/ZheeShe-preview.jpg
ffmpeg -i videos/solar.mp4 -ss 00:00:01 -vframes 1 -q:v 2 videos/previews/solar-preview.jpg

echo Все превью созданы в папке videos/previews!
pause