# Kill any process using port 3001
$port = 3001
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -First 1

if ($process) {
    Write-Host "⚠️ Found existing process on port $port (PID: $($process.OwningProcess)). Killing it..." -ForegroundColor Yellow
    Stop-Process -Id $process.OwningProcess -Force
    Start-Sleep -Seconds 1
} else {
    Write-Host "✅ Port $port is clear." -ForegroundColor Green
}

Write-Host "🚀 Starting the Authentication Server..." -ForegroundColor Cyan
npm run dev
