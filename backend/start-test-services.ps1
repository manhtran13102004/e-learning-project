# Chay 2 service dung de test: service1 + service2 (profile local)
$root = $PSScriptRoot

Write-Host "==> Starting infra (Consul, Postgres, Redis) via Docker..." -ForegroundColor Cyan
docker compose -f "$root\docker-compose.infra.yml" up -d
if (-not $?) {
    Write-Host "Docker chua chay hoac loi. Hay mo Docker Desktop roi thu lai." -ForegroundColor Red
    exit 1
}

Write-Host "==> Waiting a few seconds for infra to be ready..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

Write-Host "==> Loading environment variables from .env..." -ForegroundColor Cyan
$envFile = Join-Path $root ".env"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -eq "" -or $line.StartsWith("#") -or $line.StartsWith("//")) {
            return
        }
        $parts = $line.Split("=", 2)
        if ($parts.Length -eq 2) {
            $key = $parts[0].Trim()
            $value = $parts[1].Trim()
            Set-Item -Path "Env:$key" -Value $value
            if ($key -like "*PASSWORD*") {
                Write-Host "    $key=******"
            } else {
                Write-Host "    $key=$value"
            }
        }
    }
} else {
    Write-Host "Khong tim thay .env tai $envFile - cac service se loi neu application-*.yml tham chieu `${VAR} ma khong co gia tri." -ForegroundColor Yellow
}

$services = @(
    @{ Name = "service1"; Path = Join-Path $root "service1"; DebugPort = 5004 },
    @{ Name = "service2"; Path = Join-Path $root "service2"; DebugPort = 5006 }
)

foreach ($svc in $services) {
    Write-Host "==> Launching $($svc.Name) in a new window (profile: local, debug port: $($svc.DebugPort))..." -ForegroundColor Cyan
    $jvmArgs = "-Dspring-boot.run.jvmArguments=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=$($svc.DebugPort)"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$($svc.Path)'; mvn spring-boot:run -Plocal \`"$jvmArgs\`""
    Start-Sleep -Seconds 2
}

Write-Host "==> Done. service1 (8094) va service2 (8095) dang chay trong 2 cua so PowerShell rieng." -ForegroundColor Green
