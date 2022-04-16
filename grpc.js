const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = `${__dirname}/proto/auth.proto`;
const { AUTH_HOST } = process.env;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const AuthService = grpc.loadPackageDefinition(packageDefinition).AuthService;

module.exports = function(name, callback) {
    const authService = new AuthService(AUTH_HOST, grpc.credentials.createInsecure());
    
    authService.auth({ name }, function(err, response) {
        callback(response.isAuth);
    });
}
