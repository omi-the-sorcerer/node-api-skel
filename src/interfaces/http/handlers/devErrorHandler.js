module.exports = (err, req,res,next) => {
    const { jsonResponse, logger } = req.container.cradle;

    // get file and line number from stack trace
    const stack = err.stack.split('\n');
    const stackRegex = /at\s(.*):(\d+):(\d+)/;
    const stackMatch = stack[1].match(stackRegex);
    err.fileName = stackMatch[1];
    err.lineNumber = stackMatch[2];

    jsonResponse.error(res,
        `Message: ${err.message} \n
        File: ${err.fileName} \n
        Line: ${err.lineNumber} \n`
    , stack, err.status);
}