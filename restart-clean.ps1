# Script de Restart Limpo - ERP Genesis
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESTART LIMPO - ERP GENESIS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/5] Matando processos Node..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "   OK - Processos Node encerrados" -ForegroundColor Green
Write-Host ""

Write-Host "[2/5] Limpando cache do Next.js (.next)..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "   OK - Cache .next removido" -ForegroundColor Green
} else {
    Write-Host "   OK - Pasta .next nao existe" -ForegroundColor Green
}
Write-Host ""

Write-Host "[3/5] Limpando cache do Turbopack..." -ForegroundColor Yellow
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache" -ErrorAction SilentlyContinue
    Write-Host "   OK - Cache Turbopack removido" -ForegroundColor Green
} else {
    Write-Host "   OK - Cache Turbopack nao existe" -ForegroundColor Green
}
Write-Host ""

Write-Host "[4/5] Limpando cache temporario..." -ForegroundColor Yellow
Remove-Item -Path "C:\Users\gpontes\AppData\Local\Temp\next-*" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "   OK - Cache temporario limpo" -ForegroundColor Green
Write-Host ""

Write-Host "[5/5] Reiniciando servidor..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SERVIDOR REINICIANDO..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

npm run dev
