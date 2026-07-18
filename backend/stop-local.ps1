# Dung ha tang local (Consul/Postgres/Redis). Cac cua so mvn spring-boot:run phai tu dong Ctrl+C hoac dong cua so.
$root = $PSScriptRoot
docker compose -f "$root\docker-compose.infra.yml" down
