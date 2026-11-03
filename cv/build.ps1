# Build CV — render cv.html to PDF with headless Chrome
# Pemakaian:  powershell -ExecutionPolicy Bypass -File build.ps1
#
# Output:
#   cv/CV_Muhammad_Ibnu_Zauzi.pdf            (file utama)
#   ../public/cv-muhammad-ibnu-zauzi.pdf     (dipakai tombol "Unduh CV" di website)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$pdf  = Join-Path $here 'CV_Muhammad_Ibnu_Zauzi.pdf'
$html = Join-Path $here 'cv.html'

$chrome = @(
  'C:\Program Files\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $chrome) { throw 'Chrome / Edge tidak ditemukan.' }
if (Test-Path $pdf) { Remove-Item $pdf -Force }

# Profil sementara supaya tidak bentrok dengan Chrome yang sedang terbuka
$profileDir = Join-Path $env:TEMP ('cv-chrome-' + [guid]::NewGuid().ToString('N'))

$args = @(
  '--headless=new'
  '--disable-gpu'
  '--no-sandbox'
  '--no-first-run'
  '--no-pdf-header-footer'
  "--user-data-dir=$profileDir"
  "--print-to-pdf=$pdf"
  $html
)

$proc = Start-Process -FilePath $chrome -ArgumentList $args -PassThru -WindowStyle Hidden
if (-not $proc.WaitForExit(60000)) { $proc.Kill() }

if (-not (Test-Path $pdf)) { throw 'Gagal membuat PDF.' }

Copy-Item $pdf (Join-Path $here '..\public\cv-muhammad-ibnu-zauzi.pdf') -Force
Remove-Item $profileDir -Recurse -Force -ErrorAction SilentlyContinue

$kb = [math]::Round((Get-Item $pdf).Length / 1KB)
Write-Host "OK -> $pdf ($kb KB)"
