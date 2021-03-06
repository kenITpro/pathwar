module pathwar.land/v2

require (
	github.com/Bearer/bearer-go v1.2.1
	github.com/Microsoft/go-winio v0.4.14 // indirect
	github.com/brianvoe/gofakeit v3.18.0+incompatible
	github.com/bwmarrin/snowflake v0.3.0
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/docker/distribution v2.7.1+incompatible // indirect
	github.com/docker/docker v1.13.1
	github.com/docker/go-connections v0.4.0
	github.com/docker/go-units v0.4.0 // indirect
	github.com/dustin/go-humanize v1.0.0
	github.com/go-chi/chi v4.0.2+incompatible
	github.com/go-sql-driver/mysql v1.4.1
	github.com/gobuffalo/envy v1.8.1 // indirect
	github.com/gobuffalo/logger v1.0.3 // indirect
	github.com/gobuffalo/packr/v2 v2.7.1
	github.com/gogo/gateway v1.1.0
	github.com/gogo/protobuf v1.3.1
	github.com/golang/protobuf v1.3.2
	github.com/google/go-querystring v1.0.0
	github.com/grpc-ecosystem/go-grpc-middleware v1.1.0
	github.com/grpc-ecosystem/grpc-gateway v1.12.1
	github.com/jinzhu/gorm v1.9.11
	github.com/keycloak/kcinit v0.0.0-20181010192927-f85c3c5390ea
	github.com/martinlindhe/base36 v1.0.0
	github.com/moby/moby v1.13.1
	github.com/oklog/run v1.0.0
	github.com/olekukonko/tablewriter v0.0.4
	github.com/opencontainers/go-digest v1.0.0-rc1 // indirect
	github.com/opentracing/opentracing-go v1.1.0
	github.com/openzipkin-contrib/zipkin-go-opentracing v0.4.5
	github.com/openzipkin/zipkin-go v0.2.1
	github.com/peterbourgon/ff v1.7.0
	github.com/pkg/errors v0.8.1
	github.com/rogpeppe/go-internal v1.5.1 // indirect
	github.com/rs/cors v1.7.0
	github.com/soheilhy/cmux v0.1.4
	github.com/stretchr/testify v1.4.0
	github.com/treastech/logger v0.0.0-20180705232552-e381e9ecf2e3
	go.uber.org/atomic v1.5.1 // indirect
	go.uber.org/multierr v1.4.0 // indirect
	go.uber.org/zap v1.13.0
	golang.org/x/crypto v0.0.0-20191227163750-53104e6ec876
	golang.org/x/lint v0.0.0-20191125180803-fdd1cda4f05f // indirect
	golang.org/x/net v0.0.0-20191209160850-c0dbc17a3553 // indirect
	golang.org/x/oauth2 v0.0.0-20190226205417-e64efc72b421
	golang.org/x/sys v0.0.0-20191228213918-04cbcbbfeed8 // indirect
	golang.org/x/tools v0.0.0-20191230220329-2aa90c603ae3 // indirect
	golang.org/x/xerrors v0.0.0-20191011141410-1b5146add898
	google.golang.org/appengine v1.6.5 // indirect
	google.golang.org/genproto v0.0.0-20191230161307-f3c370f40bfb
	google.golang.org/grpc v1.26.0
	gopkg.in/gormigrate.v1 v1.6.0
	gopkg.in/yaml.v2 v2.2.7 // indirect
	gopkg.in/yaml.v3 v3.0.0-20200121175148-a6ecf24a6d71
	moul.io/godev v1.5.0
	moul.io/srand v1.4.0
	moul.io/zapgorm v1.0.0
)

replace (
	//github.com/Bearer/bearer-go => ../github.com/Bearer/bearer-go
	github.com/golang/lint => golang.org/x/lint v0.0.0-20190409202823-959b441ac422
	gopkg.in/jcmturner/rpc.v1 => gopkg.in/jcmturner/rpc.v1 v1.1.0
	//moul.io/godev => ../moul.io/godev
	sourcegraph.com/sourcegraph/go-diff => github.com/sourcegraph/go-diff v0.5.1
)

go 1.13
