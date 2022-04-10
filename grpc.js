const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = `${__dirname}/proto/auth.proto`;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const AuthService = grpc.loadPackageDefinition(packageDefinition).AuthService;

module.exports = function(name, callback) {
    const authService = new AuthService('localhost:8080', grpc.credentials.createInsecure());
    
    authService.auth({ name }, function(err, response) {
        callback(response.isAuth);
    });
}
