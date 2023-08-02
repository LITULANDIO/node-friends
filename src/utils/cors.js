class Cors {
    
    constructor(){
    }

    corsAccessControlAllow(req, res){

        let allowedOrigins = [
            'http://quisqui.com',
            'https://quisqui.com',
            'http://localhost',
            'ionic://localhost',
            'capacitor://localhost',
            'https://app-friend.netlify.app'
        ];
                
            res.header('Access-Control-Allow-Origin', allowedOrigins)
            res.header('Access-Control-Allow-Credentials','true')
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, X-CSRF-TOKEN, Authorization');

            let cors = {
                    // origin: origin,
                    origin: allowedOrigins,
                    methods: ["GET", "POST"],
                    // origin: 'http://localhost',
                    credentials: true
                };

            return cors;
    }

}

module.exports = Cors
