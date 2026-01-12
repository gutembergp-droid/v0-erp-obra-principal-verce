$oldBlock = Get-Content "OLD_BLOCO2.txt" -Raw
$newBlock = Get-Content "NEW_BLOCO2.txt" -Raw  
$fileContent = Get-Content "app\obra\comercial\estruturacao-contrato\page.tsx" -Raw

if ($fileContent.Contains($oldBlock)) {
    Write-Host "Substituindo..." -ForegroundColor Yellow
    $newContent = $fileContent.Replace($oldBlock, $newBlock)
    $newContent | Set-Content "app\obra\comercial\estruturacao-contrato\page.tsx" -Encoding UTF8 -NoNewline
    Write-Host "SUCESSO!" -ForegroundColor Green
} else {
    Write-Host "ERRO: Nao encontrado!" -ForegroundColor Red
}
