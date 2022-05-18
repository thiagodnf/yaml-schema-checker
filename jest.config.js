module.exports = async () => {
    return {
        // verbose: true,
        testEnvironment: "node",
        transform: {
            "^.+\\.jsx?$": "babel-jest"
        },
    };
};
