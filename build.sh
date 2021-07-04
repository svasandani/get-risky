set -e

alias find="\"C:\\Program Files\\Git\\usr\\bin\\find.exe\""

go test ./...
rm -rf dist/

mkdir -p dist/
GOOS=$1 GOARCH=$2 go build src/main.go
mv main* dist/

GOOS=$1 GOARCH=$2 go build src/migrations/migrate.go
mv migrate* dist/

mkdir -p dist/src/migrations/sql
find src/migrations/sql -type f -not -iwholename 'src/migrations/sql/HEAD*' -exec cp '{}' 'dist/{}' ';'

cp -a website/ dist/

cp -a config/ dist/

tar -zcvf "o.tar.gz" dist
mkdir -p "releases/$(date '+%Y-%m-%d')/"
mv "o.tar.gz" "releases/$(date '+%Y-%m-%d')/get-risky-$(date '+%Y-%m-%d').tar.gz"