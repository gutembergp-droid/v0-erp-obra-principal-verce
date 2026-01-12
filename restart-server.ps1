# restart-server.ps1
# Script para reiniciar servidor Next.js de forma limpa

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  REINICIO LIMPO DO SERVIDOR NEXT.JS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Matar todos os processos Node
Write-Host "1. Encerrando processos Node..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "   Matando PID $($_.Id)..."
    Stop-Process -Id $_.Id -Force
}
taskkill /F /IM node.exe /T 2>$null | Out-Null
Start-Sleep -Seconds 3
Write-Host "   OK! Processos encerrados." -ForegroundColor Green
Write-Host ""

# 2. Limpar caches do repositório principal
Write-Host "2. Limpando caches do repositorio principal..." -ForegroundColor Yellow
$repoPath = "C:\Users\gpontes\Documents\Genesis"
Set-Location $repoPath

if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "   - .next removido" -ForegroundColor DarkGreen
}

if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache" -ErrorAction SilentlyContinue
    Write-Host "   - node_modules\.cache removido" -ForegroundColor DarkGreen
}

if (Test-Path ".turbo") {
    Remove-Item -Recurse -Force ".turbo" -ErrorAction SilentlyContinue
    Write-Host "   - .turbo removido" -ForegroundColor DarkGreen
}

Write-Host "   OK! Cache limpo." -ForegroundColor Green
Write-Host ""

# 3. Limpar caches dos worktrees
Write-Host "3. Limpando caches dos worktrees..." -ForegroundColor Yellow

$worktrees = @(
    "C:\Users\gpontes\.cursor\worktrees\Genesis\wmp",
    "C:\Users\gpontes\.cursor\worktrees\Genesis\sbw"
)

foreach ($worktree in $worktrees) {
    if (Test-Path $worktree) {
        Write-Host "   Limpando $worktree..."
        
        if (Test-Path "$worktree\.next") {
            Remove-Item -Recurse -Force "$worktree\.next" -ErrorAction SilentlyContinue
        }
        
        if (Test-Path "$worktree\node_modules\.cache") {
            Remove-Item -Recurse -Force "$worktree\node_modules\.cache" -ErrorAction SilentlyContinue
        }
        
        if (Test-Path "$worktree\.turbo") {
            Remove-Item -Recurse -Force "$worktree\.turbo" -ErrorAction SilentlyContinue
        }
    }
}

Write-Host "   OK! Worktrees limpos." -ForegroundColor Green
Write-Host ""

# 4. Aguardar para garantir que tudo foi liberado
Write-Host "4. Aguardando liberacao de recursos..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Write-Host "   OK!" -ForegroundColor Green
Write-Host ""

# 5. Iniciar servidor
Write-Host "========================================" -ForegroundColor Green
Write-Host "  INICIANDO SERVIDOR..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Set-Location $repoPath
npm run dev
