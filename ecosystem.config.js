module.exports = {
    apps: [
        {
            name: 'dictionary-ui',
            script: 'serve',
            args: '-- -s build -l 3001',
            env: {
                NODE_ENV: 'production',
            }
        }
    ]
};
