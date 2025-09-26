# Ruta al archivo .env
$envPath = Join-Path $PSScriptRoot "..\.env"


# Carga el contenido actual
$envContent = Get-Content $envPath

# Actualiza MAINTENANCE_MODE y limpia MAINTENANCE_END
$updatedContent = $envContent `
    -replace 'MAINTENANCE_MODE=.*', 'MAINTENANCE_MODE=false' `
    -replace 'MAINTENANCE_END=.*', 'MAINTENANCE_END='

# Guarda los cambios
$updatedContent | Set-Content $envPath

# Reinicia el backend
pm2 restart DyCardsApi
Start-Sleep -Seconds 2

# Verifica estado desde el backend
$response = Invoke-WebRequest -Uri "http://localhost:3000/debug-env"
$data = $response.Content | ConvertFrom-Json

# Validación automática
if ($data.MAINTENANCE_MODE -eq "false" -or [string]::IsNullOrEmpty($data.MAINTENANCE_END)) {
    Write-Host "`n Mantenimiento desactivado correctamente."
} else {
    Write-Host "`n Mantenimiento sigue activo. Revisa el archivo .env o reinicia PM2 manualmente."
}


