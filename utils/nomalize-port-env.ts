export function normalizePort(portValue: number){
    console.log('Normalizing PORT...')
    const PORT = parseInt(process.env.PORT as string);
    if(isNaN(PORT)){
        console.log('Unable to normalize PORT...');
        console.log('Using port 8080...');
        return portValue;
    }
    return PORT;
}