param([int]$Minutes = 30)

# Calcula nueva hora de finalización
$futureTime = (Get-Date).AddMinutes($Minutes).ToString("yyyy-MM-ddTHH:mm:ss")

# Ruta al archivo .env
$envPath = "..\.env"

# Carga y actualiza contenido
$envContent = Get-Content $envPath
$updatedContent = $envContent `
    -replace 'MAINTENANCE_MODE=.*', 'MAINTENANCE_MODE=true' `
    -replace 'MAINTENANCE_END=.*', "MAINTENANCE_END=$futureTime"
$updatedContent | Set-Content $envPath

# Reinicia el backend
pm2 restart DyCardsApi
Start-Sleep -Seconds 2

# Verifica estado desde el backend
$response = Invoke-WebRequest -Uri "http://localhost:3000/debug-env"
$data = $response.Content | ConvertFrom-Json

# Validación automática
$now = [datetime]::Parse($data.now)
$end = [datetime]::Parse($data.MAINTENANCE_END)

if ($data.MAINTENANCE_MODE -eq "true" -and $end -gt $now) {
    $remaining = $end - $now
    Write-Host "`n Mantenimiento activo. Tiempo restante: $($remaining.ToString("hh\:mm\:ss"))"
} else {
    Write-Host "`n Mantenimiento no activo o ya expirado."
}
